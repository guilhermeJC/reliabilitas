'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { disponibilidade } from '@/lib/calc/disponibilidade';
import { CampoNumero, LinhaResultado, fmt } from '@/components/calc/campos';

// F05/BR-012 — disponibilidade inerente Ai = MTBF/(MTBF+MTTR). Client-side puro.

export function DisponibilidadeCalc() {
  const t = useTranslations('calc.disp');
  const tCalc = useTranslations('calc');
  const [mtbf, setMtbf] = useState(1000);
  const [mttr, setMttr] = useState(10);

  const r = disponibilidade({ mtbf, mttr });

  return (
    <div className="rounded-lg border bg-white p-5" style={{ borderColor: '#e3e8f0' }}>
      <h3 className="text-sm font-medium" style={{ color: 'var(--navy-700)' }}>
        {t('titulo')}
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <CampoNumero label={t('mtbf')} value={mtbf} onChange={setMtbf} min={1} sufixo="h" />
          <CampoNumero label={t('mttr')} value={mttr} onChange={setMttr} min={0} sufixo="h" />
        </div>
        <div className="rounded-md bg-slate-50 px-4 py-2">
          {r ? (
            <>
              <LinhaResultado
                label={t('resultado')}
                valor={`${(r.disponibilidade * 100).toFixed(4)}%`}
                destaque
                significa={t('sig.ai', { p: (r.disponibilidade * 100).toFixed(4) })}
              />
              <LinhaResultado
                label="λ"
                valor={`${fmt(r.lambda)} ${t('porHora')}`}
                significa={t('sig.lambda', { v: fmt(r.lambda) })}
              />
              <LinhaResultado
                label={t('indisponibilidade')}
                valor={`${fmt(r.indisponibilidadeAnualHoras, 1)} ${t('horasAno')}`}
                conversao={tCalc('emDiasAno', {
                  n: fmt(r.indisponibilidadeAnualHoras / 24, 1),
                })}
                significa={t('sig.indisp', { v: fmt(r.indisponibilidadeAnualHoras, 1) })}
              />
            </>
          ) : (
            <p className="py-2 text-sm text-slate-500">{t('invalido')}</p>
          )}
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-400">{t('rodape')}</p>
    </div>
  );
}
