import { gamma } from './gamma';
import type { FW_A_CATEGORIAS } from '@/lib/content/schema';

// Weibull 2 parâmetros (F05/BR-012 — o coração do nível Engineer):
//   R(t) = exp(-(t/η)^β)          confiabilidade
//   h(t) = (β/η)·(t/η)^(β-1)      taxa de falha instantânea
//   MTTF = η·Γ(1+1/β)             tempo médio até a falha
//   Bx   = η·(-ln(1-x/100))^(1/β) vida Bx (B10 = 10% da população falhou)
// Validada contra Smith 2004 (cap. 6) e propriedades conhecidas (R(η)=e⁻¹).

export interface WeibullParams {
  beta: number; // parâmetro de forma (adimensional)
  eta: number; // vida característica η (mesma unidade de t)
}

export interface WeibullModel {
  beta: number;
  eta: number;
  mttf: number;
  confiabilidade(t: number): number | null;
  falhaAcumulada(t: number): number | null;
  taxaFalha(t: number): number | null;
  vidaB(percentual: number): number;
}

export function weibull({ beta, eta }: WeibullParams): WeibullModel | null {
  if (!Number.isFinite(beta) || !Number.isFinite(eta) || beta <= 0 || eta <= 0) return null;

  const confiabilidade = (t: number): number | null =>
    !Number.isFinite(t) || t < 0 ? null : Math.exp(-Math.pow(t / eta, beta));

  return {
    beta,
    eta,
    mttf: eta * gamma(1 + 1 / beta),
    confiabilidade,
    falhaAcumulada: (t) => {
      const r = confiabilidade(t);
      return r === null ? null : 1 - r;
    },
    taxaFalha: (t) =>
      !Number.isFinite(t) || t < 0 ? null : (beta / eta) * Math.pow(t / eta, beta - 1),
    vidaB: (percentual) => eta * Math.pow(-Math.log(1 - percentual / 100), 1 / beta),
  };
}

// Fw A ao vivo (Nowlan & Heap / IT-MNT-001): β<1 mortalidade infantil,
// β≈1 aleatória (exponencial na prática — faixa ±0.05 para entrada de slider),
// β>1 desgaste. A decisão editorial da nota (categoria do frontmatter) prevalece;
// isto é o classificador didático da calculadora.
export type CategoriaBeta = Extract<
  (typeof FW_A_CATEGORIAS)[number],
  'infant' | 'random' | 'wear_out'
>;

const BETA_RANDOM_FAIXA = 0.05;
const FP_TOLERANCIA = 1e-9; // fronteira do slider (ex.: 1.05) sofre ruído de ponto flutuante

export function classificaBeta(beta: number): CategoriaBeta {
  if (Math.abs(beta - 1) - BETA_RANDOM_FAIXA <= FP_TOLERANCIA) return 'random';
  return beta < 1 ? 'infant' : 'wear_out';
}
