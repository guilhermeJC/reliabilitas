import { describe, expect, it } from 'vitest';
import { normalizaTermo, parsePagina, splitTrecho, TERMO_MAX } from '@/lib/busca';

// T05 — parsing puro da entrada de busca (o searchParam é input NÃO confiável)
// e do trecho do ts_headline (renderizado como texto + <mark>, nunca como HTML).

describe('normalizaTermo — searchParam vira termo válido ou nada', () => {
  it('rejeita não-string e vazio', () => {
    expect(normalizaTermo(undefined)).toBeNull();
    expect(normalizaTermo(null)).toBeNull();
    expect(normalizaTermo(['a', 'b'])).toBeNull();
    expect(normalizaTermo('')).toBeNull();
    expect(normalizaTermo('   ')).toBeNull();
  });

  it('rejeita termo de 1 caractere (mínimo 2)', () => {
    expect(normalizaTermo('a')).toBeNull();
    expect(normalizaTermo(' a ')).toBeNull();
  });

  it('normaliza espaços: trim + colapso interno', () => {
    expect(normalizaTermo('  cavitação    bomba  ')).toBe('cavitação bomba');
  });

  it('trunca termos acima do máximo (paste de texto longo ainda busca)', () => {
    const longo = 'x'.repeat(TERMO_MAX + 40);
    expect(normalizaTermo(longo)).toHaveLength(TERMO_MAX);
  });
});

describe('parsePagina — página é input não confiável', () => {
  it('default 1 para ausente/inválido/zero/negativo', () => {
    expect(parsePagina(undefined)).toBe(1);
    expect(parsePagina('abc')).toBe(1);
    expect(parsePagina('0')).toBe(1);
    expect(parsePagina('-3')).toBe(1);
  });

  it('aceita inteiro válido e limita o teto (offset não vira arma)', () => {
    expect(parsePagina('2')).toBe(2);
    expect(parsePagina('999')).toBe(50);
  });
});

describe('splitTrecho — <mark> do ts_headline vira segmento, nunca HTML cru', () => {
  it('separa segmentos marcados e não marcados', () => {
    expect(splitTrecho('a <mark>b</mark> c')).toEqual([
      { texto: 'a ', marcado: false },
      { texto: 'b', marcado: true },
      { texto: ' c', marcado: false },
    ]);
  });

  it('sem destaque: um único segmento', () => {
    expect(splitTrecho('sem destaque nenhum')).toEqual([
      { texto: 'sem destaque nenhum', marcado: false },
    ]);
  });

  it('múltiplos destaques preservam a ordem', () => {
    const seg = splitTrecho('<mark>NPSH</mark> e <mark>cavitação</mark>');
    expect(seg).toEqual([
      { texto: 'NPSH', marcado: true },
      { texto: ' e ', marcado: false },
      { texto: 'cavitação', marcado: true },
    ]);
  });

  it('conteúdo com < literal permanece texto (nunca interpretado)', () => {
    const seg = splitTrecho('NPSHa < NPSHr indica <mark>cavitação</mark>');
    expect(seg[0].texto).toBe('NPSHa < NPSHr indica ');
    expect(seg[1]).toEqual({ texto: 'cavitação', marcado: true });
  });
});
