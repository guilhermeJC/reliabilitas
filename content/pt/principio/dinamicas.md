---
slug: dinamicas
tipo_nota: principio
locale: pt
titulo: 'Bombas Rotodinâmicas'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
fontes:
  - 'Karassik et al., Pump Handbook, 4ª ed. (2008), cap. 2'
  - 'Hydraulic Institute — pumps.org'
revisado_em: 2026-07-18
resumo: 'Princípio em que um impelidor rotativo transfere energia continuamente ao líquido (equação de Euler). Curva H-Q decrescente; desempenho definido pelo ponto de melhor eficiência (BEP).'
ordem: 1
---

Princípio de funcionamento em que um **impelidor rotativo** transfere energia continuamente ao líquido: o momento angular imposto pelas pás converte-se em ganho de pressão. Em resumo — a versão completa, com Bernoulli explicado primeiro e a dedução inteira, está no handbook [[bomba-centrifuga|Bomba Centrífuga]] — a **equação de Euler das turbomáquinas** rege essa conversão:

$$H_{th} = \frac{u_2 \, c_{u2} - u_1 \, c_{u1}}{g}$$

- $H_{th}$ — head teórico (altura manométrica teórica), em metros de coluna do fluido [m]: o potencial de energia que o impelidor entrega ao fluido, antes de descontar as perdas reais.
- $u$ — velocidade tangencial da pá [m/s], $u = \omega r$ ($\omega$ = velocidade angular do eixo [rad/s]; $r$ = raio do impelidor naquele ponto [m]).
- $c_u$ — componente tangencial da velocidade absoluta do fluido [m/s].
- $g$ — aceleração da gravidade [m/s²].
- Índices $1$ e $2$ — entrada e saída do impelidor, respectivamente.

Como o fluido entra sem giro na maioria dos projetos ($c_{u1} \approx 0$), a expressão se resume a $H_{th} = u_2 c_{u2}/g$: **todo o head nasce na periferia do impelidor** — quanto maior o diâmetro e a rotação, maior o head teórico. Na prática, o head real entregue é menor que o teórico: uma fração se perde no escorregamento (o fluido não é perfeitamente guiado pelo número finito de pás), outra em atrito hidráulico e outra em recirculação interna — o handbook detalha as três parcelas.

## Curva H-Q e o ponto de melhor eficiência (BEP)

O desempenho de uma rotodinâmica se resume numa curva: a **altura manométrica (H)** que ela entrega cai à medida que a **vazão (Q)** aumenta — mais vazão exige mais velocidade do fluido dentro do impelidor, e essa velocidade "rouba" energia que seria convertida em pressão. O ponto de operação real não é escolhido pela bomba: é a **interseção** dessa curva com a curva do sistema ao qual ela está conectada (a nota [[bomba-centrifuga|Bomba Centrífuga]] detalha essa interação).

Ao longo dessa curva existe um ponto onde o rendimento hidráulico é máximo — o **BEP** (*Best Efficiency Point*, ponto de melhor eficiência). É a referência central de saúde operacional: quanto mais a bomba opera **longe** do BEP (vazão muito maior ou muito menor que ele), maior a recirculação interna, a vibração, o desgaste e a suscetibilidade à [[cavitacao|cavitação]] — grande parte dos modos de falha deste princípio nasce exatamente aí. O diagrama abaixo ilustra a forma típica da curva e o BEP marcado:

![Curva H-Q genérica com o BEP marcado, e a mesma curva à rotação reduzida ligada pelas leis de afinidade](/anatomia/curva-hq-generica.svg)

## Leis de afinidade

Para o mesmo impelidor variando apenas a rotação $N$ (por exemplo, via inversor de frequência), três proporcionalidades ligam o ponto de operação antigo ao novo:

$$\frac{Q_2}{Q_1} = \frac{N_2}{N_1} \qquad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^{2} \qquad \frac{P_2}{P_1} = \left(\frac{N_2}{N_1}\right)^{3}$$

- $Q$ — vazão [m³/s ou m³/h].
- $H$ — head [m].
- $P$ — potência absorvida [W ou kW].
- $N$ — rotação [rpm]; índices $1$ e $2$ — condição de referência e condição nova.

Na prática: reduzir a rotação em 20% corta a vazão em 20%, o head em ~36% e a potência em ~49% — o argumento econômico central do acionamento com inversor de frequência. E, como o BEP inteiro desliza pela mesma regra (o diagrama acima mostra o BEP migrando para $Q$ e $H$ menores à rotação reduzida), o **NPSH requerido também cai com $N^2$** — reduzir a rotação é, na prática, uma ferramenta de combate à [[cavitacao|cavitação]], não só de economia de energia.

## NPSH — a margem que evita a cavitação

Toda rotodinâmica tem, na entrada do impelidor, uma região de pressão mínima — e se essa pressão cair abaixo da pressão de vapor do líquido, ele vaporiza localmente e cavita. Dois números resumem essa condição: o **NPSHd** (disponível — quanto a instalação entrega, propriedade do *sistema*: altura, perdas de carga, temperatura do fluido) e o **NPSHr** (requerido — quanto a bomba *precisa* para funcionar sem cavitar, propriedade da *máquina*, informada pelo fabricante). A regra de projeto é simples de enunciar e traiçoeira de aplicar direito: **NPSHd deve exceder o NPSHr com margem** — a nota de [[cavitacao|Cavitação]] (nível Engineer) traz a formulação rigorosa, a derivação a partir de Bernoulli, as margens normativas exatas e um exemplo numérico completo.

## Tipos usuais

Os critérios abaixo são **ortogonais** — uma mesma bomba combina um de cada:

- **Geometria do fluxo**: centrífuga **radial** (a dominante), de **fluxo misto** e **axial** — a velocidade específica cresce nessa ordem; a **helicoaxial** estende o princípio a misturas multifásicas (gás + líquido);
- **Estágios**: monoestágio × multiestágio (altas pressões);
- **Construção/instalação**: horizontal, vertical, in-line, submersa, bipartida axialmente (*split case*), turbina vertical e de poço profundo, autoescorvante;
- **Serviço**: criogênica, de circulação, *booster*.

*(handbooks por tipo na Fase 1)* — Tipo principal no acervo: [[bomba-centrifuga|Bomba Centrífuga]].
