import { describe, expect, it } from 'vitest';
import { buildPlan } from '@/lib/content/plan';
import type { NotaParsed } from '@/lib/content/validate-batch';
import type { NotaFrontmatter } from '@/lib/content/schema';

const handbook: NotaParsed = {
  fm: {
    slug: 'bomba-centrifuga',
    tipo_nota: 'tipo',
    locale: 'pt',
    titulo: 'Bomba Centrífuga',
    status: 'published',
    taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas'],
    iso14224_code: 'PU',
    fontes: ['Karassik (2008)'],
    secoes: [
      'classificacao',
      'principio',
      'anatomia',
      'tipos',
      'marcas',
      'industria',
      'componentes',
      'modos_falha',
    ],
    componentes: ['rolamento', 'selo-mecanico'],
    revisado_em: new Date('2026-07-04T00:00:00Z'),
  } as unknown as NotaFrontmatter,
  corpo: 'Corpo com [[cavitacao]] e [[rolamento|rolamentos]].',
  file: 'content/pt/tipo/bomba-centrifuga.md',
  wikilinks: ['cavitacao', 'rolamento'],
};

describe('buildPlan — linhas para upsert em notas + arestas do grafo', () => {
  it('gera a linha da nota com colunas do schema do banco', () => {
    const { notas } = buildPlan([handbook]);
    expect(notas).toHaveLength(1);
    expect(notas[0]).toMatchObject({
      slug: 'bomba-centrifuga',
      tipo_nota: 'tipo',
      locale: 'pt',
      titulo: 'Bomba Centrífuga',
      status: 'published',
      taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas'],
      corpo_md: handbook.corpo,
    });
    // frontmatter integral preservado como JSONB
    expect(notas[0].frontmatter).toMatchObject({ iso14224_code: 'PU' });
  });

  it('F10: grava revisado_em normalizada (Date do YAML → YYYY-MM-DD)', () => {
    const { notas } = buildPlan([handbook]);
    expect(notas[0].revisado_em).toBe('2026-07-04');
  });

  it('F10: revisado_em ausente vira null (coluna date aceita null em draft)', () => {
    const semData = {
      ...handbook,
      fm: { ...(handbook.fm as object), revisado_em: undefined } as typeof handbook.fm,
    };
    const { notas } = buildPlan([semData]);
    expect(notas[0].revisado_em).toBeNull();
  });

  it('gera arestas de wikilink a partir do corpo', () => {
    const { arestas } = buildPlan([handbook]);
    expect(arestas).toContainEqual({
      origem_slug: 'bomba-centrifuga',
      destino_slug: 'cavitacao',
      locale: 'pt',
      tipo: 'wikilink',
    });
  });

  it('gera aresta de taxonomia para o pai direto (último da cadeia)', () => {
    const { arestas } = buildPlan([handbook]);
    expect(arestas).toContainEqual({
      origem_slug: 'bomba-centrifuga',
      destino_slug: 'dinamicas',
      locale: 'pt',
      tipo: 'taxonomia',
    });
    // não gera aresta para ancestrais além do pai direto
    expect(arestas.filter((a) => a.tipo === 'taxonomia')).toHaveLength(1);
  });

  it('gera arestas de componente (handbook → componentes transversais, D10)', () => {
    const { arestas } = buildPlan([handbook]);
    expect(arestas).toContainEqual({
      origem_slug: 'bomba-centrifuga',
      destino_slug: 'rolamento',
      locale: 'pt',
      tipo: 'componente',
    });
    expect(arestas).toContainEqual({
      origem_slug: 'bomba-centrifuga',
      destino_slug: 'selo-mecanico',
      locale: 'pt',
      tipo: 'componente',
    });
  });

  it('não duplica aresta quando wikilink e componente apontam ao mesmo alvo', () => {
    const { arestas } = buildPlan([handbook]);
    const paraRolamento = arestas.filter((a) => a.destino_slug === 'rolamento');
    // uma de wikilink + uma de componente = tipos distintos, ambas válidas
    expect(paraRolamento).toHaveLength(2);
    expect(new Set(paraRolamento.map((a) => a.tipo)).size).toBe(2);
  });
});
