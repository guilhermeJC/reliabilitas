import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { montaBeaconCloudflare } from '@/lib/analytics';
import { metadadosBase } from '@/lib/seo/metadados';
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SidebarShell } from '@/components/sidebar-shell';
import { SidebarRodape } from '@/components/sidebar-rodape';
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

// DEV-133 — metadados do site inteiro, incluindo Open Graph e imagem de
// preview. Era `metadata` estático sem `openGraph`: só as notas declaravam
// (DEV-121), então a HOME — a página que o anúncio do lançamento divulga —
// renderizava sem imagem e com título genérico ao ser compartilhada.
// Vira `generateMetadata` porque o texto muda por idioma.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return metadadosBase(locale as Locale);
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
  const tTree = await getTranslations('tree');

  // DEV-109 — beacon do Cloudflare Web Analytics com o nonce da requisição
  // (o middleware já o injeta em x-nonce). Sem CF_ANALYTICS_TOKEN no ambiente,
  // `beacon` é null e nada é renderizado.
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const beacon = montaBeaconCloudflare(process.env.CF_ANALYTICS_TOKEN, nonce);

  return (
    <html lang={locale} className={`${plexSans.variable} ${jetBrainsMono.variable}`}>
      <body>
        <NextIntlClientProvider>
          <SiteHeader locale={locale as Locale} />
          {/* Rodada 6 (09/07): shell client controla o toggle da arvore
              (sessionStorage — DEV-083 #1 — + evento do hamburger). SSR
              sempre renderiza aberta — BR-010 intacto. */}
          <SidebarShell
            sidebar={<TreeNav locale={locale as Locale} />}
            footer={<SiteFooter locale={locale as Locale} />}
            rodapeSidebar={<SidebarRodape locale={locale as Locale} />}
            labels={{
              nav: tTree('title'),
              collapse: tTree('collapse'),
              expand: tTree('expand'),
            }}
          >
            {children}
          </SidebarShell>
        </NextIntlClientProvider>
        {beacon && (
          <script
            type={beacon.type}
            src={beacon.src}
            nonce={beacon.nonce}
            data-cf-beacon={beacon.dataCfBeacon}
            defer
          />
        )}
      </body>
    </html>
  );
}
