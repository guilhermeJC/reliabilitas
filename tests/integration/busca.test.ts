import { afterAll, describe, expect, it } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { Client as PgClient } from 'pg';

// Busca FTS (F04/F13) contra a instância real — mesmo gate dos testes de RLS:
//   SUPABASE_DB_TESTS=1 npm test
// A sub-suíte de funções SQL exige também SUPABASE_DB_URL (só local; o CI tem
// apenas as chaves REST e a pula).
try {
  process.loadEnvFile?.('.env');
} catch {
  /* sem .env: testes ficam desabilitados */
}

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;
const habilitado = process.env.SUPABASE_DB_TESTS === '1' && !!url && !!anonKey && !!secretKey;
const dbUrl = process.env.SUPABASE_DB_URL;

function admin() {
  return createClient(url!, secretKey!, { auth: { persistSession: false } });
}

type Resultado = {
  slug: string;
  tipo_nota: string;
  titulo: string;
  taxonomia: string[];
  trecho: string;
};

async function busca(q: string, loc: string, deslocamento = 0): Promise<Resultado[]> {
  const r = await admin().rpc('busca_notas', { q, loc, deslocamento });
  if (r.error) throw new Error(`busca_notas(${q}, ${loc}): ${r.error.message}`);
  return (r.data ?? []) as Resultado[];
}

describe.runIf(habilitado)('busca_notas — FTS ponderada e parametrizada (F04/F13)', () => {
  it('unaccent: termo sem acento encontra título acentuado', async () => {
    const r = await busca('cavitacao', 'pt');
    expect(r.map((n) => n.slug)).toContain('cavitacao');
  });

  it('ranking: match no título (peso A) vem antes de tag/corpo (B/C)', async () => {
    const r = await busca('cavitação', 'pt');
    expect(r.length).toBeGreaterThanOrEqual(2);
    expect(r[0].slug).toBe('cavitacao'); // título "Cavitação" = peso A
    expect(r.map((n) => n.slug)).toContain('bomba-centrifuga'); // tag/corpo = B/C
  });

  it('tags do frontmatter são indexadas (peso B)', async () => {
    const r = await busca('npsh', 'pt');
    const slugs = r.map((n) => n.slug);
    expect(slugs).toContain('bomba-centrifuga'); // 'NPSH' é tag do handbook
    expect(slugs).toContain('cavitacao'); // 'NPSH' aparece no corpo (peso C)
  });

  it('trecho vem com destaque <mark> do ts_headline', async () => {
    const r = await busca('cavitacao', 'pt');
    const alvo = r.find((n) => n.slug === 'cavitacao');
    expect(alvo).toBeDefined();
    expect(alvo!.trecho).toContain('<mark>');
  });

  it('locale é respeitado: busca em en devolve a gêmea en, nunca a pt', async () => {
    const r = await busca('cavitation', 'en');
    const alvo = r.find((n) => n.slug === 'cavitacao');
    expect(alvo).toBeDefined();
    expect(alvo!.titulo).toBe('Cavitation'); // título en — nunca o pt "Cavitação"
  });

  it('injeção vira termo literal — nunca SQL (parametrização por construção)', async () => {
    const r = await busca("'; drop table notas; --", 'pt');
    expect(Array.isArray(r)).toBe(true); // não lança, não executa
    const sane = await busca('cavitacao', 'pt'); // a tabela continua viva
    expect(sane.length).toBeGreaterThan(0);
  });

  it('paginação: deslocamento além do acervo devolve vazio (limite 20 no SQL)', async () => {
    const r = await busca('cavitacao', 'pt', 100);
    expect(r).toEqual([]);
  });

  it('anon NÃO executa a RPC (D11/BR-004 — permissão negada)', async () => {
    const anon = createClient(url!, anonKey!, { auth: { persistSession: false } });
    const r = await anon.rpc('busca_notas', { q: 'cavitacao', loc: 'pt', deslocamento: 0 });
    expect(r.error).not.toBeNull();
    expect(r.error!.code).toBe('42501'); // permission denied
  });

  describe('status: draft nunca aparece na busca', () => {
    const slugDraft = 'zz-fantasma-busca-teste';

    afterAll(async () => {
      await admin().from('notas').delete().eq('slug', slugDraft);
    });

    it('nota draft com termo exclusivo não é encontrada', async () => {
      const ins = await admin().from('notas').upsert(
        {
          slug: slugDraft,
          tipo_nota: 'classe',
          locale: 'pt',
          titulo: 'Nota fantasma zzfantasmabusca',
          status: 'draft',
          taxonomia: [],
          frontmatter: {},
          corpo_md: 'Rascunho com termo exclusivo zzfantasmabusca.',
        },
        { onConflict: 'slug,locale' },
      );
      expect(ins.error).toBeNull();
      const r = await busca('zzfantasmabusca', 'pt');
      expect(r).toEqual([]);
    });
  });
});

// Funções SQL do índice (migration 0002) — só local (exige a conexão direta do db:apply).
describe.runIf(habilitado && !!dbUrl)(
  'funções do índice FTS (md_para_texto / configs unaccent)',
  () => {
    async function sql<T>(text: string, params: unknown[] = []): Promise<T[]> {
      const ca = process.env.SUPABASE_DB_CA
        ? readFileSync(process.env.SUPABASE_DB_CA, 'utf8')
        : undefined;
      const c = new PgClient({ connectionString: dbUrl, ssl: ca ? { ca } : true });
      await c.connect();
      try {
        const r = await c.query(text, params as never[]);
        return r.rows as T[];
      } finally {
        await c.end();
      }
    }

    it('md_para_texto: conteúdo de code fence fica FORA do índice', async () => {
      const [row] = await sql<{ t: string }>(
        "select public.md_para_texto('antes\n```js\nsegredoDeCodigo()\n```\ndepois') as t",
      );
      expect(row.t).not.toContain('segredoDeCodigo');
      expect(row.t).toContain('antes');
      expect(row.t).toContain('depois');
    });

    it('md_para_texto: wikilink indexa o rótulo, descarta o alvo', async () => {
      const [row] = await sql<{ t: string }>(
        "select public.md_para_texto('veja [[alvo-tecnico-oculto|Rótulo Visível]] aqui') as t",
      );
      expect(row.t).toContain('Rótulo Visível');
      expect(row.t).not.toContain('alvo-tecnico-oculto');
    });

    it('md_para_texto: marcas de heading/ênfase removidas, texto preservado', async () => {
      const [row] = await sql<{ t: string }>(
        "select public.md_para_texto('## Título **forte**') as t",
      );
      expect(row.t).not.toContain('#');
      expect(row.t).not.toContain('*');
      expect(row.t).toContain('Título');
      expect(row.t).toContain('forte');
    });

    it('config pt_unaccent: consulta sem acento casa com documento acentuado', async () => {
      const [row] = await sql<{ ok: boolean }>(
        "select to_tsvector('public.pt_unaccent', 'Cavitação no impelidor') @@ websearch_to_tsquery('public.pt_unaccent', 'cavitacao') as ok",
      );
      expect(row.ok).toBe(true);
    });
  },
);
