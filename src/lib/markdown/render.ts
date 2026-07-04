import { marked } from 'marked';
import type { Locale } from '@/lib/content/schema';

// Render SSR do corpo da nota (D09 — mecânica Obsidian).
// Conteúdo é confiável (autorado pelo curador via repo; Fase 3 passa por moderação BR-013);
// ainda assim, rótulos de wikilink são escapados para não abrir vetor de HTML arbitrário.

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
  const comWikilinks = corpoMd.replace(WIKILINK_RE, (_m, alvo: string, rotulo?: string) => {
    const slug = alvo.trim();
    const texto = escapeHtml((rotulo ?? slug).trim());
    return `<a href="/${locale}/notas/${slug}" class="wikilink">${texto}</a>`;
  });
  return marked.parse(comWikilinks, { async: false });
}
