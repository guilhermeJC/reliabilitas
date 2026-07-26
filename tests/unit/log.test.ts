import { describe, expect, it } from 'vitest';
import { extraiRequestId, formataLinhaLog, type EntradaLog } from '@/lib/log';

// DEV-108 (auditoria 25/07) — o projeto não tinha NENHUM log: zero console.*
// em src/. Um erro em branch de controle (o `if (ins.error)` que causou o
// DEV-100) não vira exceção e portanto não deixava rastro nenhum. Este módulo
// existe para que uma linha de log responda sozinha "onde eu investigo isso?".

const AGORA = () => '2026-07-25T12:00:00.000Z';

describe('formataLinhaLog', () => {
  it('emite JSON de uma linha só (parseável por qualquer coletor)', () => {
    const linha = formataLinhaLog({ nivel: 'error', evento: 'teste.evento' }, AGORA);
    expect(linha).not.toContain('\n');
    expect(() => JSON.parse(linha)).not.toThrow();
  });

  it('inclui os campos obrigatórios: nivel, evento, ts', () => {
    const linha = JSON.parse(formataLinhaLog({ nivel: 'warn', evento: 'x.y' }, AGORA));
    expect(linha.nivel).toBe('warn');
    expect(linha.evento).toBe('x.y');
    expect(linha.ts).toBe('2026-07-25T12:00:00.000Z');
  });

  it('propaga requestId e rota — é o que amarra o log à requisição da Vercel', () => {
    const linha = JSON.parse(
      formataLinhaLog(
        {
          nivel: 'error',
          evento: 'sugestao.insert_falhou',
          requestId: 'gru1::abc',
          rota: '/api/sugestao',
        },
        AGORA,
      ),
    );
    expect(linha.requestId).toBe('gru1::abc');
    expect(linha.rota).toBe('/api/sugestao');
  });

  it('omite campos ausentes em vez de emitir null (linha enxuta)', () => {
    const linha = JSON.parse(formataLinhaLog({ nivel: 'info', evento: 'x' }, AGORA));
    expect('requestId' in linha).toBe(false);
    expect('rota' in linha).toBe(false);
    expect('detalhe' in linha).toBe(false);
  });

  it('serializa o detalhe estruturado', () => {
    const linha = JSON.parse(
      formataLinhaLog(
        { nivel: 'error', evento: 'x', detalhe: { code: '42P01', tabela: 'sugestoes' } },
        AGORA,
      ),
    );
    expect(linha.detalhe).toEqual({ code: '42P01', tabela: 'sugestoes' });
  });

  it('NUNCA deixa o log quebrar a rota: detalhe circular vira aviso, não exceção', () => {
    const circular: Record<string, unknown> = { a: 1 };
    circular.self = circular;
    const entrada: EntradaLog = { nivel: 'error', evento: 'x', detalhe: circular };
    expect(() => formataLinhaLog(entrada, AGORA)).not.toThrow();
    const linha = JSON.parse(formataLinhaLog(entrada, AGORA));
    expect(linha.evento).toBe('x');
    expect(linha.detalhe_erro_serializacao).toBe(true);
  });

  it('o evento é o ponteiro pro código — formato estável dominio.acao', () => {
    const linha = JSON.parse(
      formataLinhaLog({ nivel: 'error', evento: 'contribuicao.insert_falhou' }, AGORA),
    );
    expect(linha.evento).toMatch(/^[a-z_]+\.[a-z_]+$/);
  });
});

describe('extraiRequestId', () => {
  it('usa o x-vercel-id quando existe (cruza com o log da própria Vercel)', () => {
    const h = new Headers({ 'x-vercel-id': 'gru1::iad1::abc-123' });
    expect(extraiRequestId(h)).toBe('gru1::iad1::abc-123');
  });

  it('cai pro x-request-id quando não há x-vercel-id', () => {
    const h = new Headers({ 'x-request-id': 'req-456' });
    expect(extraiRequestId(h)).toBe('req-456');
  });

  it('devolve undefined quando não há nenhum (dev local) — nunca inventa id falso', () => {
    expect(extraiRequestId(new Headers())).toBeUndefined();
  });

  it('prefere x-vercel-id sobre x-request-id quando ambos existem', () => {
    const h = new Headers({ 'x-vercel-id': 'vercel-1', 'x-request-id': 'req-1' });
    expect(extraiRequestId(h)).toBe('vercel-1');
  });
});
