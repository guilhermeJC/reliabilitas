'use client';

import {
  planoParaCsv,
  planoParaMd,
  nomeArquivoPlano,
  type TarefaPlano,
  type ContextoPlano,
} from '@/lib/export/plano';
import type { TextosPlanoDoc } from '@/lib/export/plano-textos';

// F02/BR-004 — download client-side via Blob: o arquivo nasce do preload que a
// página já tem. Sem endpoint, sem chamada de rede. O documento gerado segue o
// template RELIABILITAS (melhoria 3 do fundador, 10/07).

function baixa(conteudo: string, nome: string, mime: string) {
  const url = URL.createObjectURL(new Blob([conteudo], { type: mime }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nome;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportPlanoBotoes({
  plano,
  contexto,
  textos,
  slug,
  labels,
}: {
  plano: TarefaPlano[];
  contexto: ContextoPlano;
  textos: TextosPlanoDoc;
  slug: string;
  labels: { csv: string; md: string };
}) {
  const estilo =
    'rounded border px-2 py-1 text-[11px] font-medium transition-colors hover:bg-slate-50';
  return (
    <span className="flex gap-2">
      <button
        type="button"
        className={estilo}
        style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
        onClick={() =>
          baixa(
            planoParaCsv(plano, contexto, textos),
            nomeArquivoPlano(slug, 'csv'),
            'text/csv;charset=utf-8',
          )
        }
      >
        {labels.csv}
      </button>
      <button
        type="button"
        className={estilo}
        style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
        onClick={() =>
          baixa(
            planoParaMd(plano, contexto, textos),
            nomeArquivoPlano(slug, 'md'),
            'text/markdown;charset=utf-8',
          )
        }
      >
        {labels.md}
      </button>
    </span>
  );
}
