import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocaleSwitch } from '@/components/locale-switch';
import { SidebarHamburger } from '@/components/sidebar-hamburger';
import { apoioPath, buscaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations('header');
  const tBusca = await getTranslations('busca');
  return (
    // DEV-026: header fixo (sticky) — o CTA de apoio fica no canto superior
    // direito em TODAS as páginas, sem roubar espaço de conteúdo.
    <header className="sticky top-0 z-40" style={{ background: 'var(--navy-900)' }}>
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          {/* Rodada 6 (09/07): hamburger que abre/fecha a arvore lateral */}
          <SidebarHamburger label={t('sidebarToggle')} />
          <Link href="/" className="flex items-baseline gap-3">
            <span className="text-[15px] font-medium tracking-[0.18em] text-white">
              RELIABILITAS
            </span>
            <span className="hidden text-xs text-slate-400 lg:inline">{t('tagline')}</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {/* T05: GET puro — busca funciona de qualquer página, sem JS */}
          <form action={buscaPath(locale)} method="get" className="hidden sm:block">
            <input
              type="search"
              name="q"
              placeholder={tBusca('placeholder')}
              aria-label={tBusca('titulo')}
              className="w-52 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white placeholder:text-slate-400 focus:bg-white focus:text-slate-800"
            />
          </form>
          <LocaleSwitch locale={locale} label={t('switchTo')} />
          {/* DEV-026: accent é funcional — apoiar é a ação que sustenta o projeto */}
          <a
            href={apoioPath(locale)}
            className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            ♥ {t('apoiar')}
          </a>
        </div>
      </div>
    </header>
  );
}
