import { SITE_URL } from '@/lib/seo/site';

// DEV-129 — ACHADO DE SEGURANÇA (04/09). O origin da Vercel atendia direto, por
// fora da Cloudflare: medido em produção, 15/15 requisições passaram em
// reliabilitas.vercel.app enquanto reliabilitas.com bloqueava na 10ª, e o WAF
// que devolve 403 em /wp-admin no domínio canônico devolvia 307 no origin.
// Consequência: WAF, rate limit de borda e allowlist de crawlers eram TODOS
// contornáveis por quem soubesse a URL do origin — inclusive para força bruta
// no /admin/login e para o scraping em massa nomeado como ameaça nº 1 no
// CLAUDE.md §9. O canonical/sitemap já apontavam certo, então o SEO estava
// protegido; o buraco era de acesso.
//
// A defesa é redirecionar para o domínio canônico, forçando todo o tráfego de
// produção a atravessar a borda. Lógica pura aqui, testável em `node`; o
// middleware só aplica.

export const HOST_CANONICO = new URL(SITE_URL).host;

// Só o deploy de PRODUÇÃO é fechado. Previews da Vercel (`VERCEL_ENV=preview`)
// e o desenvolvimento local (variável ausente) seguem livres — fechá-los
// quebraria o fluxo de review sem ganho de segurança real: são URLs efêmeras,
// não indexadas e não divulgadas.
export function destinoCanonico(
  url: string,
  host: string | null | undefined,
  vercelEnv: string | undefined,
): string | null {
  if (vercelEnv !== 'production') return null;
  if (!host) return null; // sem Host não se adivinha destino

  // Host é case-insensitive (RFC 9110) e pode trazer porta.
  const semPorta = host.toLowerCase().split(':')[0];
  if (semPorta === HOST_CANONICO.toLowerCase()) return null;

  let alvo: URL;
  try {
    alvo = new URL(url);
  } catch {
    return null; // URL ilegível: degrada para não-redirecionar
  }
  // O destino vem SEMPRE da constante do código, nunca do header recebido —
  // caso contrário um Host forjado escolheria para onde o visitante vai.
  alvo.protocol = 'https:';
  alvo.host = HOST_CANONICO;
  alvo.port = '';
  return alvo.toString();
}
