import { z } from 'zod';

// Contrato do frontmatter (DOCS_base §E + DOCS_regras). BR-006: frontmatter inválido
// derruba o build — este módulo é a fonte única dessa validação (usado pelo ingest e pelo CI).
// F7: schema ESTRITO — campo desconhecido (typo) é erro de build, nunca silêncio.
// F8 (AFC aprovado 04/07): os 3 níveis de leitura são seções do CORPO (## Beginner/
// Specialist/Engineer), não um campo de frontmatter; ver validateNiveisCorpo.

export const TIPOS_NOTA = [
  'classe',
  'familia',
  'principio',
  'tipo',
  'marca_modelo',
  'componente',
  'modo_falha',
  'estrategia',
] as const;
export const LOCALES = ['pt', 'en'] as const;
export const STATUS_NOTA = ['draft', 'review', 'published', 'archived'] as const;
export const FW_A_CATEGORIAS = ['infant', 'random', 'wear_out', 'mixed_complex', 'unknown'] as const;
export const FW_B_DECISOES = ['tbm', 'cbm', 'proof_test', 'rtf', 'redesenho'] as const;
export const NIVEIS_LEITURA = ['beginner', 'specialist', 'engineer'] as const;
export const SECOES_HANDBOOK = [
  'classificacao',
  'principio',
  'anatomia',
  'tipos',
  'marcas',
  'industria',
  'tecnologias',
  'componentes',
  'modos_falha',
] as const;
// D17 — handbook essencial: todas menos 'tecnologias' (pós-MVP)
export const SECOES_ESSENCIAIS = SECOES_HANDBOOK.filter((s) => s !== 'tecnologias');

export type TipoNota = (typeof TIPOS_NOTA)[number];
export type Locale = (typeof LOCALES)[number];

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugSchema = z.string().regex(SLUG_RE, 'slug deve ser kebab-case (a-z, 0-9, hífens)');

const baseSchema = z.strictObject({
  slug: slugSchema,
  tipo_nota: z.enum(TIPOS_NOTA),
  locale: z.enum(LOCALES),
  titulo: z.string().min(1),
  status: z.enum(STATUS_NOTA),
  taxonomia: z.array(slugSchema).default([]),
  iso14224_code: z.string().optional(),
  fontes: z
    .array(z.string().min(1))
    .min(1, 'fontes: cite ao menos uma fonte primária (BR-002)'),
  revisado_em: z.union([z.string(), z.date()]).optional(),
  resumo: z.string().optional(),
  // F7: única extensão livre permitida — insumo manual da busca FTS em PT (CLAUDE.md §7)
  tags: z.array(z.string().min(1)).optional(),
});

// Nota-semente (D17): Classe/Família/Princípio/Marca-Modelo/Componente/Estratégia
// podem nascer curtas — comuns + resumo obrigatório.
const sementeSchema = baseSchema.extend({
  resumo: z.string().min(1, 'resumo: nota-semente exige resumo (D17)'),
});

const modoFalhaSchema = baseSchema
  .extend({
    taxonomia: z
      .array(slugSchema)
      .min(1, 'taxonomia: modo de falha exige cadeia-pai completa (BR-001)'),
    fw_a: z.strictObject({
      categoria: z.enum(FW_A_CATEGORIAS),
      beta: z.union([z.number(), z.string()]),
    }),
    fw_b: z.strictObject({
      tem_pf: z.boolean(),
      evidente: z.boolean(),
      decisao: z.enum(FW_B_DECISOES),
      periodicidade: z.string().min(1),
    }),
    pf_tipico: z.string().optional(),
    plano_manutencao: z
      .array(
        z.strictObject({
          tarefa: z.string().min(1),
          metodo: z.string().min(1),
          periodicidade: z.string().min(1),
          // Estrutura mínima PRO-MNT-001 §8 (sessão 5): condição de contorno
          // (§8.2), critério de aceitação quantitativo (§8.3) e ação em desvio.
          // Opcionais no schema; a exigência de preenchê-los é editorial.
          condicao: z.string().min(1).optional(),
          criterio: z.string().min(1).optional(),
          acao: z.string().min(1).optional(),
          // Documento profundo (melhoria 3 do fundador, 10/07): especialidade
          // executante, duração estimada, procedimento passo a passo e
          // grandezas a registrar ("Nome [unidade]") — alimentam o plano
          // exportável completo (CSV/MD no template RELIABILITAS).
          especialidade: z.string().min(1).optional(),
          duracao: z.string().min(1).optional(),
          passos: z.array(z.string().min(1)).min(1).optional(),
          registros: z.array(z.string().min(1)).min(1).optional(),
        }),
      )
      .min(1, 'plano_manutencao: exigido em todo modo de falha (F02)'),
  })
  .superRefine((v, ctx) => {
    // Coerência Fw A→B (PRO-MNT-001 §4.3–4.4 / IT-MNT-001 §4–5)
    if (v.fw_b.decisao === 'cbm' && !v.fw_b.tem_pf) {
      ctx.addIssue({
        code: 'custom',
        path: ['fw_b', 'decisao'],
        message: 'CBM exige condição monitorável (tem_pf=true) — IT-MNT-001 §4.2',
      });
    }
    if (v.fw_b.decisao === 'proof_test' && v.fw_b.evidente) {
      ctx.addIssue({
        code: 'custom',
        path: ['fw_b', 'decisao'],
        message: 'Proof test aplica-se somente a falha oculta (evidente=false) — IT-MNT-001 §4.3',
      });
    }
    if (v.fw_b.decisao === 'rtf' && v.fw_b.tem_pf) {
      ctx.addIssue({
        code: 'custom',
        path: ['fw_b', 'decisao'],
        message: 'RTF pressupõe ausência de P-F; com P-F detectável a decisão é CBM — PRO-MNT-001 §4.3',
      });
    }
  });

// BR-009 HARD (Dia 4 — encerra a exceção DEV-005): handbook de Tipo só publica
// com anatomia ilustrada. SVG PRÓPRIO obrigatório (visual primário, DEV-025);
// foto opcional e, quando existe, exige fonte + licença + crédito — o manifest
// de proveniência vive no próprio frontmatter (BR-003: nunca rehosting sem licença).
const anatomiaSchema = z.strictObject({
  svg: z
    .string()
    .regex(/^\/anatomia\/[a-z0-9-]+\.svg$/, 'anatomia.svg: caminho /anatomia/<slug>.svg (asset próprio)'),
  alt: z.string().min(1, 'anatomia.alt: descrição acessível obrigatória'),
  foto: z
    .strictObject({
      arquivo: z
        .string()
        .regex(/^\/anatomia\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/, 'anatomia.foto.arquivo: /anatomia/<slug>.<ext>'),
      fonte: z.string().url('anatomia.foto.fonte: URL da origem'),
      licenca: z.string().min(1, 'anatomia.foto.licenca: licença explícita (ex.: CC BY-SA 4.0)'),
      credito: z.string().min(1, 'anatomia.foto.credito: autor/portal creditado'),
    })
    .optional(),
});

const handbookSchema = baseSchema
  .extend({
    // F2: handbook nunca é raiz — exige a cadeia Classe→Família→Princípio acima dele.
    taxonomia: z
      .array(slugSchema)
      .min(1, 'taxonomia: handbook de tipo exige cadeia-pai (F2/BR-001)'),
    secoes: z.array(z.enum(SECOES_HANDBOOK)),
    componentes: z.array(slugSchema).default([]),
    anatomia: anatomiaSchema,
  })
  .superRefine((v, ctx) => {
    const faltantes = SECOES_ESSENCIAIS.filter((s) => !v.secoes.includes(s));
    if (faltantes.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['secoes'],
        message: `secoes: handbook essencial exige [${faltantes.join(', ')}] (D17)`,
      });
    }
  });

const schemaPorTipo: Record<TipoNota, z.ZodType> = {
  classe: sementeSchema,
  familia: sementeSchema,
  principio: sementeSchema,
  tipo: handbookSchema,
  marca_modelo: sementeSchema,
  componente: sementeSchema,
  modo_falha: modoFalhaSchema,
  estrategia: sementeSchema,
};

type ModoFalhaFrontmatter = z.infer<typeof modoFalhaSchema> & { tipo_nota: 'modo_falha' };
type HandbookFrontmatter = z.infer<typeof handbookSchema> & { tipo_nota: 'tipo' };
type SementeFrontmatter = z.infer<typeof sementeSchema> & { tipo_nota: TipoNota };
export type NotaFrontmatter = (ModoFalhaFrontmatter | HandbookFrontmatter | SementeFrontmatter) & {
  tipo_nota: TipoNota;
};

export interface ValidationIssue {
  path: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; data: NotaFrontmatter }
  | { ok: false; issues: ValidationIssue[] };

export function validateFrontmatter(raw: unknown): ValidationResult {
  const tipoParse = z
    .object({ tipo_nota: z.enum(TIPOS_NOTA) })
    .catchall(z.unknown()) // pré-parse: só extrai tipo_nota; o schema do tipo valida o resto (estrito)
    .safeParse(raw);
  if (!tipoParse.success) {
    return {
      ok: false,
      issues: [{ path: 'tipo_nota', message: `tipo_nota inválido (esperado: ${TIPOS_NOTA.join(' | ')})` }],
    };
  }

  const tipo = tipoParse.data.tipo_nota;
  const parsed = schemaPorTipo[tipo].safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      issues: parsed.error.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
      })),
    };
  }

  const data = parsed.data as Record<string, unknown>;

  // F10: nota publicada carrega data de revisão real — sitemap/SEO/rodapé leem daqui.
  if (data.status === 'published' && data.revisado_em == null) {
    return {
      ok: false,
      issues: [
        {
          path: 'revisado_em',
          message: 'revisado_em: obrigatória em nota published (F10 — sitemap/SEO leem a data real)',
        },
      ],
    };
  }

  return { ok: true, data: { ...data, tipo_nota: tipo } as NotaFrontmatter };
}

// F8 — os 3 níveis de leitura são seções reais do corpo (DEV-006/Spec §5).
// Presença estrutural + conteúdo não-vazio; a PROFUNDIDADE por nível permanece
// exigência editorial (Spec §5/F02/BR-007) — validação não substitui curadoria.
const HEADINGS_NIVEIS = ['Beginner', 'Specialist', 'Engineer'] as const;

export function validateNiveisCorpo(corpo: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const nivel of HEADINGS_NIVEIS) {
    const heading = new RegExp(`^##\\s+${nivel}\\s*$`, 'm').exec(corpo);
    if (!heading) {
      issues.push({
        path: 'corpo',
        message: `corpo: seção '## ${nivel}' ausente — os 3 níveis de leitura são obrigatórios (Spec §5/F02)`,
      });
      continue;
    }
    const resto = corpo.slice(heading.index + heading[0].length);
    const proximo = /^##\s/m.exec(resto);
    const conteudo = (proximo ? resto.slice(0, proximo.index) : resto).trim();
    if (conteudo.length === 0) {
      issues.push({
        path: 'corpo',
        message: `corpo: seção '## ${nivel}' vazia — heading sem conteúdo não entrega o nível (Spec §5)`,
      });
    }
  }
  return issues;
}
