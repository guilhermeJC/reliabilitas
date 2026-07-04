import { readdir, readFile } from 'node:fs/promises';
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

  const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(
      'create table if not exists public.schema_migrations (name text primary key, applied_at timestamptz not null default now())',
    );
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
