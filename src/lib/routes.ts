import type { Locale } from '@/lib/content/schema';

// F11: fonte única das rotas públicas — render, páginas e componentes consomem daqui.
// Mudar a arquitetura de URL = mudar UM arquivo.

export function notaPath(locale: Locale, slug: string): string {
  return `/${locale}/notas/${slug}`;
}

// F05: página das calculadoras (indexável — SEO/GEO; client-side puro).
export function calculadorasPath(locale: Locale): string {
  return `/${locale}/calculadoras`;
}

// T05: página 1 fica fora da URL (canônica); termo sempre codificado.
export function buscaPath(locale: Locale, q?: string, pagina = 1): string {
  const base = `/${locale}/busca`;
  if (!q) return base;
  const p = pagina > 1 ? `&p=${pagina}` : '';
  return `${base}?q=${encodeURIComponent(q)}${p}`;
}
