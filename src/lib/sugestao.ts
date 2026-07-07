import { z } from 'zod';

// T09 — contrato da ÚNICA rota de escrita do site (G4/DEV-014). Todo campo é
// input hostil: strings estritas, página só como path interno (nunca URL — a
// rota redireciona de volta e um path externo viraria open redirect), honeypot
// separado do zod para a rota FINGIR sucesso sem gravar.

export const MENSAGEM_MIN = 10;
export const MENSAGEM_MAX = 2000;

const sugestaoSchema = z.strictObject({
  mensagem: z.string().trim().min(MENSAGEM_MIN).max(MENSAGEM_MAX),
  // path interno: começa com exatamente UMA barra ('//' seria protocol-relative)
  pagina: z.string().regex(/^\/(?!\/)[\w\-/?=%.]*$/, 'pagina deve ser path interno'),
  contato: z
    .union([z.literal(''), z.string().trim().email().max(200)])
    .transform((v) => (v === '' ? null : v)),
});

export type Sugestao = z.infer<typeof sugestaoSchema>;

export type ResultadoSugestao =
  { ok: true; data: Sugestao } | { ok: false; motivo: 'bot' | 'invalida' };

export function validaSugestao(raw: Record<string, unknown>): ResultadoSugestao {
  // Honeypot: campo 'website' é invisível para humanos (CSS); preenchido = bot.
  if (typeof raw.website !== 'string' || raw.website !== '') {
    return { ok: false, motivo: 'bot' };
  }
  const parsed = sugestaoSchema.safeParse({
    mensagem: raw.mensagem,
    pagina: raw.pagina,
    contato: raw.contato ?? '',
  });
  if (!parsed.success) return { ok: false, motivo: 'invalida' };
  return { ok: true, data: parsed.data };
}
