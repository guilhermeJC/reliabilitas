import { getTranslations } from 'next-intl/server';

// Plano de manutenção do frontmatter (F02) — exportável CSV/MD no Dia 3.
interface TarefaPlano {
  tarefa: string;
  metodo: string;
  periodicidade: string;
}

export async function PlanoTable({ plano }: { plano?: TarefaPlano[] }) {
  if (!plano || plano.length === 0) return null;
  const t = await getTranslations('plano');

  return (
    <section className="mt-6 rounded-lg border bg-white p-4" style={{ borderColor: '#e3e8f0' }}>
      <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {t('titulo')}
      </h2>
      <table className="mt-3 w-full text-[13px]">
        <thead>
          <tr className="text-left text-xs text-slate-500">
            <th className="pb-2 pr-4 font-medium">{t('tarefa')}</th>
            <th className="pb-2 pr-4 font-medium">{t('metodo')}</th>
            <th className="pb-2 font-medium">{t('periodicidade')}</th>
          </tr>
        </thead>
        <tbody>
          {plano.map((linha, i) => (
            <tr key={i} className="border-t align-top" style={{ borderColor: '#eef1f6' }}>
              <td className="py-2 pr-4 font-medium text-slate-800">{linha.tarefa}</td>
              <td className="py-2 pr-4 text-slate-600">{linha.metodo}</td>
              <td className="py-2 font-mono text-xs text-slate-700">{linha.periodicidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
