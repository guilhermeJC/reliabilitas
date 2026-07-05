import { validateNiveisCorpo, type NotaFrontmatter } from './schema';

// Validação de LOTE (o acervo inteiro após o parse individual BR-006):
// BR-001 (cadeia-pai publicada), BR-008 (bilíngue), unicidade slug+locale,
// F8 (3 níveis no corpo do modo de falha publicado),
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

    // F8 — modo de falha só publica com as 3 seções de nível reais no corpo
    if (fm.tipo_nota === 'modo_falha') {
      for (const issue of validateNiveisCorpo(n.corpo)) {
        errors.push({ file: n.file, message: `F8: ${issue.message}` });
      }
    }

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

    // F2 — coerência da cadeia: a taxonomia do pai + o pai = a taxonomia do filho.
    // Cadeias contraditórias entre notas quebrariam breadcrumb/árvore silenciosamente.
    const paiDireto = fm.taxonomia.at(-1);
    if (paiDireto) {
      const paiNota = porChave.get(key(paiDireto, fm.locale));
      if (paiNota) {
        const esperada = fm.taxonomia.slice(0, -1);
        const real = paiNota.fm.taxonomia;
        const diverge =
          real.length !== esperada.length || real.some((s, i) => s !== esperada[i]);
        if (diverge) {
          errors.push({
            file: n.file,
            message: `F2: cadeia contraditória — '${fm.slug}' (${fm.locale}) implica que '${paiDireto}' tenha taxonomia [${esperada.join(', ')}], mas ela declara [${real.join(', ')}]`,
          });
        }
      }
    }

    // F2 — gêmeas de locale nunca divergem em tipo/cadeia (reportado uma vez, do lado pt)
    if (fm.locale === 'pt') {
      const gemea = porChave.get(key(fm.slug, 'en'));
      if (gemea) {
        if (gemea.fm.tipo_nota !== fm.tipo_nota) {
          errors.push({
            file: n.file,
            message: `F2: gêmea de locale divergente — '${fm.slug}' é '${fm.tipo_nota}' em pt e '${gemea.fm.tipo_nota}' em en`,
          });
        } else if (
          gemea.fm.taxonomia.length !== fm.taxonomia.length ||
          gemea.fm.taxonomia.some((s, i) => s !== fm.taxonomia[i])
        ) {
          errors.push({
            file: n.file,
            message: `F2: gêmea de locale divergente — '${fm.slug}' tem taxonomia [${fm.taxonomia.join(', ')}] em pt e [${gemea.fm.taxonomia.join(', ')}] em en`,
          });
        }
      }
    }

    // Wikilinks — órfão é warning (F01: renderiza como texto); alvo não publicado
    // também é warning (F5: link 404 em produção)
    for (const alvo of n.wikilinks) {
      const alvoNota = porChave.get(key(alvo, fm.locale));
      if (!alvoNota) {
        warnings.push({
          file: n.file,
          message: `wikilink órfão: [[${alvo}]] não encontrado no locale ${fm.locale}`,
        });
      } else if (alvoNota.fm.status !== 'published') {
        warnings.push({
          file: n.file,
          message: `F5: wikilink [[${alvo}]] aponta para nota não publicada (${alvoNota.fm.status}) — renderizaria 404 em produção`,
        });
      }
    }
  }

  return { errors, warnings };
}
