import { describe, expect, it } from 'vitest';
import { alertaCausaRaiz } from '@/lib/content/fw-alerta';

// DEV-136 — o fundador questionou o Framework B devolver `cbm` em 11 de 11
// modos de falha. A investigação mostrou que a lógica NÃO está enviesada: com
// condição monitorável, CBM é a saída correta, e o próprio motor do projeto
// (src/lib/rcm/decisao.ts) devolveria o mesmo.
//
// O que faltava era outra coisa. O motor já emite o aviso `infantil_causa_raiz`
// nesses casos — "β<1: intervenção programada PIORA (Nowlan & Heap), ataque a
// causa raiz" — e o aviso já está traduzido nos 2 idiomas. Mas ele só aparecia
// no SELETOR INTERATIVO de /metodo. Nunca chegava à NOTA do modo de falha, que
// é onde o leitor de fato está quando decide o que fazer.
//
// Ou seja: o site tinha a informação certa, no lugar errado.

describe('alertaCausaRaiz — falha infantil tratada só com monitoramento', () => {
  it('alerta quando o padrão é infantil e a prescrição é CBM', () => {
    expect(alertaCausaRaiz({ categoria: 'infant' }, { decisao: 'cbm' })).toBe(true);
  });

  it('não alerta em padrão infantil com outra prescrição — ali a causa já é atacada', () => {
    for (const d of ['tbm', 'proof_test', 'rtf', 'redesenho']) {
      expect(alertaCausaRaiz({ categoria: 'infant' }, { decisao: d }), d).toBe(false);
    }
  });

  it('não alerta em CBM de padrão não-infantil — é a saída correta e sem ressalva', () => {
    for (const c of ['random', 'wear_out', 'mixed_complex', 'unknown']) {
      expect(alertaCausaRaiz({ categoria: c }, { decisao: 'cbm' }), c).toBe(false);
    }
  });

  it('degrada para não-alertar quando falta informação (nunca inventa alerta)', () => {
    expect(alertaCausaRaiz(undefined, { decisao: 'cbm' })).toBe(false);
    expect(alertaCausaRaiz({ categoria: 'infant' }, undefined)).toBe(false);
    expect(alertaCausaRaiz({}, {})).toBe(false);
    expect(alertaCausaRaiz(undefined, undefined)).toBe(false);
  });

  it('os 2 modos reais do acervo que motivaram isto disparam o alerta', () => {
    // montagem-incorreta-rolamento e instalacao-incorreta-selo-mecanico:
    // ambos infant + cbm no frontmatter publicado.
    expect(alertaCausaRaiz({ categoria: 'infant' }, { decisao: 'cbm', tem_pf: true })).toBe(true);
  });
});
