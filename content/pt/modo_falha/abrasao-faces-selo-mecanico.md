---
slug: abrasao-faces-selo-mecanico
tipo_nota: modo_falha
locale: pt
titulo: 'Abrasão das Faces'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-ABR'
fontes:
  - 'API 682, 4ª ed. — Shaft Sealing Systems for Centrifugal and Rotary Pumps'
  - 'FSA — API 682 Part 5: Piping Plans (Plano 32 para fluidos sujos/abrasivos)'
  - 'John Crane — documentação técnica oficial (seleção de faces e planos)'
  - 'Karassik et al., Pump Handbook, 4ª ed. — capítulo de selagem'
  - 'ISO 4406:2021 — Classificação de código de limpeza de fluidos'
fw_a:
  categoria: wear_out
  beta: '1,3–2 (desgaste acelerado por partículas — mais rápido que desgaste natural das faces)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Mensal (tendência de vazamento + inspeção do plano de injeção)'
pf_tipico: 'semanas a poucos meses, conforme concentração e dureza das partículas no fluido de processo'
plano_manutencao:
  - tarefa: 'Monitorar tendência de vazamento visual/instrumentado'
    metodo: 'Inspeção visual de gotejamento na drenagem do selo ou sensor de vazamento, comparado ao padrão inicial pós-comissionamento'
    periodicidade: 'Mensal; semanal em serviço com fluido abrasivo conhecido'
    condicao: 'Em operação, sem interferência de lavagem/limpeza recente da área'
    criterio: 'Vazamento estável ou levemente crescente dentro do esperado (o selo "vaza por projeto")'
    acao: 'Aumento acelerado e sustentado do vazamento → suspeita de abrasão progressiva; planejar troca antes de vazamento franco'
    especialidade: 'Preditiva / inspeção de campo'
    duracao: '0,15 h'
    passos:
      - 'Observar/medir o vazamento na drenagem do selo no mesmo ponto de referência'
      - 'Comparar com o padrão estabelecido logo após o comissionamento'
      - 'Registrar a tendência ao longo do tempo, não apenas o valor pontual'
    registros:
      - 'Taxa de vazamento estimada [gotas/min ou mL/h]'
  - tarefa: 'Inspecionar e validar o Plano de Selagem 32 (injeção de fluido limpo)'
    metodo: 'Verificar pressão/vazão de injeção do fluido de barreira externo contra a especificação de projeto'
    periodicidade: 'Mensal'
    condicao: 'Em operação'
    criterio: 'Pressão de injeção acima da pressão da câmara (garante fluxo limpo para dentro, não fluido de processo para fora)'
    acao: 'Pressão de injeção insuficiente → corrigir a fonte (bomba/regulador) antes que partículas voltem a entrar na câmara'
    especialidade: 'Instrumentação / processo'
    duracao: '0,2 h'
    passos:
      - 'Medir a pressão de injeção do Plano 32 no ponto de referência'
      - 'Comparar com a pressão da câmara de selagem (deve ser sempre maior)'
      - 'Registrar e corrigir desvios na fonte de fluido limpo'
    registros:
      - 'Pressão de injeção do Plano 32 [bar]'
      - 'Pressão da câmara de selagem [bar]'
tags:
  - abrasão
  - Plano 32
  - fluido sujo
  - faces de selagem
revisado_em: 2026-07-18
---

## Beginner

**O que é.** Quando o fluido de processo carrega sólidos em suspensão (areia, catalisador, precipitados, produtos de corrosão a montante) e não há um plano de selagem que mantenha essas partículas longe da câmara, elas ficam presas entre as faces do [[selo-mecanico]] — que são projetadas para separação por filme fluido de ~1 μm, não para tolerar partículas sólidas. Cada partícula presa risca as faces a cada rotação, como uma lixa em miniatura, progressivamente abrindo um caminho de vazamento entre superfícies que deveriam estar em contato quase perfeito.

**Como reconhece em campo.** Diferente do [[dry-running-selo-mecanico|dry running]] (minutos), este é um processo **gradual** — vazamento crescente ao longo de semanas a meses, sem o pico súbito de temperatura característico da perda de filme. É detectável cedo por simples observação visual do gotejamento na drenagem do selo.

**Por que importa.** É um dos modos de falha mais evitáveis do componente: a solução (Plano de Selagem 32, que injeta fluido limpo externo na câmara) é bem estabelecida pela API 682 e de custo relativamente baixo frente ao custo de trocas recorrentes de selo em serviço abrasivo sem proteção.

## Specialist

### Mecanismo — partículas entre faces projetadas para filme fluido

As faces do selo operam com folgas da ordem de micrômetros, mantidas pelo próprio filme fluido. Partículas maiores que essa folga não conseguem passar livremente — ficam presas na interface e, a cada rotação relativa entre as faces, atuam como abrasivo, riscando a superfície lapidada. O dano acumula progressivamente: primeiro perde-se a planicidade original (2–3 bandas de luz), depois os riscos individuais coalescem em canais de vazamento contínuo.

### Por que o Plano 32 é a resposta canônica, não a troca de material

Embora faces mais duras (carbeto de silício contra carbeto de silício, em vez de carbono contra SiC) resistam melhor à abrasão, a solução de projeto preferida pela FSA/API 682 é **manter as partículas longe da interface** — o Plano 32 injeta fluido limpo externo na câmara, criando um ambiente onde as faces nunca veem o fluido de processo sujo diretamente. Trocar apenas o material das faces sem tratar a via de contaminação é uma solução paliativa que compra tempo, não elimina a causa.

### Framework A — diagnóstico

`Wear-out`, **β > 1**: a abrasão acumula dano de forma progressiva e crescente com o tempo de exposição — quanto maior a concentração e dureza das partículas, mais rápido o β efetivo empurra a curva para a direita (falha mais cedo). É um padrão de desgaste clássico, distinto do evento aleatório do dry running.

### Framework B — prescrição

**CBM via tendência de vazamento**, complementado pela verificação ativa do Plano 32 (que ataca a causa, não só monitora o sintoma). A vantagem deste modo de falha é o P-F relativamente longo (semanas a meses) — dá tempo real de planejar a troca do selo numa parada programada em vez de reagir a um vazamento franco.

## Engineer

### A física da granulometria crítica

O dano abrasivo é mais eficiente quando o tamanho da partícula é comparável ou ligeiramente maior que a folga de operação das faces (tipicamente sub-micrométrica a poucos micrômetros) — partículas muito menores podem atravessar suspensas sem causar dano significativo; partículas muito maiores tendem a ser filtradas mecanicamente antes de chegar à interface (dependendo da geometria da câmara). É por isso que a especificação do Plano 32 geralmente inclui um filtro dedicado dimensionado para a faixa crítica de tamanho, não apenas "fluido limpo" em termos genéricos.

### Interação com outros modos de falha

Faces já desgastadas por abrasão perdem parte da capacidade de gerar a pressão hidrodinâmica que sustenta o filme — um selo com abrasão avançada fica mais vulnerável a uma transição para [[dry-running-selo-mecanico|dry running]] sob uma perturbação de processo que, num selo com faces íntegras, seria tolerada sem problema. A autópsia de um selo com falha combinada frequentemente mostra os dois padrões: riscos de abrasão nas bordas + dano térmico concentrado no centro da face, onde o filme finalmente colapsou.
