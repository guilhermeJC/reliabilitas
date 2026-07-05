'use client';

import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/lib/content/schema';

// F08: o switch de idioma preserva a página atual (rota traduzida pelo next-intl).
export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const outro: Locale = locale === 'pt' ? 'en' : 'pt';
  return (
    <Link
      href={pathname}
      locale={outro}
      aria-label={label}
      className="rounded-full border border-slate-500 px-3 py-1 text-xs font-medium text-slate-200 transition-colors hover:border-slate-300 hover:text-white"
    >
      {locale === 'pt' ? 'EN' : 'PT'}
    </Link>
  );
}
