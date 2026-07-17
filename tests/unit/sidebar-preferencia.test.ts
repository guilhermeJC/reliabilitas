import { describe, expect, it } from 'vitest';
import { decideColapsadoInicial } from '@/lib/sidebar-preferencia';

// Achado do fundador (17/07): visitante novo no celular abria com a árvore
// tomando a tela inteira, e cada navegação por link repetia isso — porque o
// padrão (sem preferência salva) sempre foi "aberta" (SSR/BR-010), sem
// diferenciar celular de desktop. Uma correção resolve os dois sintomas: o
// padrão inicial passa a depender do tamanho de tela, não só do localStorage.

describe('decideColapsadoInicial', () => {
  it('preferência salva "0" (recolhida) vence em qualquer tela', () => {
    expect(decideColapsadoInicial('0', true)).toBe(true);
    expect(decideColapsadoInicial('0', false)).toBe(true);
  });

  it('preferência salva "1" (aberta) vence em qualquer tela', () => {
    expect(decideColapsadoInicial('1', true)).toBe(false);
    expect(decideColapsadoInicial('1', false)).toBe(false);
  });

  it('sem preferência salva, no celular -> começa recolhida', () => {
    expect(decideColapsadoInicial(null, true)).toBe(true);
  });

  it('sem preferência salva, no desktop -> começa aberta (comportamento de sempre)', () => {
    expect(decideColapsadoInicial(null, false)).toBe(false);
  });
});
