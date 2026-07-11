import { describe, expect, it } from 'vitest';
import { notaParaMd, nomeArquivoNota } from '@/lib/export/nota';

// Pedido do fundador (11/07): toda nota ganha um botão "Baixar conteúdo" no
// topo — Markdown via Blob client-side (F02/BR-004, mesmo mecanismo do
// export do plano); PDF via window.print() do browser (zero dependência nova).

describe('notaParaMd — exporta o conteúdo íntegro da nota em Markdown', () => {
  it('abre com o título como H1', () => {
    const md = notaParaMd({
      titulo: 'Cavitação',
      corpoMd: '## Classificação\n\nTexto.',
      url: 'https://reliabilitas.io/pt/notas/cavitacao',
    });
    expect(md.startsWith('# Cavitação')).toBe(true);
  });

  it('preserva o corpo markdown original (headings, wikilinks, KaTeX crus)', () => {
    const md = notaParaMd({
      titulo: 'Cavitação',
      corpoMd: '## Mecanismo\n\nVer [[bomba-centrifuga]] e $NPSH_r$.',
      url: 'https://reliabilitas.io/pt/notas/cavitacao',
    });
    expect(md).toContain('## Mecanismo');
    expect(md).toContain('[[bomba-centrifuga]]');
    expect(md).toContain('$NPSH_r$');
  });

  it('rodapé traz a URL canônica e a atribuição RELIABILITAS', () => {
    const md = notaParaMd({
      titulo: 'Cavitação',
      corpoMd: 'Texto.',
      url: 'https://reliabilitas.io/pt/notas/cavitacao',
    });
    expect(md).toContain('RELIABILITAS');
    expect(md).toContain('https://reliabilitas.io/pt/notas/cavitacao');
  });

  it('inclui a data de revisão quando fornecida', () => {
    const md = notaParaMd({
      titulo: 'Cavitação',
      corpoMd: 'Texto.',
      url: 'https://reliabilitas.io/pt/notas/cavitacao',
      revisadoEm: '2026-07-11',
    });
    expect(md).toContain('2026-07-11');
  });

  it('sem revisadoEm, não vaza "undefined" no rodapé', () => {
    const md = notaParaMd({
      titulo: 'Cavitação',
      corpoMd: 'Texto.',
      url: 'https://reliabilitas.io/pt/notas/cavitacao',
    });
    expect(md).not.toContain('undefined');
  });
});

describe('nomeArquivoNota — nome de arquivo estável por slug', () => {
  it('gera "<slug>.md"', () => {
    expect(nomeArquivoNota('cavitacao')).toBe('cavitacao.md');
  });
});
