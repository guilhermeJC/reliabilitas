import type { IngestPlan } from '../content/plan';

// F4: a gravação do ingest é UMA transação — upsert de notas, reconciliação de
// zumbis (F1) e substituição integral das arestas (DEV-007) entram juntos ou nada
// entra. Falha parcial jamais deixa o banco divergente do acervo-fonte.
// Interface mínima (PgLike) para o escritor ser testável sem Postgres.

export interface PgLike {
  query(text: string, params?: unknown[]): Promise<{ rowCount: number | null }>;
}

export interface WriteResult {
  gravadas: number;
  removidas: number;
}

const UPSERT_NOTA = `insert into public.notas
  (slug, tipo_nota, locale, titulo, status, taxonomia, frontmatter, corpo_md, revisado_em, ordem)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
on conflict (slug, locale) do update set
  tipo_nota = excluded.tipo_nota,
  titulo = excluded.titulo,
  status = excluded.status,
  taxonomia = excluded.taxonomia,
  frontmatter = excluded.frontmatter,
  corpo_md = excluded.corpo_md,
  revisado_em = excluded.revisado_em,
  ordem = excluded.ordem,
  atualizado_em = now()`;

// F1: nota que saiu de content/ (deletada/renomeada) sai do banco no mesmo ingest.
const DELETE_ZUMBIS = `delete from public.notas as n
where not exists (
  select 1
  from unnest($1::text[], $2::text[]) as acervo(slug, locale)
  where acervo.slug = n.slug and acervo.locale = n.locale
)`;

const INSERT_ARESTAS = `insert into public.arestas (origem_slug, destino_slug, locale, tipo)
select * from unnest($1::text[], $2::text[], $3::text[], $4::text[])`;

export async function writePlan(client: PgLike, plan: IngestPlan): Promise<WriteResult> {
  await client.query('begin');
  try {
    for (const nota of plan.notas) {
      await client.query(UPSERT_NOTA, [
        nota.slug,
        nota.tipo_nota,
        nota.locale,
        nota.titulo,
        nota.status,
        nota.taxonomia,
        JSON.stringify(nota.frontmatter),
        nota.corpo_md,
        nota.revisado_em,
        nota.ordem,
      ]);
    }

    const del = await client.query(DELETE_ZUMBIS, [
      plan.notas.map((n) => n.slug),
      plan.notas.map((n) => n.locale),
    ]);

    await client.query('delete from public.arestas');
    if (plan.arestas.length > 0) {
      await client.query(INSERT_ARESTAS, [
        plan.arestas.map((a) => a.origem_slug),
        plan.arestas.map((a) => a.destino_slug),
        plan.arestas.map((a) => a.locale),
        plan.arestas.map((a) => a.tipo),
      ]);
    }

    await client.query('commit');
    return { gravadas: plan.notas.length, removidas: del.rowCount ?? 0 };
  } catch (e) {
    await client.query('rollback');
    throw e;
  }
}
