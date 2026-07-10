import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { SiteHeader } from '@/components/site-header';
import { SidebarShell } from '@/components/sidebar-shell';
import { TreeNav } from '@/components/tree-nav';
import type { Locale } from '@/lib/content/schema';
import '../globals.css';

// Shell "sala de controle" (DESIGN_wireframe §1): chrome navy abraça o conteúdo.
// Tipografia DEV-015: IBM Plex Sans (UI/títulos) + JetBrains Mono (dados) via
// next/font — self-hosted, compatível com CSP font-src 'self'.
// Build HERMÉTICO: a árvore (TreeNav) consulta o banco, então nada aqui
// pré-renderiza em build (o CI não tem credenciais — e não deve ter).
// ISR/prerender entram no Dia 5 (G6) com estratégia própria na Vercel.
export const dynamic = 'force-dynamic';

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
  const tTree = await getTranslations('tree');

  return (
    <html lang={locale} className={`${plexSans.variable} ${jetBrainsMono.variable}`}>
      <body>
        <NextIntlClientProvider>
          <SiteHeader locale={locale as Locale} />
          {/* Rodada 6 (09/07): shell client controla o toggle da arvore
              (localStorage + evento do hamburger). SSR sempre renderiza
              aberta — BR-010 intacto. */}
          <SidebarShell
            sidebar={<TreeNav locale={locale as Locale} />}
            labels={{
              nav: tTree('title'),
              collapse: tTree('collapse'),
              expand: tTree('expand'),
            }}
          >
            {children}
          </SidebarShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
