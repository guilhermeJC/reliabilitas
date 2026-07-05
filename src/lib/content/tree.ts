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
