// F02/BR-004 — export do CONTEÚDO ÍNTEGRO da nota (não só o plano). Dados já
// no preload SSR; a geração roda no client via Blob — nenhum endpoint novo.
// Pedido do fundador (11/07): botão "Baixar conteúdo" no topo de toda nota,
// formato Markdown (o PDF sai do print nativo do browser — window.print()).

export interface NotaParaMdArgs {
  titulo: string;
  corpoMd: string;
  url: string;
  revisadoEm?: string;
  labelRevisado?: string; // rótulo traduzido ("Revisado em" / "Reviewed on") — vem do caller (next-intl)
}

export function notaParaMd({
  titulo,
  corpoMd,
  url,
  revisadoEm,
  labelRevisado,
}: NotaParaMdArgs): string {
  const rodape = ['RELIABILITAS', url];
  if (revisadoEm) rodape.push(`${labelRevisado ?? 'Revisado em'} ${revisadoEm}`);

  return [`# ${titulo}`, '', corpoMd.trim(), '', '---', '', rodape.join(' · ')].join('\n');
}

export function nomeArquivoNota(slug: string): string {
  return `${slug}.md`;
}
