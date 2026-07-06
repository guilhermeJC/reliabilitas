// Função Γ via aproximação de Lanczos (g=7, n=9) — precisão ~15 dígitos no
// domínio real positivo, suficiente para MTTF = η·Γ(1+1/β) com β ∈ [0.3, 10].
// Zero dependência: as calculadoras são 100% client-side (BR-004/D11).

const LANCZOS_G = 7;
const LANCZOS_C = [
  0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
  -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
  1.5056327351493116e-7,
];

export function gamma(x: number): number {
  if (x < 0.5) {
    // Reflexão de Euler para o ramo x < 0.5
    return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
  }
  const z = x - 1;
  let acc = LANCZOS_C[0];
  for (let i = 1; i < LANCZOS_C.length; i++) {
    acc += LANCZOS_C[i] / (z + i);
  }
  const t = z + LANCZOS_G + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * acc;
}
