// Navegação da taxonomia (aprofundamento 18/07, /improve-codebase-architecture):
// nomeia a convenção "último elemento = pai direto na árvore/grafo" e
// "primeiro elemento = classe raiz" — antes reimplementada crua em 7
// call-sites (validate-batch.ts, plan.ts, tree.ts ×2, page.tsx, ativos.ts ×2),
// cada um com fallback próprio (?? '', ?? null, ?? 'componentes'). O helper
// resolve só o ÍNDICE; cada call-site continua decidindo seu próprio
// fallback quando a taxonomia estiver vazia (não força um valor-padrão único
// que não faria sentido em todo contexto).

export function paiDireto(taxonomia: string[]): string | null {
  return taxonomia.at(-1) ?? null;
}

export function classeRaiz(taxonomia: string[]): string | null {
  return taxonomia[0] ?? null;
}
