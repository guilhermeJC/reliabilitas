import { getTranslations } from 'next-intl/server';
import { metodoPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Guia "How to use" (revisão do fundador, 08/07 — 4ª iteração: conteúdo técnico
// de verdade). Fluxo em 3 cards com a PERGUNTA de cada ferramenta; parâmetros em
// tabela símbolo → nome → significado; régua do β com nome/taxa/implicação de
// manutenção por regime; ESTIMAR e USAR como passos numerados (título +
// procedimento), não bullets soltos. Server component — SSR integral (BR-010).

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

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
      {children}
    </p>
  );
}

// Passo numerado: número em coluna própria, título em negrito, procedimento
// abaixo. É o que dá o caráter de "instrução de verdade" pedido pelo fundador.
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

export async function GuiaCalculadoras({ locale }: { locale: Locale }) {
  const t = await getTranslations('calc.guia');

  return (
    <div>
      {/* O fluxo em 30 segundos — 1 card por ferramenta, a PERGUNTA em destaque */}
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

      {/* Uma seção por ferramenta */}
      <div className="mt-10 space-y-6">
        {FERRAMENTAS.map((f, i) => (
          <section
            key={f.chave}
            className="rounded-lg border border-l-4 bg-white p-5 md:p-6"
            style={{ borderColor: '#e3e8f0', borderLeftColor: TAG_CORES[f.chave] }}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-lg text-slate-300">{i + 1}</span>
              <h2 className="text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
                {t(`${f.chave}.titulo`)}
              </h2>
              <span className="text-sm text-slate-500">{t(`${f.chave}.pergunta`)}</span>
            </div>

            <Rotulo>{t('labelTeoria')}</Rotulo>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{t(`${f.chave}.teoria`)}</p>
            <p className="mt-2 rounded-md bg-slate-100 px-3 py-2 font-mono text-[13px] text-slate-700">
              {t(`${f.chave}.formula`)}
            </p>

            <Rotulo>{t('labelParametros')}</Rotulo>
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
                <Rotulo>{t('weibull.betaTitulo')}</Rotulo>
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

            <Rotulo>{t('labelEstimar')}</Rotulo>
            <ol className="mt-2 space-y-3">
              {Array.from({ length: f.nEst }, (_, j) => j + 1).map((n) => (
                <Passo
                  key={n}
                  n={n}
                  titulo={t(`${f.chave}.est${n}t`)}
                  detalhe={t(`${f.chave}.est${n}d`)}
                />
              ))}
            </ol>

            <Rotulo>{t('labelUsar')}</Rotulo>
            <ol className="mt-2 space-y-3">
              {Array.from({ length: f.nUso }, (_, j) => j + 1).map((n) => (
                <Passo
                  key={n}
                  n={n}
                  titulo={t(`${f.chave}.uso${n}t`)}
                  detalhe={t(`${f.chave}.uso${n}d`)}
                />
              ))}
            </ol>
          </section>
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
