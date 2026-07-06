// Intervalo P-F (F05/BR-012): a tarefa sob condição só é eficaz se o intervalo
// de inspeção couber DENTRO da janela P-F — prática consagrada: inspeção ≤ P-F/2
// (Moubray, RCM II cap. 8; SAE JA1011 §5.7 exige tarefa "tecnicamente factível").
// Unidade é livre (dias/semanas/meses) — o que importa é a razão.

export interface PFParams {
  pf: number; // intervalo P-F (potencial → funcional)
  inspecao: number; // intervalo de inspeção praticado
}

export interface PFResultado {
  recomendado: number; // P-F/2
  chancesDeteccao: number; // inspeções dentro da janela P-F
  margem: number; // P-F - inspeção
  adequado: boolean; // inspeção ≤ P-F/2
}

export function intervaloPF({ pf, inspecao }: PFParams): PFResultado | null {
  if (!Number.isFinite(pf) || !Number.isFinite(inspecao) || pf <= 0 || inspecao <= 0) return null;
  return {
    recomendado: pf / 2,
    chancesDeteccao: Math.floor(pf / inspecao),
    margem: pf - inspecao,
    adequado: inspecao <= pf / 2,
  };
}
