import { z } from 'zod';

// Campos opcionais de identificação do autor — pedido do fundador (25/07),
// idênticos nas 2 superfícies de escrita públicas (Sugerir correção +
// Colaborar). Fonte única: antes, só Colaborar tinha formacao/funcaoEmpresa
// (DEV-094) e usava um campo de texto livre (`contatoVisibilidade`) pra
// descrever o que mostrar publicamente. Agora os dois formulários têm o MESMO
// conjunto de campos + 2 caixas de seleção distintas:
// - desejaContribuidor: a pessoa quer ser registrada como contribuidor
//   (crédito INTERNO, pro curador — não implica exibição pública sozinho);
// - mostrarPublicamente: autoriza esses dados específicos aparecerem no
//   byline público da nota, se aprovada e publicada.
// Nenhum campo é obrigatório (BR-011).

export const NOME_MAX = 150;
export const FORMACAO_MAX = 300;
export const FUNCAO_EMPRESA_MAX = 200;
export const LINKEDIN_SITE_MAX = 300;

const textoOpcional = (max: number) =>
  z.union([z.literal(''), z.string().trim().max(max)]).transform((v) => (v === '' ? null : v));

export const autoriaShape = {
  nome: textoOpcional(NOME_MAX),
  formacao: textoOpcional(FORMACAO_MAX),
  funcaoEmpresa: textoOpcional(FUNCAO_EMPRESA_MAX),
  linkedinSite: textoOpcional(LINKEDIN_SITE_MAX),
  desejaContribuidor: z.boolean(),
  mostrarPublicamente: z.boolean(),
};

// Checkbox HTML: só chega no FormData quando MARCADO, com valor 'on'. Ausência
// da chave = desmarcado = false. `raw` vem de Object.fromEntries(form.entries()).
export function paraBooleanCheckbox(v: unknown): boolean {
  return v === 'on' || v === true;
}

// Monta o fragmento de autoria pronto pra spread dentro do objeto passado a
// `schema.safeParse` — usado igualmente por sugestao.ts e contribuicao.ts.
export function normalizaAutoria(raw: Record<string, unknown>) {
  return {
    nome: raw.nome ?? '',
    formacao: raw.formacao ?? '',
    funcaoEmpresa: raw.funcaoEmpresa ?? '',
    linkedinSite: raw.linkedinSite ?? '',
    desejaContribuidor: paraBooleanCheckbox(raw.desejaContribuidor),
    mostrarPublicamente: paraBooleanCheckbox(raw.mostrarPublicamente),
  };
}
