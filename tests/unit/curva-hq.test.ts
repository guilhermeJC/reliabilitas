import { describe, expect, it } from 'vitest';
import { curvaBomba, curvaSistema, pontoOperacao, classificaPosicao } from '@/lib/calc/curva-hq';

// Curva H-Q viva do handbook (sessão 5, aprovada pelo fundador): modelo
// normalizado no BEP nominal (Q=1, H=1 na rotação nominal r=1). Curva da bomba
// H = 1,2·r² − 0,2·q² (estável: shutoff 120% do head de BEP; afinidade embutida:
// Q∝N e H∝N²). Curva do sistema H = H_est + k·q². O ponto de operação é a
// interseção — a tese editorial do handbook ("a bomba não escolhe onde opera")
// virando ferramenta. Client-side puro (BR-004).

describe('curvaBomba — parábola estável com afinidade embutida', () => {
  it('no BEP nominal (r=1, q=1) entrega head 1', () => {
    expect(curvaBomba(1, 1)).toBeCloseTo(1, 9);
  });

  it('shutoff (q=0) = 1,2·r² — 120% do head de BEP, curva sempre ascendente ao shutoff', () => {
    expect(curvaBomba(0, 1)).toBeCloseTo(1.2, 9);
    expect(curvaBomba(0, 0.8)).toBeCloseTo(1.2 * 0.64, 9);
  });

  it('é estritamente decrescente em q (curva estável — API 610 p/ paralelo)', () => {
    expect(curvaBomba(0.5, 1)).toBeGreaterThan(curvaBomba(1.0, 1));
    expect(curvaBomba(1.0, 1)).toBeGreaterThan(curvaBomba(1.4, 1));
  });
});

describe('curvaSistema — estática + atrito quadrático', () => {
  it('em q=0 devolve a altura estática pura', () => {
    expect(curvaSistema(0, 0.5, 0.5)).toBeCloseTo(0.5, 9);
  });

  it('cresce com q² (atrito)', () => {
    expect(curvaSistema(1, 0.5, 0.5)).toBeCloseTo(1, 9);
    expect(curvaSistema(2, 0.5, 0.5)).toBeCloseTo(2.5, 9);
  });
});

describe('pontoOperacao — a interseção das duas curvas', () => {
  it('com os defaults nominais (r=1, H_est=0,5, k=0,5) o ponto É o BEP', () => {
    const p = pontoOperacao(1, 0.5, 0.5)!;
    expect(p.q).toBeCloseTo(1, 9);
    expect(p.h).toBeCloseTo(1, 9);
  });

  it('sistema só de atrito (H_est=0): o ponto desliza pela afinidade — q/r constante e h ∝ r²', () => {
    const p1 = pontoOperacao(1, 0, 0.5)!;
    const p2 = pontoOperacao(0.8, 0, 0.5)!;
    expect(p2.q / 0.8).toBeCloseTo(p1.q / 1, 9);
    expect(p2.h).toBeCloseTo(p1.h * 0.64, 9);
  });

  it('bomba que não vence a estática → shutoff (null)', () => {
    // 1,2·0,6² = 0,432 < 0,5 de estática: não há interseção com vazão positiva
    expect(pontoOperacao(0.6, 0.5, 0.5)).toBeNull();
  });

  it('entradas inválidas devolvem null (guardas de UI)', () => {
    expect(pontoOperacao(0.3, 0.5, 0.5)).toBeNull(); // r fora de [0,5–1,2]
    expect(pontoOperacao(1, -0.1, 0.5)).toBeNull();
    expect(pontoOperacao(1, 0.5, -1)).toBeNull();
  });
});

describe('classificaPosicao — a leitura do POR (ANSI/HI 9.6.3) no ponto', () => {
  it('dentro do POR: 70–120% da vazão de BEP da rotação atual', () => {
    expect(classificaPosicao(1, 1)).toBe('por');
    expect(classificaPosicao(0.7, 1)).toBe('por');
    expect(classificaPosicao(1.2, 1)).toBe('por');
  });

  it('abaixo de 70% → recirculação; acima de 120% → run-out', () => {
    expect(classificaPosicao(0.69, 1)).toBe('recirculacao');
    expect(classificaPosicao(1.21, 1)).toBe('runout');
  });

  it('o POR acompanha a rotação (afinidade: Q_bep ∝ N)', () => {
    expect(classificaPosicao(0.8, 0.8)).toBe('por'); // 100% do BEP da rotação 0,8
    expect(classificaPosicao(0.5, 0.8)).toBe('recirculacao'); // 62,5% < 70%
  });
});
