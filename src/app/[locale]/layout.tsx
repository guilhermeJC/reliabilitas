import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SiteHeader } from '@/components/site-header';
import { TreeNav } from '@/components/tree-nav';
import type { Locale } from '@/lib/content/schema';
import '../globals.css';

// Shell "sala de controle" (DESIGN_wireframe §1): chrome navy abraça o conteúdo.
// Tipografia DEV-015: IBM Plex Sans (UI/títulos) + JetBrains Mono (dados) via
// next/font — self-hosted, compatível com CSP font-src 'self'.

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jbmono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'RELIABILITAS', template: '%s · RELIABILITAS' },
  description: 'O conhecimento de confiabilidade que a indústria precisa — acessível a todos.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${plexSans.variable} ${jetBrainsMono.variable}`}>
      <body>
        <NextIntlClientProvider>
          <SiteHeader locale={locale as Locale} />
          <div className="mx-auto flex w-full max-w-7xl">
            <TreeNav locale={locale as Locale} />
            <main className="min-w-0 flex-1">{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
