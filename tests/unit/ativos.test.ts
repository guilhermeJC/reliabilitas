import { describe, expect, it } from 'vitest';
import { clusterAcervo, ATIVOS_MVP } from '@/lib/content/ativos';
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
