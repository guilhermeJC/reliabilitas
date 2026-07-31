// URL canônica pública do site — fonte única para sitemap, robots e metadata.
// Env var com fallback: o build do CI roda sem `.env` (build hermético) e não
// pode quebrar por falta dela; em produção a Vercel injeta o valor.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://reliabilitas.com';
