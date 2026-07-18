---
slug: falha-lubrificacao-rolamento
tipo_nota: modo_falha
locale: pt
titulo: 'Falha de Lubrificação (Desgaste Adesivo)'
status: published
taxonomia:
  - rolamento
iso14224_code: 'BE-LUB'
fontes:
  - 'ISO 15243:2017 — §5.2.3 (desgaste adesivo — smearing/galling)'
  - 'ISO 281:2007 — razão de viscosidade $\kappa$ e razão de filme $\lambda$'
  - 'SKF Evolution — Bearing damage analysis with ISO 15243'
  - 'Harris & Kotzalas — Rolling Bearing Analysis, 5ª ed., cap. 20 (lubrificação elastohidrodinâmica)'
  - 'Machine Design — The Meaning of Bearing Life (L10 vs MTBF)'
  - 'Moubray, RCM II (1997), cap. 3 — padrões de falha'
fw_a:
  categoria: mixed_complex
  beta: 'próximo de 1 quando abrupta (falta súbita de graxa); >1,3 quando progressiva (relubrificação insuficiente)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Termografia/vibração mensal; verificação de plano de relubrificação a cada intervenção'
pf_tipico: 'dias (perda súbita — bomba de graxa travada, vedação rompida) a meses (subengraxamento crônico)'
plano_manutencao:
  - tarefa: 'Auditar o plano de relubrificação contra o catálogo do fabricante'
    metodo: 'Comparar intervalo e quantidade programados no CMMS com a recomendação do fabricante para designação, velocidade e temperatura reais'
    periodicidade: 'A cada revisão do plano ou mudança de condição de operação (velocidade, temperatura ambiente)'
    condicao: 'Revisão documental — não exige parada'
    criterio: 'Intervalo e quantidade dentro da faixa recomendada pelo fabricante para as condições reais medidas'
    acao: 'Divergência → corrigir o plano no CMMS; excesso de graxa é tão prejudicial quanto falta — nunca "engraxar mais para garantir"'
    especialidade: 'Engenharia de confiabilidade'
    duracao: '0,5 h por ativo'
    passos:
      - 'Levantar velocidade real (rpm), temperatura de operação e designação do rolamento'
      - 'Consultar a tabela de relubrificação do fabricante para essas condições'
      - 'Comparar com o intervalo/quantidade programados no CMMS'
      - 'Corrigir divergências e documentar a fonte da recomendação'
    registros:
      - 'Intervalo de relubrificação programado vs. recomendado [h]'
      - 'Quantidade de graxa programada vs. recomendada [g]'
  - tarefa: 'Monitorar temperatura e vibração de banda ampla como indicador de lubrificação marginal'
    metodo: 'Termografia + vibração (RMS de banda ampla, sem foco em frequências discretas)'
    periodicidade: 'Mensal'
    condicao: 'Em operação, carga estável'
    criterio: 'Temperatura e RMS de banda ampla estáveis frente ao baseline'
    acao: 'Elevação de ambos sem explicação de processo → suspeita de lubrificação marginal; relubrificar/inspecionar antes de aguardar sinal de fadiga'
    especialidade: 'Preditiva'
    duracao: '0,3 h'
    passos:
      - 'Medir temperatura da carcaça e RMS de vibração de banda ampla'
      - 'Comparar com o baseline na mesma condição de carga'
      - 'Se ambos elevados, verificar plano de relubrificação antes de escalar para intervenção'
    registros:
      - 'Temperatura da carcaça [°C]'
      - 'RMS de vibração banda ampla [mm/s]'
tags:
  - lubrificação
  - EHL
  - desgaste adesivo
  - smearing
  - relubrificação
revisado_em: 2026-07-18
---

## Beginner

**O que é.** Diferente da [[contaminacao-lubrificante-rolamento|contaminação]], aqui o problema não é o que está *no* óleo/graxa, mas a **ausência ou insuficiência do próprio filme**. Isso acontece por excesso de velocidade/temperatura frente à viscosidade do lubrificante escolhido, quantidade errada de graxa (pouca ou — surpreendentemente — **excesso**, que gera calor pelo próprio atrito interno da graxa), intervalo de relubrificação longo demais, ou perda súbita (bomba de graxa travada, retentor rompido). Sem o filme protetor, as superfícies metálicas entram em contato direto — não risco de partículas como na contaminação, mas **atrito metal-metal puro**, que gera calor, "solda" e arranca microscopicamente pequenos pontos de material (o chamado *smearing*, ou escoriação).

**Como reconhece em campo.** Temperatura anormalmente alta é o sinal mais direto e precoce — muitas vezes antes de qualquer vibração perceptível. Em estágio avançado, ruído crescente e, no pior caso, travamento do rolamento por solda a frio entre as superfícies.

**Por que importa.** É um dos modos de falha mais **evitáveis e mais baratos de prevenir** — a correção é essencialmente auditoria de plano de manutenção, não intervenção física cara. E é traiçoeiro: excesso de graxa é tão perigoso quanto falta, o que torna "relubrificar por precaução, sem seguir a tabela do fabricante" uma prática contraproducente.

## Specialist

### Mecanismo — desgaste adesivo (ISO 15243 §5.2.3)

Quando a razão de filme $\lambda$ (ver [[rolamento]]) cai abaixo de ~1, as asperezas superficiais entram em contato direto. Sob a pressão de contato hertziana, microssoldas se formam instantaneamente entre as asperezas e se rompem no movimento seguinte, arrancando material de uma superfície e transferindo para a outra (*smearing*, *galling*). O resultado visual é uma superfície com aspecto "manchado"/embaçado, distinto do polimento fosco do desgaste abrasivo (que remove material por corte, não por transferência adesiva).

### As duas vias que levam à falta de filme

1. **Viscosidade insuficiente para a condição real** — o lubrificante certo no catálogo pode se tornar errado se a temperatura de operação subir (viscosidade cai exponencialmente com temperatura) ou a velocidade real divergir da prevista no projeto.
2. **Quantidade errada de graxa** — pouca graxa não preenche os espaços necessários para renovar o filme; **excesso** de graxa gera resistência ao movimento dos corpos rolantes, que por sua vez gera calor por atrito interno — o próprio excesso destrói a viscosidade local pelo aquecimento que ele mesmo causa (efeito conhecido como *churning*/batimento térmico).

### Framework A — diagnóstico

`Mixed/Complex`: quando o gatilho é uma perda súbita e completa (bomba de graxa travada, retentor rompido), o comportamento é próximo de **Random** — o dano evolui rápido e não há "idade característica"; quando é subengraxamento crônico e progressivo (intervalo longo demais, viscosidade marginal), o desgaste acumula de forma mais previsível, com **β>1**. A IT-MNT-001 trata isso como um espectro, não uma categoria única — a leitura correta depende de auditar a causa antes de assumir o padrão.

### Framework B — prescrição

**CBM**, com duas camadas complementares: a auditoria documental do plano de relubrificação ataca a **causa raiz** (evita que o problema comece), enquanto termografia/vibração de banda ampla monitora a **condição** (detecta lubrificação marginal já instalada, antes de progredir para desgaste visível). Note que esta é uma das poucas tarefas de manutenção que **não exige sensor especializado** — comparar o plano contra o catálogo do fabricante é auditoria de engenharia, não medição de campo.

## Engineer

### $\kappa$, $\lambda$ e a janela operacional segura

A razão de viscosidade $\kappa$ (viscosidade real na temperatura de operação ÷ viscosidade mínima requerida pela geometria/velocidade) é o parâmetro de projeto que a Especialidade de Confiabilidade deveria auditar sempre que a condição de operação mudar — troca de carga, aumento de rotação (via VFD), ou operação em ambiente mais quente que o projeto original assumia. $\kappa < 1$ já indica risco significativo de desgaste adesivo mesmo com a quantidade de graxa correta, porque o problema não é *quanto* lubrificante existe, mas se ele tem viscosidade suficiente na temperatura real para formar o filme EHL.

### Por que graxa em excesso aquece mais que graxa em falta, num primeiro momento

O batimento térmico (*churning*) ocorre porque o excesso de graxa nos vãos entre os componentes móveis precisa ser continuamente cisalhado a cada rotação — esse trabalho de cisalhamento se converte em calor, que por sua vez reduz a viscosidade efetiva da graxa remanescente, criando um ciclo que pode levar a temperaturas de operação bem acima do projetado antes que qualquer sintoma de "falta" de lubrificante apareça. É o motivo pelo qual a quantidade de reengraxamento é sempre uma fração do volume da cavidade livre (tipicamente 1/3 a 1/2), nunca o preenchimento total.

### Relação com outros modos de falha

Um filme marginal ($\lambda$ baixo) sem ainda ter cruzado para desgaste adesivo visível já acelera a nucleação da [[fadiga-subsuperficial-rolamento|fadiga de contato]] — a fronteira entre "lubrificação marginal que acelera fadiga" e "desgaste adesivo pleno" é uma questão de grau, não de mecanismo distinto, e a autópsia às vezes encontra os dois padrões coexistindo na mesma pista.
