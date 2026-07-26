// DEV-109 (auditoria técnica, 25/07/2026) — o projeto não tinha NENHUMA forma
// de saber se alguém usava o site: nada de analytics instalado. No dia do
// lançamento (post no LinkedIn) não haveria como medir absolutamente nada.
//
// Escolha: Cloudflare Web Analytics.
//  - SEM cookie e sem fingerprint → mantém a promessa cookieless (BR-011) e a
//    Política de Privacidade como está, sem precisar reescrever nada;
//  - sem limite de eventos (o Vercel Analytics no Hobby corta em 2.500/mês, o
//    que um lançamento no LinkedIn consome rápido);
//  - já disponível na conta que hospeda o DNS/WAF — zero dependência npm nova.
//
// ATENÇÃO (mesma classe do bug DEV-107): a CSP deste projeto usa
// 'strict-dynamic', que faz o browser IGNORAR allowlist por host em
// script-src. A auto-injeção do beacon pela borda da Cloudflare (o "Automatic
// Setup" do painel) NÃO funcionaria — chegaria sem nonce e seria bloqueada em
// silêncio. Por isso o script é inserido por nós, com o nonce da requisição,
// e o painel deve ficar em "Manual Setup".
//
// Sem CF_ANALYTICS_TOKEN configurado, nada é emitido (degradação graciosa —
// mesmo padrão de DOACAO_LINKS e do DSN do Sentry).

export interface BeaconCloudflare {
  src: string;
  nonce: string;
  dataCfBeacon: string;
  defer: true;
}

const BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js';

export function montaBeaconCloudflare(
  token: string | undefined,
  nonce: string | undefined,
): BeaconCloudflare | null {
  if (!token || !nonce) return null;
  return {
    src: BEACON_SRC,
    nonce,
    // JSON.stringify em vez de template string: um token com aspas quebraria
    // o atributo HTML e viraria injeção.
    dataCfBeacon: JSON.stringify({ token }),
    defer: true,
  };
}
