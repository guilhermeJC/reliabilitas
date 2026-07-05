import { notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Cadeia taxonômica em pills clicáveis (D16) — títulos reais, não slugs.
export function Breadcrumb({
  taxonomia,
  titulos,
  locale,
}: {
  taxonomia: string[];
  titulos: Map<string, string>;
  locale: Locale;
}) {
  if (taxonomia.length === 0) return null;
  return (
    <nav aria-label="breadcrumb" className="mb-4 flex flex-wrap gap-1.5 text-xs">
      {taxonomia.map((pai) => (
        <a
          key={pai}
          href={notaPath(locale, pai)}
          className="rounded-full border px-2.5 py-0.5 transition-colors hover:bg-white"
          style={{ color: 'var(--wikilink)', borderColor: '#d3dae6' }}
        >
          {titulos.get(pai) ?? pai}
        </a>
      ))}
    </nav>
  );
}
