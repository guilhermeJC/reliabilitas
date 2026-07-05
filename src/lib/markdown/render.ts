import { Marked } from 'marked';
import { SLUG_RE, type Locale } from '@/lib/content/schema';
import { notaPath } from '@/lib/routes';

// Render SSR do corpo da nota (D09 — mecânica Obsidian).
// F14: wikilinks são uma EXTENSÃO do marked (tokenizer inline) — o lexer não roda
// tokenizers inline dentro de code fences/inline code, então [[...]] em código
// permanece texto por construção.
// F3 — href seguro por construção: o alvo só vira link se for slug canônico
// (SLUG_RE); qualquer outro alvo permanece texto literal, o que torna injeção de
// atributo estruturalmente impossível. Rótulos são escapados.
// (Alvo inválido também é acusado no lote — wikilink órfão/não publicado.)

const WIKILINK_TOKEN_RE = /^\[\[([^\][|]+)(?:\|([^\][]+))?\]\]/;

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => HTML_ESCAPES[c]);
}

interface WikilinkToken {
  type: 'wikilink';
  raw: string;
  alvo: string;
  rotulo: string;
}

function wikilinkExtension(locale: Locale) {
  return {
    name: 'wikilink',
    level: 'inline' as const,
    start(src: string) {
      return src.indexOf('[[');
    },
    tokenizer(src: string): WikilinkToken | undefined {
      const m = WIKILINK_TOKEN_RE.exec(src);
      if (!m) return undefined;
      const alvo = m[1].trim();
      if (!SLUG_RE.test(alvo)) return undefined; // F3: não é slug → segue como texto
      return { type: 'wikilink', raw: m[0], alvo, rotulo: (m[2] ?? alvo).trim() };
    },
    renderer(token: object) {
      const { alvo, rotulo } = token as WikilinkToken;
      return `<a href="${notaPath(locale, alvo)}" class="wikilink">${escapeHtml(rotulo)}</a>`;
    },
  };
}

// Headings ganham id kebab-case (âncoras do T02 — nav "nesta página").
export function slugifyHeading(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Uma instância Marked por locale (o renderer fecha sobre o locale).
const instancias = new Map<Locale, Marked>();

function markedDe(locale: Locale): Marked {
  let m = instancias.get(locale);
  if (!m) {
    m = new Marked({ extensions: [wikilinkExtension(locale)] });
    m.use({
      renderer: {
        heading({ tokens, depth, text }) {
          const inline = this.parser.parseInline(tokens);
          return `<h${depth} id="${slugifyHeading(text)}">${inline}</h${depth}>\n`;
        },
      },
    });
    instancias.set(locale, m);
  }
  return m;
}

export function renderNoteHtml(corpoMd: string, locale: Locale): string {
  return markedDe(locale).parse(corpoMd, { async: false }) as string;
}
