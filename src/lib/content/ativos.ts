import type { Locale } from '@/lib/content/schema';
import type { NotaResumo } from '@/lib/db/notas';
import { classeRaiz } from '@/lib/content/taxonomia-nav';

// T01 v2 (revisão 4 do fundador): a Home clusteriza o acervo pelos GRUPOS
// FUNCIONAIS da taxonomia (item 4 da mesma revisão) — escala para 100+ ativos
// sem virar linha de cards. O slug planejado só vira link quando o handbook
// correspondente estiver PUBLICADO (nunca link morto); publicados fora da
// lista entram pelo cluster da própria cadeia, sem mexer aqui (DEV-023).

export interface AtivoPlanejado {
  slug: string;
  titulo: Record<Locale, string>;
  // cluster declarado do planejado: classe funcional da futura cadeia, ou
  // 'componentes' para os transversais (D10)
  cluster: string;
}

// Os 5 REAIS do M01.4 §3 (D01/D10): 3 equipamentos (tipo) + 2 componentes
// transversais — rolamento e selo são modelados UMA vez e referenciados pelos
// equipamentos-pai via wikilink (DRY taxonômico).
export const ATIVOS_MVP: AtivoPlanejado[] = [
  {
    slug: 'bomba-centrifuga',
    titulo: { pt: 'Bomba Centrífuga', en: 'Centrifugal Pump' },
    cluster: 'adicao-de-energia',
  },
  {
    slug: 'rolamento',
    titulo: { pt: 'Rolamento', en: 'Rolling Bearing' },
    cluster: 'componentes',
  },
  {
    slug: 'selo-mecanico',
    titulo: { pt: 'Selo Mecânico', en: 'Mechanical Seal' },
    cluster: 'componentes',
  },
  {
    slug: 'motor-inducao-trifasico',
    titulo: { pt: 'Motor de Indução Trifásico', en: 'Three-Phase Induction Motor' },
    cluster: 'acionamento',
  },
  {
    slug: 'valvula-de-controle',
    titulo: { pt: 'Válvula de Controle', en: 'Control Valve' },
    cluster: 'controle-do-escoamento',
  },
];

// Ordem canônica dos grupos funcionais na Home (a mesma lógica do item 4);
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

export interface CardAtivo {
  titulo: string;
  slug: string | null; // null = ainda não publicado ("em breve")
}

export interface ClusterHome {
  slug: string; // slug da classe funcional, ou 'componentes'
  titulo: string | null; // título real da classe; null = a UI traduz (componentes)
  itens: CardAtivo[];
}

export interface AcervoClusterizado {
  clusters: ClusterHome[];
  demaisClasses: { slug: string; titulo: string }[]; // classes publicadas sem handbook
}

export function clusterAcervo(acervo: NotaResumo[], locale: Locale): AcervoClusterizado {
  const classes = new Map(
    acervo.filter((n) => n.tipo_nota === 'classe').map((n) => [n.slug, n.titulo]),
  );

  // tipo (equipamento) E componente (D10) são "casas" de ativo; modo de falha não.
  const porCluster = new Map<string, CardAtivo[]>();
  const publicados = new Set<string>();
  const push = (cluster: string, card: CardAtivo) => {
    const lista = porCluster.get(cluster) ?? [];
    lista.push(card);
    porCluster.set(cluster, lista);
  };

  for (const n of acervo) {
    if (n.tipo_nota === 'tipo') {
      publicados.add(n.slug);
      push(n.taxonomia[0] ?? 'componentes', { titulo: n.titulo, slug: n.slug });
    } else if (n.tipo_nota === 'componente') {
      publicados.add(n.slug);
      push('componentes', { titulo: n.titulo, slug: n.slug });
    }
  }

  // Planejados ainda não publicados: "em breve" no cluster declarado.
  for (const ativo of ATIVOS_MVP) {
    if (!publicados.has(ativo.slug)) {
      push(ativo.cluster, { titulo: ativo.titulo[locale], slug: null });
    }
  }

  const conhecidos = new Set([...ORDEM_CLUSTERS, 'componentes']);
  const ordem = [
    ...ORDEM_CLUSTERS,
    ...[...porCluster.keys()].filter((c) => !conhecidos.has(c)),
    'componentes',
  ];

  const clusters: ClusterHome[] = ordem
    .filter((slug) => (porCluster.get(slug) ?? []).length > 0)
    .map((slug) => ({
      slug,
      titulo: slug === 'componentes' ? null : (classes.get(slug) ?? null),
      itens: porCluster.get(slug)!,
    }));

  const comCluster = new Set(clusters.map((c) => c.slug));
  const demaisClasses = [...classes.entries()]
    .filter(([slug]) => !comCluster.has(slug))
    .map(([slug, titulo]) => ({ slug, titulo }));

  return { clusters, demaisClasses };
}

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
