import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { calculadorasPath, metodoPath, notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Framework A — Diagnóstico (revisão 4 do fundador): a página que explica O QUE
// o framework é. Fonte da estatística: Nowlan & Heap (1978), United Airlines.

const PADROES_NH = [
  { padrao: 'A', chave: 'nhA', fracao: '4%' },
  { padrao: 'B', chave: 'nhB', fracao: '2%' },
  { padrao: 'C', chave: 'nhC', fracao: '5%' },
  { padrao: 'D', chave: 'nhD', fracao: '7%' },
  { padrao: 'E', chave: 'nhE', fracao: '14%' },
  { padrao: 'F', chave: 'nhF', fracao: '68%' },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'metodo.fwA' });
  return { title: t('titulo'), description: t('p1') };
}

export default async function FrameworkAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('metodo.fwA');
  const l = locale as Locale;

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="border-l-4 pl-4" style={{ borderColor: 'var(--fw-a)' }}>
          <h1 className="text-2xl font-medium" style={{ color: 'var(--fw-a)' }}>
            {t('titulo')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t('sub')}</p>
        </header>

        <p className="mt-6 text-[15px] leading-relaxed text-slate-700">{t('p1')}</p>

        <h2 className="mt-8 text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('nhTitulo')}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{t('nhP1')}</p>
        <div
          className="mt-4 overflow-x-auto rounded-lg border bg-white"
          style={{ borderColor: '#e3e8f0' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: '#e3e8f0' }}>
                <th className="px-4 py-2 font-medium text-slate-500">{t('nhPadrao')}</th>
                <th className="px-4 py-2 font-medium text-slate-500">{t('nhForma')}</th>
                <th className="px-4 py-2 text-right font-medium text-slate-500">{t('nhFracao')}</th>
              </tr>
            </thead>
            <tbody>
              {PADROES_NH.map((p) => (
                <tr
                  key={p.padrao}
                  className="border-b last:border-b-0"
                  style={{ borderColor: '#eef1f6' }}
                >
                  <td className="px-4 py-2 font-mono font-medium" style={{ color: 'var(--fw-a)' }}>
                    {p.padrao}
                  </td>
                  <td className="px-4 py-2 text-slate-700">{t(p.chave)}</td>
                  <td className="px-4 py-2 text-right font-mono text-slate-700">{p.fracao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-8 text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('betaTitulo')}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{t('betaP1')}</p>
        <p className="mt-2 text-sm">
          <a href={calculadorasPath(l)} style={{ color: 'var(--wikilink)' }}>
            {t('betaCalc')}
          </a>
        </p>

        <h2 className="mt-8 text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('saidaTitulo')}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{t('saidaP1')}</p>

        <nav
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t pt-4 text-sm"
          style={{ borderColor: '#e3e8f0' }}
        >
          <a href={notaPath(l, 'cavitacao')} style={{ color: 'var(--wikilink)' }}>
            {t('exemplo')}
          </a>
          <a href={metodoPath(l, 'framework-b')} style={{ color: 'var(--wikilink)' }}>
            {t('irB')}
          </a>
          <a href={`${metodoPath(l)}#seletor`} style={{ color: 'var(--wikilink)' }}>
            {t('irSeletor')}
          </a>
        </nav>
      </div>
    </div>
  );
}
