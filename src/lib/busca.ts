// T05 — parsing puro da entrada de busca. O searchParam é input NÃO confiável:
// aqui ele vira termo normalizado (ou nada) e página saneada; a proteção contra
// SQLi é da RPC parametrizada (busca_notas) — esta camada só higieniza a UX.

export const TERMO_MIN = 2;
export const TERMO_MAX = 80;
export const PAGINA_MAX = 50;
export const RESULTADOS_POR_PAGINA = 20; // LIMIT fixo no SQL (migration 0002)

export function normalizaTermo(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const termo = raw.trim().replace(/\s+/g, ' ').slice(0, TERMO_MAX);
  return termo.length >= TERMO_MIN ? termo : null;
}

export function parsePagina(raw: unknown): number {
  if (typeof raw !== 'string') return 1;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, PAGINA_MAX);
}

// Trecho do ts_headline: texto puro + <mark>…</mark> (StartSel/StopSel da RPC).
// Nunca renderizar como HTML — vira segmentos e a página emite texto React (XSS
// impossível por construção; sem dangerouslySetInnerHTML, sem exceção de scanner).
export interface SegmentoTrecho {
  texto: string;
  marcado: boolean;
}

export function splitTrecho(trecho: string): SegmentoTrecho[] {
  const segmentos: SegmentoTrecho[] = [];
  const re = /<mark>(.*?)<\/mark>/g;
  let cursor = 0;
  for (const m of trecho.matchAll(re)) {
    if (m.index > cursor) segmentos.push({ texto: trecho.slice(cursor, m.index), marcado: false });
    segmentos.push({ texto: m[1], marcado: true });
    cursor = m.index + m[0].length;
  }
  if (cursor < trecho.length) segmentos.push({ texto: trecho.slice(cursor), marcado: false });
  return segmentos;
}
