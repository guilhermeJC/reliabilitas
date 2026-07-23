'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { classificaPosicao, curvaBomba, curvaSistema, pontoOperacao } from '@/lib/calc/curva-hq';
import { Slider } from '@/components/ui/slider';
import { LinhaResultado, fmt } from '@/components/calc/campos';

// Curva H-Q viva do handbook (sessão 5): a tese "a bomba não escolhe onde
// opera — o sistema decide" virando ferramenta. Dois controles editam as duas
// curvas (rotação → curva da bomba via afinidade; estática → curva do sistema)
// e o ponto de operação segue a interseção, com o POR 70–120% sombreado.
// 100% client-side: nenhum dado sai da página (BR-004/D11).

const COR_STATUS: Record<string, string> = {
  por: 'var(--fw-b)', // verde Fw B — janela saudável
  recirculacao: '#b45309', // âmbar técnico — baixa vazão
  runout: '#b45309', // âmbar técnico — alta vazão
  shutoff: '#b91c1c', // vermelho — bomba não vence a estática
};

export function CurvaHq() {
  const t = useTranslations('calc.curvaHq');
  const [rotacao, setRotacao] = useState(100); // % da rotação nominal
  const [estatica, setEstatica] = useState(50); // % do head de BEP nominal

  const r = rotacao / 100;
  const hEst = estatica / 100;
  const K_SIS = 0.5; // atrito do sistema fixo: os defaults cruzam exatamente no BEP

  const ponto = pontoOperacao(r, hEst, K_SIS);
  const status = ponto ? classificaPosicao(ponto.q, r) : 'shutoff';

  const dados = useMemo(() => {
    const pontos = [];
    const passos = 48;
    for (let i = 0; i <= passos; i++) {
      const q = (i / passos) * 1.6;
      const hb = curvaBomba(q, r);
      pontos.push({
        q: Number(q.toFixed(3)),
        bomba: hb >= 0 ? Number(hb.toFixed(4)) : null,
        sistema: Number(curvaSistema(q, hEst, K_SIS).toFixed(4)),
      });
    }
    return pontos;
  }, [r, hEst]);

  return (
    <div className="rounded-lg border bg-white p-5" style={{ borderColor: '#e3e8f0' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('titulo')}
        </h3>
        <span
          className="rounded px-2 py-0.5 text-[11px] font-medium text-white"
          style={{ background: COR_STATUS[status] }}
        >
          {t(`status.${status}` as never)}
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500">{t('sub')}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="text-sm">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600">{t('rotacao')}</span>
              <span className="font-mono text-sm" style={{ color: 'var(--navy-700)' }}>
                {rotacao}%
              </span>
            </div>
            <div className="mt-2">
              <Slider
                value={rotacao}
                onValueChange={setRotacao}
                min={50}
                max={110}
                step={1}
                aria-label={t('rotacao')}
              />
            </div>
            <p className="mt-1 text-[11px] leading-snug text-slate-400">{t('rotacaoSig')}</p>
          </div>

          <div className="text-sm">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600">{t('estatica')}</span>
              <span className="font-mono text-sm" style={{ color: 'var(--navy-700)' }}>
                {estatica}%
              </span>
            </div>
            <div className="mt-2">
              <Slider
                value={estatica}
                onValueChange={setEstatica}
                min={0}
                max={110}
                step={5}
                aria-label={t('estatica')}
              />
            </div>
            <p className="mt-1 text-[11px] leading-snug text-slate-400">{t('estaticaSig')}</p>
          </div>

          <div className="rounded-md bg-slate-50 px-4 py-2">
            {ponto ? (
              <>
                <LinhaResultado
                  label={t('vazao')}
                  valor={`${fmt(ponto.q * 100, 0)}%`}
                  destaque
                  significa={t('vazaoSig', { pct: fmt((ponto.q / r) * 100, 0) })}
                />
                <LinhaResultado label={t('head')} valor={`${fmt(ponto.h * 100, 0)}%`} />
              </>
            ) : (
              <p className="py-1.5 text-sm text-slate-600">{t('shutoffMsg')}</p>
            )}
          </div>
        </div>

        <div className="h-56 md:h-auto">
          <ResponsiveContainer width="100%" height="100%" minHeight={220}>
            <LineChart data={dados} margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
              <CartesianGrid stroke="#eef1f6" />
              <XAxis
                dataKey="q"
                type="number"
                domain={[0, 1.6]}
                tick={{ fontSize: 10 }}
                tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
              />
              <YAxis
                domain={[0, 1.6]}
                tick={{ fontSize: 10 }}
                tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
              />
              <Tooltip
                formatter={(v, nome) => [
                  typeof v === 'number' ? `${Math.round(v * 100)}%` : String(v),
                  nome === 'bomba' ? t('bomba') : t('sistema'),
                ]}
                labelFormatter={(l) =>
                  typeof l === 'number' ? `${t('vazao')}: ${Math.round(l * 100)}%` : String(l)
                }
              />
              <ReferenceArea
                x1={0.7 * r}
                x2={Math.min(1.2 * r, 1.6)}
                fill="var(--fw-b)"
                fillOpacity={0.08}
              />
              <Line
                type="monotone"
                dataKey="bomba"
                stroke="var(--navy-700)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="sistema"
                stroke="var(--gray-tech)"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
                isAnimationActive={false}
              />
              {ponto && (
                <ReferenceDot
                  x={ponto.q}
                  y={ponto.h}
                  r={5}
                  fill={COR_STATUS[status]}
                  stroke="#fff"
                  strokeWidth={1.5}
                />
              )}
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
