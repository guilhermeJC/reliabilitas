'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { intervaloPF } from '@/lib/calc/pf';
import { CampoNumero, LinhaResultado, fmt } from '@/components/calc/campos';

// F05/BR-012 — intervalo P-F: inspeção ≤ P-F/2 (Moubray RCM II cap. 8).
// Unidade livre (dias/semanas/meses) — o que importa é a razão. Client-side puro.

export function PFCalc() {
  const t = useTranslations('calc.pf');
  const [pf, setPf] = useState(9);
  const [inspecao, setInspecao] = useState(3);

  const r = intervaloPF({ pf, inspecao });

  return (
    <div className="rounded-lg border bg-white p-5" style={{ borderColor: '#e3e8f0' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('titulo')}
        </h3>
        {r && (
          <span
            className="rounded px-2 py-0.5 text-[11px] font-medium text-white"
            style={{ background: r.adequado ? 'var(--fw-b)' : 'var(--accent)' }}
          >
            {r.adequado ? t('adequado') : t('inadequado')}
          </span>
        )}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <CampoNumero label={t('pf')} value={pf} onChange={setPf} min={0.1} step={0.5} />
          <CampoNumero
            label={t('inspecao')}
            value={inspecao}
            onChange={setInspecao}
            min={0.1}
            step={0.5}
          />
        </div>
        <div className="rounded-md bg-slate-50 px-4 py-2">
          {r ? (
            <>
              <LinhaResultado label={t('recomendado')} valor={fmt(r.recomendado, 2)} destaque />
              <LinhaResultado label={t('chances')} valor={String(r.chancesDeteccao)} />
              <LinhaResultado label={t('margem')} valor={fmt(r.margem, 2)} />
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
