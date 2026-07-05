import type { Locale } from '@/lib/content/schema';

// F11: fonte única das rotas públicas — render, páginas e componentes consomem daqui.
// Mudar a arquitetura de URL = mudar UM arquivo.

export function notaPath(locale: Locale, slug: string): string {
  return `/${locale}/notas/${slug}`;
}
