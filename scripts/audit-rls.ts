import { readFileSync } from 'node:fs';
import { Client } from 'pg';
import { loadEnv } from './env';

// Auditoria de RLS em public.* (achado do Supabase Advisor 06/07/2026,
// 'rls_disabled_in_public'). Lista as tabelas sem RLS e checa grants para
// anon/authenticated — o D11/BR-004 exige negação total. Só leitura; não altera nada.

async function main() {
  loadEnv();
  const url = process.env.SUPABASE_DB_URL;
  if (!url) throw new Error('SUPABASE_DB_URL ausente no .env');
  const ca = process.env.SUPABASE_DB_CA
    ? readFileSync(process.env.SUPABASE_DB_CA, 'utf8')
    : undefined;
  const client = new Client({ connectionString: url, ssl: ca ? { ca } : true });
  await client.connect();
  try {
    const semRls = await client.query<{ table_name: string }>(`
      select c.relname as table_name
        from pg_class c
        join pg_namespace n on n.oid = c.relnamespace
       where n.nspname = 'public'
         and c.relkind = 'r'
         and c.relrowsecurity = false
       order by c.relname
    `);
    console.log(`\nTabelas em public.* SEM RLS: ${semRls.rowCount ?? 0}`);
    for (const r of semRls.rows) console.log(`  ✗ ${r.table_name}`);

    const grants = await client.query<{
      table_name: string;
      grantee: string;
      privilege_type: string;
    }>(`
      select table_name, grantee, privilege_type
        from information_schema.role_table_grants
       where table_schema = 'public'
         and grantee in ('anon', 'authenticated', 'PUBLIC')
       order by table_name, grantee, privilege_type
    `);
    console.log(`\nGrants em public.* para anon/authenticated/PUBLIC: ${grants.rowCount ?? 0}`);
    for (const r of grants.rows)
      console.log(`  ! ${r.table_name} → ${r.grantee}: ${r.privilege_type}`);

    if ((semRls.rowCount ?? 0) === 0 && (grants.rowCount ?? 0) === 0) {
      console.log('\n✓ D11/BR-004 sustentado: 0 tabelas expostas em public.');
    }
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
