// Disponibilidade inerente (F05/BR-012): Ai = MTBF/(MTBF+MTTR) — Smith 2004,
// cap. 2. λ = 1/MTBF; indisponibilidade anual em horas sobre ano de 8760h.

export const HORAS_ANO = 8760;

export interface DisponibilidadeParams {
  mtbf: number; // horas
  mttr: number; // horas
}

export interface DisponibilidadeResultado {
  disponibilidade: number; // fração [0,1]
  lambda: number; // falhas/hora
  indisponibilidadeAnualHoras: number;
}

export function disponibilidade({
  mtbf,
  mttr,
}: DisponibilidadeParams): DisponibilidadeResultado | null {
  if (!Number.isFinite(mtbf) || !Number.isFinite(mttr) || mtbf <= 0 || mttr < 0) return null;
  const ai = mtbf / (mtbf + mttr);
  return {
    disponibilidade: ai,
    lambda: 1 / mtbf,
    indisponibilidadeAnualHoras: (1 - ai) * HORAS_ANO,
  };
}
