import { describe, expect, it } from 'vitest';
import { clusterAcervo, handbooksPublicados, ATIVOS_MVP } from '@/lib/content/ativos';
import type { NotaResumo } from '@/lib/db/notas';

// T01 v2 (revisão 4 do fundador): a Home deixa o grid plano e passa a CLUSTERS
// pelos grupos funcionais da taxonomia (item 4 da mesma revisão). Handbook
// publicado vira card linkado no cluster da sua classe raiz; planejado (D07)
// vira "em breve" no cluster declarado; componentes (D10) são o cluster
// transversal; classes sem handbook viram chips ("demais classes") — a Home
// escala para 100+ ativos sem virar uma linha de cards.

const classe = (slug: string, titulo: string): NotaResumo => ({
  slug,
  tipo_nota: 'classe',
  titulo,
  taxonomia: [],
});

const acervoBase: NotaResumo[] = [
  classe('adicao-de-energia', 'Adição de Energia ao Fluido'),
  classe('acionamento', 'Acionamento (Drivers)'),
  classe('controle-do-escoamento', 'Controle do Escoamento'),
  classe('troca-termica', 'Troca Térmica'),
  {
    slug: 'bomba-centrifuga',
    tipo_nota: 'tipo',
    titulo: 'Bomba Centrífuga',
    taxonomia: ['adicao-de-energia', 'bombas', 'dinamicas'],
  },
  { slug: 'cavitacao', tipo_nota: 'modo_falha', titulo: 'Cavitação', taxonomia: ['a'] },
];

describe('clusterAcervo — Home clusterizada por grupo funcional', () => {
  it('handbook publicado entra no cluster da classe raiz da sua cadeia, com título real', () => {
    const { clusters } = clusterAcervo(acervoBase, 'pt');
    const adicao = clusters.find((c) => c.slug === 'adicao-de-energia');
    expect(adicao?.titulo).toBe('Adição de Energia ao Fluido');
    expect(adicao?.itens).toContainEqual({ titulo: 'Bomba Centrífuga', slug: 'bomba-centrifuga' });
  });

  it('planejado (D07) não publicado vira "em breve" no cluster declarado — nunca link morto', () => {
    const { clusters } = clusterAcervo(acervoBase, 'pt');
    const acionamento = clusters.find((c) => c.slug === 'acionamento');
    expect(acionamento?.itens).toContainEqual({ titulo: 'Motor de Indução Trifásico', slug: null });
  });

  it('publicado VENCE o planejado (dedup por slug — o card não duplica)', () => {
    const { clusters } = clusterAcervo(acervoBase, 'pt');
    const cards = clusters.flatMap((c) => c.itens).filter((i) => i.titulo.includes('Bomba'));
    expect(cards).toHaveLength(1);
    expect(cards[0]?.slug).toBe('bomba-centrifuga');
  });

  it('componentes (D10) formam o cluster transversal próprio, título a cargo da UI (null)', () => {
    const comComponente: NotaResumo[] = [
      ...acervoBase,
      { slug: 'rolamento', tipo_nota: 'componente', titulo: 'Rolamento', taxonomia: [] },
    ];
    const { clusters } = clusterAcervo(comComponente, 'pt');
    const comp = clusters.find((c) => c.slug === 'componentes');
    expect(comp?.titulo).toBeNull();
    expect(comp?.itens).toContainEqual({ titulo: 'Rolamento', slug: 'rolamento' });
    // planejados de componente ainda não publicados seguem "em breve" no mesmo cluster
    expect(comp?.itens).toContainEqual({ titulo: 'Selo Mecânico', slug: null });
  });

  it('modo de falha nunca vira card', () => {
    const { clusters } = clusterAcervo(acervoBase, 'pt');
    const todos = clusters.flatMap((c) => c.itens.map((i) => i.titulo));
    expect(todos).not.toContain('Cavitação');
  });

  it('handbook fora da lista MVP entra pelo cluster da própria cadeia (acervo cresce sem mexer aqui)', () => {
    const comExtra: NotaResumo[] = [
      ...acervoBase,
      {
        slug: 'compressor-alternativo',
        tipo_nota: 'tipo',
        titulo: 'Compressor Alternativo',
        taxonomia: ['adicao-de-energia', 'compressores'],
      },
    ];
    const { clusters } = clusterAcervo(comExtra, 'pt');
    const adicao = clusters.find((c) => c.slug === 'adicao-de-energia');
    expect(adicao?.itens).toContainEqual({
      titulo: 'Compressor Alternativo',
      slug: 'compressor-alternativo',
    });
  });

  it('classe publicada SEM handbook vira chip em demaisClasses (com título real)', () => {
    const { demaisClasses } = clusterAcervo(acervoBase, 'pt');
    expect(demaisClasses).toContainEqual({ slug: 'troca-termica', titulo: 'Troca Térmica' });
    // classes que têm cluster não aparecem nos chips
    expect(demaisClasses.map((c) => c.slug)).not.toContain('adicao-de-energia');
  });

  it('ordem canônica: clusters de classe na ordem funcional; componentes por último', () => {
    const comComponente: NotaResumo[] = [
      ...acervoBase,
      { slug: 'rolamento', tipo_nota: 'componente', titulo: 'Rolamento', taxonomia: [] },
    ];
    const { clusters } = clusterAcervo(comComponente, 'pt');
    const ordem = clusters.map((c) => c.slug);
    expect(ordem.at(-1)).toBe('componentes');
    expect(ordem.indexOf('adicao-de-energia')).toBeLessThan(
      ordem.indexOf('controle-do-escoamento'),
    );
    expect(ordem.indexOf('controle-do-escoamento')).toBeLessThan(ordem.indexOf('acionamento'));
  });

  it('títulos planejados seguem o locale quando o handbook ainda não existe', () => {
    const { clusters } = clusterAcervo([], 'en');
    const todos = clusters.flatMap((c) => c.itens.map((i) => i.titulo));
    expect(todos).toContain('Three-Phase Induction Motor');
    expect(todos).toContain('Control Valve');
  });

  it('todo planejado do MVP aparece em exatamente um cluster (nada se perde)', () => {
    const { clusters } = clusterAcervo([], 'pt');
    const todos = clusters.flatMap((c) => c.itens);
    expect(todos).toHaveLength(ATIVOS_MVP.length);
  });
});

// T01 v3 (revisão 6 do fundador — 09/07): a nova Home mostra APENAS handbooks
// PUBLICADOS no final, agrupados por classe raiz. Sem "em breve", sem "estrutura
// pronta", sem chips de classes vazias — foco em conteúdo real. A árvore lateral
// cobre a promessa; a Home cobre o entregue.

const classesTaxonomia: NotaResumo[] = [
  { slug: 'adicao-de-energia', tipo_nota: 'classe', titulo: 'Adição de Energia', taxonomia: [] },
  { slug: 'acionamento', tipo_nota: 'classe', titulo: 'Acionamento', taxonomia: [] },
  { slug: 'armazenamento', tipo_nota: 'classe', titulo: 'Armazenamento', taxonomia: [] },
];

describe('handbooksPublicados — Home v3: só publicado, agrupado por classe', () => {
  it('vazio quando não há handbooks publicados (nem "em breve", nem promessas)', () => {
    const grupos = handbooksPublicados([...classesTaxonomia], 'pt');
    expect(grupos).toEqual([]);
  });

  it('handbook de TIPO agrupa pela classe raiz da cadeia, com o título real', () => {
    const grupos = handbooksPublicados(
      [
        ...classesTaxonomia,
        {
          slug: 'bomba-centrifuga',
          tipo_nota: 'tipo',
          titulo: 'Bomba Centrífuga',
          taxonomia: ['adicao-de-energia', 'bombas', 'dinamicas'],
        },
      ],
      'pt',
    );
    expect(grupos).toHaveLength(1);
    expect(grupos[0]).toEqual({
      classe: 'adicao-de-energia',
      classeTitulo: 'Adição de Energia',
      itens: [{ slug: 'bomba-centrifuga', titulo: 'Bomba Centrífuga' }],
    });
  });

  it('componentes (D10) formam um grupo próprio no fim — sem título de classe', () => {
    const grupos = handbooksPublicados(
      [
        ...classesTaxonomia,
        { slug: 'rolamento', tipo_nota: 'componente', titulo: 'Rolamento', taxonomia: [] },
        { slug: 'selo-mecanico', tipo_nota: 'componente', titulo: 'Selo Mecânico', taxonomia: [] },
      ],
      'pt',
    );
    expect(grupos).toHaveLength(1);
    expect(grupos[0]).toEqual({
      classe: 'componentes',
      classeTitulo: null,
      itens: [
        { slug: 'rolamento', titulo: 'Rolamento' },
        { slug: 'selo-mecanico', titulo: 'Selo Mecânico' },
      ],
    });
  });

  it('modo de falha NUNCA vira card na home', () => {
    const grupos = handbooksPublicados(
      [
        ...classesTaxonomia,
        { slug: 'cavitacao', tipo_nota: 'modo_falha', titulo: 'Cavitação', taxonomia: ['x'] },
      ],
      'pt',
    );
    expect(grupos).toEqual([]);
  });

  it('vários handbooks na mesma classe: ordem alfabética dentro do grupo', () => {
    const grupos = handbooksPublicados(
      [
        ...classesTaxonomia,
        {
          slug: 'compressor-alternativo',
          tipo_nota: 'tipo',
          titulo: 'Compressor Alternativo',
          taxonomia: ['adicao-de-energia', 'compressores'],
        },
        {
          slug: 'bomba-centrifuga',
          tipo_nota: 'tipo',
          titulo: 'Bomba Centrífuga',
          taxonomia: ['adicao-de-energia', 'bombas'],
        },
      ],
      'pt',
    );
    expect(grupos[0]?.itens.map((i) => i.titulo)).toEqual([
      'Bomba Centrífuga',
      'Compressor Alternativo',
    ]);
  });

  it('grupos na ordem funcional canônica; componentes por ÚLTIMO', () => {
    const grupos = handbooksPublicados(
      [
        ...classesTaxonomia,
        { slug: 'motor', tipo_nota: 'tipo', titulo: 'Motor', taxonomia: ['acionamento'] },
        { slug: 'bomba', tipo_nota: 'tipo', titulo: 'Bomba', taxonomia: ['adicao-de-energia'] },
        { slug: 'rolamento', tipo_nota: 'componente', titulo: 'Rolamento', taxonomia: [] },
      ],
      'pt',
    );
    expect(grupos.map((g) => g.classe)).toEqual([
      'adicao-de-energia',
      'acionamento',
      'componentes',
    ]);
  });

  it('classe SEM handbook publicado NÃO aparece (sem promessas)', () => {
    const grupos = handbooksPublicados(
      [
        ...classesTaxonomia,
        { slug: 'bomba', tipo_nota: 'tipo', titulo: 'Bomba', taxonomia: ['adicao-de-energia'] },
      ],
      'pt',
    );
    expect(grupos.map((g) => g.classe)).toEqual(['adicao-de-energia']);
    expect(grupos.map((g) => g.classe)).not.toContain('armazenamento');
    expect(grupos.map((g) => g.classe)).not.toContain('acionamento');
  });
});
