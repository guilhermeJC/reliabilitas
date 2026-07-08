'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { decidirEstrategia, type ComportamentoFwA, type Consequencia } from '@/lib/rcm/decisao';
import { calculadorasPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Seletor de estratégia (revisão 4 do fundador): 4 perguntas → diagrama de
// decisão do RCM (lib pura, testada contra Moubray/JA1011) → estratégia +
// plano-base. 100% client-side: nenhum dado sai da página (BR-004).

type SimNao = 'sim' | 'nao';

function Pergunta({
  legenda,
  hint,
  children,
}: {
  legenda: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset
      className="border-t pt-4 first:border-t-0 first:pt-0"
      style={{ borderColor: '#e3e8f0' }}
    >
      <legend className="text-sm font-medium" style={{ color: 'var(--navy-900)' }}>
        {legenda}
      </legend>
      {hint && <p className="mt-1 text-xs leading-relaxed text-slate-500">{hint}</p>}
      <div className="mt-2 space-y-1.5">{children}</div>
    </fieldset>
  );
}

function Opcao({
  name,
  value,
  atual,
  onChange,
  rotulo,
}: {
  name: string;
  value: string;
  atual: string | null;
  onChange: (v: string) => void;
  rotulo: string;
}) {
  return (
    <label className="flex cursor-pointer items-baseline gap-2 text-sm text-slate-700">
      <input
        type="radio"
        name={name}
        value={value}
        checked={atual === value}
        onChange={() => onChange(value)}
        className="translate-y-0.5 accent-[#1A3A6B]"
      />
      <span>{rotulo}</span>
    </label>
  );
}

export function SeletorEstrategia() {
  const t = useTranslations('metodo.seletor');
  const tFw = useTranslations('fw');
  const locale = useLocale() as Locale;

  const [comportamento, setComportamento] = useState<ComportamentoFwA | null>(null);
  const [evidente, setEvidente] = useState<SimNao | null>(null);
  const [temPf, setTemPf] = useState<SimNao | null>(null);
  const [consequencia, setConsequencia] = useState<Consequencia | null>(null);

  const completo =
    comportamento !== null && evidente !== null && temPf !== null && consequencia !== null;

  const resultado = completo
    ? decidirEstrategia({
        comportamento,
        evidente: evidente === 'sim',
        temPf: temPf === 'sim',
        consequencia,
      })
    : null;

  return (
    <div id="seletor" className="rounded-lg border bg-white p-6" style={{ borderColor: '#e3e8f0' }}>
      <h2 className="text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
        {t('titulo')}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('intro')}</p>

      <div className="mt-5 space-y-5">
        <Pergunta legenda={t('q1')}>
          {(['infantil', 'aleatoria', 'desgaste', 'desconhecido'] as const).map((v) => (
            <Opcao
              key={v}
              name="comportamento"
              value={v}
              atual={comportamento}
              onChange={(x) => setComportamento(x as ComportamentoFwA)}
              rotulo={t(`q1_${v}`)}
            />
          ))}
        </Pergunta>

        <Pergunta legenda={t('q2')} hint={t('q2Hint')}>
          {(['sim', 'nao'] as const).map((v) => (
            <Opcao
              key={v}
              name="evidente"
              value={v}
              atual={evidente}
              onChange={(x) => setEvidente(x as SimNao)}
              rotulo={t(`q2_${v}`)}
            />
          ))}
        </Pergunta>

        <Pergunta legenda={t('q3')} hint={t('q3Hint')}>
          {(['sim', 'nao'] as const).map((v) => (
            <Opcao
              key={v}
              name="temPf"
              value={v}
              atual={temPf}
              onChange={(x) => setTemPf(x as SimNao)}
              rotulo={t(`q3_${v}`)}
            />
          ))}
        </Pergunta>

        <Pergunta legenda={t('q4')}>
          {(['seguranca', 'operacional', 'nao_operacional'] as const).map((v) => (
            <Opcao
              key={v}
              name="consequencia"
              value={v}
              atual={consequencia}
              onChange={(x) => setConsequencia(x as Consequencia)}
              rotulo={t(`q4_${v}`)}
            />
          ))}
        </Pergunta>
      </div>

      <div
        aria-live="polite"
        className="mt-6 rounded-md border-l-4 bg-slate-50 p-4"
        style={{ borderColor: 'var(--fw-b)' }}
      >
        {resultado ? (
          <>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
              {t('resultadoTitulo')}
            </p>
            <p className="mt-1 text-xl font-medium" style={{ color: 'var(--fw-b)' }}>
              {tFw(`decisoes.${resultado.decisao}`)}
            </p>
            <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
              <dt className="font-medium text-slate-500">{t('planoTarefa')}</dt>
              <dd className="text-slate-700">{t(`tarefas.${resultado.plano.tarefa}`)}</dd>
              <dt className="font-medium text-slate-500">{t('planoPeriodicidade')}</dt>
              <dd className="font-mono text-[13px] text-slate-700">
                {t(`periodicidades.${resultado.plano.periodicidade}`)}
              </dd>
            </dl>
            {resultado.avisos.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {resultado.avisos.map((a) => (
                  <li key={a} className="text-[13px] leading-relaxed text-slate-600">
                    ⚠ {t(`avisos.${a}`)}
                  </li>
                ))}
              </ul>
            )}
            {(resultado.decisao === 'cbm' ||
              resultado.decisao === 'tbm' ||
              resultado.decisao === 'proof_test') && (
              <p className="mt-3 text-sm">
                <a href={calculadorasPath(locale)} style={{ color: 'var(--wikilink)' }}>
                  {t(`calcLinks.${resultado.decisao}`)}
                </a>
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-slate-500">{t('incompleto')}</p>
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-400">{t('fontes')}</p>
    </div>
  );
}
