// Achado do fundador (17/07, revisado no mesmo dia com prints do celular
// real): a 1ª versão desta função deixava a preferência salva vencer a
// detecção de celular — quem já tinha `sidebarOpen=1` salvo de ANTES da
// correção (o próprio fundador, testando de novo) continuava vendo a árvore
// abrir cheia. No celular a árvore é uma gaveta full-screen (BR-010/DEV-035:
// SSR sempre manda aberta no HTML, pra crawler), não uma coluna fixa como no
// desktop — não faz sentido "lembrar" de ficar aberta entre páginas nesse
// modelo. Regra final: no celular, SEMPRE começa recolhida, ignorando
// qualquer preferência salva (só abre pelo toque no ☰; volta a recolher a
// cada navegação, já que cada link é um carregamento de página novo). No
// desktop nada muda — preferência salva continua valendo, default aberta.

export function decideColapsadoInicial(valorSalvo: string | null, ehMobile: boolean): boolean {
  if (ehMobile) return true;
  if (valorSalvo === '0') return true;
  if (valorSalvo === '1') return false;
  return false;
}
