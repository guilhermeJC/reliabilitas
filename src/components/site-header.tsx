import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocaleSwitch } from '@/components/locale-switch';
import type { Locale } from '@/lib/content/schema';

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations('header');
  return (
    <header style={{ background: 'var(--navy-900)' }}>
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="text-[15px] font-medium tracking-[0.18em] text-white">RELIABILITAS</span>
          <span className="hidden text-xs text-slate-400 sm:inline">{t('tagline')}</span>
        </Link>
        <LocaleSwitch locale={locale} label={t('switchTo')} />
      </div>
    </header>
  );
}
