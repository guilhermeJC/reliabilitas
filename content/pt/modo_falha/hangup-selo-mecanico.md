---
slug: hangup-selo-mecanico
tipo_nota: modo_falha
locale: pt
titulo: 'Hang-up (Travamento por Depósitos)'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-HANG'
fontes:
  - 'API 682, 4ª ed. — Shaft Sealing Systems for Centrifugal and Rotary Pumps'
  - 'FSA — API 682 Part 5: Piping Plans (planos de aquecimento/resfriamento para fluidos que coqueificam/cristalizam)'
  - 'Vulcan Seals — Mechanical Seal Troubleshooting: Identifying and Preventing Common Failures'
  - 'John Crane — documentação técnica oficial'
  - 'Karassik et al., Pump Handbook, 4ª ed. — capítulo de selagem'
fw_a:
  categoria: mixed_complex
  beta: '1,2–1,8 (acúmulo progressivo de depósito; o gatilho de formação depende de condição operacional)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Mensal (vibração/ruído na partida + tendência de vazamento) — atenção redobrada após qualquer parada prolongada em serviço de coqueificação'
pf_tipico: 'semanas a poucos meses, acelerado por paradas frequentes em serviço de fluido que coqueifica ou cristaliza'
plano_manutencao:
  - tarefa: 'Monitorar vibração/ruído nas partidas em serviços de risco de depósito'
    metodo: 'Espectro de vibração e ausculta na partida, comparado ao padrão de selo saudável, em serviços com histórico de coqueificação/cristalização'
    periodicidade: 'A cada partida, em serviços de risco identificado'
    condicao: 'Rotação inicial pós-parada'
    criterio: 'Face acompanha o movimento axial normalmente (sem ruído de atrito irregular ou vibração associada a arraste)'
    acao: 'Sinal de travamento parcial na partida → investigar antes de assumir operação normal; considerar aquecimento de linha antes da próxima partida'
    especialidade: 'Preditiva / comissionamento'
    duracao: '0,2 h'
    passos:
      - 'Registrar vibração/ruído nos primeiros minutos após a partida'
      - 'Comparar com o padrão esperado de selo saudável'
      - 'Se anomalia presente, avaliar necessidade de aquecimento de linha/selo antes de partidas futuras'
    registros:
      - 'Presença de anomalia na partida (sim/não)'
      - 'Tempo parado antes da partida [h]'
  - tarefa: 'Validar plano de aquecimento/resfriamento em serviços que coqueificam ou cristalizam'
    metodo: 'Verificar funcionamento do traço de vapor/aquecimento elétrico ou plano de resfriamento (Plano 21/23) conforme especificado para o fluido'
    periodicidade: 'Mensal; obrigatório antes de qualquer parada prolongada programada'
    condicao: 'Em operação e antes de parada programada'
    criterio: 'Aquecimento/resfriamento funcional e temperatura da linha dentro da faixa que evita a formação de depósito'
    acao: 'Sistema de aquecimento/resfriamento inoperante → corrigir antes de permitir parada prolongada'
    especialidade: 'Instrumentação / processo'
    duracao: '0,3 h'
    passos:
      - 'Verificar funcionamento do traço de vapor/aquecimento elétrico ou do plano de resfriamento aplicável'
      - 'Medir temperatura da linha/câmara e comparar com a faixa segura para o fluido'
      - 'Registrar e corrigir antes de autorizar parada prolongada'
    registros:
      - 'Temperatura da linha/câmara [°C]'
      - 'Sistema de aquecimento/resfriamento funcional (sim/não)'
tags:
  - hang-up
  - coqueificação
  - cristalização
  - travamento
  - API 682
revisado_em: 2026-07-18
---

## Beginner

**O que é.** Algumas faces do [[selo-mecanico]] são projetadas para se mover axialmente alguns micrômetros durante a operação, acompanhando desgaste e pequenos movimentos térmicos do eixo — é assim que o selo mantém as faces em contato adequado ao longo da vida útil. **Hang-up** acontece quando depósitos sólidos se formam na região onde essa face deveria deslizar livremente — tipicamente coque (de hidrocarbonetos que degradam termicamente perto de superfícies quentes) ou cristais (de sais que precipitam quando o fluido esfria ou evapora parcialmente) — e esses depósitos **travam** o movimento axial da face. O selo perde a capacidade de se ajustar, e o resultado é vazamento ou dano às faces pela perda de acompanhamento adequado.

**Como reconhece em campo.** É mais comum em serviços com fluidos que **coqueificam** (óleo pesado, asfalto, resíduos de refinaria) ou **cristalizam** (soluções salinas, alguns processos químicos) — especialmente após paradas prolongadas, quando o fluido parado tem tempo de resfriar/estagnar e formar depósito sem o fluxo contínuo que normalmente o mantém em suspensão ou dissolvido.

**Por que importa.** É um modo de falha específico de indústria/serviço — nem toda aplicação está exposta, mas onde está, é recorrente e sazonalmente ligado a paradas de manutenção, não a desgaste constante. A prevenção típica envolve manter a linha aquecida/resfriada mesmo parada, evitando que o fluido chegue à condição que forma o depósito.

## Specialist

### Mecanismo — dois caminhos para o mesmo travamento

**Coqueificação:** hidrocarbonetos pesados, expostos a superfícies aquecidas (proximidade das faces em atrito, ou aquecimento de processo), sofrem degradação térmica e formam depósitos carbonáceos duros e aderentes — exatamente na região de movimento axial da face, o pior lugar possível para um depósito rígido se formar.

**Cristalização:** fluidos com sais dissolvidos próximos da saturação podem precipitar cristais quando a temperatura cai (solubilidade tipicamente diminui com o resfriamento) ou quando uma fração do fluido evapora na face atmosférica do selo, concentrando os sais remanescentes até a saturação. O padrão clássico: acontece mais em paradas (fluido parado, tempo para precipitar) do que em operação contínua (fluxo constante mantém a solução).

### Framework A — diagnóstico

`Mixed/Complex`: o depósito se acumula progressivamente com o tempo de exposição às condições de risco (β>1 no acúmulo), mas o gatilho de formação (uma parada prolongada, uma queda de temperatura específica) é operacional e nem sempre previsível no calendário — a IT-MNT-001 trataria este caso como candidato a decomposição por FMEA: o depósito em si é wear-out, mas o evento que dispara a formação é situacional.

### Framework B — prescrição

**CBM** com duas frentes: monitorar sintoma (vibração/ruído na partida, quando o travamento já existe) e — de maior valor — **atacar a causa** mantendo a linha aquecida/resfriada mesmo durante paradas, para que o fluido nunca alcance a condição que forma depósito. É um dos poucos modos de falha do componente em que a estratégia operacional (gestão térmica da linha parada) tem mais impacto que qualquer inspeção do selo em si.

## Engineer

### Por que paradas são o momento de maior risco

Em operação contínua, o fluxo constante através da câmara de selagem tende a manter partículas em suspensão e a diluir concentrações locais de sais próximas da face — mesmo em fluidos com risco de cristalização, o fluxo "lava" a região antes que a saturação local seja atingida. Numa parada, esse fluxo cessa: o fluido na câmara fica estagnado, exposto a variações de temperatura ambiente por horas a dias, tempo suficiente para os processos lentos de precipitação/coqueificação se completarem exatamente na geometria mais sensível do selo.

### A lição de projeto: planos de selagem térmicos

A API 682 Parte 5 inclui planos específicos de aquecimento (traço de vapor/elétrico na câmara) e resfriamento (Planos 21/23, que recirculam fluido através de um trocador de calor) — a existência desses planos no catálogo normativo confirma que hang-up por temperatura é um modo de falha reconhecido e endereçado por projeto, não uma anomalia rara. A auditoria correta na especificação de um selo novo pergunta explicitamente: "este fluido coqueifica ou cristaliza em alguma condição de parada plausível?" — se sim, o plano térmico não é opcional.

### Relação com outros modos

Um selo que sofreu hang-up e teve a face forçada além do curso normal de acompanhamento pode desenvolver dano localizado nas faces análogo ao de [[abrasao-faces-selo-mecanico|abrasão]] — o depósito rígido, se fragmentado durante a tentativa de movimento, vira ele mesmo uma partícula abrasiva presa na interface. A autópsia de um selo com hang-up recorrente deve investigar ambos os padrões de dano.
