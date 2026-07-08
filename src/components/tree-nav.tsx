import { getTranslations } from 'next-intl/server';
import { listPublicadas } from '@/lib/db/notas';
import { buildGroups, type TreeNode, type FalhaItem } from '@/lib/content/tree';
import { notaPath } from '@/lib/routes';
import type { NotaResumo } from '@/lib/db/notas';
import type { Locale } from '@/lib/content/schema';

// Barra lateral em 3 grupos (revisão do fundador 06/07): Equipamentos (árvore
// taxonômica), Componentes (D10) e Falhas. Colapsável via <details> NATIVO —
// funciona sem JavaScript, acessível por padrão, e todos os links ficam no HTML
// do SSR (crawlers veem tudo — BR-010 intocada). Tudo fechado por padrão: o
// visitante clica e o ramo aparece.

function Chevron() {
  return (
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
  );
}

const linkCls =
  'flex items-baseline justify-between gap-2 rounded px-2 py-1 text-[13px] leading-snug text-slate-300 transition-colors hover:bg-white/5 hover:text-white';

// Nó da árvore de Equipamentos: folha = link simples; ramo = <details> nativo
// cujo summary tem o chevron (alterna) + o link do nó (navega).
function Ramo({ no, locale, nivel }: { no: TreeNode; locale: Locale; nivel: number }) {
  const recuo = 8 + nivel * 14;

  if (no.children.length === 0) {
    return (
      <li>
        <a
          href={notaPath(locale, no.slug)}
          className={linkCls}
          style={{ paddingLeft: `${recuo + 16}px` }}
        >
          <span>{no.titulo}</span>
        </a>
      </li>
    );
  }

  return (
    <li>
      <details className="tree-branch">
        <summary
          className="flex cursor-pointer list-none items-center gap-1 rounded px-2 py-1 text-[13px] leading-snug text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          style={{ paddingLeft: `${recuo}px` }}
        >
          <Chevron />
          <a
            href={notaPath(locale, no.slug)}
            className="flex-1 hover:text-white hover:underline"
            style={{ color: 'inherit' }}
          >
            {no.titulo}
          </a>
          {no.descendentes > 0 && (
            <span className="font-mono text-[11px] text-slate-500">{no.descendentes}</span>
          )}
        </summary>
        <ul>
          {no.children.map((filho) => (
            <Ramo key={filho.slug} no={filho} locale={locale} nivel={nivel + 1} />
          ))}
        </ul>
      </details>
    </li>
  );
}

function Grupo({
  titulo,
  count,
  children,
}: {
  titulo: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <details className="tree-group border-t border-white/5 px-1 py-2 first:border-t-0">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400 transition-colors hover:text-slate-200">
        <Chevron />
        <span className="flex-1">{titulo}</span>
        {count > 0 && <span className="font-mono text-[11px] text-slate-500">{count}</span>}
      </summary>
      <div className="mt-1">{children}</div>
    </details>
  );
}

export async function TreeNav({ locale }: { locale: Locale }) {
  const t = await getTranslations('tree');
  const { equipamentos, componentes, falhas } = buildGroups(await listPublicadas(locale));
  const totalEquip = equipamentos.reduce((s, n) => s + 1 + n.descendentes, 0);

  return (
    // Travada no scroll (revisão do fundador 08/07): sticky logo abaixo do header
    // (h-14), altura exata da viewport restante e scroll INTERNO próprio — a
    // navegação nunca some quando o conteúdo da página rola.
    <aside
      className="w-full shrink-0 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-[280px] md:self-start md:overflow-y-auto"
      style={{ background: 'var(--navy-900)' }}
    >
      <nav aria-label={t('title')} className="px-2 py-3">
        <Grupo titulo={t('equipamentos')} count={totalEquip}>
          <ul>
            {equipamentos.map((raiz) => (
              <Ramo key={raiz.slug} no={raiz} locale={locale} nivel={0} />
            ))}
          </ul>
        </Grupo>

        <Grupo titulo={t('componentes')} count={componentes.length}>
          <ul>
            {componentes.map((c: NotaResumo) => (
              <li key={c.slug}>
                <a
                  href={notaPath(locale, c.slug)}
                  className={linkCls}
                  style={{ paddingLeft: '24px' }}
                >
                  <span>{c.titulo}</span>
                </a>
              </li>
            ))}
          </ul>
        </Grupo>

        <Grupo titulo={t('falhas')} count={falhas.length}>
          <ul>
            {falhas.map((f: FalhaItem) => (
              <li key={f.slug}>
                <a
                  href={notaPath(locale, f.slug)}
                  className="block rounded px-2 py-1 pl-6 text-[13px] leading-snug text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span>{f.titulo}</span>
                  {f.equipamento && (
                    <span className="block text-[11px] text-slate-500">{f.equipamento}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </Grupo>
      </nav>
    </aside>
  );
}
