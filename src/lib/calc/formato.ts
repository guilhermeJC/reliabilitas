// DEV-118 (adversarial review 25/07) — extraído de `components/calc/campos.tsx`.
//
// Por que mudou de lugar: `fmt` vivia num arquivo `.tsx`, e a suíte roda em
// ambiente `node` sem plugin JSX — ou seja, era IMPOSSÍVEL testá-la. Foi
// exatamente por isso que o defeito abaixo sobreviveu até uma revisão
// adversarial. Lógica pura pertence a `lib/`, onde tem teste.
//
// O defeito: a guarda de notação científica disparava só ABAIXO de 0,001, então
// a faixa [0,001; 0,005) caía no `toLocaleString` com 2 casas e era arredondada
// para "0". Publicado, isso mostrava uma taxa de falha real de 0,001 falhas/h
// como "0 falhas/h" sob a legenda "risco de falhar na próxima hora". A lib de
// cálculo sempre esteve correta — o número exibido é que mentia.
//
// A guarda agora é RELATIVA à precisão pedida: formata primeiro e, se um valor
// não-zero tiver virado zero no arredondamento, cai na científica.

export function fmt(n: number, casas = 2): string {
  if (n === 0) return '0';
  const fixo = n.toLocaleString('en-US', {
    maximumFractionDigits: casas,
    minimumFractionDigits: 0,
  });
  // Se a notação fixa engoliu um valor real, ela está mentindo — usa científica.
  if (Number(fixo.replace(/,/g, '')) === 0) return n.toExponential(2);
  return fixo;
}
