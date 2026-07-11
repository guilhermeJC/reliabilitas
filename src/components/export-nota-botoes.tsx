'use client';

import { notaParaMd, nomeArquivoNota } from '@/lib/export/nota';

// F02/BR-004 — download client-side via Blob: o arquivo nasce do preload que a
// página já tem. Sem endpoint, sem chamada de rede. PDF usa o print nativo do
// browser (window.print()) com o corpo em @media print (globals.css) — zero
// dependência nova (pedido do fundador, 11/07).

function baixa(conteudo: string, nome: string, mime: string) {
  const url = URL.createObjectURL(new Blob([conteudo], { type: mime }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nome;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportNotaBotoes({
  titulo,
  corpoMd,
  url,
  slug,
  revisadoEm,
  labelRevisado,
  labels,
}: {
  titulo: string;
  corpoMd: string;
  url: string;
  slug: string;
  revisadoEm?: string;
  labelRevisado: string;
  labels: { md: string; pdf: string };
}) {
  const estilo =
    'print:hidden inline-flex items-center gap-1 rounded border px-2.5 py-1.5 text-[12px] font-medium transition-colors hover:bg-slate-50';
  return (
    <span className="flex flex-wrap gap-2">
      <button
        type="button"
        className={estilo}
        style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
        onClick={() =>
          baixa(
            notaParaMd({ titulo, corpoMd, url, revisadoEm, labelRevisado }),
            nomeArquivoNota(slug),
            'text/markdown;charset=utf-8',
          )
        }
      >
        ⬇ {labels.md}
      </button>
      <button
        type="button"
        className={estilo}
        style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
        onClick={() => window.print()}
      >
        ⬇ {labels.pdf}
      </button>
    </span>
  );
}
