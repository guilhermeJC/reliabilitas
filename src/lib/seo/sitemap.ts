import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/content/schema';

// DEV-111 (auditoria técnica, 25/07/2026) — `/sitemap.xml` devolvia 404 e o
// `robots.txt` servido era um boilerplate injetado pela Cloudflare SEM NENHUMA
// diretiva (só comentários de content-signals; o origin devolvia 404). Como
// TODO o modelo de aquisição do projeto é SEO/GEO (D26 — sem ads pagos), um
// domínio novo com 124 páginas e nenhum sitemap é o pior cenário de descoberta
// possível.
//
// Lógica pura aqui; a leitura do banco fica em `src/app/sitemap.ts` — mesmo
// padrão de `normas-index.ts` (regra do projeto: `db/*` sem teste direto,
// lógica testável isolada).

export interface RotaEstatica {
  caminho: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}

// Só rotas INDEXÁVEIS. /busca, /sugerir e /colaborar têm `robots: index:false`
// no próprio `generateMetadata` — incluí-las aqui seria mandar o crawler a um
// lugar que a própria página manda ele ignorar (sinal contraditório).
// /admin e /api nunca entram: superfície interna.
export const ROTAS_ESTATICAS_INDEXAVEIS: readonly RotaEstatica[] = [
  { caminho: '', priority: 1.0, changeFrequency: 'weekly' }, // home do locale
  { caminho: '/metodo', priority: 0.8, changeFrequency: 'monthly' },
  { caminho: '/metodo/framework-a', priority: 0.7, changeFrequency: 'monthly' },
  { caminho: '/metodo/framework-b', priority: 0.7, changeFrequency: 'monthly' },
  { caminho: '/calculadoras', priority: 0.8, changeFrequency: 'monthly' },
  { caminho: '/calculadoras/guia', priority: 0.6, changeFrequency: 'monthly' },
  { caminho: '/normas', priority: 0.6, changeFrequency: 'weekly' },
  { caminho: '/sobre', priority: 0.6, changeFrequency: 'monthly' },
  { caminho: '/apoiar', priority: 0.5, changeFrequency: 'monthly' },
  { caminho: '/termos', priority: 0.3, changeFrequency: 'yearly' },
] as const;

const PRIORIDADE_NOTA = 0.9; // conteúdo é o produto — acima de qualquer utilitária

function semBarraFinal(base: string): string {
  return base.replace(/\/+$/, '');
}

/**
 * Monta as entradas do sitemap. `slugsPt`/`slugsEn` são os slugs das notas
 * PUBLICADAS de cada locale (arquivadas ficam de fora — elas já respondem
 * `robots: index:false`).
 */
export function montaEntradasSitemap(
  base: string,
  slugsPt: readonly string[],
  slugsEn: readonly string[],
): MetadataRoute.Sitemap {
  const raiz = semBarraFinal(base);
  const agora = new Date();
  const entradas: MetadataRoute.Sitemap = [];

  for (const rota of ROTAS_ESTATICAS_INDEXAVEIS) {
    for (const locale of LOCALES) {
      entradas.push({
        url: `${raiz}/${locale}${rota.caminho}`,
        lastModified: agora,
        changeFrequency: rota.changeFrequency,
        priority: rota.priority,
        // hreflang: a MESMA página existe nos 2 locales, com caminho idêntico.
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${raiz}/${l}${rota.caminho}`]),
          ) as Record<string, string>,
        },
      });
    }
  }

  // Notas NÃO declaram alternates: o slug PT e o EN divergem ("cavitacao" ×
  // "cavitation") e não existe hoje um mapa PT↔EN por nota. Declarar alternate
  // sem esse mapa apontaria o crawler pra 404 — pior que não declarar.
  const porLocale: Array<[string, readonly string[]]> = [
    ['pt', slugsPt],
    ['en', slugsEn],
  ];
  for (const [locale, slugs] of porLocale) {
    for (const slug of new Set(slugs)) {
      entradas.push({
        url: `${raiz}/${locale}/notas/${slug}`,
        lastModified: agora,
        changeFrequency: 'monthly',
        priority: PRIORIDADE_NOTA,
      });
    }
  }

  return entradas;
}
