// Curva H-Q viva do handbook (sessão 5, aprovada pelo fundador 10/07) — modelo
// NORMALIZADO no BEP nominal: Q = 1 e H = 1 no ponto de melhor eficiência à
// rotação nominal (r = N/N_nom = 1). Didática, não de catálogo: a forma é a de
// uma centrífuga radial estável (shutoff = 120% do head de BEP, curva sempre
// ascendente ao shutoff — a exigência da API 610 para operação em paralelo).
//
// Curva da bomba com as leis de afinidade EMBUTIDAS (Q ∝ N, H ∝ N²):
//   H(q, r) = 1,2·r² − 0,2·q²
// — em r = 1, q = 1 → H = 1 (BEP); q = 0 → 1,2 (shutoff).
//
// Curva do sistema (estática + atrito quadrático):
//   H_sys(q) = H_est + k·q²
//
// O ponto de operação é a interseção — "a bomba não escolhe onde opera; o
// sistema decide" (tese da seção Princípio do handbook virando ferramenta).
// Client-side puro: nenhum dado sai da página (BR-004/D11).

const SHUTOFF = 1.2; // head de shutoff relativo ao BEP (típico de radial estável)
const INCLINACAO = 0.2; // abertura da parábola da bomba (SHUTOFF − 1 no BEP)

export const ROTACAO_MIN = 0.5;
export const ROTACAO_MAX = 1.2;

export type PosicaoBep = 'recirculacao' | 'por' | 'runout';

export interface PontoOperacao {
  q: number; // vazão no ponto, em múltiplos da vazão de BEP nominal
  h: number; // head no ponto, em múltiplos do head de BEP nominal
}

export function curvaBomba(q: number, r: number): number {
  return SHUTOFF * r * r - INCLINACAO * q * q;
}

export function curvaSistema(q: number, hEst: number, kSis: number): number {
  return hEst + kSis * q * q;
}

export function pontoOperacao(r: number, hEst: number, kSis: number): PontoOperacao | null {
  if (!Number.isFinite(r) || r < ROTACAO_MIN || r > ROTACAO_MAX) return null;
  if (!Number.isFinite(hEst) || hEst < 0) return null;
  if (!Number.isFinite(kSis) || kSis < 0) return null;

  // 1,2r² − 0,2q² = H_est + k·q²  →  q² = (1,2r² − H_est)/(k + 0,2)
  const q2 = (SHUTOFF * r * r - hEst) / (kSis + INCLINACAO);
  if (q2 <= 0) return null; // shutoff: a bomba não vence a altura estática

  const q = Math.sqrt(q2);
  return { q, h: curvaSistema(q, hEst, kSis) };
}

// Leitura do POR (ANSI/HI 9.6.3): 70–120% da vazão de BEP DA ROTAÇÃO ATUAL
// (afinidade: Q_bep ∝ N — o POR desliza junto com a rotação).
export function classificaPosicao(q: number, r: number): PosicaoBep {
  const razao = q / r;
  if (razao < 0.7) return 'recirculacao';
  if (razao > 1.2) return 'runout';
  return 'por';
}
