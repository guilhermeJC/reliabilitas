import { describe, expect, it } from 'vitest';
import { splitNiveis, extractH2 } from '@/lib/content/niveis';

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
