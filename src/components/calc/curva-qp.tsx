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
import {
  PRESSAO_ALIVIO_TIPICA,
  pressaoDeslocamentoPositivo,
  vazaoDeslocamentoPositivo,
  vazaoRotodinamica,
} from '@/lib/calc/curva-qp';
import { Slider } from '@/components/ui/slider';
import { LinhaResultado, fmt } from '@/components/calc/campos';

// Comparativo Q×P vivo (pedido do fundador, revisão da nota Deslocamento
// Positivo, 18/07): um único controle (abertura da válvula de descarga) e as
// DUAS respostas lado a lado — a rotodinâmica perde vazão suavemente
// (limitada pela própria curva); a deslocamento positivo mantém a vazão e é a
// PRESSÃO que dispara (por isso a válvula de alívio é obrigatória, não
// opcional). 100% client-side: nenhum dado sai da página (BR-004/D11).

export function CurvaQp() {
  const t = useTranslations('calc.curvaQp');
  const [abertura, setAbertura] = useState(100); // % — 0 = fechada, 100 = totalmente aberta

  const a = abertura / 100;
  const qRoto = vazaoRotodinamica(a);
  const qPd = vazaoDeslocamentoPositivo();
  const pPd = pressaoDeslocamentoPositivo(a);
  const alertaAlivio = pPd >= PRESSAO_ALIVIO_TIPICA;

  const dados = useMemo(() => {
    const pontos = [];
    const passos = 40;
    for (let i = 0; i <= passos; i++) {
      const ab = i / passos;
      pontos.push({
        abertura: Number((ab * 100).toFixed(1)),
        rotodinamica: Number((vazaoRotodinamica(ab) * 100).toFixed(2)),
        deslocamentoPositivo: Number((vazaoDeslocamentoPositivo() * 100).toFixed(2)),
      });
    }
    return pontos;
  }, []);

  return (
    <div className="rounded-lg border bg-white p-5" style={{ borderColor: '#e3e8f0' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('titulo')}
        </h3>
        {alertaAlivio && (
          <span className="rounded px-2 py-0.5 text-[11px] font-medium text-white bg-red-700">
            {t('deslocamentoPositivo')}: {fmt(pPd * 100, 0)}%
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-500">{t('sub')}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="text-sm">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600">{t('abertura')}</span>
              <span className="font-mono text-sm" style={{ color: 'var(--navy-700)' }}>
                {abertura}%
              </span>
            </div>
            <div className="mt-2">
              <Slider
                value={abertura}
                onValueChange={setAbertura}
                min={0}
                max={100}
                step={1}
                aria-label={t('abertura')}
              />
            </div>
            <p className="mt-1 text-[11px] leading-snug text-slate-400">{t('aberturaSig')}</p>
          </div>

          <div className="rounded-md bg-slate-50 px-4 py-2">
            <LinhaResultado label={t('rotodinamica')} valor={`${fmt(qRoto * 100, 0)}%`} />
            {qRoto < 0.02 && (
              <p className="pb-1.5 text-[11px] leading-snug text-slate-500">
                {t('shutoffRotodinamica')}
              </p>
            )}
            <LinhaResultado label={t('deslocamentoPositivo')} valor={`${fmt(qPd * 100, 0)}%`} />
            <LinhaResultado
              label={t('pressaoNecessaria')}
              valor={`${fmt(pPd * 100, 0)}%`}
              destaque={alertaAlivio}
              significa={alertaAlivio ? t('alertaAlivio') : t('pressaoSig')}
            />
          </div>
        </div>

        <div className="h-56 md:h-auto">
          <ResponsiveContainer width="100%" height="100%" minHeight={220}>
            <LineChart data={dados} margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
              <CartesianGrid stroke="#eef1f6" />
              <XAxis
                dataKey="abertura"
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
                tickFormatter={(v: number) => `${Math.round(v)}%`}
              />
              <YAxis
                domain={[0, 110]}
                tick={{ fontSize: 10 }}
                tickFormatter={(v: number) => `${Math.round(v)}%`}
              />
              <Tooltip
                formatter={(v, nome) => [
                  typeof v === 'number' ? `${Math.round(v)}%` : String(v),
                  nome === 'rotodinamica' ? t('rotodinamica') : t('deslocamentoPositivo'),
                ]}
                labelFormatter={(l) =>
                  typeof l === 'number' ? `${t('abertura')}: ${Math.round(l)}%` : String(l)
                }
              />
              <Line
                type="monotone"
                dataKey="rotodinamica"
                stroke="var(--navy-700)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="deslocamentoPositivo"
                stroke="var(--accent)"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* DEV-083 #7: legenda visível — o gráfico é um modelo didático
          normalizado, não a curva de catálogo de um fabricante real. */}
      <p className="mt-2 text-[11px] italic leading-snug text-slate-400">{t('legendaModelo')}</p>
    </div>
  );
}
