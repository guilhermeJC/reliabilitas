'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { weibull, classificaBeta } from '@/lib/calc/weibull';
import { Slider } from '@/components/ui/slider';
import { CampoNumero, LinhaResultado, fmt } from '@/components/calc/campos';

// F05/BR-012 — Weibull 2P ao vivo (embutida no nível Engineer do T03 e na página
// /calculadoras). 100% client-side: nenhum dado sai da página (BR-004/D11).

const CORES_CATEGORIA: Record<string, string> = {
  infant: '#b45309', // âmbar técnico — mortalidade infantil
  random: 'var(--gray-tech)',
  wear_out: 'var(--fw-a)', // roxo Fw A — desgaste (β>1)
};

export function WeibullCalc({ betaInicial = 2 }: { betaInicial?: number }) {
  const t = useTranslations('calc.weibull');
  const tCat = useTranslations('calc.categorias');
  const tCalc = useTranslations('calc');
  const [beta, setBeta] = useState(() =>
    Number.isFinite(betaInicial) && betaInicial > 0 ? Math.min(betaInicial, 5) : 2,
  );
  const [eta, setEta] = useState(1000);
  const [tempo, setTempo] = useState(500);

  const modelo = weibull({ beta, eta });
  const categoria = classificaBeta(beta);

  const curva = useMemo(() => {
    if (!modelo) return [];
    const pontos = [];
    const passos = 55;
    for (let i = 1; i <= passos; i++) {
      const ti = (i / passos) * 2.2 * eta;
      pontos.push({
        t: Math.round(ti),
        R: modelo.confiabilidade(ti),
        h: modelo.taxaFalha(ti),
      });
    }
    return pontos;
  }, [modelo, eta]);

  return (
    <div className="rounded-lg border bg-white p-5" style={{ borderColor: '#e3e8f0' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('titulo')}
        </h3>
        <span
          className="rounded px-2 py-0.5 text-[11px] font-medium text-white"
          style={{ background: CORES_CATEGORIA[categoria] }}
        >
          {t('fwA')}: {tCat(categoria)}
        </span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="text-sm">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600">{t('beta')}</span>
              <span className="font-mono text-sm" style={{ color: 'var(--navy-700)' }}>
                {beta.toFixed(2)}
              </span>
            </div>
            <div className="mt-2">
              <Slider
                value={beta}
                onValueChange={setBeta}
                min={0.3}
                max={5}
                step={0.05}
                aria-label={t('beta')}
              />
            </div>
          </div>
          <CampoNumero label={t('eta')} value={eta} onChange={setEta} min={1} sufixo="h" />
          <CampoNumero label={t('tempo')} value={tempo} onChange={setTempo} min={0} sufixo="h" />
        </div>

        <div className="rounded-md bg-slate-50 px-4 py-2">
          {modelo ? (
            (() => {
              const R = modelo.confiabilidade(tempo);
              const F = modelo.falhaAcumulada(tempo);
              const H = modelo.taxaFalha(tempo);
              const b10 = modelo.vidaB(10);
              return (
                <>
                  <LinhaResultado
                    label={`R(${fmt(tempo)}h)`}
                    valor={R === null ? '—' : `${(R * 100).toFixed(2)}%`}
                    destaque
                    significa={R === null ? undefined : t('sig.r', { t: fmt(tempo) })}
                  />
                  <LinhaResultado
                    label={`F(${fmt(tempo)}h)`}
                    valor={F === null ? '—' : `${(F * 100).toFixed(2)}%`}
                    significa={F === null ? undefined : t('sig.f', { t: fmt(tempo) })}
                  />
                  <LinhaResultado
                    label={`h(${fmt(tempo)}h)`}
                    valor={H === null ? '—' : `${fmt(H)} ${t('porHora')}`}
                    significa={H === null ? undefined : t('sig.h')}
                  />
                  <LinhaResultado
                    label={t('mttf')}
                    valor={`${fmt(modelo.mttf)} h`}
                    conversao={tCalc('emDias', { n: fmt(modelo.mttf / 24, 1) })}
                    destaque
                    significa={t('sig.mttf')}
                  />
                  <LinhaResultado
                    label={t('b10')}
                    valor={`${fmt(b10)} h`}
                    conversao={tCalc('emDias', { n: fmt(b10 / 24, 1) })}
                    significa={t('sig.b10')}
                  />
                </>
              );
            })()
          ) : (
            <p className="py-2 text-sm text-slate-500">{t('invalido')}</p>
          )}
        </div>
      </div>

      {curva.length > 0 && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-slate-500">
              R(t)
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={curva} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
                <CartesianGrid stroke="#eef1f6" />
                <XAxis dataKey="t" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 1]} tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(v) => (typeof v === 'number' ? v.toFixed(3) : String(v))}
                  labelFormatter={(l) => `t = ${l} h`}
                />
                <Line type="monotone" dataKey="R" stroke="var(--navy-700)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-slate-500">
              h(t)
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={curva} margin={{ top: 4, right: 8, bottom: 0, left: -8 }}>
                <CartesianGrid stroke="#eef1f6" />
                <XAxis dataKey="t" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => Number(v).toExponential(0)} />
                <Tooltip
                  formatter={(v) => (typeof v === 'number' ? v.toExponential(3) : String(v))}
                  labelFormatter={(l) => `t = ${l} h`}
                />
                <Line type="monotone" dataKey="h" stroke="#7f77dd" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-slate-400">{t('rodape')}</p>
    </div>
  );
}
