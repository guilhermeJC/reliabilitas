import { z } from 'zod';
import { SLUG_RE, LOCALES, TIPOS_NOTA } from '@/lib/content/schema';

// Colaborar (pedido do fundador, 11/07) — 2ª superfície de escrita do site,
// mesma disciplina do T09 (sugestao.ts): honeypot separado do zod, todo campo
// é input hostil, contato opcional (BR-011). Diferença: aqui o visitante
// propõe uma NOTA NOVA (título+corpo+taxonomia pai), não uma correção de texto.
//
// A aprovação NÃO publica direto (AFC do fundador, 11/07): vira matéria-prima
// para o fluxo editorial de sempre (DEV-024) — o conteúdo aceito ainda passa
// por reescrita/revisão e pelo Git→CI→ingest antes de ir ao ar.

export const TITULO_MIN = 3;
export const TITULO_MAX = 200;
export const RESUMO_MAX = 500;
export const CORPO_MIN = 50;
export const CORPO_MAX = 20000;

// Subconjunto de TIPOS_NOTA: classe/família/princípio são decisões de
// arquitetura da taxonomia (AFC do fundador), não conteúdo de colaborador.
export const CONTRIBUICAO_TIPOS = TIPOS_NOTA.filter(
  (t) => !['classe', 'familia', 'principio'].includes(t),
);

const contribuicaoSchema = z.strictObject({
  locale: z.enum(LOCALES),
  tipoNota: z.enum(CONTRIBUICAO_TIPOS as [string, ...string[]]),
  taxonomiaPai: z.string().regex(SLUG_RE, 'taxonomiaPai deve ser slug canônico'),
  tituloSugerido: z.string().trim().min(TITULO_MIN).max(TITULO_MAX),
  resumo: z
    .union([z.literal(''), z.string().trim().max(RESUMO_MAX)])
    .transform((v) => (v === '' ? null : v)),
  corpoMd: z.string().trim().min(CORPO_MIN).max(CORPO_MAX),
  contato: z
    .union([z.literal(''), z.string().trim().email().max(200)])
    .transform((v) => (v === '' ? null : v)),
});

export type Contribuicao = z.infer<typeof contribuicaoSchema>;

export type ResultadoContribuicao =
  | { ok: true; data: Contribuicao }
  | { ok: false; motivo: 'bot' | 'invalida' };

export function validaContribuicao(raw: Record<string, unknown>): ResultadoContribuicao {
  // Honeypot: campo 'website' é invisível para humanos (CSS); preenchido = bot.
  if (typeof raw.website !== 'string' || raw.website !== '') {
    return { ok: false, motivo: 'bot' };
  }
  const parsed = contribuicaoSchema.safeParse({
    locale: raw.locale,
    tipoNota: raw.tipoNota,
    taxonomiaPai: raw.taxonomiaPai,
    tituloSugerido: raw.tituloSugerido,
    resumo: raw.resumo ?? '',
    corpoMd: raw.corpoMd,
    contato: raw.contato ?? '',
  });
  if (!parsed.success) return { ok: false, motivo: 'invalida' };
  return { ok: true, data: parsed.data };
}
