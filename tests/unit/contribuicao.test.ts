import { describe, expect, it } from 'vitest';
import { validaContribuicao, CONTRIBUICAO_TIPOS } from '@/lib/contribuicao';

// Colaborar (pedido do fundador, 11/07): visitante propõe conteúdo NOVO —
// mesma disciplina de input hostil do T09 (honeypot separado do zod, taxonomia
// pai só slug canônico, contato opcional — BR-011).

function base(overrides: Record<string, unknown> = {}) {
  return {
    website: '',
    tipoNota: 'tipo',
    taxonomiaPai: 'bombas',
    tituloSugerido: 'Bomba de Palhetas',
    resumo: 'Bomba rotativa de deslocamento positivo com palhetas radiais.',
    corpoMd:
      '## Classificação\n\nBomba de deslocamento positivo rotativo, categoria API 676.'.repeat(2),
    contato: '',
    nome: '',
    formacao: '',
    funcaoEmpresa: '',
    linkedinSite: '',
    locale: 'pt',
    ...overrides,
  };
}

describe('validaContribuicao — honeypot', () => {
  it('campo website preenchido é bot: recusa antes do zod', () => {
    const r = validaContribuicao(base({ website: 'http://spam.example' }));
    expect(r).toEqual({ ok: false, motivo: 'bot' });
  });
});

describe('validaContribuicao — regras de conteúdo', () => {
  it('aceita um envio válido completo', () => {
    const r = validaContribuicao(base());
    expect(r.ok).toBe(true);
  });

  it('rejeita tipoNota fora da lista permitida (classe/familia/principio são arquitetura, não conteúdo de colaborador)', () => {
    const r = validaContribuicao(base({ tipoNota: 'classe' }));
    expect(r).toEqual({ ok: false, motivo: 'invalida' });
  });

  it('rejeita taxonomiaPai que não é slug canônico (maiúsculas/espaços)', () => {
    const r = validaContribuicao(base({ taxonomiaPai: 'Bombas Centrífugas' }));
    expect(r).toEqual({ ok: false, motivo: 'invalida' });
  });

  it('rejeita título curto demais', () => {
    const r = validaContribuicao(base({ tituloSugerido: 'Ab' }));
    expect(r).toEqual({ ok: false, motivo: 'invalida' });
  });

  it('rejeita corpo markdown curto demais (< 50 caracteres)', () => {
    const r = validaContribuicao(base({ corpoMd: 'Texto curto.' }));
    expect(r).toEqual({ ok: false, motivo: 'invalida' });
  });

  it('resumo é opcional — string vazia vira null', () => {
    const r = validaContribuicao(base({ resumo: '' }));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.resumo).toBeNull();
  });

  it('contato é opcional — string vazia vira null; email inválido é rejeitado', () => {
    const ok = validaContribuicao(base({ contato: '' }));
    expect(ok.ok).toBe(true);
    if (ok.ok) expect(ok.data.contato).toBeNull();

    const invalido = validaContribuicao(base({ contato: 'não é email' }));
    expect(invalido).toEqual({ ok: false, motivo: 'invalida' });
  });

  it('locale fora de pt/en é rejeitado', () => {
    const r = validaContribuicao(base({ locale: 'fr' }));
    expect(r).toEqual({ ok: false, motivo: 'invalida' });
  });
});

// DEV-094 (24/07) + pedido do fundador (25/07): campos OPCIONAIS de
// identificação do autor (BR-011 continua exigindo que nenhum campo pessoal
// seja obrigatório) — MESMO conjunto agora usado em Sugerir correção (fonte
// única: src/lib/autoria.ts). `contatoVisibilidade` (texto livre) foi
// substituído por `linkedinSite` (campo próprio) + 2 caixas de seleção
// explícitas: desejaContribuidor e mostrarPublicamente.
describe('validaContribuicao — campos de autoria (nome/formação/função-empresa/LinkedIn-site), todos opcionais', () => {
  it('todos os campos ausentes viram null/false — contribuição segue válida sem nenhuma identificação', () => {
    const r = validaContribuicao(base());
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.nome).toBeNull();
      expect(r.data.formacao).toBeNull();
      expect(r.data.funcaoEmpresa).toBeNull();
      expect(r.data.linkedinSite).toBeNull();
      expect(r.data.desejaContribuidor).toBe(false);
      expect(r.data.mostrarPublicamente).toBe(false);
    }
  });

  it('campos preenchidos e as 2 caixas marcadas são aceitos e preservados (trim)', () => {
    const r = validaContribuicao(
      base({
        nome: '  Ana Reliability  ',
        formacao: 'Engenheiro Mecânico / Pós-graduado em Inspeção de Equipamentos — ITA',
        funcaoEmpresa: 'Engenheiro de Confiabilidade / SpaceX',
        linkedinSite: 'linkedin.com/in/exemplo',
        desejaContribuidor: 'on',
        mostrarPublicamente: 'on',
      }),
    );
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.nome).toBe('Ana Reliability');
      expect(r.data.formacao).toBe(
        'Engenheiro Mecânico / Pós-graduado em Inspeção de Equipamentos — ITA',
      );
      expect(r.data.funcaoEmpresa).toBe('Engenheiro de Confiabilidade / SpaceX');
      expect(r.data.linkedinSite).toBe('linkedin.com/in/exemplo');
      expect(r.data.desejaContribuidor).toBe(true);
      expect(r.data.mostrarPublicamente).toBe(true);
    }
  });

  it('quer ser contribuidor SEM autorizar exibição pública — combinação válida', () => {
    const r = validaContribuicao(base({ nome: 'Discreto', desejaContribuidor: 'on' }));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.desejaContribuidor).toBe(true);
      expect(r.data.mostrarPublicamente).toBe(false);
    }
  });

  it('rejeita nome acima de 150 caracteres', () => {
    const r = validaContribuicao(base({ nome: 'x'.repeat(151) }));
    expect(r).toEqual({ ok: false, motivo: 'invalida' });
  });

  it('rejeita formacao acima de 300 caracteres', () => {
    const r = validaContribuicao(base({ formacao: 'x'.repeat(301) }));
    expect(r).toEqual({ ok: false, motivo: 'invalida' });
  });

  it('rejeita funcaoEmpresa acima de 200 caracteres', () => {
    const r = validaContribuicao(base({ funcaoEmpresa: 'x'.repeat(201) }));
    expect(r).toEqual({ ok: false, motivo: 'invalida' });
  });

  it('rejeita linkedinSite acima de 300 caracteres', () => {
    const r = validaContribuicao(base({ linkedinSite: 'x'.repeat(301) }));
    expect(r).toEqual({ ok: false, motivo: 'invalida' });
  });
});

describe('CONTRIBUICAO_TIPOS — subconjunto de TIPOS_NOTA (exclui classe/familia/principio)', () => {
  it('não inclui os 3 níveis estruturais da taxonomia', () => {
    expect(CONTRIBUICAO_TIPOS).not.toContain('classe');
    expect(CONTRIBUICAO_TIPOS).not.toContain('familia');
    expect(CONTRIBUICAO_TIPOS).not.toContain('principio');
  });

  it('inclui os tipos de conteúdo plausíveis para um colaborador', () => {
    expect(CONTRIBUICAO_TIPOS).toEqual(
      expect.arrayContaining(['tipo', 'marca_modelo', 'componente', 'modo_falha', 'estrategia']),
    );
  });
});
