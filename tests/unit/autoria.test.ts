import { describe, expect, it } from 'vitest';
import { paraBooleanCheckbox, normalizaAutoria } from '@/lib/autoria';

// Campos de identificação do autor, compartilhados por Sugerir correção e
// Colaborar (pedido do fundador, 25/07) — testados aqui direto, e de novo
// (integração) dentro de validaSugestao/validaContribuicao.

describe('paraBooleanCheckbox — checkbox HTML só existe no FormData quando marcado', () => {
  it("'on' (valor padrão de checkbox marcado) vira true", () => {
    expect(paraBooleanCheckbox('on')).toBe(true);
  });

  it('chave ausente (undefined) vira false — checkbox desmarcado', () => {
    expect(paraBooleanCheckbox(undefined)).toBe(false);
  });

  it('qualquer outra string (nunca deveria acontecer com <input type="checkbox">) vira false', () => {
    expect(paraBooleanCheckbox('true')).toBe(false);
    expect(paraBooleanCheckbox('1')).toBe(false);
  });
});

describe('normalizaAutoria — monta o fragmento pronto pro zod a partir de FormData bruto', () => {
  it('objeto vazio normaliza tudo pro estado "nada preenchido"', () => {
    expect(normalizaAutoria({})).toEqual({
      nome: '',
      formacao: '',
      funcaoEmpresa: '',
      linkedinSite: '',
      desejaContribuidor: false,
      mostrarPublicamente: false,
    });
  });

  it('preserva valores presentes e converte os 2 checkboxes', () => {
    expect(
      normalizaAutoria({
        nome: 'Ana',
        desejaContribuidor: 'on',
      }),
    ).toEqual({
      nome: 'Ana',
      formacao: '',
      funcaoEmpresa: '',
      linkedinSite: '',
      desejaContribuidor: true,
      mostrarPublicamente: false,
    });
  });
});
