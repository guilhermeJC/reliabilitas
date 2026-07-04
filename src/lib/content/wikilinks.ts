// Wikilinks [[slug]] / [[slug|Rótulo]] são as chaves estrangeiras do grafo (D16).
// Convenção v1: o alvo é sempre o SLUG da nota, não o título (DEV-004 em learning/DECISIONS.md).

export interface Wikilink {
  target: string;
  label: string | null;
}

const WIKILINK_RE = /\[\[([^\][|]+)(?:\|([^\][]+))?\]\]/g;

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
