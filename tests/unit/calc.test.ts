import { describe, expect, it } from 'vitest';
import { gamma } from '@/lib/calc/gamma';
import { weibull, classificaBeta } from '@/lib/calc/weibull';
import { disponibilidade } from '@/lib/calc/disponibilidade';
import { intervaloPF } from '@/lib/calc/pf';

// F05/BR-012 — calculadoras validadas contra exemplos numéricos da literatura
// ANTES de existir UI (Smith 2004 — Reliability, Maintainability and Risk;
// Moubray 1997 — RCM II; propriedades matemáticas conhecidas da Weibull).

describe('gamma — função Γ (Lanczos), base do MTTF Weibull', () => {
  it('valores exatos conhecidos', () => {
    expect(gamma(1)).toBeCloseTo(1, 10);
    expect(gamma(2)).toBeCloseTo(1, 10);
    expect(gamma(5)).toBeCloseTo(24, 8); // Γ(n) = (n-1)!
  });

  it('Γ(0.5) = √π (identidade clássica)', () => {
    expect(gamma(0.5)).toBeCloseTo(Math.sqrt(Math.PI), 10);
  });

  it('Γ(1.5) = √π/2 — o fator do MTTF para β=2', () => {
    expect(gamma(1.5)).toBeCloseTo(0.8862269255, 9);
  });
});

describe('weibull 2P — R(t), h(t), MTTF, B10 (Smith 2004, cap. 6; Abernethy)', () => {
  it('R(t): β=2, η=1000h, t=500h → e^(-0.25) = 0.7788', () => {
    const w = weibull({ beta: 2, eta: 1000 })!;
    expect(w.confiabilidade(500)).toBeCloseTo(0.7788007831, 8);
  });

  it('F(t) = 1 - R(t)', () => {
    const w = weibull({ beta: 2, eta: 1000 })!;
    expect(w.falhaAcumulada(500)).toBeCloseTo(1 - 0.7788007831, 8);
  });

  it('h(t): β=2, η=1000h, t=500h → (2/1000)·(0.5)¹ = 0.001 falhas/h', () => {
    const w = weibull({ beta: 2, eta: 1000 })!;
    expect(w.taxaFalha(500)).toBeCloseTo(0.001, 10);
  });

  it('β=1 degenera na exponencial: MTTF = η e h(t) constante = 1/η', () => {
    const w = weibull({ beta: 1, eta: 1000 })!;
    expect(w.mttf).toBeCloseTo(1000, 6);
    expect(w.taxaFalha(1)).toBeCloseTo(0.001, 10);
    expect(w.taxaFalha(5000)).toBeCloseTo(0.001, 10);
  });

  it('MTTF = η·Γ(1+1/β): β=2, η=1000 → 886.23h (tabela de Γ, Smith)', () => {
    const w = weibull({ beta: 2, eta: 1000 })!;
    expect(w.mttf).toBeCloseTo(886.2269255, 5);
  });

  it('MTTF: β=1.5, η=1000 → 1000·Γ(5/3) = 902.75h', () => {
    const w = weibull({ beta: 1.5, eta: 1000 })!;
    expect(w.mttf).toBeCloseTo(902.7452929, 5);
  });

  it('B10 = η·(-ln 0.9)^(1/β): β=2, η=1000 → 324.59h', () => {
    const w = weibull({ beta: 2, eta: 1000 })!;
    expect(w.vidaB(10)).toBeCloseTo(324.5928459, 5);
  });

  it('B50 (mediana) < MTTF para β<3.44 (assimetria da Weibull)', () => {
    const w = weibull({ beta: 2, eta: 1000 })!;
    expect(w.vidaB(50)).toBeLessThan(w.mttf);
  });

  it('R(η) = e⁻¹ ≈ 0.3679 para QUALQUER β (definição da vida característica)', () => {
    for (const beta of [0.5, 1, 2, 3.5]) {
      expect(weibull({ beta, eta: 500 })!.confiabilidade(500)).toBeCloseTo(0.3678794412, 8);
    }
  });

  it('entradas inválidas (β≤0, η≤0, t<0) → null', () => {
    expect(weibull({ beta: 0, eta: 1000 })).toBeNull();
    expect(weibull({ beta: -1, eta: 1000 })).toBeNull();
    expect(weibull({ beta: 2, eta: 0 })).toBeNull();
    expect(weibull({ beta: 2, eta: 1000 })!.confiabilidade(-5)).toBeNull();
  });
});

describe('classificaBeta — Fw A ao vivo (Nowlan & Heap: β<1 infantil, β≈1 aleatória, β>1 desgaste)', () => {
  it('β < 1: mortalidade infantil', () => {
    expect(classificaBeta(0.5)).toBe('infant');
    expect(classificaBeta(0.94)).toBe('infant');
  });

  it('β ≈ 1 (±0.05): aleatória — exponencial na prática', () => {
    expect(classificaBeta(1)).toBe('random');
    expect(classificaBeta(0.97)).toBe('random');
    expect(classificaBeta(1.05)).toBe('random');
  });

  it('β > 1: desgaste', () => {
    expect(classificaBeta(1.06)).toBe('wear_out');
    expect(classificaBeta(3)).toBe('wear_out');
  });
});

describe('disponibilidade — Ai = MTBF/(MTBF+MTTR) (Smith 2004, cap. 2)', () => {
  it('MTBF=1000h, MTTR=10h → Ai = 99.01%', () => {
    const d = disponibilidade({ mtbf: 1000, mttr: 10 })!;
    expect(d.disponibilidade).toBeCloseTo(0.99009901, 7);
  });

  it('λ = 1/MTBF (taxa de falha média)', () => {
    const d = disponibilidade({ mtbf: 1000, mttr: 10 })!;
    expect(d.lambda).toBeCloseTo(0.001, 10);
  });

  it('indisponibilidade anual = (1-Ai)·8760h → 86.73h para 99.01%', () => {
    const d = disponibilidade({ mtbf: 1000, mttr: 10 })!;
    expect(d.indisponibilidadeAnualHoras).toBeCloseTo(86.7326733, 5);
  });

  it('MTTR=0 → disponibilidade 100% (limite teórico)', () => {
    expect(disponibilidade({ mtbf: 1000, mttr: 0 })!.disponibilidade).toBe(1);
  });

  it('entradas inválidas (MTBF≤0, MTTR<0) → null', () => {
    expect(disponibilidade({ mtbf: 0, mttr: 10 })).toBeNull();
    expect(disponibilidade({ mtbf: 1000, mttr: -1 })).toBeNull();
  });
});

describe('intervaloPF — inspeção ≤ P-F/2 (Moubray, RCM II cap. 8)', () => {
  it('P-F de 9 meses → intervalo recomendado 4.5 (metade)', () => {
    const r = intervaloPF({ pf: 9, inspecao: 4.5 })!;
    expect(r.recomendado).toBeCloseTo(4.5, 10);
    expect(r.adequado).toBe(true);
  });

  it('chances de detecção dentro da janela = floor(P-F / inspeção)', () => {
    expect(intervaloPF({ pf: 9, inspecao: 3 })!.chancesDeteccao).toBe(3);
    expect(intervaloPF({ pf: 9, inspecao: 9 })!.chancesDeteccao).toBe(1);
  });

  it('inspeção maior que o P-F: 0 chances — tarefa NÃO é eficaz (JA1011)', () => {
    const r = intervaloPF({ pf: 9, inspecao: 12 })!;
    expect(r.chancesDeteccao).toBe(0);
    expect(r.adequado).toBe(false);
  });

  it('inspeção acima da metade do P-F é sinalizada como inadequada', () => {
    expect(intervaloPF({ pf: 9, inspecao: 6 })!.adequado).toBe(false);
  });

  it('entradas inválidas (P-F≤0, inspeção≤0) → null', () => {
    expect(intervaloPF({ pf: 0, inspecao: 1 })).toBeNull();
    expect(intervaloPF({ pf: 9, inspecao: 0 })).toBeNull();
  });
});
