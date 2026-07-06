import { montaGrafoLocal, GRAFO_RX, GRAFO_RY, type ArestaVizinhanca } from '@/lib/content/grafo';
import { notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';
import type { NotaResumo } from '@/lib/db/notas';

// Grafo local em SVG próprio (AFC Dia 3) — server component puro: nós clicáveis
// são <a> reais (crawlers e teclado enxergam; BR-010). Paleta PRÓPRIA do grafo,
// deliberadamente fora dos tokens semânticos congelados (Fw A/Fw B/wikilink/accent
// seguem exclusivos — Design §6).

const COR_POR_TIPO: Record<string, string> = {
  classe: 'var(--navy-700)',
  familia: 'var(--navy-700)',
  principio: 'var(--navy-700)',
  tipo: 'var(--navy-700)',
  marca_modelo: '#64748b',
  componente: '#64748b',
  modo_falha: '#9f1239',
  estrategia: '#0f766e',
};

function truncaTitulo(t: string): string {
  return t.length > 20 ? `${t.slice(0, 19)}…` : t;
}

export function GrafoLocal({
  slug,
  arestas,
  acervo,
  locale,
  titulo,
}: {
  slug: string;
  arestas: ArestaVizinhanca[];
  acervo: NotaResumo[];
  locale: Locale;
  titulo: string;
}) {
  const g = montaGrafoLocal(slug, arestas, acervo);
  if (g.nos.length === 0) return null;

  const margemX = GRAFO_RX + 80;
  const margemY = GRAFO_RY + 45;

  return (
    <section className="mt-6 rounded-lg border bg-white p-4" style={{ borderColor: '#e3e8f0' }}>
      <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {titulo}
      </h2>
      <svg
        viewBox={`${-margemX} ${-margemY} ${2 * margemX} ${2 * margemY}`}
        role="img"
        aria-label={titulo}
        className="mx-auto mt-2 block w-full max-w-xl"
      >
        {g.ligacoes.map((l) => (
          <line key={l.slug} x1={0} y1={0} x2={l.x} y2={l.y} stroke="#d3dae6" strokeWidth="1" />
        ))}
        {g.nos.map((no) => (
          <a key={no.slug} href={notaPath(locale, no.slug)}>
            <circle
              cx={no.x}
              cy={no.y}
              r={no.central ? 10 : 7}
              fill={COR_POR_TIPO[no.tipo_nota] ?? '#64748b'}
              stroke={no.central ? 'var(--accent)' : 'white'}
              strokeWidth={no.central ? 2.5 : 1.5}
            />
            <text
              x={no.x}
              y={no.y + (no.central ? 26 : 21)}
              textAnchor="middle"
              fontSize="11"
              fill="var(--gray-tech)"
            >
              {truncaTitulo(no.titulo)}
            </text>
          </a>
        ))}
      </svg>
    </section>
  );
}
