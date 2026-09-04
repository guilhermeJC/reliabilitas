import { describe, expect, it } from 'vitest';
import { parseIdPositivo } from '@/lib/id-rota';

// DEV-129 — as rotas de mutação do admin faziam `Number(id)` cru sobre o
// segmento da URL e passavam o resultado direto ao banco. `Number('abc')` é
// NaN, `Number('1e3')` é 1000 e `Number(' 7 ')` é 7 — nenhum deles é um id de
// linha legítimo. Exige autenticação, então não é escalada de privilégio; é
// robustez: id inválido tem que virar 400 na borda, não uma query estranha.

describe('parseIdPositivo', () => {
  it('aceita inteiro positivo em texto', () => {
    expect(parseIdPositivo('1')).toBe(1);
    expect(parseIdPositivo('42')).toBe(42);
  });

  it('rejeita não-numérico, vazio e nulo', () => {
    for (const v of ['abc', '', '   ', null, undefined]) {
      expect(parseIdPositivo(v as unknown as string), String(v)).toBeNull();
    }
  });

  it('rejeita zero e negativo — não existe linha com esses ids', () => {
    expect(parseIdPositivo('0')).toBeNull();
    expect(parseIdPositivo('-1')).toBeNull();
  });

  it('rejeita notação científica e decimal (Number aceitaria os dois)', () => {
    expect(Number('1e3')).toBe(1000); // o comportamento que estávamos herdando
    expect(parseIdPositivo('1e3')).toBeNull();
    expect(parseIdPositivo('1.5')).toBeNull();
    expect(parseIdPositivo('1,5')).toBeNull();
  });

  it('rejeita espaços em volta e sinal de mais (Number aceitaria)', () => {
    expect(Number(' 7 ')).toBe(7);
    expect(parseIdPositivo(' 7 ')).toBeNull();
    expect(parseIdPositivo('+7')).toBeNull();
  });

  it('rejeita hexadecimal e infinito', () => {
    expect(parseIdPositivo('0x10')).toBeNull();
    expect(parseIdPositivo('Infinity')).toBeNull();
  });

  it('rejeita acima do limite seguro de inteiro', () => {
    expect(parseIdPositivo('9007199254740993')).toBeNull();
  });
});
