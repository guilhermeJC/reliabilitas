import { afterAll, describe, expect, it } from 'vitest';
import { createClient } from '@supabase/supabase-js';

// T09 — tabela de sugestões (migration 0003): a RLS deny-anon vale também na
// única superfície de escrita do site. Mesmo gate dos demais testes live.
try {
  process.loadEnvFile?.('.env');
} catch {
  /* sem .env: desabilitado */
}

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;
const habilitado = process.env.SUPABASE_DB_TESTS === '1' && !!url && !!anonKey && !!secretKey;

describe.runIf(habilitado)('sugestoes — RLS deny-anon na superfície de escrita (T09)', () => {
  const marcador = 'teste-integracao-sugestao-zz';

  afterAll(async () => {
    const adm = createClient(url!, secretKey!, { auth: { persistSession: false } });
    await adm.from('sugestoes').delete().eq('pagina', marcador);
  });

  it('anon NÃO insere direto na tabela (só a rota server-side escreve)', async () => {
    const anon = createClient(url!, anonKey!, { auth: { persistSession: false } });
    const r = await anon.from('sugestoes').insert({
      locale: 'pt',
      pagina: marcador,
      mensagem: 'tentativa de escrita direta por anon',
    });
    expect(r.error).not.toBeNull();
    expect(r.error!.code).toBe('42501');
  });

  it('anon NÃO lê as sugestões (conteúdo pode ter contato — privacidade)', async () => {
    const anon = createClient(url!, anonKey!, { auth: { persistSession: false } });
    const r = await anon.from('sugestoes').select('id').limit(1);
    expect(r.error).not.toBeNull();
    expect(r.error!.code).toBe('42501');
  });

  it('service role insere (o caminho real da rota) e o CHECK de tamanho vale', async () => {
    const adm = createClient(url!, secretKey!, { auth: { persistSession: false } });
    const ok = await adm.from('sugestoes').insert({
      locale: 'pt',
      pagina: marcador,
      mensagem: 'sugestão válida de teste de integração',
    });
    expect(ok.error).toBeNull();
    const curta = await adm
      .from('sugestoes')
      .insert({ locale: 'pt', pagina: marcador, mensagem: 'curta' });
    expect(curta.error).not.toBeNull(); // CHECK 10..2000 no banco (defesa em profundidade)
  });
});
