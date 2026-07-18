import { describe, expect, it } from 'vitest';
import { buildTree, buildGroups } from '@/lib/content/tree';
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

describe('buildTree — ordenação manual de irmãos via `ordem` (pedido do fundador, 18/07)', () => {
  // Bombas Rotodinâmicas antes de Deslocamento Positivo antes de Efeito Especial —
  // sem `ordem`, a árvore ordenava só por título (alfabético), que não reflete a
  // relevância didática pretendida (Rotodinâmicas é >80% do parque).
  const pai: NotaResumo = { slug: 'bombas', tipo_nota: 'familia', titulo: 'Bombas', taxonomia: [] };
  const filhosComOrdem: NotaResumo[] = [
    {
      slug: 'efeito-especial',
      tipo_nota: 'principio',
      titulo: 'Bombas de Efeito Especial',
      taxonomia: ['bombas'],
      ordem: 3,
    },
    {
      slug: 'dinamicas',
      tipo_nota: 'principio',
      titulo: 'Bombas Rotodinâmicas',
      taxonomia: ['bombas'],
      ordem: 1,
    },
    {
      slug: 'deslocamento-positivo',
      tipo_nota: 'principio',
      titulo: 'Bombas de Deslocamento Positivo',
      taxonomia: ['bombas'],
      ordem: 2,
    },
  ];

  it('ordena irmãos com `ordem` pelo valor numérico, não alfabeticamente', () => {
    const raizes = buildTree([pai, ...filhosComOrdem]);
    const bombas = raizes.find((n) => n.slug === 'bombas')!;
    expect(bombas.children.map((c) => c.slug)).toEqual([
      'dinamicas',
      'deslocamento-positivo',
      'efeito-especial',
    ]);
  });

  it('sem `ordem` em nenhum irmão, cai no fallback alfabético (compatibilidade)', () => {
    const semOrdem = filhosComOrdem.map(({ ordem: _ordem, ...resto }) => resto);
    const raizes = buildTree([pai, ...semOrdem]);
    const bombas = raizes.find((n) => n.slug === 'bombas')!;
    expect(bombas.children.map((c) => c.slug)).toEqual([
      'deslocamento-positivo',
      'efeito-especial',
      'dinamicas',
    ]);
  });

  it('irmãos com `ordem` vêm antes dos sem `ordem` (mistura não quebra)', () => {
    const misto: NotaResumo[] = [
      { slug: 'z-sem-ordem', tipo_nota: 'principio', titulo: 'Z Sem Ordem', taxonomia: ['bombas'] },
      {
        slug: 'dinamicas',
        tipo_nota: 'principio',
        titulo: 'Bombas Rotodinâmicas',
        taxonomia: ['bombas'],
        ordem: 1,
      },
    ];
    const raizes = buildTree([pai, ...misto]);
    const bombas = raizes.find((n) => n.slug === 'bombas')!;
    expect(bombas.children.map((c) => c.slug)).toEqual(['dinamicas', 'z-sem-ordem']);
  });
});

describe('buildGroups — barra lateral em 3 grupos (revisão do fundador)', () => {
  const notas: NotaResumo[] = [
    { slug: 'transferencia', tipo_nota: 'classe', titulo: 'Transferência', taxonomia: [] },
    { slug: 'bombas', tipo_nota: 'familia', titulo: 'Bombas', taxonomia: ['transferencia'] },
    {
      slug: 'dinamicas',
      tipo_nota: 'principio',
      titulo: 'Dinâmicas',
      taxonomia: ['transferencia', 'bombas'],
    },
    {
      slug: 'bomba-centrifuga',
      tipo_nota: 'tipo',
      titulo: 'Bomba Centrífuga',
      taxonomia: ['transferencia', 'bombas', 'dinamicas'],
    },
    {
      slug: 'cavitacao',
      tipo_nota: 'modo_falha',
      titulo: 'Cavitação',
      taxonomia: ['transferencia', 'bombas', 'dinamicas', 'bomba-centrifuga'],
    },
    { slug: 'selo-mecanico', tipo_nota: 'componente', titulo: 'Selo Mecânico', taxonomia: [] },
    { slug: 'rolamento', tipo_nota: 'componente', titulo: 'Rolamento', taxonomia: [] },
  ];

  it('Equipamentos = árvore só de classe/família/princípio/tipo (sem falhas nem componentes)', () => {
    const { equipamentos } = buildGroups(notas);
    expect(equipamentos).toHaveLength(1); // raiz Transferência
    expect(equipamentos[0].slug).toBe('transferencia');
    const todos = flatten(equipamentos).map((n) => n.slug);
    expect(todos).toContain('bomba-centrifuga');
    expect(todos).not.toContain('cavitacao'); // falha vai para o grupo Falhas
    expect(todos).not.toContain('rolamento'); // componente vai para o grupo Componentes
  });

  it('o Tipo vira folha no grupo Equipamentos (o modo de falha não pendura mais nele)', () => {
    const { equipamentos } = buildGroups(notas);
    const bc = flatten(equipamentos).find((n) => n.slug === 'bomba-centrifuga')!;
    expect(bc.children).toHaveLength(0);
  });

  it('Componentes = lista de notas componente, ordenada por título', () => {
    const { componentes } = buildGroups(notas);
    expect(componentes.map((c) => c.slug)).toEqual(['rolamento', 'selo-mecanico']);
  });

  it('Falhas = modos de falha com o equipamento-pai resolvido para contexto', () => {
    const { falhas } = buildGroups(notas);
    expect(falhas).toEqual([
      { slug: 'cavitacao', titulo: 'Cavitação', equipamento: 'Bomba Centrífuga' },
    ]);
  });

  it('falha sem pai conhecido não quebra (equipamento null)', () => {
    const so: NotaResumo[] = [
      { slug: 'x', tipo_nota: 'modo_falha', titulo: 'X', taxonomia: ['inexistente'] },
    ];
    expect(buildGroups(so).falhas[0].equipamento).toBeNull();
  });
});

describe('buildGroups — grupo Estratégias (nível 8 da taxonomia, sessão 5)', () => {
  const comEstrategias: NotaResumo[] = [
    { slug: 'transferencia', tipo_nota: 'classe', titulo: 'Transferência', taxonomia: [] },
    {
      slug: 'cavitacao',
      tipo_nota: 'modo_falha',
      titulo: 'Cavitação',
      taxonomia: ['transferencia'],
    },
    { slug: 'rolamento', tipo_nota: 'componente', titulo: 'Rolamento', taxonomia: [] },
    {
      slug: 'tbm',
      tipo_nota: 'estrategia',
      titulo: 'TBM — Manutenção Baseada no Tempo',
      taxonomia: [],
    },
    {
      slug: 'cbm',
      tipo_nota: 'estrategia',
      titulo: 'CBM — Manutenção Baseada em Condição',
      taxonomia: [],
    },
  ];

  it('Estratégias = lista de notas estrategia, ordenada por título', () => {
    const { estrategias } = buildGroups(comEstrategias);
    expect(estrategias.map((e) => e.slug)).toEqual(['cbm', 'tbm']);
  });

  it('estratégias não vazam para os outros grupos', () => {
    const { equipamentos, componentes, falhas } = buildGroups(comEstrategias);
    expect(flatten(equipamentos).map((n) => n.slug)).not.toContain('cbm');
    expect(componentes.map((c) => c.slug)).not.toContain('cbm');
    expect(falhas.map((f) => f.slug)).not.toContain('cbm');
  });
});

function flatten(
  nos: import('@/lib/content/tree').TreeNode[],
): import('@/lib/content/tree').TreeNode[] {
  return nos.flatMap((n) => [n, ...flatten(n.children)]);
}
