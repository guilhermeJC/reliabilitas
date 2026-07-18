---
slug: selo-mecanico
tipo_nota: componente
locale: pt
titulo: 'Selo Mecânico'
status: published
taxonomia: []
iso14224_code: 'SE'
resumo: 'Vedação dinâmica de eixo por par de faces planas separadas por filme fluido de ~1 μm. Componente transversal (D10): principal causa de intervenção em bombas junto com rolamentos e o item de maior custo recorrente em rotativos.'
fontes:
  - 'API 682, 4ª ed. — Pumps: Shaft Sealing Systems for Centrifugal and Rotary Pumps'
  - 'FSA — API 682 Part 5: Piping Plans (Fluid Sealing Association)'
  - 'John Crane — documentação técnica oficial (Type 21, Type 1, cartuchos API 682)'
  - 'Karassik et al., Pump Handbook, 4ª ed. — capítulo de selagem'
  - 'AESSEAL — whitepaper API 682 4th edition'
tags:
  - API 682
  - fator PV
  - planos de selagem
  - faces de selagem
  - dry running
revisado_em: 2026-07-06
---

## Função e princípio

O selo mecânico veda a passagem do eixo pela carcaça com um par de **faces planas em contato rotativo** — uma gira com o eixo, a outra é estacionária — lapidadas a planicidades de **2–3 bandas de luz** (~1 μm de desvio). Entre elas forma-se um **filme fluido de ~1 μm** que simultaneamente veda e lubrifica: o selo mecânico bem operado **vaza por projeto** — um filme evaporando na face atmosférica, invisível a olho nu. É essa física delicada que explica a regra de ouro do componente: o selo raramente "morre de velho"; ele é **morto por uma condição operacional** que destruiu o filme.

## Anatomia funcional

- **Face rotativa + face estacionária** — o coração tribológico. Pares típicos: carbono-grafite contra carbeto de silício (serviço geral); SiC contra SiC (abrasivos); carbeto de tungstênio (choque mecânico).
- **Elementos de força** — molas (única, múltiplas) ou fole metálico: mantêm as faces fechadas em repouso e compensam desgaste e movimentos axiais.
- **Vedações secundárias** — O-rings/elastômeros (ou grafite no fole): vedam estática e dinamicamente entre selo, eixo e câmara. A química e a temperatura do fluido ditam o material (NBR, EPDM, FKM/Viton, FFKM/Kalrez).
- **Sleeve e sobreposta (gland)** — interface mecânica com eixo e câmara de selagem.
- **Cartucho**: o conjunto inteiro pré-montado e pré-ajustado de fábrica — o padrão API 682, que elimina a variável "ajuste em campo", historicamente a maior fonte de mortalidade infantil do componente.

## Balanceamento e fator PV

Duas grandezas de projeto governam a capacidade das faces:

- **Razão de balanceamento** $B$: fração da pressão hidráulica que efetivamente fecha as faces. Selos **balanceados** ($B \approx 0{,}75$) reduzem a carga de fechamento e sobrevivem a pressões muito maiores que os não-balanceados ($B > 1$).
- **Fator PV**: o produto pressão de contato × velocidade periférica — a taxa de geração de calor por atrito nas faces. Cada par de materiais tem um limite de PV; excedê-lo (por pressão, rotação, ou perda do filme) leva a *flashing* do filme, contato seco e destruição em minutos. Todo plano de selagem existe, em última análise, para **administrar o calor das faces**.

## Planos de selagem — API 682 / Parte 5

Os *piping plans* padronizam o ambiente que mantém o selo vivo (numeração clássica da API 682, difundida pela FSA):

| Plano | O que faz | Quando |
| --- | --- | --- |
| **11** | Recirculação do recalque → câmara via orifício | O default de serviço limpo |
| **32** | Injeção de fluido limpo externo na câmara | Fluidos sujos/abrasivos |
| **53A/B/C** | Selo duplo pressurizado com fluido de barreira | Fluidos tóxicos/perigosos (emissão ~zero) |
| **74** | Barreira de **gás** pressurizado (selo de gás) | O estado da arte de emissão zero |

Selos **simples × duplos** (arranjos API: 1, 2 e 3): a decisão nasce do risco do fluido — o arranjo 3 (duplo pressurizado) torna o vazamento do processo fisicamente impossível enquanto a barreira estiver pressurizada.

## Modos de falha típicos

A estatística de campo do componente é dominada por **eventos operacionais**, não por desgaste natural — vida ~aleatória (**β ≈ 1** no Fw A), o que invalida troca preventiva por tempo:

- ***Dry running*** (operação a seco): perda de filme por câmara vazia, vórtice, ou plano de selagem inoperante — destruição térmica das faces em minutos. Random. Ver [[dry-running-selo-mecanico|nota própria]].
- **Abrasão das faces**: sólidos no filme (fluido sujo sem plano 32) riscam as faces e abrem caminho de vazamento. Wear-out acelerado. Ver [[abrasao-faces-selo-mecanico|nota própria]].
- **Degradação de elastômeros**: química incompatível ou temperatura — incham, endurecem, extrudam. Wear-out químico. Ver [[degradacao-elastomeros-selo-mecanico|nota própria]].
- ***Hang-up*/travamento**: depósitos (coque, cristalização) impedem o acompanhamento axial das faces. Mixed. Ver [[hangup-selo-mecanico|nota própria]].
- **Mortalidade infantil de montagem**: eliminada em grande parte pelo padrão cartucho — quando ainda aparece, investigar procedimento e deflexão de eixo (> 0,05 mm na face é sentença). Ver [[instalacao-incorreta-selo-mecanico|nota própria]].

O diagnóstico correto começa na **autópsia do selo** (as faces contam a história: trincas térmicas radiais = choque térmico; desgaste em anel = abrasão; faces perfeitas + elastômero destruído = química) — disciplina formalizada nos guias de análise de falha da FSA e dos fabricantes. As 5 notas acima detalham mecanismo, Fw A/B e plano de manutenção de cada modo.

## Exemplo numérico — fator PV e o limite das faces

Selo balanceado ($B \approx 0{,}75$) em eixo de 50 mm, pressão de câmara 10 bar (1,0 MPa), rotação 1.800 rpm:

$$v = \pi \, d \, n = \pi \times 0{,}05 \times (1.800/60) \approx 4{,}71 \text{ m/s}$$

$$PV = P_{\text{face}} \times v \approx (0{,}75 \times 1{,}0 \times 10^6) \times 4{,}71 \approx 3{,}5 \times 10^6 \text{ Pa·m/s}$$

Contra um limite típico de faces carbono×SiC de referência (ordem de $3$–$5 \times 10^6$ Pa·m/s conforme o par de materiais e o plano de selagem), esse ponto de operação já está no teto — qualquer perda parcial do plano de refrigeração/lubrificação (ex.: Plano 11 parcialmente obstruído) ou aumento de pressão/rotação empurra o par para fora da janela segura, precipitando *flashing* do filme. É por isso que selos não-balanceados ($B > 1$) só se justificam em pressões baixas: o mesmo raciocínio de PV explica por que a razão de balanceamento é a primeira variável a revisar quando um selo falha repetidamente no mesmo serviço.

## Seleção e boas práticas

- **API 682** é a referência de seleção e qualificação mesmo fora de O&G: selos qualificados por teste, cartucho, vida alvo de projeto de 25.000 h (3 anos).
- A causa raiz da falha do selo frequentemente está **fora do selo**: operação fora do BEP (deflexão de eixo), NPSH marginal ([[cavitacao|cavitação]] na câmara), partida sem venting, plano de selagem subdimensionado.
- Monitoramento: temperatura da câmara, pressão/nível do pote de barreira (planos 53), e a boa e velha inspeção visual do gotejamento — mudança de padrão de vazamento é o P-F acessível do componente.
