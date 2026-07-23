'use client';

import { useSearchParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { construirUrlLocale } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// F08: o switch de idioma preserva a página atual (rota traduzida pelo
// next-intl) E a query atual (DEV-083 #3 — busca não se perde mais ao trocar).
export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const outro: Locale = locale === 'pt' ? 'en' : 'pt';
  return (
    <Link
      href={construirUrlLocale(pathname, searchParams)}
      locale={outro}
      aria-label={label}
      className="rounded-full border border-slate-500 px-3 py-1 text-xs font-medium text-slate-200 transition-colors hover:border-slate-300 hover:text-white"
    >
      {locale === 'pt' ? 'EN' : 'PT'}
    </Link>
  );
}
