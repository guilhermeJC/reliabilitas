import { describe, expect, it } from 'vitest';
import { buildTree } from '@/lib/content/tree';
import type { NotaResumo } from '@/lib/content/tree';

// Árvore taxonômica lateral (T04 parcial/D16): derivada das notas publicadas,
// aninhada pela cadeia, com contagem de descendentes por ramo.
const acervo: NotaResumo[] = [
  {
    slug: 'transferencia-de-fluidos-liquidos',
    tipo_nota: 'classe',
    titulo: 'Transferência de Fluidos — Líquidos',
    taxonomia: [],
  },
  {
    slug: 'bombas',
    tipo_nota: 'familia',
    titulo: 'Bombas',
    taxonomia: ['transferencia-de-fluidos-liquidos'],
  },
  {
    slug: 'dinamicas',
    tipo_nota: 'principio',
    titulo: 'Dinâmicas',
    taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas'],
  },
  {
    slug: 'bomba-centrifuga',
    tipo_nota: 'tipo',
    titulo: 'Bomba Centrífuga',
    taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas'],
  },
  {
    slug: 'cavitacao',
    tipo_nota: 'modo_falha',
    titulo: 'Cavitação',
    taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas', 'bomba-centrifuga'],
  },
];

describe('buildTree — árvore taxonômica derivada do acervo publicado', () => {
  it('aninha pela cadeia: classe → família → princípio → tipo → modo de falha', () => {
    const raizes = buildTree(acervo);
    expect(raizes).toHaveLength(1);
    const classe = raizes[0];
    expect(classe.slug).toBe('transferencia-de-fluidos-liquidos');
    expect(classe.children[0].slug).toBe('bombas');
    expect(classe.children[0].children[0].slug).toBe('dinamicas');
    expect(classe.children[0].children[0].children[0].slug).toBe('bomba-centrifuga');
    expect(classe.children[0].children[0].children[0].children[0].slug).toBe('cavitacao');
  });

  it('conta descendentes por ramo (a contagem da árvore lateral)', () => {
    const raizes = buildTree(acervo);
    expect(raizes[0].descendentes).toBe(4);
    const bombas = raizes[0].children[0];
    expect(bombas.descendentes).toBe(3);
  });

  it('nota cujo pai não está publicado vira raiz (nunca some da árvore)', () => {
    const orfa: NotaResumo[] = [
      {
        slug: 'cavitacao',
        tipo_nota: 'modo_falha',
        titulo: 'Cavitação',
        taxonomia: ['bomba-centrifuga'],
      },
    ];
    const raizes = buildTree(orfa);
    expect(raizes).toHaveLength(1);
    expect(raizes[0].slug).toBe('cavitacao');
  });

  it('carrega o título real de cada nó (breadcrumb usa títulos, não slugs)', () => {
    const raizes = buildTree(acervo);
    expect(raizes[0].titulo).toBe('Transferência de Fluidos — Líquidos');
  });
});
