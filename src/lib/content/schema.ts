import { z } from 'zod';

// Contrato do frontmatter (DOCS_base §E + DOCS_regras). BR-006: frontmatter inválido
// derruba o build — este módulo é a fonte única dessa validação (usado pelo ingest e pelo CI).

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

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugSchema = z.string().regex(SLUG_RE, 'slug deve ser kebab-case (a-z, 0-9, hífens)');

const baseSchema = z
  .object({
    slug: slugSchema,
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
  })
  .catchall(z.unknown());

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
    fw_a: z.object({
      categoria: z.enum(FW_A_CATEGORIAS),
      beta: z.union([z.number(), z.string()]),
    }),
    fw_b: z.object({
      tem_pf: z.boolean(),
      evidente: z.boolean(),
      decisao: z.enum(FW_B_DECISOES),
      periodicidade: z.string().min(1),
    }),
    pf_tipico: z.string().optional(),
    niveis: z.array(z.enum(NIVEIS_LEITURA)),
    plano_manutencao: z
      .array(
        z.object({
          tarefa: z.string().min(1),
          metodo: z.string().min(1),
          periodicidade: z.string().min(1),
        }),
      )
      .min(1, 'plano_manutencao: exigido em todo modo de falha (F02)'),
  })
  .superRefine((v, ctx) => {
    if (new Set(v.niveis).size !== NIVEIS_LEITURA.length) {
      ctx.addIssue({
        code: 'custom',
        path: ['niveis'],
        message: 'niveis: os 3 níveis (beginner, specialist, engineer) são obrigatórios',
      });
    }
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

const handbookSchema = baseSchema
  .extend({
    secoes: z.array(z.enum(SECOES_HANDBOOK)),
    // BR-009 (anatomia obrigatória) vira validação hard no Dia 4, junto com os assets.
    anatomia: z
      .object({
        foto: z.string().nullable().optional(),
        corte_svg: z.string().nullable().optional(),
        render_3d: z.string().nullable().optional(),
      })
      .optional(),
    componentes: z.array(slugSchema).default([]),
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

const schemaPorTipo: Record<TipoNota, z.ZodTypeAny> = {
  classe: sementeSchema,
  familia: sementeSchema,
  principio: sementeSchema,
  tipo: handbookSchema,
  marca_modelo: sementeSchema,
  componente: sementeSchema,
  modo_falha: modoFalhaSchema,
  estrategia: sementeSchema,
};

export type ModoFalhaFrontmatter = z.infer<typeof modoFalhaSchema> & { tipo_nota: 'modo_falha' };
export type HandbookFrontmatter = z.infer<typeof handbookSchema> & { tipo_nota: 'tipo' };
export type SementeFrontmatter = z.infer<typeof sementeSchema> & { tipo_nota: TipoNota };
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
    .catchall(z.unknown())
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
  return { ok: true, data: { ...data, tipo_nota: tipo } as NotaFrontmatter };
}
