import { getTranslations, getLocale } from 'next-intl/server';
import { ExportPlanoBotoes } from '@/components/export-plano-botoes';
import { CATEGORIA_ROTULOS } from '@/lib/content/fw-a-rotulos';
import { textosPlanoDoc } from '@/lib/export/plano-textos';
import type { ContextoPlano, TarefaPlano } from '@/lib/export/plano';
import type { Locale } from '@/lib/content/schema';
import { notaPath } from '@/lib/routes';

// Plano de manutenção do frontmatter (F02) — a página mostra a TABELA-RESUMO
// com o disclaimer de foco no modo de falha (regra do fundador: SEMPRE); o
// documento completo (template RELIABILITAS: procedimento, registros,
// restabelecimento, validação) sai nos exports CSV/MD, gerados client-side
// (BR-004: sem endpoint).

interface FwARaw {
  categoria?: string;
  beta?: string | number;
}
interface FwBRaw {
  decisao?: string;
  periodicidade?: string;
}

export async function PlanoTable({
  plano,
  contexto,
  fwA,
  fwB,
  pfTipico,
  revisadoEm,
  slug,
}: {
  plano?: TarefaPlano[];
  contexto: { equipamento: string; modoFalha: string };
  fwA?: FwARaw;
  fwB?: FwBRaw;
  pfTipico?: string;
  revisadoEm?: string;
  slug: string;
}) {
  if (!plano || plano.length === 0) return null;
  const t = await getTranslations('plano');
  const tFw = await getTranslations('fw');
  const locale = (await getLocale()) as Locale;
  const textos = textosPlanoDoc(locale);

  // Classificação por extenso no contexto do documento (PRO-MNT-001 §8.1).
  const decisaoLabel = fwB?.decisao != null ? tFw(`decisoes.${fwB.decisao}` as never) : undefined;
  const contextoCompleto: ContextoPlano = {
    ...contexto,
    fwA: fwA?.categoria
      ? `${CATEGORIA_ROTULOS[fwA.categoria as keyof typeof CATEGORIA_ROTULOS] ?? fwA.categoria}${fwA.beta != null ? ` · β: ${fwA.beta}` : ''}`
      : undefined,
    fwB: decisaoLabel
      ? `${decisaoLabel}${fwB?.periodicidade ? ` · ${fwB.periodicidade}` : ''}`
      : undefined,
    decisao: fwB?.decisao,
    pfTipico,
    revisadoEm,
    url: `https://reliabilitas.com${notaPath(locale, slug)}`,
  };

  const disclaimer = textos.disclaimer
    .replaceAll('{modo}', contexto.modoFalha)
    .replaceAll('{equipamento}', contexto.equipamento);

  const temCriterio = plano.some((l) => l.criterio || l.acao);

  return (
    <section className="mt-6 rounded-lg border bg-white p-4" style={{ borderColor: '#e3e8f0' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
          {t('titulo')}
        </h2>
        <ExportPlanoBotoes
          plano={plano}
          contexto={contextoCompleto}
          textos={textos}
          slug={slug}
          labels={{ csv: t('exportCsv'), md: t('exportMd') }}
        />
      </div>

      {/* Disclaimer de foco no modo de falha — regra do fundador: SEMPRE presente */}
      <p
        className="mt-3 rounded-md border-l-4 bg-amber-50/60 py-2 pl-3 pr-3 text-[12px] leading-snug text-slate-600"
        style={{ borderColor: '#b45309' }}
      >
        <strong className="text-slate-700">⚠ {textos.disclaimerTitulo}:</strong> {disclaimer}
      </p>

      {/* DEV-119: sem este wrapper a pagina INTEIRA rolava lateralmente no
          celular (medido: scrollWidth 472 em viewport de 375). O fix do
          DEV-059 so cobriu tabelas de markdown; esta e JSX e escapou. */}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-xs text-slate-500">
              <th className="pb-2 pr-4 font-medium">{t('tarefa')}</th>
              <th className="pb-2 pr-4 font-medium">{t('metodo')}</th>
              {temCriterio && <th className="pb-2 pr-4 font-medium">{t('criterio')}</th>}
              <th className="pb-2 font-medium">{t('periodicidade')}</th>
            </tr>
          </thead>
          <tbody>
            {plano.map((linha, i) => (
              <tr key={i} className="border-t align-top" style={{ borderColor: '#eef1f6' }}>
                <td className="py-2 pr-4">
                  <span className="font-medium text-slate-800">{linha.tarefa}</span>
                  {linha.condicao && (
                    <span className="mt-0.5 block text-[11px] text-slate-500">
                      {t('condicao')}: {linha.condicao}
                    </span>
                  )}
                </td>
                <td className="py-2 pr-4 text-slate-600">{linha.metodo}</td>
                {temCriterio && (
                  <td className="py-2 pr-4 text-slate-600">
                    {linha.criterio}
                    {linha.acao && (
                      <span className="mt-0.5 block text-[11px] text-slate-500">
                        → {linha.acao}
                      </span>
                    )}
                  </td>
                )}
                <td className="py-2 font-mono text-xs text-slate-700">{linha.periodicidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
