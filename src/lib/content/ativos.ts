import type { Locale } from '@/lib/content/schema';
import type { NotaResumo } from '@/lib/db/notas';
import { classeRaiz } from '@/lib/content/taxonomia-nav';

// Ordem canônica dos grupos funcionais na Home (a mesma lógica do item 4 da
// revisão 4 do fundador — clusterização por GRUPOS FUNCIONAIS da taxonomia);
// classes futuras fora da lista entram após estas, em ordem de chegada.
const ORDEM_CLUSTERS = [
  'adicao-de-energia',
  'remocao-de-energia',
  'controle-do-escoamento',
  'troca-termica',
  'separacao',
  'mistura',
  'armazenamento',
  'acionamento',
];

// T01 v3 (revisão 6 do fundador — 09/07): a Home nova mostra APENAS handbooks
// publicados no fim da página, agrupados por classe. Sem "em breve", sem
// promessas, sem chips de classes vazias. A árvore lateral já cobre a promessa;
// a Home cobre o entregue. Componentes (D10) fecham a lista como grupo próprio.

export interface HandbookPublicado {
  slug: string;
  titulo: string;
}

export interface GrupoHandbooks {
  classe: string; // slug da classe raiz, ou 'componentes' para o transversal
  classeTitulo: string | null; // null = 'componentes' (a UI traduz)
  itens: HandbookPublicado[];
}

export function handbooksPublicados(acervo: NotaResumo[], _locale: Locale): GrupoHandbooks[] {
  const classes = new Map(
    acervo.filter((n) => n.tipo_nota === 'classe').map((n) => [n.slug, n.titulo]),
  );

  const porClasse = new Map<string, HandbookPublicado[]>();
  const push = (chave: string, item: HandbookPublicado) => {
    const lista = porClasse.get(chave) ?? [];
    lista.push(item);
    porClasse.set(chave, lista);
  };

  for (const n of acervo) {
    if (n.tipo_nota === 'tipo') {
      const raiz = classeRaiz(n.taxonomia) ?? 'componentes';
      push(raiz, { slug: n.slug, titulo: n.titulo });
    } else if (n.tipo_nota === 'componente') {
      push('componentes', { slug: n.slug, titulo: n.titulo });
    }
  }

  const conhecidas = new Set([...ORDEM_CLUSTERS, 'componentes']);
  const ordem = [
    ...ORDEM_CLUSTERS,
    ...[...porClasse.keys()].filter((c) => !conhecidas.has(c)),
    'componentes',
  ];

  const porTitulo = (a: HandbookPublicado, b: HandbookPublicado) =>
    a.titulo.localeCompare(b.titulo);

  return ordem
    .filter((slug) => (porClasse.get(slug) ?? []).length > 0)
    .map((slug) => ({
      classe: slug,
      classeTitulo: slug === 'componentes' ? null : (classes.get(slug) ?? null),
      itens: (porClasse.get(slug) ?? []).slice().sort(porTitulo),
    }));
}
