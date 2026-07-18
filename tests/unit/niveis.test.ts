import { describe, expect, it } from 'vitest';
import { splitNiveis, extractH2, extractH3, montaSumarioHtml } from '@/lib/content/niveis';

// T03: o seletor de 3 níveis parseia as seções do corpo (contrato F8/DEV-006).
const corpo = [
  '## Beginner',
  'O que é a falha.',
  '## Specialist',
  'Fw A → Fw B e plano.',
  '## Engineer',
  'Weibull e bibliografia.',
].join('\n\n');

describe('splitNiveis — extrai as 3 seções de nível do corpo (T03/F8)', () => {
  it('separa o conteúdo de cada nível, sem os headings', () => {
    const n = splitNiveis(corpo);
    expect(n).not.toBeNull();
    expect(n!.beginner).toContain('O que é a falha.');
    expect(n!.beginner).not.toContain('## Beginner');
    expect(n!.specialist).toContain('Fw A → Fw B');
    expect(n!.engineer).toContain('Weibull');
  });

  it('seção termina no próximo heading de nível 2 (### interno pertence à seção)', () => {
    const comSub = corpo.replace('O que é a falha.', 'O que é.\n\n### Sintomas\n\nRuído.');
    const n = splitNiveis(comSub);
    expect(n!.beginner).toContain('### Sintomas');
    expect(n!.specialist).not.toContain('Sintomas');
  });

  it('retorna null quando falta um nível (o ingest F8 impede — defesa em profundidade)', () => {
    expect(splitNiveis('## Beginner\n\nSó isso.')).toBeNull();
  });
});

describe('extractH2 — seções do handbook para a nav "nesta página" (T02)', () => {
  it('lista os headings de nível 2 com o id de âncora do render', () => {
    const corpo = '## Classificação\n\nx\n\n## Princípio de funcionamento\n\ny\n\n### Sub\n\nz';
    expect(extractH2(corpo)).toEqual([
      { texto: 'Classificação', id: 'classificacao' },
      { texto: 'Princípio de funcionamento', id: 'principio-de-funcionamento' },
    ]);
  });
});

describe('extractH3 — subseções de um nível (sumário por texto, pedido do fundador 18/07)', () => {
  it('lista os headings de nível 3 com o id de âncora do render', () => {
    const corpo =
      '### Diagnóstico diferencial\n\nx\n\n### Tipos de cavitação\n\ny\n\n## Nao pertence\n\nz';
    expect(extractH3(corpo)).toEqual([
      { texto: 'Diagnóstico diferencial', id: 'diagnostico-diferencial' },
      { texto: 'Tipos de cavitação', id: 'tipos-de-cavitacao' },
    ]);
  });

  it('não confunde com headings de nível 2 ou 4', () => {
    const corpo = '## H2\n\na\n\n#### H4\n\nb\n\n### H3 de verdade\n\nc';
    expect(extractH3(corpo)).toEqual([{ texto: 'H3 de verdade', id: 'h3-de-verdade' }]);
  });
});

describe('montaSumarioHtml — sumário visual só quando há >=3 seções (pedido do fundador 18/07)', () => {
  const tres = [
    { texto: 'Um', id: 'um' },
    { texto: 'Dois', id: 'dois' },
    { texto: 'Três', id: 'tres' },
  ];

  it('com >=3 seções, gera nav com um link por seção apontando para a âncora', () => {
    const html = montaSumarioHtml(tres, 'Nesta nota');
    expect(html).toContain('<nav');
    expect(html).toContain('Nesta nota');
    expect(html).toContain('href="#um"');
    expect(html).toContain('>Um<');
    expect(html).toContain('href="#dois"');
    expect(html).toContain('href="#tres"');
  });

  it('numera cada pill na ordem real de aparição no conteúdo (pedido do fundador, refinamento 18/07)', () => {
    const html = montaSumarioHtml(tres, 'Nesta nota');
    // a ordem é a mesma em que as seções chegam (document order) — 1, 2, 3
    expect(html).toContain('<a href="#um"><span class="sumario-num">1</span>Um</a>');
    expect(html).toContain('<a href="#dois"><span class="sumario-num">2</span>Dois</a>');
    expect(html).toContain('<a href="#tres"><span class="sumario-num">3</span>Três</a>');
  });

  it('com menos de 3 seções, não gera sumário (ruído visual sem ganho de navegação)', () => {
    expect(montaSumarioHtml(tres.slice(0, 2), 'Nesta nota')).toBe('');
    expect(montaSumarioHtml([], 'Nesta nota')).toBe('');
  });

  it('escapa o texto do heading (defesa em profundidade contra HTML no título)', () => {
    const comHtml = [...tres.slice(0, 2), { texto: '<script>x</script>', id: 'x' }];
    const html = montaSumarioHtml(comHtml, 'Nesta nota');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});
