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
    expect(html).not.toContain('class="wikilink"');
  });

  describe('link externo ganha afordância visual (pedido do fundador: "não parece clicável")', () => {
    it('link markdown comum ganha a classe link-externo', () => {
      const html = renderNoteHtml('[Catálogo](https://exemplo.com/catalogo.pdf)', 'pt');
      expect(html).toContain('class="link-externo"');
    });

    it('link http(s) abre em nova aba com rel seguro (noopener noreferrer)', () => {
      const html = renderNoteHtml('[Catálogo](https://exemplo.com/catalogo.pdf)', 'pt');
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
    });

    it('wikilink continua SEM a classe link-externo (é navegação interna)', () => {
      const html = renderNoteHtml('Veja [[cavitacao|a cavitação]].', 'pt');
      expect(html).not.toContain('link-externo');
      expect(html).not.toContain('target="_blank"');
    });
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

describe('tabelas — wikilink com rótulo dentro de célula (achado do fundador, 18/07)', () => {
  // O parser de tabela do marked separa colunas por "|" ANTES do wikilink ser
  // tokenizado — [[slug|Rótulo]] cru dentro de uma célula quebra a tabela em
  // duas células fantasmas ("[[slug" e "Rótulo]]"), empurrando o resto da
  // linha uma coluna adiante. Reproduzido literalmente com o achado do
  // fundador (adicao-de-energia.md): "Família" e "Fluido de trabalho" com
  // conteúdo trocado/quebrado.
  const TABELA_COM_WIKILINK = [
    '| Família | Fluido de trabalho | Elevação |',
    '| --- | --- | --- |',
    '| [[bombas|Bombas]] | líquidos | conforme a curva |',
    '',
  ].join('\n');

  it('renderiza as 3 colunas corretamente (sem célula fantasma "[[slug")', () => {
    const html = renderNoteHtml(TABELA_COM_WIKILINK, 'pt');
    expect(html).not.toContain('[[bombas');
    expect(html).not.toContain('Bombas]]');
    expect(html).toContain('líquidos');
    expect(html).toContain('conforme a curva');
  });

  it('a célula com wikilink vira um link de verdade para a nota', () => {
    const html = renderNoteHtml(TABELA_COM_WIKILINK, 'pt');
    expect(html).toContain('href="/pt/notas/bombas"');
    expect(html).toContain('class="wikilink"');
    expect(html).toContain('>Bombas</a>');
  });

  it('wikilink com rótulo em prosa normal (fora de tabela) continua intacto', () => {
    const html = renderNoteHtml('Veja [[bombas|Bombas]] no texto normal.', 'pt');
    expect(html).toContain('href="/pt/notas/bombas"');
    expect(html).toContain('>Bombas</a>');
  });
});

describe('tabelas — wrapper com rolagem horizontal (achado do fundador, celular)', () => {
  const TABELA_MD = '| A | B |\n| --- | --- |\n| 1 | 2 |\n';

  it('envolve toda tabela num wrapper com a classe de rolagem', () => {
    const html = renderNoteHtml(TABELA_MD, 'pt');
    expect(html).toContain('<div class="tabela-scroll"><table>');
    expect(html).toMatch(/<div class="tabela-scroll">[\s\S]*<\/table><\/div>/);
  });

  it('não afeta conteúdo sem tabela', () => {
    const html = renderNoteHtml('## Sem tabela\n\nSó texto normal.', 'pt');
    expect(html).not.toContain('tabela-scroll');
  });

  it('envolve múltiplas tabelas na mesma nota, cada uma no seu próprio wrapper', () => {
    const html = renderNoteHtml(`${TABELA_MD}\nTexto entre as duas.\n\n${TABELA_MD}`, 'pt');
    expect(html.match(/tabela-scroll/g)?.length).toBe(2);
  });
});
