import { describe, expect, it } from 'vitest';
import { classeRaiz, paiDireto } from '@/lib/content/taxonomia-nav';

// Aprofundamento (18/07, /improve-codebase-architecture): a convenção
// "último elemento de taxonomia = pai direto" / "primeiro = classe raiz"
// estava reimplementada crua em 7 call-sites, cada um com fallback próprio
// (?? '', ?? null, ?? 'componentes'). Este módulo nomeia a convenção uma
// única vez — os call-sites continuam decidindo seu PRÓPRIO fallback (o
// helper só resolve o índice, não a semântica de "o que fazer se ausente").
describe('paiDireto — último elemento de taxonomia (pai direto na árvore/grafo)', () => {
  it('retorna o último elemento', () => {
    expect(paiDireto(['adicao-de-energia', 'bombas', 'dinamicas', 'bomba-centrifuga'])).toBe(
      'bomba-centrifuga',
    );
  });

  it('retorna null quando a taxonomia está vazia (nunca undefined)', () => {
    expect(paiDireto([])).toBeNull();
  });

  it('com um único elemento, ele é o pai direto', () => {
    expect(paiDireto(['adicao-de-energia'])).toBe('adicao-de-energia');
  });
});

describe('classeRaiz — primeiro elemento de taxonomia (classe no topo da árvore)', () => {
  it('retorna o primeiro elemento', () => {
    expect(classeRaiz(['adicao-de-energia', 'bombas', 'dinamicas', 'bomba-centrifuga'])).toBe(
      'adicao-de-energia',
    );
  });

  it('retorna null quando a taxonomia está vazia (nunca undefined)', () => {
    expect(classeRaiz([])).toBeNull();
  });
});
