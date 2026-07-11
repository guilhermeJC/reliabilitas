import type { SugestaoRow, ContribuicaoRow } from '@/lib/db/moderacao';

// Painel de aprovação (pedido do fundador, 11/07): só as PENDENTES ('nova')
// ficam visíveis por padrão — lida/resolvida/aceita/rejeitada viram "pastas"
// arquivadas, fechadas por padrão (mesmo padrão `<details>` da sidebar e do
// rodapé de fontes). Pura e testável — sem tocar o banco.

export interface GruposSugestoes {
  pendentes: SugestaoRow[];
  lidas: SugestaoRow[];
  resolvidas: SugestaoRow[];
}

export function agrupaSugestoes(itens: SugestaoRow[]): GruposSugestoes {
  return {
    pendentes: itens.filter((i) => i.status === 'nova'),
    lidas: itens.filter((i) => i.status === 'lida'),
    resolvidas: itens.filter((i) => i.status === 'resolvida'),
  };
}

export interface GruposContribuicoes {
  pendentes: ContribuicaoRow[];
  lidas: ContribuicaoRow[];
  aceitas: ContribuicaoRow[];
  rejeitadas: ContribuicaoRow[];
}

export function agrupaContribuicoes(itens: ContribuicaoRow[]): GruposContribuicoes {
  return {
    pendentes: itens.filter((i) => i.status === 'nova'),
    lidas: itens.filter((i) => i.status === 'lida'),
    aceitas: itens.filter((i) => i.status === 'aceita'),
    rejeitadas: itens.filter((i) => i.status === 'rejeitada'),
  };
}
