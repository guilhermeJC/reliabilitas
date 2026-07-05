import { getTranslations } from 'next-intl/server';
import { listPublicadas } from '@/lib/db/notas';
import { buildTree, type TreeNode } from '@/lib/content/tree';
import { notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Árvore taxonômica (T04 parcial): só nós publicados, contagem por ramo (D16).
// Mobile: recolhe num <details> nativo — o drawer completo é polish pós-MVP.

function Ramo({ no, locale, nivel }: { no: TreeNode; locale: Locale; nivel: number }) {
  return (
    <li>
      <a
        href={notaPath(locale, no.slug)}
        className="flex items-baseline justify-between gap-2 rounded px-2 py-1 text-[13px] leading-snug text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
        style={{ paddingLeft: `${8 + nivel * 14}px` }}
      >
        <span>{no.titulo}</span>
        {no.descendentes > 0 && (
          <span className="font-mono text-[11px] text-slate-500">{no.descendentes}</span>
        )}
      </a>
      {no.children.length > 0 && (
        <ul>
          {no.children.map((filho) => (
            <Ramo key={filho.slug} no={filho} locale={locale} nivel={nivel + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export async function TreeNav({ locale }: { locale: Locale }) {
  const t = await getTranslations('tree');
  const raizes = buildTree(await listPublicadas(locale));

  return (
    <aside
      className="w-full shrink-0 md:min-h-[calc(100vh-3.5rem)] md:w-[280px]"
      style={{ background: 'var(--navy-900)' }}
    >
      <details className="group px-3 py-3 md:open:pb-6" open>
        <summary className="cursor-pointer list-none px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 md:pointer-events-none">
          {t('title')}
        </summary>
        <nav aria-label={t('title')} className="mt-2">
          <ul>
            {raizes.map((raiz) => (
              <Ramo key={raiz.slug} no={raiz} locale={locale} nivel={0} />
            ))}
          </ul>
        </nav>
      </details>
    </aside>
  );
}
