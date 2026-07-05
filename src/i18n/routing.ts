import { defineRouting } from 'next-intl/routing';
import { LOCALES } from '@/lib/content/schema';

// F12/F08 — rotas /{locale}/... com PT como padrão (D04: PT+EN desde o dia 1).
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: 'pt',
});
