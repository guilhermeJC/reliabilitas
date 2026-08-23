import { describe, expect, it } from 'vitest';
import { fmt } from '@/lib/calc/formato';

// DEV-118 (adversarial review 25/07) — a guarda de notação científica disparava
// só ABAIXO de 0,001, então a faixa [0,001; 0,005) caía no toLocaleString com
// 2 casas e era arredondada para "0". Efeito publicado: uma taxa de falha real
// de 0,001 falhas/h aparecia como "0 falhas/h" sob a legenda "risco de falhar
// na próxima hora" — número materialmente enganoso num site de engenharia.
// A lib de cálculo sempre esteve correta; o defeito era só de formatação.

describe('fmt — nunca exibe um valor não-zero como "0"', () => {
  it('a faixa que estava quebrada: [0,001; 0,005) não vira "0"', () => {
    for (const v of [0.001, 0.002, 0.0049]) {
      expect(fmt(v)).not.toBe('0');
    }
  });

  it('valores reais de taxa de falha saem em notação científica legível', () => {
    expect(fmt(0.001)).toBe('1.00e-3'); // h(500h) da Weibull com β=2, η=1000
    expect(fmt(0.002)).toBe('2.00e-3');
  });

  it('zero de verdade continua sendo "0"', () => {
    expect(fmt(0)).toBe('0');
  });

  it('valores normais seguem em notação fixa, sem regressão', () => {
    expect(fmt(886.23)).toBe('886.23');
    expect(fmt(0.95)).toBe('0.95');
    expect(fmt(0.01)).toBe('0.01');
    expect(fmt(1000)).toBe('1,000');
  });

  it('respeita a precisão pedida — a guarda é relativa a `casas`, não fixa', () => {
    // Com 0 casas, 0,4 arredondaria para "0": tem que cair na científica.
    expect(fmt(0.4, 0)).not.toBe('0');
    // Com 4 casas, 0,001 cabe na notação fixa e NÃO deve virar científica.
    expect(fmt(0.001, 4)).toBe('0.001');
  });

  it('negativo pequeno também não vira "0" nem "-0"', () => {
    expect(['0', '-0']).not.toContain(fmt(-0.001));
  });
});
