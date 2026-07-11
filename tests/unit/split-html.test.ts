import { describe, expect, it } from 'vitest';
import { separaHtmlNoHeading } from '@/lib/content/split-html';

// Melhoria 2 do fundador (10/07): a anatomia interativa é um componente React
// que precisa entrar NO MEIO do corpo renderizado (dentro da seção Anatomia,
// antes do heading seguinte). O corpo chega como uma string de HTML — esta
// função divide a string exatamente antes de um <h2 id="..."> alvo.

const html =
  '<h2 id="anatomia">Anatomia</h2><p>foto e intro</p>' +
  '<h2 id="tipos-e-diferencas">Tipos e diferenças</h2><p>eixos</p>';

describe('separaHtmlNoHeading', () => {
  it('divide antes do h2 com o id alvo, sem perder nada', () => {
    const r = separaHtmlNoHeading(html, 'tipos-e-diferencas')!;
    expect(r.antes).toBe('<h2 id="anatomia">Anatomia</h2><p>foto e intro</p>');
    expect(r.depois).toBe('<h2 id="tipos-e-diferencas">Tipos e diferenças</h2><p>eixos</p>');
    expect(r.antes + r.depois).toBe(html);
  });

  it('id inexistente → null (a página renderiza o corpo inteiro como sempre)', () => {
    expect(separaHtmlNoHeading(html, 'nao-existe')).toBeNull();
  });

  it('não confunde com ids que são prefixo um do outro', () => {
    const h = '<h2 id="tipos-e">A</h2><h2 id="tipos-e-diferencas">B</h2>';
    const r = separaHtmlNoHeading(h, 'tipos-e-diferencas')!;
    expect(r.antes).toBe('<h2 id="tipos-e">A</h2>');
  });
});
