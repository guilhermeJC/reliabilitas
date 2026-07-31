import type { MetadataRoute } from 'next';
import { montaRobots } from '@/lib/seo/robots';
import { SITE_URL } from '@/lib/seo/site';

// DEV-111 — convenção do App Router: este arquivo serve /robots.txt.
// Wrapper fino sobre a lógica testada em robots.test.ts (BR-010).
export default function robots(): MetadataRoute.Robots {
  return montaRobots(SITE_URL);
}
