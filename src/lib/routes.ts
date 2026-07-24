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

// T07: índice curado de normas técnicas citadas no acervo (resto do Dia 5, 24/07).
export function normasPath(locale: Locale): string {
  return `/${locale}/normas`;
}

// T11: "quem faz" — fundador, missão, metodologia editorial. Complementa
// /metodo (que já cobre os 2 frameworks desde a Revisão 4) sem duplicar
// escopo — decisão de escopo tomada com o fundador em 24/07/2026.
export function sobrePath(locale: Locale): string {
  return `/${locale}/sobre`;
}

// T05: página 1 fica fora da URL (canônica); termo sempre codificado.
export function buscaPath(locale: Locale, q?: string, pagina = 1): string {
  const base = `/${locale}/busca`;
  if (!q) return base;
  const p = pagina > 1 ? `&p=${pagina}` : '';
  return `${base}?q=${encodeURIComponent(q)}${p}`;
}

// G3: Termos de Uso + Política de Privacidade — página única com duas seções
// ancoradas (link direto pra #privacidade a partir do campo `contato`
// opcional em sugerir/colaborar, DEV-083 #6).
export function termosPath(locale: Locale, ancora?: 'privacidade'): string {
  const base = `/${locale}/termos`;
  return ancora ? `${base}#${ancora}` : base;
}

export interface DestinoLocale {
  pathname: string;
  query: Record<string, string>;
}

// DEV-083 #3 (corrigido de novo em G5 — a 1ª correção só resolvia o `href`
// SSR, não a navegação de verdade). O switch de idioma (LocaleSwitch)
// perdia a query — /pt/busca?q=x&p=2 virava /en/busca limpo. A causa real:
// o <Link> de next-intl, quando recebe `locale` (troca de idioma) JUNTO de
// um `href` em formato STRING com query embutida (`/busca?q=x`), ignora a
// query ao montar a navegação client-side — só a forma OBJETO
// `{ pathname, query }` (a mesma que o Link nativo do Next aceita) preserva
// a query na navegação real, não só no atributo `href` renderizado no SSR.
// Achado via Playwright (G5) — Vitest (environment 'node') não pega isso,
// só inspeciona HTML estático, nunca clica de verdade.
export function construirUrlLocale(pathname: string, searchParams: URLSearchParams): DestinoLocale {
  return { pathname, query: Object.fromEntries(searchParams) };
}
