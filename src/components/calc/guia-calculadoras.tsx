import { getTranslations } from 'next-intl/server';
import { metodoPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Guia "How to use" (revisão do fundador, 08/07): a teoria por trás das três
// calculadoras, o que é cada parâmetro, de onde tirar os números e como ler os
// resultados — no COMEÇO da página, porque nem todo visitante sabe de cor.
// <details> nativos fechados por padrão (padrão da rodada 3): zero JS, todo o
// conteúdo presente no HTML do SSR (crawlers leem tudo — BR-010 intocada).

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
    <section
      id="guia"
      className="rounded-lg border border-l-4 bg-white p-5"
      style={{ borderColor: '#e3e8f0', borderLeftColor: 'var(--navy-700)' }}
    >
      <h2 className="text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
        {t('titulo')}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{t('sub')}</p>

      <h3 className="mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {t('fluxoTitulo')}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-700">{t('fluxoTexto')}</p>

      <h3 className="mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {t('ondeTitulo')}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-700">{t('ondeTexto')}</p>

      <div className="mt-4 space-y-2">
        {ferramentas.map((f) => (
          <details
            key={f}
            className="rounded-md border px-4 py-3"
            style={{ borderColor: '#e3e8f0' }}
          >
            <summary
              className="cursor-pointer text-sm font-medium"
              style={{ color: 'var(--navy-700)' }}
            >
              {t(`${f}.titulo`)}
            </summary>
            <Bloco rotulo={t('labelTeoria')} texto={t(`${f}.teoria`)} />
            <Bloco rotulo={t('labelParametros')} texto={t(`${f}.parametros`)} />
            <Bloco rotulo={t('labelEstimar')} texto={t(`${f}.estimar`)} />
            <Bloco rotulo={t('labelUsar')} texto={t(`${f}.usar`)} />
          </details>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        {t('fontes')}{' '}
        <a href={metodoPath(locale)} style={{ color: 'var(--wikilink)' }}>
          {t('metodoLink')}
        </a>
      </p>
    </section>
  );
}
