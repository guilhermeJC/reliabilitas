import { readdir, readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Client } from 'pg';
import { loadEnv } from './env';

// Aplica data/migrations/*.sql em ordem, uma única vez cada (tabela schema_migrations).
// Requer SUPABASE_DB_URL (Dashboard → Settings → Database → Connection string, Session).

async function main() {
  loadEnv();
  const url = process.env.SUPABASE_DB_URL;
  if (!url) {
    console.error(
      'SUPABASE_DB_URL ausente no .env.\n' +
        'Obtenha em: Supabase Dashboard → Settings → Database → Connection string (Session mode).',
    );
    process.exit(1);
  }

  const dir = path.join(process.cwd(), 'data', 'migrations');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort();

  // TLS com verificação completa. Se a cadeia do Supabase exigir CA própria,
  // baixe-a (Dashboard → Settings → Database → SSL) e aponte SUPABASE_DB_CA no .env.
  const ca = process.env.SUPABASE_DB_CA
    ? readFileSync(process.env.SUPABASE_DB_CA, 'utf8')
    : undefined;
  const client = new Client({ connectionString: url, ssl: ca ? { ca } : true });
  await client.connect();
  try {
    // D11/BR-004: qualquer tabela criada em public.* nasce SEM RLS por default.
    // A schema_migrations foi flaggada pelo Supabase Advisor em 06/07/2026
    // ('rls_disabled_in_public') justamente por esta razão. Blindada aqui: as
    // 4 instruções são idempotentes (create-if-not-exists, enable RLS não erra
    // se já ligada, revoke idem) — novos ambientes já nascem fechados.
    await client.query(
      'create table if not exists public.schema_migrations (name text primary key, applied_at timestamptz not null default now())',
    );
    await client.query('alter table public.schema_migrations enable row level security');
    await client.query('revoke all on table public.schema_migrations from anon, authenticated');
    const done = new Set(
      (await client.query('select name from public.schema_migrations')).rows.map(
        (r: { name: string }) => r.name,
      ),
    );

    for (const f of files) {
      if (done.has(f)) {
        console.log(`= ${f} (já aplicada)`);
        continue;
      }
      const sql = await readFile(path.join(dir, f), 'utf8');
      console.log(`> aplicando ${f}...`);
      await client.query('begin');
      try {
        await client.query(sql);
        await client.query('insert into public.schema_migrations (name) values ($1)', [f]);
        await client.query('commit');
        console.log(`✓ ${f}`);
      } catch (e) {
        await client.query('rollback');
        throw e;
      }
    }
    console.log('Migrations em dia.');
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
