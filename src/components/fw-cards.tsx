import { getTranslations } from 'next-intl/server';

// A assinatura visual do método (DESIGN §1): a dupla Fw A (diagnóstico, roxo)
// → Fw B (prescrição, verde) presente em toda página de modo de falha (BR-005).

interface FwA {
  categoria?: string;
  beta?: string | number;
}
interface FwB {
  tem_pf?: boolean;
  evidente?: boolean;
  decisao?: string;
  periodicidade?: string;
}

// Vocabulário canônico do método (IT-MNT-001 §3–4) — termos técnicos, não UI.
const CATEGORIAS: Record<string, string> = {
  infant: 'Infant Mortality',
  random: 'Random',
  wear_out: 'Wear-out',
  mixed_complex: 'Mixed/Complex',
  unknown: 'Unknown',
};

function Linha({ rotulo, valor, mono = true }: { rotulo: string; valor: string; mono?: boolean }) {
  return (
    <div
      className="flex items-baseline justify-between gap-3 border-t py-1.5"
      style={{ borderColor: '#eef1f6' }}
    >
      <dt className="shrink-0 text-xs text-slate-500">{rotulo}</dt>
      <dd className={`text-right text-[13px] text-slate-700 ${mono ? 'font-mono' : ''}`}>
        {valor}
      </dd>
    </div>
  );
}

export async function FwCards({ fwA, fwB, pfTipico }: { fwA?: FwA; fwB?: FwB; pfTipico?: string }) {
  const t = await getTranslations('fw');
  if (!fwA && !fwB) return null;

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {fwA && (
        <section className="rounded-lg border bg-white" style={{ borderColor: '#e3e8f0' }}>
          <div className="h-1 rounded-t-lg" style={{ background: 'var(--fw-a)' }} />
          <div className="p-4">
            <h2 className="text-[13px] font-medium" style={{ color: 'var(--fw-a)' }}>
              {t('aTitulo')}
            </h2>
            <p className="mb-2 mt-0.5 text-xs text-slate-500">{t('aSub')}</p>
            <dl>
              {fwA.categoria && (
                <Linha rotulo={t('categoria')} valor={CATEGORIAS[fwA.categoria] ?? fwA.categoria} />
              )}
              {fwA.beta != null && <Linha rotulo={t('beta')} valor={String(fwA.beta)} />}
            </dl>
          </div>
        </section>
      )}
      {fwB && (
        <section className="rounded-lg border bg-white" style={{ borderColor: '#e3e8f0' }}>
          <div className="h-1 rounded-t-lg" style={{ background: 'var(--fw-b)' }} />
          <div className="p-4">
            <h2 className="text-[13px] font-medium" style={{ color: 'var(--fw-b)' }}>
              {t('bTitulo')}
            </h2>
            <p className="mb-2 mt-0.5 text-xs text-slate-500">{t('bSub')}</p>
            <dl>
              {fwB.decisao && <Linha rotulo={t('decisao')} valor={t(`decisoes.${fwB.decisao}`)} />}
              {fwB.periodicidade && <Linha rotulo={t('periodicidade')} valor={fwB.periodicidade} />}
              {fwB.tem_pf != null && (
                <Linha rotulo={t('temPf')} valor={fwB.tem_pf ? t('sim') : t('nao')} mono={false} />
              )}
              {fwB.evidente != null && (
                <Linha
                  rotulo={t('evidente')}
                  valor={fwB.evidente ? t('sim') : t('nao')}
                  mono={false}
                />
              )}
              {pfTipico && <Linha rotulo={t('pfTipico')} valor={pfTipico} />}
            </dl>
          </div>
        </section>
      )}
    </div>
  );
}
