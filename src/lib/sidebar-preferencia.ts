// Achado do fundador (17/07): sem preferência salva, a árvore lateral sempre
// abria "ocupando a tela inteira" no celular — inclusive a cada navegação por
// link, já que toda página nova é um carregamento SSR do zero (a árvore vem
// sempre aberta no HTML, BR-010/DEV-035). Regra: uma preferência salva
// explicitamente sempre vence; sem preferência, o padrão passa a depender do
// tamanho de tela — recolhida no celular, aberta no desktop (como já era).

export function decideColapsadoInicial(valorSalvo: string | null, ehMobile: boolean): boolean {
  if (valorSalvo === '0') return true;
  if (valorSalvo === '1') return false;
  return ehMobile;
}
