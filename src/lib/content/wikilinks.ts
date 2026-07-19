// Wikilinks [[slug]] / [[slug|Rótulo]] são as chaves estrangeiras do grafo (D16).
// Convenção v1: o alvo é sempre o SLUG da nota, não o título (DEV-004 em learning/DECISIONS.md).

export interface Wikilink {
  target: string;
  label: string | null;
}

// Fonte ÚNICA da gramática de wikilink — [[slug]] ou [[slug|Rótulo]].
// Aprofundamento (18/07, /improve-codebase-architecture): antes desta mudança
// a mesma sintaxe era reconhecida por 3 regexes independentes (aqui, e duas em
// render.ts) — a duplicação já causou um bug real (DEV-060: um wikilink com
// rótulo dentro de célula de tabela quebrava a renderização porque uma das
// cópias divergia). Os dois adapters reais (extração pro grafo do ingest, e
// casamento ancorado pro tokenizer do marked) constroem sua regex a partir
// desta MESMA string — mudar a sintaxe no futuro (ex.: suportar [[slug#heading]])
// exige editar um lugar só, e as duas formas nunca mais divergem por construção.
const WIKILINK_PATTERN_SOURCE = String.raw`\[\[([^\][|]+)(?:\|([^\][]+))?\]\]`;

const WIKILINK_RE = new RegExp(WIKILINK_PATTERN_SOURCE, 'g');
const WIKILINK_ANCHORED_RE = new RegExp(`^${WIKILINK_PATTERN_SOURCE}`);

export function extractWikilinks(md: string): Wikilink[] {
  const links: Wikilink[] = [];
  for (const m of md.matchAll(WIKILINK_RE)) {
    links.push({ target: m[1].trim(), label: m[2]?.trim() ?? null });
  }
  return links;
}

export function uniqueTargets(links: Wikilink[]): string[] {
  return [...new Set(links.map((l) => l.target))];
}

export interface WikilinkMatch extends Wikilink {
  raw: string;
}

// Casamento ANCORADO no início de `src` — o contrato exigido pelo tokenizer
// inline do marked (F14): "isto começa com um wikilink?", não "ache todos".
// Segundo adapter real da mesma gramática (o primeiro é extractWikilinks).
export function matchWikilinkAt(src: string): WikilinkMatch | null {
  const m = WIKILINK_ANCHORED_RE.exec(src);
  if (!m) return null;
  return { raw: m[0], target: m[1].trim(), label: m[2]?.trim() ?? null };
}

// Exportado só para o terceiro consumidor real (escapaPipesEmWikilinksDeTabela
// em render.ts), que precisa construir sua PRÓPRIA instância de RegExp (estado
// de `lastIndex` por linha) a partir da MESMA fonte — nunca uma cópia da regex.
export { WIKILINK_PATTERN_SOURCE };
