import type { MetadataRoute } from 'next';
import { listPublicadas } from '@/lib/db/notas';
import { montaEntradasSitemap } from '@/lib/seo/sitemap';
import { SITE_URL } from '@/lib/seo/site';

// DEV-111 — convenção do App Router: este arquivo serve /sitemap.xml.
// Wrapper fino sobre a lógica pura (testada em sitemap.test.ts) + as 2 queries
// de notas publicadas — mesmo padrão de `db/*` sem teste direto.
//
// force-dynamic pelo mesmo motivo do resto do site (build hermético: o CI não
// tem credenciais do banco e não deve ter). Quando o G6/ISR entrar, este é um
// dos primeiros candidatos a `revalidate`.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pt, en] = await Promise.all([listPublicadas('pt'), listPublicadas('en')]);
  return montaEntradasSitemap(
    SITE_URL,
    pt.map((n) => n.slug),
    en.map((n) => n.slug),
  );
}
