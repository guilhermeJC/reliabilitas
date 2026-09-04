import { describe, expect, it } from 'vitest';
import { criaTokenSessao, verificaTokenSessao, senhaCorreta } from '@/lib/admin-auth';

// Painel de aprovação (pedido do fundador, 11/07): "só visível pra mim" — sem
// conta de usuário/Supabase Auth (adiado pra Fase 2/3, DEV-018). Senha única +
// cookie assinado (HMAC-SHA256, relógio injetável — testável, mesmo padrão do
// rate-limit.ts). Token = "{exp}.{assinatura}"; comparação sempre timing-safe.

const SEGREDO = 'segredo-de-teste-suficientemente-longo';
const OUTRO_SEGREDO = 'segredo-diferente-tambem-longo-o-bastante';

describe('criaTokenSessao / verificaTokenSessao', () => {
  it('token recém-criado é válido', () => {
    const relogio = () => 1_000_000;
    const token = criaTokenSessao(SEGREDO, relogio);
    expect(verificaTokenSessao(token, SEGREDO, relogio)).toBe(true);
  });

  it('token expira após a duração configurada', () => {
    let agora = 1_000_000;
    const relogio = () => agora;
    const token = criaTokenSessao(SEGREDO, relogio, 1000); // 1s de duração
    agora += 1001;
    expect(verificaTokenSessao(token, SEGREDO, relogio)).toBe(false);
  });

  it('token ainda dentro da janela permanece válido', () => {
    let agora = 1_000_000;
    const relogio = () => agora;
    const token = criaTokenSessao(SEGREDO, relogio, 1000);
    agora += 500;
    expect(verificaTokenSessao(token, SEGREDO, relogio)).toBe(true);
  });

  it('assinatura de segredo diferente é rejeitada', () => {
    const relogio = () => 1_000_000;
    const token = criaTokenSessao(SEGREDO, relogio);
    expect(verificaTokenSessao(token, OUTRO_SEGREDO, relogio)).toBe(false);
  });

  it('payload adulterado (exp trocado) é rejeitado', () => {
    const relogio = () => 1_000_000;
    const token = criaTokenSessao(SEGREDO, relogio);
    const [, assinatura] = token.split('.');
    const adulterado = `9999999999999.${assinatura}`;
    expect(verificaTokenSessao(adulterado, SEGREDO, relogio)).toBe(false);
  });

  it('token malformado (sem separador) é rejeitado', () => {
    expect(verificaTokenSessao('token-sem-ponto', SEGREDO)).toBe(false);
  });

  it('string vazia é rejeitada', () => {
    expect(verificaTokenSessao('', SEGREDO)).toBe(false);
  });
});

describe('senhaCorreta — comparação timing-safe', () => {
  it('senha idêntica é aceita', () => {
    expect(senhaCorreta('minha-senha-forte', 'minha-senha-forte')).toBe(true);
  });

  it('senha diferente é recusada', () => {
    expect(senhaCorreta('senha-errada', 'minha-senha-forte')).toBe(false);
  });

  it('senha de tamanho diferente é recusada sem lançar exceção', () => {
    expect(senhaCorreta('a', 'minha-senha-forte')).toBe(false);
  });

  it('é case-sensitive', () => {
    expect(senhaCorreta('Minha-Senha-Forte', 'minha-senha-forte')).toBe(false);
  });
});

describe('verificaTokenSessao — robustez contra cookie hostil (DEV-129)', () => {
  const SEGREDO = 'segredo-de-teste';
  const exp = String(Date.now() + 60_000);

  // ACHADO 04/09: a guarda comparava o comprimento em CARACTERES e só depois
  // convertia para Buffer, que conta BYTES. Uma assinatura de 64 caracteres com
  // qualquer caractere multi-byte produz um buffer maior que os 64 bytes do hex
  // esperado, e timingSafeEqual LANÇA em vez de devolver false. Um cookie
  // assim virava erro 500 numa função de autenticação — reproduzido antes da
  // correção com 'é'.repeat(32) + 'a'.repeat(32) (64 chars, 96 bytes).
  it('assinatura de 64 CHARS mas mais de 64 BYTES é rejeitada, não lança', () => {
    const multibyte = 'é'.repeat(32) + 'a'.repeat(32);
    expect(multibyte.length).toBe(64);
    expect(Buffer.byteLength(multibyte)).toBeGreaterThan(64);
    expect(() => verificaTokenSessao(`${exp}.${multibyte}`, SEGREDO)).not.toThrow();
    expect(verificaTokenSessao(`${exp}.${multibyte}`, SEGREDO)).toBe(false);
  });

  it('emoji e outros pontos de código fora do BMP também são rejeitados sem lançar', () => {
    for (const s of ['🔓'.repeat(32), '\u00e9\u00e8'.repeat(32), 'ü'.repeat(64)]) {
      expect(() => verificaTokenSessao(`${exp}.${s}`, SEGREDO), s).not.toThrow();
      expect(verificaTokenSessao(`${exp}.${s}`, SEGREDO), s).toBe(false);
    }
  });

  it('token com separadores demais é rejeitado', () => {
    expect(verificaTokenSessao(`${exp}.abc.def`, SEGREDO)).toBe(false);
  });

  it('payload não numérico é rejeitado mesmo com assinatura VÁLIDA para ele', () => {
    // Assina corretamente um payload que não é timestamp: a assinatura confere,
    // mas Number('abc') é NaN e a expiração não pode ser verificada.
    const token = criaTokenSessao(SEGREDO);
    const [, assinatura] = token.split('.');
    expect(verificaTokenSessao(`abc.${assinatura}`, SEGREDO)).toBe(false);
  });

  it('segredo vazio não autentica um token qualquer', () => {
    expect(verificaTokenSessao(`${exp}.${'a'.repeat(64)}`, '')).toBe(false);
  });
});
