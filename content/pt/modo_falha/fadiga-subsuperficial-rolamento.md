---
slug: fadiga-subsuperficial-rolamento
tipo_nota: modo_falha
locale: pt
titulo: 'Fadiga de Contato (Spalling)'
status: published
taxonomia:
  - rolamento
iso14224_code: 'BE-FAT'
fontes:
  - 'ISO 15243:2017 — Rolling bearings: damage and failures — terms, characteristics and causes, §5.1'
  - 'ISO 281:2007 — Rolling bearings: dynamic load ratings and rating life'
  - 'SKF Evolution — Bearing damage analysis with ISO 15243'
  - 'Harris & Kotzalas — Rolling Bearing Analysis, 5ª ed., cap. 24 (fadiga de contato)'
  - 'Lundberg & Palmgren (1947) — Dynamic Capacity of Rolling Bearings, Acta Polytechnica'
  - 'Machine Design — The Meaning of Bearing Life (L10 vs MTBF)'
  - 'Tallian — Failure Atlas for Hertz Contact Machine Elements, 2ª ed. (1999, ASME Press)'
  - 'Moubray, RCM II (1997), cap. 7 — tarefas preditivas e intervalo P-F'
fw_a:
  categoria: wear_out
  beta: '1,1–1,5 (fadiga clássica de contato hertziano)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'P-F/2 (rota mensal; contínuo em ativos críticos)'
pf_tipico: 'semanas a poucos meses entre o primeiro sinal em envelope/BPFx e a falha funcional — Tallian, Failure Atlas'
plano_manutencao:
  - tarefa: 'Monitorar espectro/envelope de vibração nas frequências de defeito (BPFO/BPFI/BSF)'
    metodo: 'Envelope (demodulação de alta frequência) + espectro convencional; comparar amplitude e nº de harmônicos contra o baseline da máquina sã'
    periodicidade: 'Mensal (P-F/2); contínuo em ativos críticos'
    condicao: 'Em operação, carga e velocidade estáveis — registrar RPM real (não nominal) para calcular as frequências corretas'
    criterio: 'Ausência de BPFO/BPFI/BSF acima do baseline; sem crescimento de harmônicos e bandas laterais mês a mês'
    acao: 'BPFx emergente → aumentar a frequência da rota e iniciar planejamento de troca; harmônicos múltiplos + bandas laterais → estágio avançado, priorizar substituição na próxima parada'
    especialidade: 'Preditiva / análise de vibração'
    duracao: '0,5 h por ponto'
    passos:
      - 'Confirmar RPM real de operação (tacômetro ou referência de processo) para calcular BPFO/BPFI/BSF/FTF corretos para a designação do rolamento'
      - 'Coletar espectro convencional e envelope nos mesmos pontos/direções do baseline'
      - 'Identificar presença e amplitude das frequências de defeito e seus harmônicos'
      - 'Comparar com a coleta anterior — atenção à progressão (estágio 2→3→4), não só ao valor absoluto'
      - 'Registrar no CMMS e atualizar a tendência; se estágio 3+ (harmônicos e bandas laterais), abrir plano de substituição'
    registros:
      - 'Amplitude BPFO/BPFI/BSF [g ou gE]'
      - 'Nº de harmônicos detectados'
      - 'RPM real medido [rpm]'
  - tarefa: 'Verificar tendência de temperatura da carcaça/mancal'
    metodo: 'Termografia pontual ou sensor fixo; comparar com histórico em condição de carga equivalente'
    periodicidade: 'Junto à rota de vibração'
    condicao: 'Em operação, carga estável há pelo menos 30 min'
    criterio: 'Temperatura estável dentro de ±5 °C do baseline na mesma condição de carga'
    acao: 'Elevação sustentada sem explicação de processo → correlacionar com vibração; suspeita reforçada de estágio avançado'
    especialidade: 'Preditiva / termografia'
    duracao: '0,1 h'
    passos:
      - 'Medir temperatura no mesmo ponto de referência do baseline'
      - 'Confirmar que a carga/processo está na condição comparável ao histórico'
      - 'Registrar e comparar a tendência'
    registros:
      - 'Temperatura da carcaça [°C]'
tags:
  - ISO 15243
  - spalling
  - fadiga hertziana
  - BPFO
  - BPFI
  - Weibull
revisado_em: 2026-07-18
---

## Beginner

**O que é.** Todo [[rolamento]] converte deslizamento em rolamento — mas o preço dessa eficiência é que a carga inteira passa por áreas de contato do tamanho de uma unha, gerando pressões de compressão gigantescas (1,5 a 3+ GPa) bem acima do limite de escoamento do aço comum. O material só sobrevive porque a tensão é compressiva, confinada e **cíclica** — cada volta é mais um ciclo de tensão embaixo da superfície. Depois de milhões a bilhões desses ciclos, microtrincas nascem sob a superfície (em inclusões microscópicas do aço), crescem devagar e um dia alcançam a superfície: um pedaço de metal se solta, deixando uma cratera — o **spall**. É a morte natural por desgaste do rolamento, e o motivo pelo qual nenhum rolamento dura "para sempre".

**Como reconhecer em campo.** Vibração crescente em frequências específicas (as chamadas BPFO/BPFI/BSF — cada uma associada a uma parte diferente do rolamento), ruído metálico rítmico que piora com o tempo, e — em estágio avançado — temperatura elevada e ruído audível. A boa notícia: esse processo é **lento e progressivo**, com semanas a meses de aviso antes da falha funcional — dá tempo de planejar a troca em vez de parar a máquina de surpresa.

**O que custa não tratar.** Um rolamento que solta um spall grande pode travar, gerar calor extremo e danificar o eixo e a carcaça ao redor — de um defeito de manutenção previsível vira uma parada não planejada cara. A estratégia certa aqui não é trocar por tempo fixo (a vida real varia muito de rolamento para rolamento, mesmo idênticos) — é **monitorar a condição** e trocar quando o sinal aparecer.

## Specialist

### O que distingue este modo de falha dos outros do componente

A fadiga de contato é o **único** dos 6 modos ISO 15243 que é puramente mecânico-estatístico — não depende de contaminação, química ou erro de montagem para ocorrer (embora todos esses fatores possam *acelerá-la* via [[contaminacao-lubrificante-rolamento|contaminação]] ou [[falha-lubrificacao-rolamento|perda de filme]]). Um rolamento perfeitamente lubrificado, limpo e bem montado ainda assim vai falhar por fadiga um dia — é a diferença entre a vida **nominal** (L10, ver [[rolamento]]) e a vida **modificada** por fatores externos.

**Subsuperficial × superficial (ISO 15243 §5.1.2/§5.1.3):** a subcategoria clássica nucleia **abaixo** da pista, em inclusões não-metálicas onde a tensão de cisalhamento ortogonal é máxima (a ~0,5× a profundidade do raio de contato); a fadiga superficial nucleia **na própria superfície**, quase sempre por lubrificação marginal ($\lambda < 1$) que expõe a superfície ao contato metal-metal — nesse caso a fadiga é sintoma de um problema de filme, não de fadiga "pura". Distinguir as duas na autópsia importa: subsuperficial recorrente aponta para sobrecarga/vida de projeto subdimensionada; superficial recorrente aponta para lubrificação.

### Framework A — diagnóstico

`Wear-out` clássico, **β ≈ 1,1–1,5** (Lundberg & Palmgren; confirmado por décadas de dados de campo compilados por Tallian). É um dos poucos modos de falha realmente adequado à leitura clássica de Weibull do RCM — mas mesmo assim **não** justifica troca por tempo fixo (Fw B abaixo), porque a dispersão é grande (vida mediana ≈5× L10) e a condição é monitorável com boa antecedência.

### Framework B — prescrição

**CBM com periodicidade P-F/2.** O P-F deste modo é um dos mais bem documentados da confiabilidade industrial: estágio 1 (ultrassom/emissão acústica, semanas a meses antes) → estágio 2 (envelope com BPFx, o ponto de disparo desta rota) → estágio 3 (espectro convencional com harmônicos e bandas laterais) → estágio 4 (ruído audível e temperatura, dias antes do fim). A tarefa de maior valor é o **envelope/demodulação** — sensível ao impacto de baixa energia do spall nascente muito antes de aparecer no espectro convencional.

## Engineer

### A mecânica de Lundberg-Palmgren

A teoria clássica (1947), base da ISO 281, modela a vida à fadiga como uma função da tensão de cisalhamento ortogonal máxima $\tau_0$ abaixo da superfície e do volume de material tensionado $V$:

$$L \propto \left(\frac{1}{\tau_0}\right)^{c} \cdot \frac{1}{V^{e}}$$

com expoentes empíricos ($c \approx 9$, $e \approx 2{,}3$ nas formulações clássicas) que tornam a vida **extremamente sensível** à tensão de contato — pequenos aumentos de carga (que elevam $\tau_0$) produzem quedas desproporcionais de vida, a mesma raiz física por trás da sensibilidade cúbica de $L_{10} = (C/P)^p$ discutida em [[rolamento]].

### Por que β ≈ 1,1–1,5 e não maior

A dispersão de Weibull relativamente baixa (comparada a modos de falha aleatórios com β≈1) reflete a natureza estatística da distribuição de inclusões no material — cada rolamento de um mesmo lote tem uma população diferente de defeitos microscópicos que iniciam a trinca, e o processo de nucleação+propagação tem uma componente de aleatoriedade genuína mesmo sob carga idêntica. Isso é distinto de modos de falha com gatilho puramente externo (ex.: [[falso-brinelamento-rolamento|falso brinelamento]], onde o evento decisivo é a vibração de transporte, não a fadiga intrínseca do material).

### Leitura prática do P-F para dimensionar a rota

Sabendo que o estágio de envelope precede o espectro convencional por semanas, uma rota de vibração convencional mensal só captura a falha em estágio 2–3 — ainda com folga, mas menor que a de uma rota com envelope dedicado. Ativos críticos com P-F documentado curto (por severidade de carga ou histórico de recorrência) justificam migração para monitoramento contínuo, seguindo a mesma lógica de escala aplicada em [[cavitacao|cavitação]].
