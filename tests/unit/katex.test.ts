import { describe, expect, it } from 'vitest';
import { renderNoteHtml } from '@/lib/markdown/render';

// Dia 3 — KaTeX server-side no render do corpo (convenção do trilho de conteúdo):
//   $...$  inline (sem espaço encostado nos cifrões)
//   $$...$$ bloco (displayMode)
// Código (fence e inline) é imune por construção (mesmo mecanismo do F14).
// trust:false SEMPRE — TeX não vira URL javascript: nem HTML arbitrário.

describe('KaTeX no render (convenção $...$ / $$...$$)', () => {
  it('fórmula inline vira markup KaTeX', () => {
    const html = renderNoteHtml('A relação $E = mc^2$ vale.', 'pt');
    expect(html).toContain('class="katex"');
    expect(html).not.toContain('$E');
  });

  it('bloco $$...$$ renderiza em displayMode', () => {
    const html = renderNoteHtml('$$R(t) = e^{-(t/\\eta)^\\beta}$$', 'pt');
    expect(html).toContain('katex-display');
  });

  it('code fence com $ permanece literal (sem KaTeX)', () => {
    const html = renderNoteHtml('```\nR(t) = $x$\n```', 'pt');
    expect(html).not.toContain('class="katex"');
    expect(html).toContain('$x$');
  });

  it('inline code com $ permanece literal', () => {
    const html = renderNoteHtml('use `custa $10 e $20` no código', 'pt');
    expect(html).not.toContain('class="katex"');
  });

  it('cifrão de moeda não dispara fórmula (espaço encostado no $)', () => {
    const html = renderNoteHtml('custa R$ 100 e US$ 50 por ano', 'pt');
    expect(html).not.toContain('class="katex"');
    expect(html).toContain('R$ 100');
  });

  it('trust:false — \\href com javascript: NUNCA vira link', () => {
    const html = renderNoteHtml('$\\href{javascript:alert(1)}{clique}$', 'pt');
    // O TeX original sobrevive como TEXTO no <annotation> MathML (a11y) — o que
    // não pode existir é elemento <a> ou atributo executável.
    expect(html).not.toContain('<a ');
    expect(html).not.toMatch(/href\s*=\s*["']/i);
  });

  it('TeX inválido não derruba o render (throwOnError:false)', () => {
    const html = renderNoteHtml('$\\comandoInexistente{x}$', 'pt');
    expect(html.length).toBeGreaterThan(0);
  });

  it('regressão: wikilink e fórmula convivem no mesmo parágrafo', () => {
    const html = renderNoteHtml('Veja [[cavitacao|a nota]] e $\\beta > 1$ juntos.', 'pt');
    expect(html).toContain('class="wikilink"');
    expect(html).toContain('class="katex"');
  });
});
