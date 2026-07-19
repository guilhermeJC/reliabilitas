import { Marked } from 'marked';
import katex from 'katex';
import { SLUG_RE, type Locale } from '@/lib/content/schema';
import { notaPath } from '@/lib/routes';
import { matchWikilinkAt, WIKILINK_PATTERN_SOURCE } from '@/lib/content/wikilinks';

// Render SSR do corpo da nota (D09 — mecânica Obsidian).
// F14: wikilinks são uma EXTENSÃO do marked (tokenizer inline) — o lexer não roda
// tokenizers inline dentro de code fences/inline code, então [[...]] em código
// permanece texto por construção.
// F3 — href seguro por construção: o alvo só vira link se for slug canônico
// (SLUG_RE); qualquer outro alvo permanece texto literal, o que torna injeção de
// atributo estruturalmente impossível. Rótulos são escapados.
// (Alvo inválido também é acusado no lote — wikilink órfão/não publicado.)
// Dia 3 — KaTeX server-side (convenção do trilho de conteúdo): $...$ inline
// (cifrão SEM espaço encostado — "R$ 100" nunca dispara) e $$...$$ bloco.
// trust:false SEMPRE (TeX não vira javascript:/HTML arbitrário) e
// throwOnError:false (TeX inválido degrada para o fonte em vermelho).

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

export function escapeHtml(s: string): string {
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
      const m = matchWikilinkAt(src);
      if (!m) return undefined;
      if (!SLUG_RE.test(m.target)) return undefined; // F3: não é slug → segue como texto
      return { type: 'wikilink', raw: m.raw, alvo: m.target, rotulo: m.label ?? m.target };
    },
    renderer(token: object) {
      const { alvo, rotulo } = token as WikilinkToken;
      return `<a href="${notaPath(locale, alvo)}" class="wikilink">${escapeHtml(rotulo)}</a>`;
    },
  };
}

const KATEX_OPTS = { trust: false, throwOnError: false } as const;

interface KatexToken {
  type: 'katexInline' | 'katexBloco';
  raw: string;
  tex: string;
}

// Inline: $...$ em uma linha, sem espaço encostado nos cifrões (moeda imune).
const KATEX_INLINE_RE = /^\$(?!\s)([^$\n]+?)(?<!\s)\$/;

const katexInline = {
  name: 'katexInline',
  level: 'inline' as const,
  start(src: string) {
    return src.indexOf('$');
  },
  tokenizer(src: string): KatexToken | undefined {
    const m = KATEX_INLINE_RE.exec(src);
    if (!m) return undefined;
    return { type: 'katexInline', raw: m[0], tex: m[1] };
  },
  renderer(token: object) {
    return katex.renderToString((token as KatexToken).tex, KATEX_OPTS);
  },
};

const katexBloco = {
  name: 'katexBloco',
  level: 'block' as const,
  start(src: string) {
    return src.indexOf('$$');
  },
  tokenizer(src: string): KatexToken | undefined {
    const m = /^\$\$([\s\S]+?)\$\$/.exec(src);
    if (!m) return undefined;
    return { type: 'katexBloco', raw: m[0], tex: m[1].trim() };
  },
  renderer(token: object) {
    return katex.renderToString((token as KatexToken).tex, { ...KATEX_OPTS, displayMode: true });
  },
};

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
    m = new Marked({ extensions: [wikilinkExtension(locale), katexInline, katexBloco] });
    m.use({
      renderer: {
        heading({ tokens, depth, text }) {
          const inline = this.parser.parseInline(tokens);
          return `<h${depth} id="${slugifyHeading(text)}">${inline}</h${depth}>\n`;
        },
        // Pedido do fundador (11/07): links markdown comuns (ex.: "Documentação
        // oficial") não tinham nenhuma afordância visual — pareciam texto puro.
        // class="link-externo" dá o gancho de estilo (CSS); href http(s) sempre
        // abre em nova aba com rel seguro (o RELIABILITAS nunca perde a própria
        // aba para um catálogo de terceiro — e noopener evita tabnabbing).
        link({ href, tokens }) {
          const texto = this.parser.parseInline(tokens);
          const externo = /^https?:\/\//.test(href);
          const attrs = externo ? ' target="_blank" rel="noopener noreferrer"' : '';
          return `<a href="${escapeHtml(href)}" class="link-externo"${attrs}>${texto}</a>`;
        },
      },
    });
    instancias.set(locale, m);
  }
  return m;
}

// Achado do fundador (17/07): tabela do conteúdo ficava ilegível no celular —
// `width:100%` (globals.css) força todas as colunas a espremer na largura da
// tela. Envolver em vez de tocar o renderer do marked (mais simples, zero
// risco no parsing de célula/alinhamento): pós-processa o HTML final,
// embrulhando cada `<table>...</table>` num wrapper com rolagem horizontal
// própria — a tabela mantém a fonte no tamanho normal, só passa a rolar.
export function envolveTabelasComScroll(html: string): string {
  return html.replace(
    /<table>[\s\S]*?<\/table>/g,
    (tabela) => `<div class="tabela-scroll">${tabela}</div>`,
  );
}

// Achado do fundador (18/07): [[slug|Rótulo]] dentro de uma célula de tabela
// quebrava a tabela — o lexer de tabela do marked separa colunas contando
// "|" ANTES de qualquer tokenizer inline rodar, então o "|" do wikilink virava
// separador de coluna (duas células fantasmas: "[[slug" e "Rótulo]]",
// empurrando o resto da linha). Fix: escapar esse "|" interno (\|) só dentro
// de linhas que SÃO uma linha de tabela — o lexer de tabela do marked
// respeita "\|" como pipe literal e o devolve sem a barra para o tokenizer
// inline, que then casa [[slug|Rótulo]] normalmente. Fora de tabela (prosa)
// a linha não é tocada — não precisa e o próprio tokenizer de wikilink não
// entende "\|" como separador válido.
const LINHA_DE_TABELA_RE = /^\s*\|.*\|\s*$/;
// Terceiro adapter real da mesma gramática (os outros dois: extractWikilinks
// pro grafo, matchWikilinkAt pro tokenizer) — precisa da própria instância de
// RegExp (estado de `lastIndex` global por linha), mas construída da MESMA
// fonte de padrão, nunca de uma cópia. Só escapa quando há rótulo (grupo 2
// presente) — sem rótulo não há "|" interno pra confundir o lexer de tabela.
const WIKILINK_GLOBAL_RE = new RegExp(WIKILINK_PATTERN_SOURCE, 'g');

export function escapaPipesEmWikilinksDeTabela(md: string): string {
  return md
    .split('\n')
    .map((linha) =>
      LINHA_DE_TABELA_RE.test(linha)
        ? linha.replace(WIKILINK_GLOBAL_RE, (m, alvo, rotulo) =>
            rotulo === undefined ? m : `[[${alvo}\\|${rotulo}]]`,
          )
        : linha,
    )
    .join('\n');
}

export function renderNoteHtml(corpoMd: string, locale: Locale): string {
  const preprocessado = escapaPipesEmWikilinksDeTabela(corpoMd);
  const html = markedDe(locale).parse(preprocessado, { async: false }) as string;
  return envolveTabelasComScroll(html);
}
