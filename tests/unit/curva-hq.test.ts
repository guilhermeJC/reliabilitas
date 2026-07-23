import { describe, expect, it } from 'vitest';
import { curvaBomba, curvaSistema, pontoOperacao, classificaPosicao } from '@/lib/calc/curva-hq';

// Curva H-Q viva do handbook (sessão 5, aprovada pelo fundador): modelo
// normalizado no BEP nominal (Q=1, H=1 na rotação nominal r=1). Curva da bomba
// H = 1,2·r² − 0,2·q² (estável: shutoff 120% do head de BEP; afinidade embutida:
// Q∝N e H∝N²). Curva do sistema H = H_est + k·q². O ponto de operação é a
// interseção — a tese editorial do handbook ("a bomba não escolhe onde opera")
// virando ferramenta. Client-side puro (BR-004).
//
// DEV-083 #7 — limite de validação, declarado com honestidade: as LEIS DE
// AFINIDADE embutidas (Q∝N, H∝N²) SÃO conferidas contra literatura citável
// (Karassik et al., Pump Handbook, 4ª ed. (2008), cap. 2 — a mesma fonte já
// usada em content/pt/principio/dinamicas.md) no describe "Leis de Afinidade"
// abaixo, com número exato comparado, no mesmo padrão de weibull/disponibilidade/
// intervaloPF (Smith 2004/Moubray, calc.test.ts). A FORMA da curva da bomba em
// si (SHUTOFF=1,2 / INCLINACAO=0,2) é um modelo ILUSTRATIVO escolhido pelo
// projeto — não extraído de catálogo nem de exemplo de livro-texto, por isso
// não há "resposta certa" de referência pra comparar essa parte (o widget
// avisa isso ao usuário via legenda visível, DEV-083 #7). Os demais testes
// abaixo (shape/invariantes) validam a CONSISTÊNCIA INTERNA do modelo, não uma
// fonte externa — distinção que faltava documentar (achado original do
// /mp-code-review, Spec C).

describe('Leis de Afinidade — validadas contra literatura (Karassik, Pump Handbook 4ª ed., cap. 2)', () => {
  it('H ∝ N²: head no BEP escala com o QUADRADO exato da razão de rotação', () => {
    // Karassik cap. 2: H₂/H₁ = (N₂/N₁)². Sistema só de atrito (H_est=0) para
    // isolar exatamente a afinidade, sem o termo estático interferir.
    const p1 = pontoOperacao(1, 0, 0.5)!;
    const p08 = pontoOperacao(0.8, 0, 0.5)!;
    expect(p08.h / p1.h).toBeCloseTo(Math.pow(0.8, 2), 9);
  });

  it('Q ∝ N: vazão no BEP escala LINEARMENTE com a razão de rotação', () => {
    // Karassik cap. 2: Q₂/Q₁ = N₂/N₁ (razão de rotação, exata).
    const p1 = pontoOperacao(1, 0, 0.5)!;
    const p07 = pontoOperacao(0.7, 0, 0.5)!;
    expect(p07.q / p1.q).toBeCloseTo(0.7, 9);
  });
});

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
