import { describe, expect, it } from 'vitest';
import { validateBatch, type NotaParsed } from '@/lib/content/validate-batch';
import type { NotaFrontmatter } from '@/lib/content/schema';

// Corpo canônico de modo de falha (F8: 3 headings obrigatórios, DEV-006)
const CORPO_MODO_FALHA =
  '## Beginner\n\nO que é.\n\n## Specialist\n\nComo detectar.\n\n## Engineer\n\nA matemática.';

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
  const corpo = fm.tipo_nota === 'modo_falha' ? CORPO_MODO_FALHA : '';
  return { fm, corpo, file: `content/${fm.locale}/${fm.tipo_nota}/${fm.slug}.md`, wikilinks };
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

  it('F8: modo_falha publicado sem os 3 níveis no corpo é erro de lote', () => {
    const lote = [...cadeiaCompleta('pt'), ...cadeiaCompleta('en')];
    lote[4] = { ...lote[4], corpo: '## Beginner\n\nSó o básico.' };
    const r = validateBatch(lote);
    expect(r.errors.some((e) => e.message.includes('Specialist'))).toBe(true);
    expect(r.errors.some((e) => e.message.includes('Engineer'))).toBe(true);
  });

  it('F8: modo_falha em draft não exige os headings (validação só na publicação)', () => {
    const lote = [
      ...cadeiaCompleta('pt'),
      ...cadeiaCompleta('en'),
      { ...nota({ slug: 'erosao', tipo_nota: 'modo_falha', status: 'draft' }), corpo: 'rascunho' },
    ];
    const r = validateBatch(lote);
    expect(r.errors).toEqual([]);
  });

  it('F2: cadeia contraditória entre nota e pai é erro (taxonomia do pai + pai = taxonomia do filho)', () => {
    const lote = [...cadeiaCompleta('pt'), ...cadeiaCompleta('en')].map((n) =>
      n.fm.slug === 'dinamicas' && n.fm.locale === 'pt'
        ? { ...n, fm: { ...n.fm, taxonomia: ['bombas'] } as NotaFrontmatter }
        : n,
    );
    const r = validateBatch(lote);
    expect(r.errors.some((e) => e.message.includes('F2') && e.message.includes('dinamicas'))).toBe(
      true,
    );
  });

  it('F2: gêmeas de locale com taxonomia divergente é erro', () => {
    const lote = [...cadeiaCompleta('pt'), ...cadeiaCompleta('en')].map((n) =>
      n.fm.slug === 'cavitacao' && n.fm.locale === 'en'
        ? {
            ...n,
            fm: {
              ...n.fm,
              taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas'],
            } as NotaFrontmatter,
          }
        : n,
    );
    const r = validateBatch(lote);
    expect(r.errors.some((e) => e.message.includes('F2') && e.message.includes('gêmea'))).toBe(
      true,
    );
  });

  it('F2: gêmeas de locale com tipo_nota divergente é erro', () => {
    const lote = [...cadeiaCompleta('pt'), ...cadeiaCompleta('en')].map((n) =>
      n.fm.slug === 'bombas' && n.fm.locale === 'en'
        ? { ...n, fm: { ...n.fm, tipo_nota: 'componente' } as NotaFrontmatter }
        : n,
    );
    const r = validateBatch(lote);
    expect(r.errors.some((e) => e.message.includes('F2') && e.message.includes('bombas'))).toBe(
      true,
    );
  });

  it('F5: wikilink de nota publicada para nota em draft gera warning (404 em produção)', () => {
    const lote = [
      ...cadeiaCompleta('pt'),
      ...cadeiaCompleta('en'),
      nota({ slug: 'erosao-impelidor', tipo_nota: 'familia', locale: 'pt', status: 'draft' }),
    ];
    lote[4] = { ...lote[4], wikilinks: ['erosao-impelidor'] };
    const r = validateBatch(lote);
    expect(r.errors).toEqual([]);
    expect(
      r.warnings.some(
        (w) => w.message.includes('erosao-impelidor') && w.message.includes('não publicada'),
      ),
    ).toBe(true);
  });
});
