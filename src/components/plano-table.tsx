import { getTranslations } from 'next-intl/server';
import { ExportPlanoBotoes } from '@/components/export-plano-botoes';
import { CATEGORIAS } from '@/components/fw-cards';
import type { ContextoPlano, TarefaPlano } from '@/lib/export/plano';

// Plano de manutenção do frontmatter (F02) — com export CSV/MD da página atual
// (BR-004: client-side puro, sem endpoint). Sessão 5: o plano carrega a
// estrutura mínima do PRO-MNT-001 §8 — classificação Fw A/Fw B no contexto do
// arquivo e, por tarefa, condição de contorno, critério de aceitação e ação em
// desvio (campos opcionais do schema; renderizados quando presentes).

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
  slug,
}: {
  plano?: TarefaPlano[];
  contexto: { equipamento: string; modoFalha: string };
  fwA?: FwARaw;
  fwB?: FwBRaw;
  slug: string;
}) {
  if (!plano || plano.length === 0) return null;
  const t = await getTranslations('plano');
  const tFw = await getTranslations('fw');

  const headers = {
    equipamento: t('equipamento'),
    modoFalha: t('modoFalha'),
    fwA: t('fwA'),
    fwB: t('fwB'),
    tarefa: t('tarefa'),
    metodo: t('metodo'),
    condicao: t('condicao'),
    criterio: t('criterio'),
    acao: t('acao'),
    periodicidade: t('periodicidade'),
  };

  // Classificação por extenso no contexto do arquivo (PRO-MNT-001 §8.1).
  const decisaoLabel = fwB?.decisao != null ? tFw(`decisoes.${fwB.decisao}` as never) : undefined;
  const contextoCompleto: ContextoPlano = {
    ...contexto,
    fwA: fwA?.categoria
      ? `${CATEGORIAS[fwA.categoria] ?? fwA.categoria}${fwA.beta != null ? ` · β: ${fwA.beta}` : ''}`
      : undefined,
    fwB: decisaoLabel
      ? `${decisaoLabel}${fwB?.periodicidade ? ` · ${fwB.periodicidade}` : ''}`
      : undefined,
  };

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
          headers={headers}
          slug={slug}
          labels={{ csv: t('exportCsv'), md: t('exportMd') }}
        />
      </div>
      <table className="mt-3 w-full text-[13px]">
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
                    <span className="mt-0.5 block text-[11px] text-slate-500">→ {linha.acao}</span>
                  )}
                </td>
              )}
              <td className="py-2 font-mono text-xs text-slate-700">{linha.periodicidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
