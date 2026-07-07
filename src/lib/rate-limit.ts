// T09 — rate limit por rota: janela deslizante em memória (F04 do playbook/G4).
// Limitação consciente: em serverless cada instância tem a própria memória —
// esta é a camada de DEFESA EM PROFUNDIDADE da aplicação; o teto global fica
// no Cloudflare (60 req/min, Dia 4/runbook). Relógio injetável = testável.

export interface RateLimiterConfig {
  maxNaJanela: number;
  janelaMs: number;
  relogio?: () => number;
}

export function criaRateLimiter({
  maxNaJanela,
  janelaMs,
  relogio = Date.now,
}: RateLimiterConfig): (chave: string) => boolean {
  const tentativas = new Map<string, number[]>();

  return function permite(chave: string): boolean {
    const agora = relogio();
    const corte = agora - janelaMs;
    const recentes = (tentativas.get(chave) ?? []).filter((t) => t > corte);
    if (recentes.length >= maxNaJanela) {
      tentativas.set(chave, recentes);
      return false;
    }
    recentes.push(agora);
    tentativas.set(chave, recentes);
    return true;
  };
}
