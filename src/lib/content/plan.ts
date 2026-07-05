import type { NotaParsed } from './validate-batch';

// Constrói as linhas de gravação: notas (upsert por slug+locale) e arestas do grafo.
// Arestas: wikilink (corpo), taxonomia (pai direto) e componente (handbook → D10).

export interface NotaRow {
  slug: string;
  tipo_nota: string;
  locale: string;
  titulo: string;
  status: string;
  taxonomia: string[];
  frontmatter: Record<string, unknown>;
  corpo_md: string;
  revisado_em: string | null;
}

// F10: YAML entrega Date (gray-matter) ou string — a coluna date recebe YYYY-MM-DD.
function normalizaData(v: unknown): string | null {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === 'string' && v.trim() !== '') return v;
  return null;
}

export interface ArestaRow {
  origem_slug: string;
  destino_slug: string;
  locale: string;
  tipo: 'wikilink' | 'taxonomia' | 'componente';
}

export interface IngestPlan {
  notas: NotaRow[];
  arestas: ArestaRow[];
}

export function buildPlan(parsed: NotaParsed[]): IngestPlan {
  const notas: NotaRow[] = [];
  const arestas: ArestaRow[] = [];
  const vistos = new Set<string>();

  for (const n of parsed) {
    const fm = n.fm as unknown as Record<string, unknown>;
    notas.push({
      slug: n.fm.slug,
      tipo_nota: n.fm.tipo_nota,
      locale: n.fm.locale,
      titulo: n.fm.titulo,
      status: n.fm.status,
      taxonomia: n.fm.taxonomia,
      frontmatter: fm,
      corpo_md: n.corpo,
      revisado_em: normalizaData(n.fm.revisado_em),
    });

    const add = (destino: string, tipo: ArestaRow['tipo']) => {
      const k = `${n.fm.slug}→${destino}::${n.fm.locale}::${tipo}`;
      if (vistos.has(k) || destino === n.fm.slug) return;
      vistos.add(k);
      arestas.push({
        origem_slug: n.fm.slug,
        destino_slug: destino,
        locale: n.fm.locale,
        tipo,
      });
    };

    for (const alvo of n.wikilinks) add(alvo, 'wikilink');

    const paiDireto = n.fm.taxonomia.at(-1);
    if (paiDireto) add(paiDireto, 'taxonomia');

    const componentes = (fm.componentes as string[] | undefined) ?? [];
    for (const c of componentes) add(c, 'componente');
  }

  return { notas, arestas };
}
