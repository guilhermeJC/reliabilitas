import { describe, expect, it } from 'vitest';
import { handbooksPublicados } from '@/lib/content/ativos';
import type { NotaResumo } from '@/lib/db/notas';

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
