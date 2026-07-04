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
});
