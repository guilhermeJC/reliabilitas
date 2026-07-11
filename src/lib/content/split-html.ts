// Melhoria 2 do fundador (10/07): componentes React (a anatomia interativa)
// precisam entrar NO MEIO do corpo renderizado — dentro da própria seção,
// antes do heading seguinte. O corpo é uma string de HTML confiável (gerada
// server-side de conteúdo autoral validado no ingest); dividir a string antes
// de um <h2 id="..."> alvo é suficiente e determinístico (os ids vêm de
// slugifyHeading, os mesmos da nav de âncoras do T02).

export function separaHtmlNoHeading(
  html: string,
  headingId: string,
): { antes: string; depois: string } | null {
  const marcador = `<h2 id="${headingId}"`;
  const idx = html.indexOf(marcador);
  if (idx === -1) return null;
  return { antes: html.slice(0, idx), depois: html.slice(idx) };
}
