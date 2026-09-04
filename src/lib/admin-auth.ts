import { createHash, createHmac, timingSafeEqual } from 'crypto';

// Painel de aprovação (pedido do fundador, 11/07): controle de acesso
// proporcional a um único dono — sem conta de usuário, sem Supabase Auth
// (adiado pra Fase 2/3, DEV-018). Senha única (ADMIN_PASSWORD) + cookie
// assinado HMAC-SHA256 (ADMIN_SESSION_SECRET). Relógio injetável (testável,
// mesmo padrão de src/lib/rate-limit.ts).

const SETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000;

function assina(payload: string, segredo: string): string {
  return createHmac('sha256', segredo).update(payload).digest('hex');
}

export function criaTokenSessao(
  segredo: string,
  relogio: () => number = Date.now,
  duracaoMs: number = SETE_DIAS_MS,
): string {
  const exp = relogio() + duracaoMs;
  const payload = String(exp);
  return `${payload}.${assina(payload, segredo)}`;
}

export function verificaTokenSessao(
  token: string,
  segredo: string,
  relogio: () => number = Date.now,
): boolean {
  const partes = token.split('.');
  if (partes.length !== 2) return false;
  const [payload, assinatura] = partes;
  if (!payload || !assinatura) return false;

  const esperada = assina(payload, segredo);
  // DEV-129: a guarda comparava CARACTERES e só depois convertia para Buffer,
  // que conta BYTES. Uma assinatura de 64 caracteres com qualquer caractere
  // multi-byte (ex.: 'é'.repeat(32) + 'a'.repeat(32) = 64 chars, 96 bytes)
  // passava pela guarda e fazia o timingSafeEqual LANÇAR — erro 500 vindo de
  // uma função de autenticação, disparável por qualquer um que setasse o
  // cookie. Agora converte primeiro e compara o tamanho em BYTES, que é a
  // unidade que o timingSafeEqual exige.
  const bufAssinatura = Buffer.from(assinatura, 'utf8');
  const bufEsperada = Buffer.from(esperada, 'utf8');
  if (bufAssinatura.length !== bufEsperada.length) return false;
  if (!timingSafeEqual(bufAssinatura, bufEsperada)) return false;

  const exp = Number(payload);
  if (!Number.isFinite(exp)) return false;
  return relogio() < exp;
}

// Compara senha em tempo constante — hash primeiro (tamanho fixo) para nunca
// vazar o comprimento da senha real via timing, nem lançar em tamanhos diferentes.
export function senhaCorreta(candidata: string, esperada: string): boolean {
  const a = createHash('sha256').update(candidata).digest();
  const b = createHash('sha256').update(esperada).digest();
  return timingSafeEqual(a, b);
}
