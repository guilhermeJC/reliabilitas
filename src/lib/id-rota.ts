// DEV-129 — as rotas de mutação do admin passavam `Number(id)` cru, direto do
// segmento da URL, para o banco. `Number` é permissivo demais para servir de
// validação de id: `Number('1e3')` é 1000, `Number(' 7 ')` é 7, `Number('0x10')`
// é 16 e `Number('abc')` é NaN. Nada disso é um id de linha legítimo. As rotas
// exigem autenticação, então não era escalada de privilégio — é robustez: id
// inválido tem que virar 400 na borda, não uma query esquisita no Postgres.

const INTEIRO_POSITIVO_RE = /^[1-9][0-9]*$/;

export function parseIdPositivo(raw: string | null | undefined): number | null {
  if (typeof raw !== 'string' || !INTEIRO_POSITIVO_RE.test(raw)) return null;
  const n = Number(raw);
  return Number.isSafeInteger(n) ? n : null;
}
