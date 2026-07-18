---
slug: dry-running-selo-mecanico
tipo_nota: modo_falha
locale: pt
titulo: 'Dry Running (Operação a Seco)'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-DRY'
fontes:
  - 'API 682, 4ª ed. — Pumps: Shaft Sealing Systems for Centrifugal and Rotary Pumps'
  - 'FSA — API 682 Part 5: Piping Plans'
  - 'QM Seals — How Dry Running Damages Mechanical Seals in Pumps'
  - 'FBU Seals — Mechanical Pump Seal Failure: 8 Common Causes & Prevention'
  - 'Karassik et al., Pump Handbook, 4ª ed. — capítulo de selagem'
  - 'Moubray, RCM II (1997), cap. 3 — padrões de falha aleatórios'
fw_a:
  categoria: random
  beta: '~1 (evento operacional — perda de filme, não desgaste acumulado)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Contínuo (alarme de temperatura de câmara/pressão do plano de selagem)'
pf_tipico: 'minutos a poucas dezenas de minutos entre a perda de filme e a destruição térmica das faces'
plano_manutencao:
  - tarefa: 'Monitorar temperatura da câmara de selagem em contínuo'
    metodo: 'Sensor de temperatura fixo com alarme de desvio, comparado ao baseline de operação normal'
    periodicidade: 'Contínuo'
    condicao: 'Em operação'
    criterio: 'Temperatura estável dentro da faixa normal para o fluido e a condição de processo'
    acao: 'Elevação rápida e sustentada → suspeita forte de perda de filme; verificar nível/pressão da câmara e parar a bomba se confirmado antes de destruição total das faces'
    especialidade: 'Automação / instrumentação de processo'
    duracao: 'Contínuo; auditoria do alarme mensal'
    passos:
      - 'Confirmar que o sensor de temperatura está calibrado e o alarme configurado com margem adequada acima do baseline'
      - 'Investigar imediatamente qualquer elevação rápida (minutos) fora do padrão de processo'
      - 'Correlacionar com nível/pressão da câmara de selagem antes de agir'
      - 'Registrar o evento e a ação tomada'
    registros:
      - 'Temperatura da câmara de selagem [°C]'
      - 'Tempo entre alarme e ação [min]'
  - tarefa: 'Verificar nível/pressão do plano de selagem e intertravamentos de partida'
    metodo: 'Inspeção de instrumentação (nível do pote de barreira, pressão do plano 11/32/53) + teste do intertravamento que impede partida sem nível mínimo'
    periodicidade: 'Mensal; obrigatório após qualquer intervenção na linha de selagem'
    condicao: 'Em operação e antes de qualquer partida após manutenção'
    criterio: 'Nível/pressão dentro da faixa de projeto; intertravamento de partida funcional (testado)'
    acao: 'Intertravamento inoperante ou nível cronicamente baixo → corrigir antes da próxima partida, não depois'
    especialidade: 'Instrumentação / automação'
    duracao: '0,5 h'
    passos:
      - 'Verificar nível do pote de barreira (planos 53) ou pressão de injeção (plano 32)'
      - 'Testar o intertravamento de bloqueio de partida sem condição mínima de selagem, se existente'
      - 'Registrar e corrigir qualquer desvio antes da próxima partida'
    registros:
      - 'Nível do pote de barreira [%]'
      - 'Intertravamento testado (OK/falha)'
tags:
  - dry running
  - API 682
  - plano de selagem
  - fator PV
revisado_em: 2026-07-18
---

## Beginner

**O que é.** O [[selo-mecanico]] depende de um filme fluido de ~1 μm entre as faces para vedar E lubrificar ao mesmo tempo — sem esse filme, é atrito metal-metal puro entre superfícies giratórias. **Dry running** é exatamente isso: a câmara de selagem fica sem fluido suficiente (esvaziamento, vórtice de sucção, entrada de gás, ou plano de selagem que parou de funcionar), o filme desaparece, e as faces geram calor por atrito direto. Como as faces são projetadas para um filme de espessura micrométrica, não para contato direto, a temperatura sobe extremamente rápido — **minutos**, não horas — até choque térmico, trincas radiais nas faces cerâmicas e destruição completa.

**Como reconhece em campo.** É um dos poucos modos de falha do selo com um sinal precoce claro e simples: **temperatura da câmara subindo rápido e fora do padrão**. Não exige análise sofisticada — um sensor de temperatura com alarme bem calibrado detecta o evento em minutos, tempo suficiente para agir antes da destruição total.

**Por que importa.** É tipicamente o modo de falha mais **rápido e mais caro** do componente — de operação normal a selo destruído em questão de minutos, muitas vezes levando a vazamento de processo (com riscos de segurança/ambientais dependendo do fluido). A causa raiz quase sempre está **fora do selo**: cavitação na sucção da bomba, nível baixo no tanque, ou uma válvula de bloqueio do plano de selagem fechada por engano.

## Specialist

### Vias de perda de filme

1. **Câmara vazia** — nível de sucção baixo, escorva perdida, ou a bomba operando sem fluido suficiente circulando pela câmara.
2. **Vórtice/entrada de gás** — recirculação (Plano 11) obstruída ou subdimensionada permite que gás dissolvido ou entrada de ar substitua o líquido na câmara.
3. **Plano de selagem inoperante** — válvula fechada por engano, orifício do Plano 11 entupido, bomba de circulação do Plano 23 parada, ou perda de pressão de barreira nos Planos 53.
4. **Cavitação na sucção da bomba** — [[cavitacao|cavitação]] severa reduz a densidade efetiva do fluido na câmara, um caminho indireto mas real para dry running parcial.

### Framework A — diagnóstico

`Random`, **β ≈ 1**: o evento é disparado por uma condição operacional pontual (uma válvula fechada, um nível baixo), não por acúmulo de ciclos — um selo novo e um selo antigo são igualmente vulneráveis se expostos à mesma perda de filme. Não existe idade característica de falha para este modo.

### Framework B — prescrição

**CBM contínuo via temperatura**, o P-F mais curto e mais crítico do componente — a diferença entre detecção em segundos/minutos e detecção tardia é a diferença entre "selo salvo" e "selo destruído + vazamento de processo". A segunda camada (verificação de nível/pressão e intertravamentos) ataca a **causa**, evitando que a condição de dry running sequer se instale.

## Engineer

### Por que a destruição é tão rápida — a física do fator PV sem filme

Sem filme lubrificante, o coeficiente de atrito nas faces salta de valores muito baixos (regime hidrodinâmico) para valores típicos de contato seco carbono-cerâmica — uma ordem de grandeza maior. Como a geração de calor por atrito escala com o produto força normal × velocidade × coeficiente de atrito, a mesma condição de PV que era segura em regime lubrificado ultrapassa em muito o limite térmico das faces em regime seco — daí a escala de tempo em minutos, não horas: o "fator PV" discutido em [[selo-mecanico]] pressupõe filme presente; sem ele, a física muda de categoria.

### Relação com o processo a montante

Dry running raramente é um defeito do selo em si — é quase sempre um sintoma de uma condição do **processo** ou da **bomba** que o selo apenas revela primeiro (por ser o componente com a menor margem térmica). Isso o torna um excelente "canário": um histórico recorrente de dry running num mesmo ponto de bombeamento deve disparar investigação de nível de tanque, dimensionamento de sucção ou [[cavitacao|cavitação]] antes de qualquer troca repetida de selo — trocar o selo sem tratar a causa é garantir a próxima falha.
