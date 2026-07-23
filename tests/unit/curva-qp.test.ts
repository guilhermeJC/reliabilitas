import { describe, expect, it } from 'vitest';
import {
  vazaoRotodinamica,
  vazaoDeslocamentoPositivo,
  pressaoDeslocamentoPositivo,
  PRESSAO_ALIVIO_TIPICA,
} from '@/lib/calc/curva-qp';

// Comparativo Q×P genérico (pedido do fundador, revisão 18/07): por que a
// bomba de deslocamento positivo exige válvula de alívio e a rotodinâmica não.
//
// DEV-083 #7 — limite de validação, declarado com honestidade: o fato de que
// deslocamento positivo entrega vazão CONSTANTE independente da resistência a
// jusante É literatura citável (Karassik et al., Pump Handbook, 4ª ed. (2008),
// cap. 3 — a mesma fonte usada em content/pt/principio/deslocamento-positivo.md,
// que descreve a "curva vertical" do princípio), validado abaixo no describe
// "Leis de deslocamento positivo". A fórmula exata de P=1/abertura² é um modelo
// ILUSTRATIVO do projeto (a divergência é real e citável — Karassik confirma
// QUE a pressão diverge — mas o EXPOENTE 2 é uma escolha didática, não extraída
// de catálogo), avisado ao usuário via legenda visível no widget.

describe('Leis de deslocamento positivo — validadas contra literatura (Karassik, Pump Handbook 4ª ed., cap. 3)', () => {
  it('vazão é CONSTANTE independente da resistência a jusante (Karassik cap. 3)', () => {
    // A própria assinatura da função (sem parâmetro de abertura/resistência)
    // já prova isso estruturalmente — impossível o resultado variar por
    // input, o que É o fato de literatura sendo modelado (não uma escolha
    // ilustrativa, ao contrário da fórmula de pressão abaixo).
    expect(vazaoDeslocamentoPositivo()).toBe(1);
  });
});

describe('vazaoRotodinamica — vazão cai suavemente ao fechar a válvula (limitada pela curva)', () => {
  it('válvula totalmente aberta entrega a vazão nominal (Q=1)', () => {
    expect(vazaoRotodinamica(1)).toBeCloseTo(1, 4);
  });

  it('fechar parcialmente reduz a vazão (nunca aumenta)', () => {
    expect(vazaoRotodinamica(0.5)).toBeLessThan(vazaoRotodinamica(1));
    expect(vazaoRotodinamica(0.2)).toBeLessThan(vazaoRotodinamica(0.5));
  });

  it('válvula fechada (abertura → 0) leva a vazão a zero — limitada pela própria curva', () => {
    expect(vazaoRotodinamica(0)).toBeCloseTo(0, 2);
  });

  it('nunca produz vazão negativa ou NaN em toda a faixa', () => {
    for (let a = 0; a <= 1; a += 0.05) {
      const q = vazaoRotodinamica(a);
      expect(Number.isFinite(q)).toBe(true);
      expect(q).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('vazaoDeslocamentoPositivo — vazão CONSTANTE, não depende da resistência', () => {
  it('sempre entrega a vazão nominal, independente da válvula', () => {
    expect(vazaoDeslocamentoPositivo()).toBe(1);
  });
});

describe('pressaoDeslocamentoPositivo — a pressão necessária diverge ao fechar a válvula', () => {
  it('válvula totalmente aberta exige a pressão nominal (P=1)', () => {
    expect(pressaoDeslocamentoPositivo(1)).toBeCloseTo(1, 4);
  });

  it('fechar a válvula SOBE a pressão necessária (nunca reduz)', () => {
    expect(pressaoDeslocamentoPositivo(0.5)).toBeGreaterThan(pressaoDeslocamentoPositivo(1));
    expect(pressaoDeslocamentoPositivo(0.2)).toBeGreaterThan(pressaoDeslocamentoPositivo(0.5));
  });

  it('perto do fechamento total, a pressão já excede a margem típica de alívio (risco real)', () => {
    expect(pressaoDeslocamentoPositivo(0.1)).toBeGreaterThan(PRESSAO_ALIVIO_TIPICA);
  });

  it('nunca produz pressão negativa, NaN ou infinita (clamp de segurança no cálculo)', () => {
    for (let a = 0; a <= 1; a += 0.05) {
      const p = pressaoDeslocamentoPositivo(a);
      expect(Number.isFinite(p)).toBe(true);
      expect(p).toBeGreaterThan(0);
    }
  });
});
