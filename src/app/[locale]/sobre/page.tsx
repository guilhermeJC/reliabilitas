import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { metodoPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// T11 (resto do Dia 5, 24/07) — "Sobre": quem faz + missão + metodologia
// editorial. Escopo decidido com o fundador em 24/07/2026 pra NÃO duplicar
// /metodo, que já cobre a explicação dos 2 frameworks (Revisão 4) — esta
// página cobre só o que faltava do T11 original (DESIGN_wireframe §2).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'sobre' });
  return { title: t('titulo'), description: t('missao') };
}

export default async function SobrePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('sobre');

  return (
    <div className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('titulo')}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{t('missao')}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('comunidade')}</p>

        <h2 className="mt-8 text-lg font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('quemFazTitulo')}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('quemFaz')}</p>

        <h2 className="mt-8 text-lg font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('metodologiaTitulo')}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('metodologiaTexto')}</p>
        <a
          href={metodoPath(locale as Locale)}
          className="mt-3 inline-block text-sm hover:underline"
          style={{ color: 'var(--wikilink)' }}
        >
          {t('metodologiaLinkTexto')} →
        </a>
      </div>
    </div>
  );
}
