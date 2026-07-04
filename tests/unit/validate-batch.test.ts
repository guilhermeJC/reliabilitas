import { describe, expect, it } from 'vitest';
import { validateBatch, type NotaParsed } from '@/lib/content/validate-batch';
import type { NotaFrontmatter } from '@/lib/content/schema';

function nota(
  over: Partial<NotaFrontmatter> & { slug: string },
  wikilinks: string[] = [],
): NotaParsed {
  const fm = {
    tipo_nota: 'familia',
    locale: 'pt',
    titulo: over.slug,
    status: 'published',
    taxonomia: [],
    fontes: ['ISO 14224:2016'],
    resumo: 'resumo',
    ...over,
  } as NotaFrontmatter;
  return { fm, corpo: '', file: `content/${fm.locale}/${fm.tipo_nota}/${fm.slug}.md`, wikilinks };
}

// Cadeia mínima válida PT+EN: classe → família → princípio → tipo → modo_falha
function cadeiaCompleta(locale: 'pt' | 'en'): NotaParsed[] {
  return [
    nota({ slug: 'transferencia-de-fluidos-liquidos', tipo_nota: 'classe', locale }),
    nota({
      slug: 'bombas',
      tipo_nota: 'familia',
      locale,
      taxonomia: ['transferencia-de-fluidos-liquidos'],
    }),
    nota({
      slug: 'dinamicas',
      tipo_nota: 'principio',
      locale,
      taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas'],
    }),
    nota({
      slug: 'bomba-centrifuga',
      tipo_nota: 'tipo',
      locale,
      taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas'],
    }),
    nota({
      slug: 'cavitacao',
      tipo_nota: 'modo_falha',
      locale,
      taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas', 'bomba-centrifuga'],
    }),
  ];
}

describe('validateBatch — regras de publicação do acervo', () => {
  it('aceita cadeia completa e bilíngue', () => {
    const r = validateBatch([...cadeiaCompleta('pt'), ...cadeiaCompleta('en')]);
    expect(r.errors).toEqual([]);
  });

  it('BR-001: rejeita modo_falha publicado sem a cadeia-pai publicada', () => {
    const semTipo = [...cadeiaCompleta('pt'), ...cadeiaCompleta('en')].filter(
      (n) => !(n.fm.slug === 'bomba-centrifuga' && n.fm.locale === 'pt'),
    );
    const r = validateBatch(semTipo);
    expect(r.errors.some((e) => e.message.includes('BR-001'))).toBe(true);
    expect(r.errors.some((e) => e.message.includes('bomba-centrifuga'))).toBe(true);
  });

  it('BR-001: cadeia-pai em draft não conta como publicada', () => {
    const lote = [...cadeiaCompleta('pt'), ...cadeiaCompleta('en')].map((n) =>
      n.fm.slug === 'dinamicas' && n.fm.locale === 'pt'
        ? { ...n, fm: { ...n.fm, status: 'draft' } as NotaFrontmatter }
        : n,
    );
    const r = validateBatch(lote);
    expect(r.errors.some((e) => e.message.includes('BR-001'))).toBe(true);
  });

  it('BR-008: rejeita nota publicada sem a gêmea no outro locale', () => {
    const soPt = cadeiaCompleta('pt');
    const r = validateBatch(soPt);
    expect(r.errors.some((e) => e.message.includes('BR-008'))).toBe(true);
  });

  it('BR-008: nota draft não exige gêmea', () => {
    const lote = [
      ...cadeiaCompleta('pt'),
      ...cadeiaCompleta('en'),
      nota({ slug: 'erosao-impelidor', tipo_nota: 'familia', locale: 'pt', status: 'draft' }),
    ];
    const r = validateBatch(lote);
    expect(r.errors).toEqual([]);
  });

  it('rejeita slug+locale duplicado', () => {
    const lote = [
      ...cadeiaCompleta('pt'),
      ...cadeiaCompleta('en'),
      nota({ slug: 'bombas', tipo_nota: 'familia' }),
    ];
    const r = validateBatch(lote);
    expect(r.errors.some((e) => e.message.includes('duplicad'))).toBe(true);
  });

  it('wikilink para nota inexistente gera warning, não erro (F01 caso de borda)', () => {
    const lote = [...cadeiaCompleta('pt'), ...cadeiaCompleta('en')];
    lote[4] = { ...lote[4], wikilinks: ['nota-que-nao-existe'] };
    const r = validateBatch(lote);
    expect(r.errors).toEqual([]);
    expect(r.warnings.some((w) => w.message.includes('nota-que-nao-existe'))).toBe(true);
  });
});
