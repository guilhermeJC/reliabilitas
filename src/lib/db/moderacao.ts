import 'server-only';
import { admin } from '@/lib/db/client';

// Painel de aprovação (pedido do fundador, 11/07) — leitura/triagem das 2
// filas de escrita do site (sugestões T09 + contribuições). Só acessível via
// /admin (guarda de sessão em src/lib/admin-auth.ts); estas funções em si não
// checam auth — quem chama é sempre uma rota já protegida (mesmo invariante
// de src/lib/db/*: banco só tocado por módulos server-only com service key).

// Campos de autoria compartilhados (nome/formação/função-empresa/LinkedIn-site
// + as 2 caixas de seleção) — pedido do fundador, 25/07 — mesmo conjunto nas
// 2 filas de moderação, fonte única em src/lib/autoria.ts.
export interface AutoriaRow {
  nome: string | null;
  formacao: string | null;
  funcao_empresa: string | null;
  linkedin_site: string | null;
  deseja_contribuidor: boolean;
  mostrar_publicamente: boolean;
}

export interface SugestaoRow extends AutoriaRow {
  id: number;
  criado_em: string;
  locale: string;
  pagina: string;
  mensagem: string;
  contato: string | null;
  status: 'nova' | 'lida' | 'resolvida';
}

export interface ContribuicaoRow extends AutoriaRow {
  id: number;
  criado_em: string;
  locale: string;
  tipo_nota: string;
  taxonomia_pai: string;
  titulo_sugerido: string;
  resumo: string | null;
  corpo_md: string;
  contato: string | null;
  status: 'nova' | 'lida' | 'aceita' | 'rejeitada';
}

const AUTORIA_COLS =
  'nome,formacao,funcao_empresa,linkedin_site,deseja_contribuidor,mostrar_publicamente';

export async function listSugestoes(): Promise<SugestaoRow[]> {
  const { data, error } = await admin()
    .from('sugestoes')
    .select(`id,criado_em,locale,pagina,mensagem,contato,status,${AUTORIA_COLS}`)
    .order('criado_em', { ascending: false });
  if (error) throw new Error(`listSugestoes: ${error.message}`);
  return (data ?? []) as SugestaoRow[];
}

export async function listContribuicoes(): Promise<ContribuicaoRow[]> {
  const { data, error } = await admin()
    .from('contribuicoes')
    .select(
      `id,criado_em,locale,tipo_nota,taxonomia_pai,titulo_sugerido,resumo,corpo_md,contato,status,${AUTORIA_COLS}`,
    )
    .order('criado_em', { ascending: false });
  if (error) throw new Error(`listContribuicoes: ${error.message}`);
  return (data ?? []) as ContribuicaoRow[];
}

export const SUGESTAO_STATUS = ['nova', 'lida', 'resolvida'] as const;
export const CONTRIBUICAO_STATUS = ['nova', 'lida', 'aceita', 'rejeitada'] as const;

export async function atualizaStatusSugestao(
  id: number,
  status: (typeof SUGESTAO_STATUS)[number],
): Promise<void> {
  const { error } = await admin().from('sugestoes').update({ status }).eq('id', id);
  if (error) throw new Error(`atualizaStatusSugestao(${id}): ${error.message}`);
}

export async function atualizaStatusContribuicao(
  id: number,
  status: (typeof CONTRIBUICAO_STATUS)[number],
): Promise<void> {
  const { error } = await admin().from('contribuicoes').update({ status }).eq('id', id);
  if (error) throw new Error(`atualizaStatusContribuicao(${id}): ${error.message}`);
}
