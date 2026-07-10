// Árvore taxonômica (T04 parcial): derivada do acervo publicado — cada nota se
// pendura no último elemento da sua cadeia (D16). Pai não publicado → nó vira raiz
// (a nota nunca some da navegação; o lote F2/BR-001 já impede isso em produção).

export interface NotaResumo {
  slug: string;
  tipo_nota: string;
  titulo: string;
  taxonomia: string[];
}

export interface TreeNode extends NotaResumo {
  children: TreeNode[];
  descendentes: number;
}

// A barra lateral é dividida em 3 grupos (revisão do fundador 06/07): a árvore
// de EQUIPAMENTOS (a taxonomia classe→família→princípio→tipo), a lista de
// COMPONENTES transversais (D10) e a lista de FALHAS (modos de falha, tirados de
// baixo do equipamento e reunidos num grupo próprio, com o pai como contexto).
const TIPOS_EQUIPAMENTO = new Set(['classe', 'familia', 'principio', 'tipo', 'marca_modelo']);

export interface FalhaItem {
  slug: string;
  titulo: string;
  equipamento: string | null; // título do equipamento-pai imediato (contexto)
}

export interface SidebarGroups {
  equipamentos: TreeNode[];
  componentes: NotaResumo[];
  falhas: FalhaItem[];
  estrategias: NotaResumo[];
}

export function buildGroups(notas: NotaResumo[]): SidebarGroups {
  const titulos = new Map(notas.map((n) => [n.slug, n.titulo]));
  const porTitulo = (a: { titulo: string }, b: { titulo: string }) =>
    a.titulo.localeCompare(b.titulo);

  const equipamentos = buildTree(notas.filter((n) => TIPOS_EQUIPAMENTO.has(n.tipo_nota)));

  const componentes = notas.filter((n) => n.tipo_nota === 'componente').sort(porTitulo);

  const falhas: FalhaItem[] = notas
    .filter((n) => n.tipo_nota === 'modo_falha')
    .sort(porTitulo)
    .map((n) => ({
      slug: n.slug,
      titulo: n.titulo,
      equipamento: titulos.get(n.taxonomia.at(-1) ?? '') ?? null,
    }));

  // 4º grupo (sessão 5): estratégias de manutenção (nível 8 da taxonomia) são
  // transversais como os componentes — lista plana, ordenada por título.
  const estrategias = notas.filter((n) => n.tipo_nota === 'estrategia').sort(porTitulo);

  return { equipamentos, componentes, falhas, estrategias };
}

export function buildTree(notas: NotaResumo[]): TreeNode[] {
  const nos = new Map<string, TreeNode>();
  for (const n of notas) {
    nos.set(n.slug, { ...n, children: [], descendentes: 0 });
  }

  const raizes: TreeNode[] = [];
  for (const no of nos.values()) {
    const pai = no.taxonomia.at(-1);
    const paiNo = pai ? nos.get(pai) : undefined;
    if (paiNo) paiNo.children.push(no);
    else raizes.push(no);
  }

  const contar = (no: TreeNode): number => {
    no.children.sort((a, b) => a.titulo.localeCompare(b.titulo));
    no.descendentes = no.children.reduce((soma, filho) => soma + 1 + contar(filho), 0);
    return no.descendentes;
  };
  raizes.sort((a, b) => a.titulo.localeCompare(b.titulo));
  for (const raiz of raizes) contar(raiz);

  return raizes;
}
