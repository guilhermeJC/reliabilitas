import { getTranslations } from 'next-intl/server';
import { metodoPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Guia "How to use" (revisão do fundador, 08/07 — 2ª iteração): agora em PÁGINA
// PRÓPRIA (/calculadoras/guia), chamada por um banner no topo das calculadoras,
// para não alongar a página das ferramentas. Seções abertas — numa página
// dedicada o conteúdo fica todo visível (e integral no SSR — BR-010).

function Bloco({ rotulo, texto }: { rotulo: string; texto: string }) {
  return (
    <div className="mt-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">{rotulo}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-700">{texto}</p>
    </div>
  );
}

export async function GuiaCalculadoras({ locale }: { locale: Locale }) {
  const t = await getTranslations('calc.guia');

  const ferramentas = ['weibull', 'disp', 'pf'] as const;

  return (
    <div>
      <h3 className="mt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {t('fluxoTitulo')}
      </h3>
      <p className="mt-1 text-[15px] leading-relaxed text-slate-700">{t('fluxoTexto')}</p>

      <h3 className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {t('ondeTitulo')}
      </h3>
      <p className="mt-1 text-[15px] leading-relaxed text-slate-700">{t('ondeTexto')}</p>

      <div className="mt-6 space-y-4">
        {ferramentas.map((f) => (
          <section
            key={f}
            className="rounded-lg border border-l-4 bg-white p-5"
            style={{ borderColor: '#e3e8f0', borderLeftColor: 'var(--navy-700)' }}
          >
            <h2 className="text-base font-medium" style={{ color: 'var(--navy-700)' }}>
              {t(`${f}.titulo`)}
            </h2>
            <Bloco rotulo={t('labelTeoria')} texto={t(`${f}.teoria`)} />
            <Bloco rotulo={t('labelParametros')} texto={t(`${f}.parametros`)} />
            <Bloco rotulo={t('labelEstimar')} texto={t(`${f}.estimar`)} />
            <Bloco rotulo={t('labelUsar')} texto={t(`${f}.usar`)} />
          </section>
        ))}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-slate-400">
        {t('fontes')}{' '}
        <a href={metodoPath(locale)} style={{ color: 'var(--wikilink)' }}>
          {t('metodoLink')}
        </a>
      </p>
    </div>
  );
}
