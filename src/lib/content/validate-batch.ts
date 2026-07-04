import type { NotaFrontmatter } from './schema';

// Validação de LOTE (o acervo inteiro após o parse individual BR-006):
// BR-001 (cadeia-pai publicada), BR-008 (bilíngue), unicidade slug+locale,
// wikilinks órfãos (warning — F01: renderiza como texto, loga alerta).

export interface NotaParsed {
  fm: NotaFrontmatter;
  corpo: string;
  file: string;
  wikilinks: string[];
}

export interface BatchIssue {
  file: string;
  message: string;
}

export interface BatchResult {
  errors: BatchIssue[];
  warnings: BatchIssue[];
}

const key = (slug: string, locale: string) => `${slug}::${locale}`;

export function validateBatch(notas: NotaParsed[]): BatchResult {
  const errors: BatchIssue[] = [];
  const warnings: BatchIssue[] = [];

  const porChave = new Map<string, NotaParsed>();
  for (const n of notas) {
    const k = key(n.fm.slug, n.fm.locale);
    if (porChave.has(k)) {
      errors.push({
        file: n.file,
        message: `slug+locale duplicado: '${n.fm.slug}' (${n.fm.locale}) já definido em ${porChave.get(k)!.file}`,
      });
      continue;
    }
    porChave.set(k, n);
  }

  const publicada = (slug: string, locale: string) =>
    porChave.get(key(slug, locale))?.fm.status === 'published';

  for (const n of notas) {
    const { fm } = n;
    if (fm.status !== 'published') continue;

    // BR-008 — toda nota publicada existe em PT e EN
    const outroLocale = fm.locale === 'pt' ? 'en' : 'pt';
    if (!publicada(fm.slug, outroLocale)) {
      errors.push({
        file: n.file,
        message: `BR-008: '${fm.slug}' publicada em ${fm.locale} sem gêmea publicada em ${outroLocale}`,
      });
    }

    // BR-001 — cadeia-pai completa e publicada (mesmo locale)
    for (const pai of fm.taxonomia) {
      if (!publicada(pai, fm.locale)) {
        errors.push({
          file: n.file,
          message: `BR-001: '${fm.slug}' (${fm.locale}) exige a cadeia-pai publicada — nível '${pai}' ausente ou não publicado`,
        });
      }
    }

    // Wikilinks órfãos — warning (F01: renderiza como texto, sem link)
    for (const alvo of n.wikilinks) {
      if (!porChave.has(key(alvo, fm.locale))) {
        warnings.push({
          file: n.file,
          message: `wikilink órfão: [[${alvo}]] não encontrado no locale ${fm.locale}`,
        });
      }
    }
  }

  return { errors, warnings };
}
