---
slug: falso-brinelamento-rolamento
tipo_nota: modo_falha
locale: pt
titulo: 'Falso Brinelamento (Corrosão por Fretting em Parada)'
status: published
taxonomia:
  - rolamento
iso14224_code: 'BE-FBR'
fontes:
  - 'ISO 15243:2017 — §5.3.3.2 (fretting) e §5.3.3.3 (falso brinelamento)'
  - 'Grebe et al. — False Brinelling: Standstill Marks on Roller Bearings (ResearchGate, 2022)'
  - 'STLE — False Brinelling: An Increasing Type of Rolling Bearing Wear (TLT, 2023)'
  - 'ONYX Insight — Fretting Corrosion Bearing Failures (Failure Atlas)'
  - 'NTN Bearing Wizard — Corrosion (rolling bearing damage)'
  - 'SKF Evolution — Bearing damage analysis with ISO 15243'
fw_a:
  categoria: random
  beta: 'não aplicável no sentido clássico — evento disparado por vibração externa em parada, não por acúmulo de ciclos de rotação'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Inspeção/vibração no comissionamento e após qualquer transporte ou parada prolongada com vibração externa presente'
pf_tipico: 'o dano se instala durante a parada (dias a meses); manifesta-se como vibração/ruído na partida seguinte — o P-F relevante é o intervalo entre a partida com sintoma leve e a falha funcional (semanas a poucos meses)'
plano_manutencao:
  - tarefa: 'Verificar histórico de transporte/armazenamento e vibração externa antes do comissionamento'
    metodo: 'Checklist documental: tempo parado, presença de vibração de equipamentos vizinhos, se houve rotação periódica (barring) durante estocagem'
    periodicidade: 'No comissionamento e após qualquer parada prolongada (>3 meses) com o rotor imóvel'
    condicao: 'Antes do start-up, com o equipamento ainda parado'
    criterio: 'Rotor girado periodicamente durante o armazenamento OU ausência de fonte de vibração externa nas proximidades'
    acao: 'Sem rotação periódica E vibração externa presente durante a parada → inspecionar vibração/ruído já na primeira partida antes de assumir operação normal'
    especialidade: 'Engenharia de confiabilidade / comissionamento'
    duracao: '0,25 h'
    passos:
      - 'Consultar registro de tempo parado e condições de armazenamento/transporte'
      - 'Verificar se havia rotina de giro periódico (barring) durante a parada'
      - 'Identificar fontes de vibração externa nas proximidades (outras máquinas, transporte rodoviário/ferroviário)'
      - 'Se risco identificado, sinalizar para inspeção reforçada na partida'
    registros:
      - 'Tempo parado [dias]'
      - 'Rotina de giro periódico aplicada (sim/não)'
  - tarefa: 'Inspecionar vibração/ruído na primeira partida pós-parada prolongada'
    metodo: 'Espectro de vibração e ausculta acústica nos primeiros minutos de rotação após uma parada de risco identificada'
    periodicidade: 'Na partida, uma vez por evento de parada prolongada com risco'
    condicao: 'Rotação inicial, antes de estabilizar em carga plena'
    criterio: 'Ausência de ruído áspero/irregular característico de marcas de brinelamento (diferente do ruído suave de rolamento saudável)'
    acao: 'Ruído/vibração anormal na partida → inspecionar visualmente na próxima oportunidade de parada; considerar troca preventiva se o ativo for crítico'
    especialidade: 'Preditiva / comissionamento'
    duracao: '0,25 h'
    passos:
      - 'Registrar espectro de vibração nos primeiros minutos de rotação'
      - 'Auscultar ruído característico (áspero, rítmico, na frequência de passagem dos corpos rolantes)'
      - 'Comparar com o padrão esperado de rolamento saudável na partida'
      - 'Registrar achados e decidir sobre inspeção física'
    registros:
      - 'Presença de ruído anormal na partida (sim/não)'
      - 'Amplitude de vibração na partida [mm/s]'
tags:
  - fretting
  - falso brinelamento
  - vibração em parada
  - transporte
  - comissionamento
revisado_em: 2026-07-18
---

## Beginner

**O que é.** Ao contrário da maioria dos modos de falha do [[rolamento]], este acontece **quando a máquina está parada, não girando** — mas exposta a alguma fonte de vibração externa (transporte rodoviário/ferroviário, uma máquina vizinha em operação, ou vibração transmitida pela estrutura). Como o rotor não gira, os mesmos pontos de contato entre esferas/rolos e pistas ficam sujeitos a um micromovimento oscilatório repetido — pequeno demais para ser "rolamento" de verdade, grande o suficiente para expulsar o filme de lubrificante daquele ponto específico e permitir contato metal-metal repetitivo. O resultado: marcas de desgaste na pista, exatamente no espaçamento dos corpos rolantes, muitas vezes com uma coloração avermelhada/enegrecida (óxido) — visualmente parecidas com as marcas do **verdadeiro brinelamento** (deformação por sobrecarga estática), só que causadas por um mecanismo completamente diferente. Daí o nome: **falso** brinelamento.

**Como reconhece em campo.** O sintoma só aparece **depois** — quando a máquina finalmente entra em operação normal, ela apresenta vibração ou ruído anormal logo na partida, mesmo sem nunca ter sido operada em condição adversa. É um dos poucos modos de falha do rolamento cuja causa raiz aconteceu **antes** da máquina sequer começar a trabalhar.

**Por que importa.** É extremamente comum em equipamentos que passam por transporte de longa distância, ficam em estoque prolongado perto de outras máquinas vibrando, ou são desligados por manutenção prolongada sem rotina de giro periódico (*barring*). A prevenção é simples e barata (girar o eixo periodicamente durante a parada, ou isolar de vibração externa) — mas raramente lembrada porque o dano é invisível até a próxima partida.

## Specialist

### Mecanismo — fretting sem rotação (ISO 15243 §5.3.3.3)

O falso brinelamento é uma forma específica de **fretting** (ISO 15243 §5.3.3.2) que ocorre especificamente em repouso: o micromovimento oscilatório desloca o filme de lubrificante da zona de contato, expondo as asperezas metálicas ao ar. As asperezas então oxidam (óxido vermelho/preto característico) e, ao serem "friccionadas" novamente pelo próximo ciclo de vibração, o óxido é removido por desgaste — um ciclo de oxidação-remoção que aprofunda a marca progressivamente enquanto a vibração persistir. **Não há deformação plástica** (diferente do verdadeiro brinelamento) — o dano é por perda de material via fricção química, não por impacto mecânico.

### Diferenciação — falso × verdadeiro brinelamento

O verdadeiro brinelamento (ISO 15243 §5.5.2, deformação plástica) ocorre por **sobrecarga estática ou de impacto** acima do limite elástico — uma única batida de martelo na montagem, ou uma carga de choque, cria uma indentação permanente por deformação. O falso brinelamento não envolve carga além do peso próprio/pré-carga normal — o dano vem inteiramente do ciclo vibração+oxidação em repouso. A distinção na autópsia: verdadeiras indentações de sobrecarga têm bordas suaves de deformação plástica; marcas de falso brinelamento têm o óxido característico e a distribuição regular no espaçamento dos corpos rolantes, sem deformação do material abaixo da marca.

### Framework A — diagnóstico

`Random`: o gatilho é inteiramente **externo e episódico** — presença de vibração ambiente durante uma parada, não relacionado à idade do rolamento ou a ciclos de operação. Não existe "idade característica" de falha neste modo — um rolamento novo, recém-instalado, é tão vulnerável quanto um usado, se exposto às mesmas condições de parada com vibração.

### Framework B — prescrição

O P-F relevante aqui é atípico: o **dano** ocorre durante a parada (não detectável sem inspeção física direta), mas o **sintoma** só emerge na partida seguinte — então a estratégia de maior valor é **prevenção operacional** (giro periódico durante paradas longas, isolamento de vibração externa) combinada com **inspeção na primeira partida** pós-evento de risco. É um caso em que o Fw B tradicional (monitorar continuamente a condição em operação) tem valor limitado — o momento de detecção que importa é o comissionamento/repartida, não a rota de rotina em regime permanente.

## Engineer

### Por que a vibração de transporte é tão eficiente em gerar dano

A amplitude de vibração necessária para causar falso brinelamento é surpreendentemente pequena — estudos citam micromovimentos da ordem de micrômetros como suficientes, porque o mecanismo não depende de deslocamento grande, depende de **repetição**: transporte rodoviário/ferroviário de longa distância acumula milhões de ciclos de microvibração em poucos dias, muito mais ciclos do que a máquina acumularia em anos de operação normal na mesma amplitude — porque em operação normal o rolamento está **girando**, redistribuindo o ponto de contato a cada volta, enquanto em repouso o mesmo ponto é solicitado repetidamente sem alívio.

### A janela de risco em ativos de reserva (standby)

Bombas e motores reserva (*standby*), mantidos parados por longos períodos mas fisicamente próximos de equipamentos em operação (mesma base, mesma estrutura), estão numa janela de risco permanente e frequentemente esquecida — a rotina de giro periódico é comum em turbinas e grandes máquinas rotativas críticas, mas raramente aplicada a bombas/motores de reserva de médio porte, exatamente os ativos mais expostos a este modo de falha por ficarem meses ou anos sem rodar.

### Conexão com o P-F de outros modos

Um rolamento com falso brinelamento não tratado continua em operação com pontos de dano localizado que funcionam como concentradores — esses pontos aceleram a nucleação de [[fadiga-subsuperficial-rolamento|fadiga de contato]] subsequente, de forma análoga à indentação por partículas discutida em [[contaminacao-lubrificante-rolamento|contaminação]]. A diferença de causa raiz (vibração em parada × partícula em operação) não muda o destino final — ambos criam sítios de nucleação prematura na pista.
