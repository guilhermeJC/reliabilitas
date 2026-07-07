import { readdir, readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Client } from 'pg';
import { validateFrontmatter } from '../src/lib/content/schema';
import { extractWikilinks, uniqueTargets } from '../src/lib/content/wikilinks';
import { validateBatch, type NotaParsed } from '../src/lib/content/validate-batch';
import { buildPlan } from '../src/lib/content/plan';
import { writePlan } from '../src/lib/db/ingest-writer';
import { loadEnv } from './env';

// Ingest v1 (F06): content/**.md → valida (BR-006 individual, BR-001/BR-008/F2/F8 em lote)
// → plano → gravação ATÔMICA via Postgres (F4: transação única; F1: reconciliação).
// v1 assume content/ como acervo-fonte completo (validação de lote é autocontida).
// --dry-run: valida e imprime o plano sem tocar o banco (roda no CI).
// Gravação real exige SUPABASE_DB_URL (mesma conexão do db:apply, TLS verificado).

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

async function main() {
  loadEnv();
  const dryRun = process.argv.includes('--dry-run');
  const contentDir = path.join(process.cwd(), 'content');

  const files = await walk(contentDir).catch(() => [] as string[]);
  if (files.length === 0) {
    console.error('Nenhum arquivo .md em content/ — nada a ingerir.');
    process.exit(1);
  }

  const parsed: NotaParsed[] = [];
  let falhou = false;

  for (const file of files) {
    const rel = path.relative(process.cwd(), file).replaceAll('\\', '/');
    const raw = await readFile(file, 'utf8');
    const { data, content } = matter(raw);
    const r = validateFrontmatter(data);
    if (!r.ok) {
      falhou = true;
      console.error(`✗ ${rel}`);
      for (const i of r.issues) console.error(`    ${i.path}: ${i.message}`);
      continue;
    }
    parsed.push({
      fm: r.data,
      corpo: content.trim(),
      file: rel,
      wikilinks: uniqueTargets(extractWikilinks(content)),
    });
  }

  if (falhou) {
    console.error('\nBR-006: frontmatter inválido derruba o build.');
    process.exit(1);
  }

  // BR-009 hard: asset de anatomia referenciado precisa existir em public/
  const lote = validateBatch(parsed, {
    existeAsset: (caminho) => existsSync(path.join(process.cwd(), 'public', caminho)),
  });
  for (const w of lote.warnings) console.warn(`⚠ ${w.file}: ${w.message}`);
  if (lote.errors.length > 0) {
    for (const e of lote.errors) console.error(`✗ ${e.file}: ${e.message}`);
    console.error('\nValidação de lote falhou (BR-001/BR-008).');
    process.exit(1);
  }

  const plan = buildPlan(parsed);
  const porStatus = plan.notas.reduce<Record<string, number>>((acc, n) => {
    acc[n.status] = (acc[n.status] ?? 0) + 1;
    return acc;
  }, {});
  console.log(
    `Plano: ${plan.notas.length} notas (${Object.entries(porStatus)
      .map(([s, c]) => `${c} ${s}`)
      .join(', ')}) · ${plan.arestas.length} arestas`,
  );

  if (dryRun) {
    console.log('Dry-run: banco não tocado. ✓');
    return;
  }

  // F4/F1 — gravação atômica direto no Postgres (transação única + reconciliação).
  const url = process.env.SUPABASE_DB_URL;
  if (!url) {
    console.error(
      'SUPABASE_DB_URL ausente no .env — a gravação do ingest usa Postgres direto (F4).\n' +
        'Obtenha em: Supabase Dashboard → Settings → Database → Connection string (Session mode).',
    );
    process.exit(1);
  }
  const ca = process.env.SUPABASE_DB_CA
    ? readFileSync(process.env.SUPABASE_DB_CA, 'utf8')
    : undefined;
  const db = new Client({ connectionString: url, ssl: ca ? { ca } : true });
  await db.connect();
  try {
    const r = await writePlan(db, plan);
    console.log(
      `✓ Ingest concluído: ${r.gravadas} notas gravadas · ${r.removidas} removidas (reconciliação) · ${plan.arestas.length} arestas.`,
    );
  } finally {
    await db.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
