---
slug: montagem-incorreta-rolamento
tipo_nota: modo_falha
locale: pt
titulo: 'Montagem Incorreta (Mortalidade Infantil)'
status: published
taxonomia:
  - rolamento
iso14224_code: 'BE-MONT'
fontes:
  - 'ISO 15243:2017 — §5.5.2 (deformação plástica por sobrecarga) e §5.6.2 (fratura forçada)'
  - 'SKF Evolution — Bearing damage analysis with ISO 15243'
  - 'Harris & Kotzalas — Rolling Bearing Analysis, 5ª ed., cap. 21 (montagem e ajustes)'
  - 'Nowlan & Heap (1978) — padrões de mortalidade infantil (curva da banheira)'
  - 'Moubray, RCM II (1997), cap. 3 — 6 padrões de falha'
  - 'SKF — Mounting and dismounting of rolling bearings (guia técnico oficial)'
fw_a:
  categoria: infant
  beta: '<1 (mortalidade infantil clássica — Nowlan & Heap padrão B/F)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Monitoramento intensivo nos primeiros 30 dias pós-comissionamento/troca (regra da banheira); inspeção de montagem no procedimento de instalação'
pf_tipico: 'horas a poucas semanas — o mais curto do componente; muitas falhas de montagem se manifestam já nos primeiros ciclos de operação'
plano_manutencao:
  - tarefa: 'Auditar o procedimento de montagem contra o guia do fabricante'
    metodo: 'Checklist de instalação: método de aquecimento, ferramentas usadas, ajuste de interferência, verificação de folga interna residual'
    periodicidade: 'Em toda troca de rolamento, antes do start-up'
    condicao: 'Durante a instalação, antes de recolocar em operação'
    criterio: 'Aquecimento por indução (nunca chama direta ou martelo direto no anel); prensagem apenas pelo anel que recebe o ajuste; folga residual dentro da faixa do fabricante'
    acao: 'Método incorreto identificado (martelo, chama direta, prensagem pelo anel errado) → considerar o rolamento suspeito e reavaliar substituição antes do start-up'
    especialidade: 'Mecânica / montagem de precisão'
    duracao: '0,5 h por rolamento montado'
    passos:
      - 'Confirmar temperatura de aquecimento por indução dentro da faixa recomendada (tipicamente 80–100 °C, nunca chama direta)'
      - 'Verificar que a força de prensagem foi aplicada apenas ao anel com ajuste de interferência (nunca transmitida pelos corpos rolantes)'
      - 'Medir folga interna residual pós-montagem e comparar com a especificação'
      - 'Registrar o procedimento seguido e qualquer desvio'
    registros:
      - 'Temperatura de aquecimento aplicada [°C]'
      - 'Folga interna residual medida [μm]'
      - 'Método de prensagem utilizado'
  - tarefa: 'Monitoramento intensivo de vibração nos primeiros 30 dias pós-comissionamento'
    metodo: 'Rota de vibração em frequência elevada (semanal em vez de mensal) durante o período de amaciamento'
    periodicidade: 'Semanal nos primeiros 30 dias; retorna à rota normal (mensal) depois, se sem anomalia'
    condicao: 'Em operação, desde a primeira semana pós-start-up'
    criterio: 'Ausência de BPFx ou ruído anormal já nas primeiras semanas — mortalidade infantil se manifesta cedo, não como fadiga tardia'
    acao: 'Qualquer anomalia na janela de 30 dias → tratar como suspeita forte de defeito de montagem, não de fadiga natural; considerar reabertura e inspeção'
    especialidade: 'Preditiva / comissionamento'
    duracao: '0,5 h por rota semanal'
    passos:
      - 'Aplicar a mesma rota de vibração da rotina normal, mas em frequência semanal'
      - 'Comparar cada coleta com a anterior, atento a qualquer sinal novo (não só ao baseline absoluto)'
      - 'Se 30 dias sem anomalia, retornar à periodicidade padrão do plano'
    registros:
      - 'Amplitude de vibração — semana 1 a 4 [mm/s]'
tags:
  - mortalidade infantil
  - montagem
  - ajuste de interferência
  - comissionamento
  - curva da banheira
revisado_em: 2026-07-18
---

## Beginner

**O que é.** Diferente dos outros modos de falha do [[rolamento]], que se desenvolvem ao longo do tempo em operação, este acontece **no momento da instalação** — e a falha subsequente aparece cedo, às vezes em horas ou dias de operação. As causas clássicas: aquecimento com chama direta em vez de indução (distorce a metalurgia do anel), martelada direta no anel externo ou interno em vez de prensagem controlada (deixa indentações ou trincas microscópicas), ajuste de interferência errado para o eixo/alojamento (aperto excessivo pré-carrega o rolamento além do projetado; aperto insuficiente permite movimento relativo e desgaste do assento), ou transmissão da força de montagem pelos **corpos rolantes** em vez de pelo anel correto — o erro mais comum e mais destrutivo, porque marca a pista com indentações no exato espaçamento dos corpos rolantes antes mesmo da primeira rotação.

**Como reconhece em campo.** É o modo de falha com o **P-F mais curto** do componente — muitas vezes horas a semanas, não meses. Se um rolamento recém-instalado apresenta vibração ou ruído anormal já nos primeiros dias de operação, montagem incorreta deve ser a primeira suspeita, não fadiga natural (que levaria muito mais tempo para se manifestar).

**Por que importa.** É o exemplo mais claro de mortalidade infantil (a "banheira" clássica da confiabilidade: taxa de falha alta logo no início, caindo depois) — e é inteiramente evitável com procedimento correto. Boa parte do custo de garantia e retrabalho em rolamentos novos vem daqui, não de defeito de fabricação.

## Specialist

### Mecanismo — como o erro de montagem vira dano físico

**Aquecimento incorreto:** o método padrão é indução controlada (80–100 °C tipicamente), que expande o anel interno o suficiente para deslizar sobre o eixo sem força. Chama direta aquece de forma desigual, pode ultrapassar a temperatura de revenimento do aço e alterar a dureza/microestrutura da pista — um dano metalúrgico permanente que reduz a resistência à fadiga antes mesmo do primeiro giro.

**Martelamento direto:** aplicar força de impacto diretamente no anel (em vez de usar um manguito de montagem que distribui a carga) frequentemente transmite parte da força **através dos corpos rolantes**, produzindo micro-indentações na pista no espaçamento exato das esferas/rolos — a assinatura clássica de **deformação plástica por sobrecarga** (ISO 15243 §5.5.2), que depois se torna sítio de nucleação de fadiga precoce.

**Ajuste de interferência incorreto:** cada designação de rolamento tem uma faixa de ajuste (eixo e alojamento) especificada pelo fabricante em função da carga e do tipo de rotação (anel girante vs. estacionário). Ajuste excessivo reduz a folga interna operacional abaixo do necessário, pré-carregando o rolamento e elevando a tensão de contato hertziana continuamente — uma forma de sobrecarga crônica e silenciosa que acelera qualquer um dos outros modos de falha do componente. Ajuste insuficiente permite micromovimento relativo entre anel e assento — o mesmo mecanismo de fretting discutido em [[falso-brinelamento-rolamento|falso brinelamento]], mas no assento em vez da pista.

### Framework A — diagnóstico

`Infant`, com **β < 1** — a assinatura clássica de Nowlan & Heap para defeitos introduzidos na instalação: taxa de falha decrescente com o tempo, concentrada nas primeiras semanas de operação. É um dos padrões que a RCM clássica documentou já nos anos 1960–70 (curva da banheira) e que continua sendo a explicação mais comum para "rolamento novo que falhou rápido".

### Framework B — prescrição

A prescrição correta para mortalidade infantil **não é troca por tempo** (o problema já está lá, uma nova troca só reintroduz o mesmo risco se o procedimento não mudar) — é **qualidade do processo de montagem** (a tarefa de auditoria de procedimento, que ataca a causa) combinada com **monitoramento intensivo na janela de risco** (as primeiras semanas), quando um defeito de montagem, se existir, vai se manifestar. Passado esse período sem anomalia, o risco específico deste modo de falha cai a praticamente zero — e o rolamento passa a ser governado pelos outros modos (fadiga, contaminação, lubrificação) com seus próprios P-F muito mais longos.

## Engineer

### A física do ajuste de interferência e a folga residual

O ajuste de interferência entre o anel e o eixo/alojamento existe para eliminar qualquer folga que permitiria micromovimento relativo sob carga (fretting no assento) — mas o ajuste reduz a **folga interna radial** do próprio rolamento (o espaço de projeto entre corpos rolantes e pistas) proporcionalmente à magnitude do aperto. O fabricante especifica a folga interna original (antes da montagem) exatamente para compensar essa redução — de forma que a **folga residual pós-montagem** fique dentro da faixa operacional projetada. Medir a folga residual (por exemplo, com relógio comparador antes e depois da montagem) é a única forma direta de confirmar que o ajuste aplicado está correto — a temperatura de aquecimento e o método de prensagem são procedimentos corretos *na prática*, mas a folga residual é a **prova numérica** de que o resultado ficou dentro da especificação.

### Por que "parece ter funcionado" não é evidência suficiente

Um rolamento montado incorretamente frequentemente gira normalmente por horas ou até dias sem sintoma perceptível — o dano de indentação ou o encruamento por sobreaquecimento não geram vibração detectável imediatamente; eles reduzem a **vida útil esperada**, não a funcionalidade imediata. É por isso que a auditoria de procedimento (checklist no momento da montagem) tem mais valor que qualquer inspeção posterior: no momento em que a vibração aparece, o dano já está feito — o P-F deste modo é curto o suficiente para que a "detecção precoce" real seja, na prática, prevenção no próprio ato de montar.

### Interseção com os outros 4 modos do componente

Montagem incorreta é o único modo de falha do rolamento cuja prevenção é **inteiramente processual** — não depende de sensor, análise de óleo ou monitoramento contínuo, depende de disciplina de procedimento no momento zero. Todos os outros 4 modos ([[fadiga-subsuperficial-rolamento|fadiga]], [[contaminacao-lubrificante-rolamento|contaminação]], [[falha-lubrificacao-rolamento|lubrificação]], [[falso-brinelamento-rolamento|falso brinelamento]]) podem, em maior ou menor grau, ser acelerados por uma montagem malfeita que deixou o rolamento pré-carregado, desalinhado ou com dano latente — fazendo da auditoria de montagem, na prática, uma defesa indireta contra os outros quatro também.
