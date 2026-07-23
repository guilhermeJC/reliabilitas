import type { Locale } from '@/lib/content/schema';

// F11: fonte única das rotas públicas — render, páginas e componentes consomem daqui.
// Mudar a arquitetura de URL = mudar UM arquivo.

export function notaPath(locale: Locale, slug: string): string {
  return `/${locale}/notas/${slug}`;
}

// T08/DEV-026: apoio ao projeto (doações — D23/D24).
export function apoioPath(locale: Locale): string {
  return `/${locale}/apoiar`;
}

// T09: sugerir correção — carrega a página de origem para contexto do curador.
export function sugerirPath(locale: Locale, pagina?: string): string {
  const base = `/${locale}/sugerir`;
  return pagina ? `${base}?pagina=${encodeURIComponent(pagina)}` : base;
}

// F05: página das calculadoras (indexável — SEO/GEO; client-side puro).
// 'guia' = How to use em página própria (revisão do fundador 08/07 — não
// alongar a página das ferramentas).
export function calculadorasPath(locale: Locale, secao?: 'guia'): string {
  const base = `/${locale}/calculadoras`;
  return secao ? `${base}/${secao}` : base;
}

// Revisão 4 do fundador: o método vira destino navegável — página do pipeline
// Fw A→B com o seletor de estratégia + uma página por framework.
export function metodoPath(locale: Locale, secao?: 'framework-a' | 'framework-b'): string {
  const base = `/${locale}/metodo`;
  return secao ? `${base}/${secao}` : base;
}

// Colaborar (pedido do fundador, 11/07): visitante propõe conteúdo novo.
export function colaborarPath(locale: Locale): string {
  return `/${locale}/colaborar`;
}

// T05: página 1 fica fora da URL (canônica); termo sempre codificado.
export function buscaPath(locale: Locale, q?: string, pagina = 1): string {
  const base = `/${locale}/busca`;
  if (!q) return base;
  const p = pagina > 1 ? `&p=${pagina}` : '';
  return `${base}?q=${encodeURIComponent(q)}${p}`;
}

// DEV-083 #3: o switch de idioma (LocaleSwitch) trocava só o pathname e
// perdia a query — /pt/busca?q=x&p=2 virava /en/busca limpo. O prefixo de
// locale já é resolvido pelo `locale=` do <Link> de next-intl; esta função
// só reanexa a query atual ao pathname alvo.
export function construirUrlLocale(pathname: string, searchParams: URLSearchParams): string {
  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}
