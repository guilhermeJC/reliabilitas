---
slug: rolamento
tipo_nota: componente
locale: pt
titulo: 'Rolamento'
status: published
taxonomia: []
iso14224_code: 'BE'
resumo: 'Elemento de contato rolante que suporta cargas radiais e axiais com atrito mínimo. Componente transversal (D10): a mesma física — contato hertziano, lubrificação EHL, vida L10 — governa sua falha em bombas, motores e redutores.'
fontes:
  - 'ISO 281:2007 — Rolling bearings: dynamic load ratings and rating life'
  - 'ISO 15243:2017 — Rolling bearings: damage and failures — terms, characteristics and causes'
  - 'SKF — Bearing damage analysis with ISO 15243 (Evolution Magazine)'
  - 'Harris & Kotzalas — Rolling Bearing Analysis, 5ª ed.'
  - 'Machine Design — The Meaning of Bearing Life (L10 vs MTBF)'
  - 'ABMA 9/11 — Load ratings and fatigue life (equivalente americano)'
  - 'ISO 492:2014 / ABMA Std 20 — Rolling bearings: tolerance classes (ABEC 1/3/5/7/9)'
  - 'SKF — General Catalogue (classificação por tipo, blindagem/vedação e material)'
tags:
  - L10
  - ISO 15243
  - lubrificação
  - BPFO
  - fadiga de contato
revisado_em: 2026-07-06
---

## Função e física do contato

O rolamento substitui o deslizamento pelo **rolamento de corpos** (esferas ou rolos) entre anéis, reduzindo o coeficiente de atrito em ~2 ordens de grandeza frente ao mancal de deslizamento seco. O preço dessa eficiência é uma condição de trabalho extrema e invisível: toda a carga passa por áreas de contato de **frações de milímetro** — o **contato hertziano** — onde as tensões de compressão atingem **1,5 a 3+ GPa**, superando em uma ordem de grandeza o limite de escoamento do aço comum. O material só sobrevive porque a tensão é compressiva, confinada e cíclica — e é exatamente esse ciclo que define o modo de morte natural do componente: **fadiga de contato**.

Entre os corpos rolantes e as pistas existe (ou deveria existir) um filme de lubrificante de **0,1 a 1 μm** em regime **elastohidrodinâmico (EHL)**: a pressão local é tão alta que o óleo se comporta momentaneamente como sólido e as superfícies se deformam elasticamente. A razão de filme $\lambda$ (espessura do filme ÷ rugosidade composta) é o preditor mestre de vida: $\lambda > 3$ = superfícies separadas, vida plena; $\lambda < 1$ = contato metal-metal e desgaste adesivo/fadiga superficial acelerada.

## Tipos e diferenças

O termo "rolamento" cobre uma família ampla de geometrias, cada uma otimizada para uma combinação diferente de direção de carga, velocidade, desalinhamento tolerável e espaço disponível. Escolher o tipo errado — não o modo de falha errado — é uma causa raiz silenciosa de vida curta que nenhuma rota de manutenção detecta, porque o rolamento "falha" exatamente como o catálogo prevê para uma aplicação fora do seu envelope de projeto.

### Por direção de carga

- **Radiais**: projetados primariamente para carga perpendicular ao eixo (a maioria dos rolamentos industriais).
- **De encosto (thrust/axiais)**: projetados primariamente para carga paralela ao eixo — pistas planas ou levemente inclinadas, velocidade de operação tipicamente mais baixa que um radial equivalente.
- **Combinados**: capazes de suportar radial e axial simultaneamente em proporções variáveis, conforme o tipo (ver tabela abaixo).

### Por elemento rolante — esferas × rolos

| | Esferas | Rolos |
| --- | --- | --- |
| Contato geométrico | Pontual (Hertz esférico) | Linear (Hertz cilíndrico/cônico) |
| Capacidade de carga p/ mesmo tamanho | Menor | Maior — área de contato maior distribui a tensão |
| Velocidade limite | Maior (menos atrito de rolamento) | Menor |
| Rigidez | Menor | Maior — vantagem em posicionamento de precisão (fusos, eixos-árvore) |
| Sensibilidade a desalinhamento | Maior nos tipos rígidos | Variável — cilíndricos são sensíveis, esféricos/autocompensadores não |

### Subtipos de esferas

- **Rígido de esferas (Conrad/*deep groove*)**: o mais comum de todos — pistas profundas permitem carga radial e axial moderada **em ambas as direções** no mesmo rolamento, sem montagem em pares. Bom compromisso de velocidade, carga e custo; não tolera desalinhamento angular além de frações de grau.
- **Contato angular**: pistas deslocadas produzem um ângulo de contato (tipicamente 15°–40°) que permite carga axial **numa única direção** por rolamento, junto com radial — quanto maior o ângulo, maior a capacidade axial e menor a de velocidade pura. Usados **sempre em pares ou conjuntos** (*back-to-back*, *face-to-face* ou *tandem*) para cobrir as duas direções axiais ou multiplicar a capacidade — a configuração do par é, ela mesma, uma decisão de rigidez e capacidade de momento.
- **Autocompensador de esferas**: duas carreiras de esferas com pista externa **esférica**, permitindo ao rolamento inteiro "balançar" e absorver desalinhamento angular do eixo (tipicamente 1,5°–3°) sem transmitir momento fletor — ao custo de menor capacidade de carga que um rígido de mesmo tamanho.
- **De encosto (*thrust*) de esferas**: carga axial pura, velocidade baixa — pistas planas em faces opostas, corpos de esfera entre elas.

### Subtipos de rolos

- **Cilíndricos**: rolos retos em contato linear com as pistas — altíssima capacidade radial e velocidade, mas capacidade axial nula ou mínima conforme a configuração de anel (**NU**: sem capacidade axial, permite flutuação axial livre — usado como "rolamento livre" num eixo com outro rolamento fixo; **NJ**/**NUP**: capacidade axial limitada numa ou duas direções via ressaltos usinados). Sensível a desalinhamento angular — a linha de contato concentra tensão numa borda se o eixo entortar.
- **Cônicos**: rolos e pistas em forma de tronco de cone — suportam radial **e** axial elevados simultaneamente, mas geram uma componente de empuxo interna que **exige montagem em pares opostos com folga/pré-carga ajustada** (nunca um sozinho, salvo em combinação com outro rolamento que absorva o empuxo). Onipresentes em cubos automotivos e reduções de engrenagens cônicas/helicoidais.
- **Autocompensadores (esféricos)**: duas carreiras de rolos em barril com pista externa esférica comum — combinam altíssima capacidade radial com capacidade axial moderada **e** tolerância a desalinhamento (tipicamente 1°–2,5°), a escolha clássica para aplicações industriais pesadas e sujeitas a deflexão de estrutura (britadores, peneiras vibratórias, moinhos, ventiladores de grande porte).
- **De agulha**: rolos longos e finos (razão comprimento/diâmetro alta) permitem altíssima capacidade radial num envelope **radial mínimo** — frequentemente sem anel interno próprio, rolando direto sobre o eixo endurecido. Capacidade axial praticamente nula; alta sensibilidade a desalinhamento.
- **De encosto (cilíndrico/cônico/esférico)**: equivalentes axiais dos rolos radiais, para cargas de empuxo pesadas onde um *thrust* de esferas não bastaria.

### Grau de proteção — a primeira linha de defesa contra [[contaminacao-lubrificante-rolamento|contaminação]]

- **Aberto**: sem proteção própria — depende inteiramente da vedação externa da aplicação (carcaça, retentor). Mais barato, mais fácil de relubrificar, mas exige que o projeto do conjunto faça todo o trabalho de manter partículas fora.
- **Blindado (Z/ZZ)**: escudo metálico fixo de um ou ambos os lados, **sem contato** com o anel interno — mantém graxa e sólidos maiores fora sem gerar atrito adicional, permitindo velocidades mais altas que um selado. Proteção parcial: uma folga residual sempre existe entre o escudo e o anel.
- **Vedado (RS/2RS)**: lábio de vedação (elastômero) com ou sem contato real no anel interno — proteção superior contra partículas finas e umidade, ao custo de atrito adicional (limite de velocidade menor) e da necessidade de trocar o rolamento inteiro em vez de só relubrificar (a graxa é selada de fábrica).

### Material — para além do aço-cromo padrão

- **Inox**: resistência à corrosão em ambientes úmidos/químicos, ao custo de capacidade de carga dinâmica tipicamente menor que o aço-cromo de mesma geometria.
- **Híbrido cerâmico**: esferas de nitreto de silício (Si₃N₄) em anéis de aço convencional — mais leves (menor força centrífuga em alta velocidade), mais duros (maior resistência a indentação por partículas), e **eletricamente isolantes**: a cerâmica não conduz corrente, eliminando o caminho para a **erosão elétrica/*fluting*** que aflige rolamentos convencionais sob acionamento por VFD (ver tabela ISO 15243 acima) — o principal motivo de adoção em motores modernos de alta velocidade/frequência variável, não apenas desempenho mecânico.
- **Cerâmica integral**: esferas e pistas em cerâmica — nicho de altíssima velocidade/temperatura/ambiente corrosivo extremo, custo elevado.

### Classes de precisão

Tolerâncias dimensionais e de rotação (*runout*) são normatizadas em classes — **ABEC 1/3/5/7/9** (ABMA, padrão americano) correspondem aproximadamente às classes **ISO Normal/P6/P5/P4/P2**, em ordem crescente de precisão. Rolamentos de precisão (ABEC 7/9 ou ISO P4/P2) justificam-se em fusos de máquina-ferramenta e eixos-árvore de alta rotação, onde o próprio *runout* do rolamento limita a precisão final da máquina — não em aplicações industriais gerais, onde a classe Normal já atende com folga e custa uma fração do preço.

## Vida nominal — L10 e a ponte com Weibull

A vida à fadiga é intrinsecamente estatística. A norma ISO 281 define a **vida nominal L10**: o número de revoluções que **90% de uma população** de rolamentos idênticos atinge ou supera:

$$L_{10} = \left(\frac{C}{P}\right)^p \quad \text{[milhões de revoluções]}$$

com $C$ = capacidade de carga dinâmica (catálogo), $P$ = carga dinâmica equivalente e $p = 3$ para esferas, $10/3$ para rolos. Em horas:

$$L_{10h} = \frac{10^6}{60\,n} \left(\frac{C}{P}\right)^p$$

Três leituras de engenharia que a fórmula esconde:

- **A sensibilidade cúbica à carga**: 25% de sobrecarga corta a vida pela metade. Desalinhamento, desbalanceamento e operação fora do BEP são multiplicadores silenciosos de $P$.
- **L10 não é MTBF**: a vida mediana é ~5× L10; a distribuição é Weibull com **β ≈ 1,1–1,5** para fadiga genuína — dispersão enorme, prevendo falhas precoces em parte da população mesmo em projeto correto. Por isso rolamento é candidato natural a CBM, nunca a troca por tempo.
- **Vida modificada** $L_{nm} = a_1 \, a_{ISO} \, L_{10}$ (ISO 281): o fator $a_{ISO}$ incorpora lubrificação ($\lambda$), contaminação e o limite de fadiga — pode mover a vida em 1–2 ordens de grandeza para cima ou para baixo. Contaminação e lubrificação **são** o projeto.

## Modos de falha — as 6 categorias da ISO 15243

A ISO 15243:2017 classifica todo dano de rolamento em **6 categorias com subcategorias**, cada uma com assinatura morfológica própria — um espelho quase perfeito do nosso Framework A. A norma classifica pela **aparência observada**, não pela causa raiz isolada, porque na prática vários mecanismos costumam agir simultaneamente:

| Categoria ISO 15243 | Subcategoria | Aparência | Leitura Fw A típica |
| --- | --- | --- | --- |
| **Fadiga de contato** (§5.1) | Subsuperficial (§5.1.2) | Microtrincas abaixo da superfície, em inclusões, propagam até virar *spall* | Wear-out (β>1) — ver [[fadiga-subsuperficial-rolamento|nota própria]] |
| | Superficial (§5.1.3) | Microspalling que se origina na própria superfície | Wear-out, acelerado por $\lambda$ baixo |
| **Desgaste** (§5.2) | Abrasivo (§5.2.2) | Aspecto fosco, remoção progressiva de material | Mixed — ver [[contaminacao-lubrificante-rolamento|contaminação]] |
| | Adesivo (§5.2.3) | *Smearing* (escoriação, *galling*), transferência de material entre superfícies | Mixed/Random — ver [[falha-lubrificacao-rolamento|falha de lubrificação]] |
| **Corrosão** (§5.3) | Por umidade (§5.3.2) | Deterioração na região de passo dos corpos rolantes, tipicamente parado | Random |
| | *Fretting* (§5.3.3.2) | Óxido avermelhado/enegrecido na interface, por micromovimento e ajuste incorreto | Random/Wear-out |
| | Falso brinelamento (§5.3.3.3) | Marcas de desgaste no passo dos corpos rolantes + óxido — ver [[falso-brinelamento-rolamento|nota própria]] | Random |
| **Erosão elétrica** (§5.4) | Corrente excessiva (§5.4.2) | Áreas descoloridas/fundidas, crateras por ciclos térmicos (raio, solda mal aterrada) | Random (evento) |
| | Corrente de fuga (§5.4.3) | Crateras pequenas e próximas, padrão "washboard" cinza — epidêmico em VFD sem aterramento de eixo | Mixed (gatilho elétrico contínuo) |
| **Deformação plástica** (§5.5) | Sobrecarga (§5.5.2) | Indentação nas pistas, entalhes nos corpos, dano em gaiola/vedação | Random (evento) — ver [[montagem-incorreta-rolamento|montagem incorreta]] |
| | Partículas (§5.5.3) | Marcas de indentação por debris sobrerolado | Mixed |
| **Trinca e fratura** (§5.6) | Forçada (§5.6.2) | Separação completa do anel/componente | Random/Infant |
| | Por fadiga (§5.6.3) | Trinca propagante através do anel ou gaiola | Wear-out |
| | Térmica (§5.6.4) | Trincas perpendiculares à direção do deslizamento | Random (evento de atrito) |

A leitura prática: **spalling é o fim da história, não o começo** — na maioria dos casos reais, o iniciador foi lubrificação, contaminação ou montagem. Dados de campo consolidados pela SKF (Evolution) situam o **desgaste abrasivo em torno de 26%**, a **fadiga superficial em ~16%** e a **corrosão por umidade em ~14%** das ocorrências documentadas — as três somadas cobrem quase metade dos casos e apontam direto para contaminação/lubrificação como a alavanca dominante de confiabilidade do componente, não a metalurgia. Diagnóstico de causa raiz exige ler a **morfologia** do dano (ISO 15243), não apenas constatar o spall — daí as 5 notas de modo de falha abaixo, cada uma tratando o mecanismo, o Fw A/B e o plano de manutenção de uma categoria específica.

## Contaminação, lubrificação e o fator $a_{ISO}$

A vida nominal $L_{10}$ pressupõe lubrificação ideal e ausência de partículas — a realidade de campo raramente entrega isso, e é exatamente esse desvio que a **vida modificada** (ISO 281:2007) tenta capturar:

$$L_{nm} = a_1 \, a_{ISO} \, L_{10}$$

O fator $a_{ISO}$ combina três entradas: a **razão de viscosidade** $\kappa$ (viscosidade real do óleo na temperatura de operação ÷ viscosidade de referência requerida pela geometria — o preditor direto de $\lambda$), o **limite de fadiga** $C_u$ do material do rolamento, e o **fator de contaminação** $e_C$ (classe de limpeza ISO 4406, tipo de lubrificação — graxa, banho, circulação — e tamanho do rolamento). Narrativa de engenharia: com $\kappa$ alto (filme espesso) e carga baixa, $a_{ISO}$ é pouco sensível à contaminação; com $\kappa$ baixo e carga próxima do limite, a mesma partícula que seria inofensiva em um sistema bem lubrificado corta a vida em 1–2 ordens de grandeza. Contaminação e lubrificação **não são cuidados acessórios** — são, junto com a carga, as três variáveis que realmente decidem se o rolamento chega perto do L10 de catálogo ou falha em uma fração dele.

## Exemplo numérico — sensibilidade da vida a sobrecarga

Rolamento rígido de esferas (p=3), $C = 25$ kN, operando a $n = 1.800$ rpm com carga equivalente $P = 5$ kN:

$$L_{10} = \left(\frac{25}{5}\right)^3 = 125 \text{ milhões de revoluções} \quad\Rightarrow\quad L_{10h} = \frac{10^6}{60 \times 1.800} \times 125 \approx 1.157 \text{ h}$$

Um desalinhamento ou desbalanceamento que eleve $P$ em 25% (para 6,25 kN) — sem qualquer outra mudança — derruba $L_{10}$ para $(25/6{,}25)^3 = 64$ milhões de revoluções: **a vida cai pela metade** só pela sensibilidade cúbica à carga. É a mesma conta, em sentido inverso, que justifica por que alinhamento e balanceamento de precisão são, na prática, tarefas de confiabilidade do rolamento — mesmo sem tocar no componente.

## Frequências de defeito — a assinatura na vibração

A geometria do rolamento produz frequências determinísticas quando um defeito toca os corpos rolantes — a base do diagnóstico por envelope/demodulação:

- **BPFO** (pista externa), **BPFI** (pista interna), **BSF** (corpo rolante), **FTF** (gaiola) — todas funções do número de esferas, diâmetros e ângulo de contato, tabeladas pelos fabricantes por designação.
- A progressão clássica do dano: ultrassom/emissão acústica (estágio 1) → envelope com BPFx (estágio 2) → espectro convencional com harmônicos e bandas laterais (estágio 3) → ruído audível e temperatura (estágio 4, dias antes do fim). Essa escada é o **intervalo P-F** concreto do componente — semanas a meses nos estágios iniciais.

## Seleção e boas práticas

- **Designações padronizadas** (ex.: 6205, 6309, 22220): intercambiáveis entre SKF, Schaeffler/FAG, NSK, Timken — os dados de $C$, $C_0$ e frequências de defeito vêm do catálogo do fabricante.
- **Montagem** responde por parcela relevante de mortalidade infantil: aquecimento por indução (nunca chama direta), prensagem pelo anel correto, ajustes de interferência conforme catálogo.
- **Lubrificação**: quantidade e relubrificação por catálogo; excesso de graxa é tão letal quanto falta (batimento térmico).
- Em acionamento por **VFD**: verificar aterramento/anel de descarga do eixo — o *fluting* elétrico é epidêmico em motores modernos.
