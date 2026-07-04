import { describe, expect, it } from 'vitest';
import { createClient } from '@supabase/supabase-js';

// Testes de política RLS (D11/BR-004) contra a instância real.
// Rodam apenas com SUPABASE_DB_TESTS=1 (exigem migrations aplicadas via npm run db:apply):
//   SUPABASE_DB_TESTS=1 npm test
try {
  process.loadEnvFile?.('.env');
} catch {
  /* sem .env: testes ficam desabilitados */
}

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
const habilitado = process.env.SUPABASE_DB_TESTS === '1' && !!url && !!anonKey && !!secretKey;

describe.runIf(habilitado)('RLS — dados navegáveis nunca abertos (D11/BR-004)', () => {
  it('anon NÃO lê a tabela de notas (permissão negada)', async () => {
    const anon = createClient(url!, anonKey!, { auth: { persistSession: false } });
    const r = await anon.from('notas').select('slug').limit(1);
    expect(r.error).not.toBeNull();
    expect(r.error!.code).toBe('42501'); // permission denied
  });

  it('anon NÃO lê a tabela de arestas', async () => {
    const anon = createClient(url!, anonKey!, { auth: { persistSession: false } });
    const r = await anon.from('arestas').select('origem_slug').limit(1);
    expect(r.error).not.toBeNull();
  });

  it('anon NÃO escreve na tabela de notas', async () => {
    const anon = createClient(url!, anonKey!, { auth: { persistSession: false } });
    const r = await anon.from('notas').insert({
      slug: 'hack',
      tipo_nota: 'classe',
      locale: 'pt',
      titulo: 'x',
      status: 'draft',
      frontmatter: {},
    });
    expect(r.error).not.toBeNull();
  });

  it('service role lê normalmente (rotas server-only)', async () => {
    const admin = createClient(url!, secretKey!, { auth: { persistSession: false } });
    const r = await admin.from('notas').select('slug').limit(1);
    expect(r.error).toBeNull();
  });
});
