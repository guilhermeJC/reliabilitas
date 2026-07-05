import { describe, expect, it } from 'vitest';
import { renderNoteHtml } from '@/lib/markdown/render';

describe('renderNoteHtml — Markdown com mecânica Obsidian (D09)', () => {
  it('converte markdown básico em HTML', () => {
    const html = renderNoteHtml('## Sintomas\n\nRuído de cascalho.', 'pt');
    expect(html).toContain('<h2');
    expect(html).toContain('Ruído de cascalho');
  });

  it('converte wikilink em âncora interna com classe wikilink', () => {
    const html = renderNoteHtml('Origina-se em [[bomba-centrifuga]].', 'pt');
    expect(html).toContain('href="/pt/notas/bomba-centrifuga"');
    expect(html).toContain('class="wikilink"');
    expect(html).toContain('>bomba-centrifuga</a>');
  });

  it('usa o rótulo quando fornecido ([[slug|Rótulo]])', () => {
    const html = renderNoteHtml('Veja [[cavitacao|a cavitação]].', 'en');
    expect(html).toContain('href="/en/notas/cavitacao"');
    expect(html).toContain('>a cavitação</a>');
  });

  it('não transforma links markdown comuns', () => {
    const html = renderNoteHtml('[Emerson](https://emerson.com)', 'pt');
    expect(html).toContain('href="https://emerson.com"');
    expect(html).not.toContain('wikilink');
  });

  describe('headings ganham id para âncoras (T02 — nav "nesta página")', () => {
    it('gera id kebab-case sem acentos a partir do texto do heading', () => {
      const html = renderNoteHtml('## Princípio de funcionamento\n\nTexto.', 'pt');
      expect(html).toContain('<h2 id="principio-de-funcionamento">');
    });

    it('preserva a formatação inline do heading no texto renderizado', () => {
      const html = renderNoteHtml('## Tipos e **diferenças**', 'pt');
      expect(html).toContain('id="tipos-e-diferencas"');
      expect(html).toContain('<strong>diferenças</strong>');
    });
  });

  describe('F14 — wikilinks não são convertidos dentro de código', () => {
    it('code fence preserva [[slug]] como texto de código', () => {
      const html = renderNoteHtml('```\nexemplo [[cavitacao]] em código\n```', 'pt');
      expect(html).toContain('<code>');
      expect(html).not.toContain('<a ');
      expect(html).toContain('[[cavitacao]]');
    });

    it('inline code preserva [[slug]] como texto', () => {
      const html = renderNoteHtml('Use `[[cavitacao]]` para linkar.', 'pt');
      expect(html).not.toContain('<a ');
      expect(html).toContain('[[cavitacao]]');
    });

    it('wikilink em texto normal segue virando link', () => {
      const html = renderNoteHtml('Texto com [[cavitacao]] normal.', 'pt');
      expect(html).toContain('href="/pt/notas/cavitacao"');
    });
  });

  describe('F3 — href seguro por construção (injeção de atributo)', () => {
    it('alvo com aspas e atributo de evento NÃO vira link (fica texto literal)', () => {
      const html = renderNoteHtml('Veja [[x" onmouseover="alert(1)|clique aqui]].', 'pt');
      expect(html).not.toMatch(/<a[^>]*onmouseover/);
      expect(html).not.toContain('href="/pt/notas/x"');
      expect(html).toContain('[[x'); // literal preservado — o curador vê o erro
    });

    it('alvo fora do padrão de slug (maiúsculas/espaços) vira texto, não link', () => {
      const html = renderNoteHtml('Ver [[Bomba Centrífuga]].', 'pt');
      expect(html).not.toContain('<a ');
      expect(html).toContain('[[Bomba Centrífuga]]');
    });

    it('slug canônico segue virando link normalmente', () => {
      const html = renderNoteHtml('Ver [[bomba-centrifuga|a bomba]].', 'pt');
      expect(html).toContain('href="/pt/notas/bomba-centrifuga"');
      expect(html).toContain('>a bomba</a>');
    });
  });
});
