// Comparativo Q×P genérico (rotodinâmica × deslocamento positivo) — pedido do
// fundador na revisão da nota Deslocamento Positivo (18/07): mostrar por que a
// bomba de deslocamento positivo EXIGE válvula de alívio e a rotodinâmica não.
// Modelo NORMALIZADO (didático, não de catálogo): vazão/pressão nominal = 1 no
// ponto de projeto, abertura da válvula de descarga de 0 (fechada) a 1 (total).
//
// Rotodinâmica: a vazão é a INTERSEÇÃO da curva da bomba (H = 1,2 − 0,2·Q²,
// mesma forma do widget H-Q do handbook) com a curva do sistema
// (H = Q²/abertura² — fechar a válvula sobe a resistência ao quadrado
// inverso da abertura). Resolvendo: Q² = 1,2 / (1/abertura² + 0,2).
// Fechar a válvula TOTALMENTE (abertura→0) faz a vazão cair a ZERO e o head
// se estabilizar no shutoff (1,2×) — limitado pela própria curva da máquina.
//
// Deslocamento positivo: a vazão é FIXA em 1 (o deslocamento não depende da
// resistência a jusante) — é o sistema que precisa gerar a pressão suficiente
// para forçar essa vazão constante pela válvula: P = 1/abertura². Fechar a
// válvula não reduz a vazão; a pressão necessária diverge — sem uma válvula
// de alívio, é o componente mais fraco do sistema que "abre" primeiro.

export const PRESSAO_ALIVIO_TIPICA = 3; // 300% da pressão nominal — ordem de grandeza didática

export function vazaoRotodinamica(abertura: number): number {
  const a = Math.max(1e-6, Math.min(1, abertura));
  const q2 = 1.2 / (1 / (a * a) + 0.2);
  return Math.sqrt(q2);
}

export function vazaoDeslocamentoPositivo(): number {
  return 1;
}

export function pressaoDeslocamentoPositivo(abertura: number): number {
  const a = Math.max(1e-6, Math.min(1, abertura));
  return 1 / (a * a);
}
