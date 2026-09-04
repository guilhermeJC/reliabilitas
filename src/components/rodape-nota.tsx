import { getTranslations } from 'next-intl/server';
import { agrupaFontes, GRUPOS_FONTES, type GrupoFonte } from '@/lib/content/fontes';
import { notaPath, sugerirPath } from '@/lib/routes';
import { SugerirCorrecaoLink } from '@/components/sugerir-correcao-link';
import type { Locale } from '@/lib/content/schema';
import type { Nota } from '@/lib/db/notas';

// DEV-083 #8: extraído de notas/[slug]/page.tsx pra seguir a convenção do
// resto (Breadcrumb/Backlinks/FwCards/PlanoTable são todos componentes
// próprios). Async Server Component — mesmo padrão de Backlinks/FwCards.
export async function RodapeNota({ nota, locale }: { nota: Nota; locale: Locale }) {
  const t = await getTranslations('nota');
  const fontes = (nota.frontmatter.fontes as string[] | undefined) ?? [];
  // Melhoria 1 do fundador (10/07): fontes recolhíveis (details nativo — o
  // conteúdo permanece no HTML do SSR, BR-010) e agrupadas por natureza.
  // Abertas por padrão desde 04/09 (DEV-127, pedido do fundador): a lista de
  // fontes é parte do argumento de credibilidade da nota, não um apêndice —
  // continua recolhível, só inverte o estado inicial.
  const grupos = agrupaFontes(fontes);
  const rotulos: Record<GrupoFonte, string> = {
    normas: t('fontesNormas'),
    literatura: t('fontesLiteratura'),
    artigos: t('fontesArtigos'),
    outros: t('fontesOutros'),
  };
  return (
    <footer className="mt-8 border-t pt-4" style={{ borderColor: '#e3e8f0' }}>
      {fontes.length > 0 && (
        <details open>
          <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-slate-700 [&::-webkit-details-marker]:hidden">
            <svg
              className="tree-chevron shrink-0"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              aria-hidden="true"
            >
              <path
                d="M3.5 1.5 L6.5 5 L3.5 8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('fontes')}
            <span className="font-mono text-[11px] normal-case tracking-normal text-slate-400">
              {fontes.length}
            </span>
          </summary>
          <div className="mt-2 space-y-3">
            {GRUPOS_FONTES.map((g) =>
              grupos[g].length > 0 ? (
                <div key={g}>
                  <h3 className="text-[11px] font-medium text-slate-400">{rotulos[g]}</h3>
                  <ul className="mt-1 space-y-1 text-[13px] text-slate-600">
                    {grupos[g].map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </div>
        </details>
      )}
      <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {nota.revisado_em && (
          <span className="font-mono text-xs text-slate-500">
            {t('revisado')} {nota.revisado_em}
          </span>
        )}
      </p>
      {/* T09: toda nota oferece o canal curado de correção (também no topo — melhoria do fundador, 11/07) */}
      <div className="mt-3">
        <SugerirCorrecaoLink
          href={sugerirPath(locale, notaPath(locale, nota.slug))}
          texto={t('sugerirCorrecao')}
        />
      </div>
    </footer>
  );
}
