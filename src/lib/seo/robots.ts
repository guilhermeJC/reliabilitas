import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/content/schema';

// DEV-111 (auditoria 25/07, aplicado em 31/07) — o site não servia robots.txt próprio: o origin
// devolvia 404 e o que chegava ao visitante era um boilerplate injetado pela
// borda da Cloudflare, com ZERO diretivas (só comentários de content-signals).
// Ou seja: nenhum sitemap declarado e nenhuma expressão da BR-010.
//
// BR-010 é invariante: crawlers de busca E DE IA sempre passam — SEO/GEO é o
// único motor de aquisição (D26, sem ads pagos). Por isso a regra geral é
// `allow: '/'` e NÃO existe nenhum disallow de raiz. Os bots de IA são citados
// explicitamente não porque precisem (o '*' já os cobre), mas para que a
// intenção fique registrada no arquivo que o crawler lê — e para que remover
// isso seja uma decisão consciente, não um efeito colateral.

// Rotas utilitárias que já respondem `robots: { index: false }` no próprio
// generateMetadata. Bloquear aqui também mantém o sinal coerente (o crawler
// nem gasta orçamento de rastreio nelas). NUNCA inclui /notas — é o produto.
export const CAMINHOS_BLOQUEADOS: readonly string[] = [
  '/admin',
  '/api',
  ...LOCALES.flatMap((l) => [`/${l}/busca`, `/${l}/sugerir`, `/${l}/colaborar`]),
];

const BOTS_IA = ['GPTBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended'];

export function montaRobots(base: string): MetadataRoute.Robots {
  const raiz = base.replace(/\/+$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...CAMINHOS_BLOQUEADOS],
      },
      {
        // Redundante em relação ao '*' acima, e proposital: deixa a BR-010
        // legível para quem auditar o arquivo (inclusive o próprio operador
        // do crawler de IA).
        userAgent: BOTS_IA,
        allow: '/',
        disallow: [...CAMINHOS_BLOQUEADOS],
      },
    ],
    sitemap: `${raiz}/sitemap.xml`,
  };
}
