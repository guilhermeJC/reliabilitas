import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import { validateFrontmatter } from '../src/lib/content/schema';
import { extractWikilinks, uniqueTargets } from '../src/lib/content/wikilinks';
import { validateBatch, type NotaParsed } from '../src/lib/content/validate-batch';
import { buildPlan } from '../src/lib/content/plan';
import { loadEnv } from './env';

// Ingest v1 (F06): content/**.md → valida (BR-006 individual, BR-001/BR-008 em lote)
// → plano → upsert em notas + substituição das arestas. Build FALHA se inválido.
// v1 assume content/ como acervo-fonte completo (validação de lote é autocontida).
// --dry-run: valida e imprime o plano sem tocar o banco (roda no CI).

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

  const lote = validateBatch(parsed);
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

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('SUPABASE_URL/SUPABASE_SECRET_KEY ausentes no .env.');
    process.exit(1);
  }
  const db = createClient(url, key, { auth: { persistSession: false } });

  const up = await db
    .from('notas')
    .upsert(plan.notas, { onConflict: 'slug,locale' })
    .select('slug');
  if (up.error) throw new Error(`upsert notas: ${up.error.message}`);

  // v1: arestas são derivadas — substituição integral a cada ingest (acervo pequeno).
  const del = await db.from('arestas').delete().neq('origem_slug', '');
  if (del.error) throw new Error(`limpeza arestas: ${del.error.message}`);
  if (plan.arestas.length > 0) {
    const ins = await db.from('arestas').insert(plan.arestas);
    if (ins.error) throw new Error(`insert arestas: ${ins.error.message}`);
  }

  console.log(`✓ Ingest concluído: ${up.data?.length ?? 0} notas gravadas.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
