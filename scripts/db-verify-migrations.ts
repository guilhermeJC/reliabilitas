import { readdir } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Client } from 'pg';
import { loadEnv } from './env';
import { comparaMigracoes } from '../src/lib/db/migracoes';

// Existir em data/migrations/*.sql NÃO significa que foi aplicada em
// produção — npm run db:apply não roda automaticamente (mesma armadilha já
// documentada pro npm run ingest). Achado real, DEV-100 (25/07/2026): a
// migração 0007 do pivot DEV-094 ficou 1 dia sem rodar, e o Colaborar
// falhou em silêncio em todo envio nesse período. Rodar este script logo
// após qualquer npm run db:apply (ou antes de confiar numa coluna que uma
// migração antiga deveria ter criado) — só leitura, não altera nada.

async function main() {
  loadEnv();
  const url = process.env.SUPABASE_DB_URL;
  if (!url) throw new Error('SUPABASE_DB_URL ausente no .env');

  const dir = path.join(process.cwd(), 'data', 'migrations');
  const arquivosLocais = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort();

  const ca = process.env.SUPABASE_DB_CA
    ? readFileSync(process.env.SUPABASE_DB_CA, 'utf8')
    : undefined;
  const client = new Client({ connectionString: url, ssl: ca ? { ca } : true });
  await client.connect();
  try {
    const aplicadas = (
      await client.query<{ name: string }>('select name from public.schema_migrations')
    ).rows.map((r) => r.name);

    const { pendentes, orfas } = comparaMigracoes(arquivosLocais, aplicadas);

    if (pendentes.length === 0 && orfas.length === 0) {
      console.log(`✓ ${arquivosLocais.length} migrações, todas aplicadas em produção.`);
      return;
    }

    if (pendentes.length > 0) {
      console.error(`\n✗ PENDENTES (no repo, NÃO aplicadas no banco): ${pendentes.length}`);
      for (const f of pendentes) console.error(`  ✗ ${f}`);
      console.error('\nRode: npm run db:apply');
    }
    if (orfas.length > 0) {
      console.warn(`\n! ÓRFÃS (aplicadas no banco, sem arquivo local): ${orfas.length}`);
      for (const f of orfas) console.warn(`  ! ${f}`);
    }
    if (pendentes.length > 0) process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
