// DEV-136 — quando o padrão de falha é INFANTIL e a prescrição é CBM, a nota
// precisa dizer ao leitor que monitorar não resolve a causa.
//
// Contexto de por que isto existe. O fundador perguntou por que o Framework B
// devolve `cbm` em 11 dos 11 modos de falha do acervo. A resposta é que a
// lógica está certa: todos os 11 têm condição monitorável (`tem_pf: true`), e
// com P-F detectável o RCM manda monitorar — o próprio motor do projeto
// (`src/lib/rcm/decisao.ts`) devolveria `cbm` para os mesmos dados.
//
// Mas o motor NÃO devolve só a decisão: em padrão infantil ele emite junto o
// aviso `infantil_causa_raiz` — "β<1: intervenção programada PIORA (Nowlan &
// Heap), ataque a causa raiz". Esse aviso já existia e já estava traduzido nos
// dois idiomas, só que aparecia apenas no seletor interativo de /metodo. Nunca
// chegava à página do modo de falha, que é onde o leitor está quando decide o
// que fazer com o equipamento dele.
//
// A informação certa existia no lugar errado. Esta função leva o mesmo critério
// do motor para a nota, e vale para qualquer modo de falha futuro — que é a
// "verificação posterior em novos casos" pedida pelo fundador.

interface FwAParcial {
  categoria?: string;
}
interface FwBParcial {
  decisao?: string;
  tem_pf?: boolean;
}

export function alertaCausaRaiz(fwA?: FwAParcial, fwB?: FwBParcial): boolean {
  return fwA?.categoria === 'infant' && fwB?.decisao === 'cbm';
}
