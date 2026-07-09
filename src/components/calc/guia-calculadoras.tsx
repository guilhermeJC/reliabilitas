import { getTranslations } from 'next-intl/server';
import { metodoPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Guia "How to use" (revisão do fundador, 09/07 — 5ª iteração: janelas
// colapsáveis, não uma parede de texto). Dois níveis de <details> NATIVOS
// (mesmo padrão da barra lateral, rodada 3): cada ferramenta é uma janela; e
// dentro dela "O que é / Como estimar / Como usar" são sub-janelas que abrem
// ao clicar. Zero JS, acessível, conteúdo íntegro no SSR (crawlers/LLMs leem
// tudo mesmo fechado — BR-010).

const FERRAMENTAS = [
  {
    chave: 'weibull',
    simbolos: [
      { s: 'β', nome: 'pBetaNome', desc: 'pBetaDesc' },
      { s: 'η', nome: 'pEtaNome', desc: 'pEtaDesc' },
      { s: 't', nome: 'pTNome', desc: 'pTDesc' },
    ],
    nEst: 5,
    nUso: 5,
    temRegua: true,
  },
  {
    chave: 'disp',
    simbolos: [
      { s: 'MTBF', nome: 'pMtbfNome', desc: 'pMtbfDesc' },
      { s: 'MTTR', nome: 'pMttrNome', desc: 'pMttrDesc' },
    ],
    nEst: 4,
    nUso: 4,
    temRegua: false,
  },
  {
    chave: 'pf',
    simbolos: [
      { s: 'P-F', nome: 'pPfNome', desc: 'pPfDesc' },
      { s: 'Insp.', nome: 'pInspNome', desc: 'pInspDesc' },
    ],
    nEst: 4,
    nUso: 4,
    temRegua: false,
  },
] as const;

// Régua do β — as MESMAS cores da leitura Fw A ao vivo da calculadora
const REGUA_BETA = [
  { faixa: 'β < 1', nome: 'beta1Nome', taxa: 'beta1Taxa', desc: 'beta1Desc', cor: '#b45309' },
  {
    faixa: 'β ≈ 1',
    nome: 'beta2Nome',
    taxa: 'beta2Taxa',
    desc: 'beta2Desc',
    cor: 'var(--gray-tech)',
  },
  { faixa: 'β > 1', nome: 'beta3Nome', taxa: 'beta3Taxa', desc: 'beta3Desc', cor: 'var(--fw-a)' },
] as const;

const TAG_CORES: Record<string, string> = {
  weibull: 'var(--fw-a)',
  disp: 'var(--navy-700)',
  pf: 'var(--fw-b)',
};

function Chevron() {
  return (
    <svg
      className="tree-chevron shrink-0"
      width="11"
      height="11"
      viewBox="0 0 10 10"
      aria-hidden="true"
    >
      <path
        d="M3.5 1.5 L6.5 5 L3.5 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">{children}</p>
  );
}

// Passo numerado: número em círculo, título em negrito, procedimento abaixo.
function Passo({ n, titulo, detalhe }: { n: number; titulo: string; detalhe: string }) {
  return (
    <li className="flex gap-3">
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-medium text-white"
        style={{ background: 'var(--navy-700)' }}
      >
        {n}
      </span>
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--navy-900)' }}>
          {titulo}
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{detalhe}</p>
      </div>
    </li>
  );
}

// Sub-janela (nível 2): O que é / Como estimar / Como usar.
function Janela({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <details className="acc rounded-md border" style={{ borderColor: '#e3e8f0' }}>
      <summary className="flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
        <Chevron />
        {titulo}
      </summary>
      <div className="px-3 pb-3 pt-1">{children}</div>
    </details>
  );
}

export async function GuiaCalculadoras({ locale }: { locale: Locale }) {
  const t = await getTranslations('calc.guia');

  return (
    <div>
      {/* O fluxo em 30 segundos — o mapa da página, sempre visível */}
      <h2 className="mt-8 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {t('fluxoTitulo')}
      </h2>
      <p className="mt-1 text-sm text-slate-600">{t('fluxoIntro')}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {(['1', '2', '3'] as const).map((n, i) => (
          <div
            key={n}
            className="rounded-lg border bg-white p-4"
            style={{ borderColor: '#d3dae6' }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-lg text-slate-300">{n}</span>
              <span
                className="rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white"
                style={{ background: TAG_CORES[FERRAMENTAS[i].chave] }}
              >
                {t(`fluxo${n}Tag`)}
              </span>
            </div>
            <p
              className="mt-2 text-sm font-medium leading-snug"
              style={{ color: 'var(--navy-900)' }}
            >
              {t(`fluxo${n}Pergunta`)}
            </p>
            <p className="mt-1 font-mono text-[11px] text-slate-500">{t(`fluxo${n}Nome`)}</p>
          </div>
        ))}
      </div>

      {/* De onde vêm os dados — bullets + o aviso nº 1 */}
      <h2 className="mt-10 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {t('ondeTitulo')}
      </h2>
      <ul className="mt-2 space-y-1.5">
        {(['onde1', 'onde2', 'onde3'] as const).map((k) => (
          <li key={k} className="flex gap-2 text-sm leading-relaxed text-slate-700">
            <span className="text-slate-400">·</span>
            <span>{t(k)}</span>
          </li>
        ))}
      </ul>
      <p
        className="mt-3 rounded-md border-l-4 bg-amber-50/60 px-4 py-2.5 text-sm leading-relaxed text-slate-700"
        style={{ borderColor: '#b45309' }}
      >
        ⚠ {t('ondeAviso')}
      </p>

      {/* As três ferramentas — janelas colapsáveis (nível 1) */}
      <h2 className="mt-10 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {t('titulo')}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{t('expandirDica')}</p>
      <div className="mt-3 space-y-3">
        {FERRAMENTAS.map((f, i) => (
          <details
            key={f.chave}
            className="acc overflow-hidden rounded-lg border border-l-4 bg-white"
            style={{ borderColor: '#d3dae6', borderLeftColor: TAG_CORES[f.chave] }}
          >
            <summary className="flex cursor-pointer items-center gap-3 p-4 transition-colors hover:bg-slate-50 md:p-5">
              <Chevron />
              <span className="font-mono text-base text-slate-300">{i + 1}</span>
              <span className="flex-1">
                <span className="block text-base font-medium" style={{ color: 'var(--navy-900)' }}>
                  {t(`${f.chave}.titulo`)}
                </span>
                <span className="block text-sm text-slate-500">{t(`${f.chave}.pergunta`)}</span>
              </span>
              <span
                className="shrink-0 rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white"
                style={{ background: TAG_CORES[f.chave] }}
              >
                {t(`fluxo${i + 1}Tag`)}
              </span>
            </summary>

            <div
              className="space-y-2 border-t px-4 pb-4 pt-3 md:px-5"
              style={{ borderColor: '#eef1f6' }}
            >
              {/* Nível 2 — O que é */}
              <Janela titulo={t('labelOQueE')}>
                <Rotulo>{t('labelTeoria')}</Rotulo>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">
                  {t(`${f.chave}.teoria`)}
                </p>
                <p className="mt-2 rounded-md bg-slate-100 px-3 py-2 font-mono text-[13px] text-slate-700">
                  {t(`${f.chave}.formula`)}
                </p>

                <div className="mt-4">
                  <Rotulo>{t('labelParametros')}</Rotulo>
                </div>
                <div
                  className="mt-2 overflow-hidden rounded-md border"
                  style={{ borderColor: '#e3e8f0' }}
                >
                  {f.simbolos.map((p, j) => (
                    <div
                      key={p.s}
                      className={`grid grid-cols-[64px_1fr] gap-x-3 px-3 py-2 sm:grid-cols-[64px_200px_1fr] ${j > 0 ? 'border-t' : ''}`}
                      style={{ borderColor: '#eef1f6' }}
                    >
                      <span
                        className="font-mono text-sm font-medium"
                        style={{ color: 'var(--navy-700)' }}
                      >
                        {p.s}
                      </span>
                      <span className="text-sm text-slate-600">{t(`${f.chave}.${p.nome}`)}</span>
                      <span className="col-span-2 mt-0.5 text-sm leading-snug text-slate-500 sm:col-span-1 sm:mt-0">
                        {t(`${f.chave}.${p.desc}`)}
                      </span>
                    </div>
                  ))}
                </div>

                {f.temRegua && (
                  <>
                    <div className="mt-4">
                      <Rotulo>{t('weibull.betaTitulo')}</Rotulo>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">
                      {t('weibull.betaIntro')}
                    </p>
                    <div className="mt-2 space-y-2">
                      {REGUA_BETA.map((b) => (
                        <div
                          key={b.faixa}
                          className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-start sm:gap-3"
                          style={{ borderColor: '#e3e8f0' }}
                        >
                          <span
                            className="w-fit shrink-0 rounded px-2 py-0.5 font-mono text-[12px] font-medium text-white"
                            style={{ background: b.cor }}
                          >
                            {b.faixa}
                          </span>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium" style={{ color: 'var(--navy-900)' }}>
                                {t(`weibull.${b.nome}`)}
                              </span>
                              <span className="text-slate-500"> — {t(`weibull.${b.taxa}`)}</span>
                            </p>
                            <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                              {t(`weibull.${b.desc}`)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Janela>

              {/* Nível 2 — Como estimar / medir */}
              <Janela titulo={t('labelEstimar')}>
                <ol className="space-y-3">
                  {Array.from({ length: f.nEst }, (_, j) => j + 1).map((n) => (
                    <Passo
                      key={n}
                      n={n}
                      titulo={t(`${f.chave}.est${n}t`)}
                      detalhe={t(`${f.chave}.est${n}d`)}
                    />
                  ))}
                </ol>
              </Janela>

              {/* Nível 2 — Como usar */}
              <Janela titulo={t('labelUsar')}>
                <ol className="space-y-3">
                  {Array.from({ length: f.nUso }, (_, j) => j + 1).map((n) => (
                    <Passo
                      key={n}
                      n={n}
                      titulo={t(`${f.chave}.uso${n}t`)}
                      detalhe={t(`${f.chave}.uso${n}d`)}
                    />
                  ))}
                </ol>
              </Janela>
            </div>
          </details>
        ))}
      </div>

      <p className="mt-8 text-xs leading-relaxed text-slate-400">
        {t('fontes')}{' '}
        <a href={metodoPath(locale)} style={{ color: 'var(--wikilink)' }}>
          {t('metodoLink')}
        </a>
      </p>
    </div>
  );
}
