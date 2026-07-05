import { marked } from 'marked';
import { SLUG_RE, type Locale } from '@/lib/content/schema';

// Render SSR do corpo da nota (D09 — mecânica Obsidian).
// F3 — href seguro por construção: o alvo só vira link se for slug canônico
// (SLUG_RE: a-z, 0-9, hífens); qualquer outro alvo permanece texto literal, o que
// torna injeção de atributo estruturalmente impossível. Rótulos são escapados.
// (Alvo inválido também é acusado no lote — wikilink órfão/não publicado.)

const WIKILINK_RE = /\[\[([^\][|]+)(?:\|([^\][]+))?\]\]/g;

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => HTML_ESCAPES[c]);
}

export function renderNoteHtml(corpoMd: string, locale: Locale): string {
  const comWikilinks = corpoMd.replace(WIKILINK_RE, (original, alvo: string, rotulo?: string) => {
    const slug = alvo.trim();
    if (!SLUG_RE.test(slug)) return original; // F3: não é slug → não vira href
    const texto = escapeHtml((rotulo ?? slug).trim());
    return `<a href="/${locale}/notas/${slug}" class="wikilink">${texto}</a>`;
  });
  return marked.parse(comWikilinks, { async: false });
}
