import { describe, expect, it } from 'vitest';
import { agrupaSugestoes, agrupaContribuicoes } from '@/lib/moderacao-grupos';
import type { SugestaoRow, ContribuicaoRow } from '@/lib/db/moderacao';

// Painel de aprovação (pedido do fundador, 11/07): só as PENDENTES ficam
// visíveis por padrão; lidas/resolvidas/aceitas/rejeitadas viram "pastas"
// arquivadas (details fechado) — mesmo padrão dos grupos da sidebar.

function sugestao(status: SugestaoRow['status'], id = 1): SugestaoRow {
  return {
    id,
    criado_em: '2026-07-11T00:00:00Z',
    locale: 'pt',
    pagina: '/pt/notas/bomba-centrifuga',
    mensagem: 'teste',
    contato: null,
    nome: null,
    formacao: null,
    funcao_empresa: null,
    linkedin_site: null,
    deseja_contribuidor: false,
    mostrar_publicamente: false,
    status,
  };
}

function contribuicao(status: ContribuicaoRow['status'], id = 1): ContribuicaoRow {
  return {
    id,
    criado_em: '2026-07-11T00:00:00Z',
    locale: 'pt',
    tipo_nota: 'tipo',
    taxonomia_pai: 'bombas',
    titulo_sugerido: 'teste',
    resumo: null,
    corpo_md: 'teste',
    contato: null,
    nome: null,
    formacao: null,
    funcao_empresa: null,
    linkedin_site: null,
    deseja_contribuidor: false,
    mostrar_publicamente: false,
    status,
  };
}

describe('agrupaSugestoes', () => {
  it('separa em pendentes/lidas/resolvidas', () => {
    const itens = [sugestao('nova', 1), sugestao('lida', 2), sugestao('resolvida', 3)];
    const g = agrupaSugestoes(itens);
    expect(g.pendentes.map((s) => s.id)).toEqual([1]);
    expect(g.lidas.map((s) => s.id)).toEqual([2]);
    expect(g.resolvidas.map((s) => s.id)).toEqual([3]);
  });

  it('lista vazia gera todos os grupos vazios (sem lançar)', () => {
    const g = agrupaSugestoes([]);
    expect(g.pendentes).toEqual([]);
    expect(g.lidas).toEqual([]);
    expect(g.resolvidas).toEqual([]);
  });

  it('múltiplas pendentes preservam a ordem de entrada', () => {
    const itens = [sugestao('nova', 1), sugestao('nova', 2), sugestao('lida', 3)];
    const g = agrupaSugestoes(itens);
    expect(g.pendentes.map((s) => s.id)).toEqual([1, 2]);
  });
});

describe('agrupaContribuicoes', () => {
  it('separa em pendentes/lidas/aceitas/rejeitadas', () => {
    const itens = [
      contribuicao('nova', 1),
      contribuicao('lida', 2),
      contribuicao('aceita', 3),
      contribuicao('rejeitada', 4),
    ];
    const g = agrupaContribuicoes(itens);
    expect(g.pendentes.map((c) => c.id)).toEqual([1]);
    expect(g.lidas.map((c) => c.id)).toEqual([2]);
    expect(g.aceitas.map((c) => c.id)).toEqual([3]);
    expect(g.rejeitadas.map((c) => c.id)).toEqual([4]);
  });

  it('lista vazia gera todos os grupos vazios', () => {
    const g = agrupaContribuicoes([]);
    expect(g.pendentes).toEqual([]);
    expect(g.lidas).toEqual([]);
    expect(g.aceitas).toEqual([]);
    expect(g.rejeitadas).toEqual([]);
  });
});
