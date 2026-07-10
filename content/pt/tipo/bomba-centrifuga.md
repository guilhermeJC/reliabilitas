---
slug: bomba-centrifuga
tipo_nota: tipo
locale: pt
titulo: 'Bomba Centrífuga'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
iso14224_code: 'PU'
fontes:
  - 'Karassik et al., Pump Handbook, 4ª ed. (2008), caps. 2 e 12'
  - 'Gülich — Centrifugal Pumps, 3ª ed. (2014, Springer), caps. 3–7 e 11'
  - 'API 610, 12ª ed. — Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries'
  - 'ASME B73.1 — Horizontal End Suction Centrifugal Pumps for Chemical Process'
  - 'ISO 5199 / ISO 2858 — bombas centrífugas: requisitos e dimensões'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'ANSI/HI 9.6.3 — Operating Regions (POR/AOR)'
  - 'ANSI/HI 9.6.7 — Effects of Liquid Viscosity on Rotodynamic Pump Performance'
  - 'ISO 9906:2012 — Rotodynamic Pumps: Hydraulic Performance Acceptance Tests'
  - 'ISO 14224:2016 — taxonomia de equipamentos (classe PU, nível 6)'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, 4ª ed.'
  - 'Bloch — Pump User''s Handbook: Life Extension (benchmarks de MTBF)'
  - 'European Sealing Association — Mechanical Seal Reliability (2025): selos em 60,4% de 3.500 falhas registradas'
  - 'Wiesner (1967) — A Review of Slip Factors for Centrifugal Impellers, ASME J. Eng. for Power'
  - 'Stepanoff — Centrifugal and Axial Flow Pumps, 2ª ed. (1957) — empuxo radial'
secoes:
  - classificacao
  - principio
  - anatomia
  - tipos
  - marcas
  - industria
  - tecnologias
  - componentes
  - modos_falha
componentes:
  - rolamento
  - selo-mecanico
tags:
  - cavitação
  - NPSH
  - curva da bomba
  - BEP
  - API 610
  - leis de afinidade
  - velocidade específica
  - curva do sistema
anatomia:
  svg: /anatomia/bomba-centrifuga.svg
  alt: 'Corte esquemático meridional de bomba centrífuga horizontal (OH1) com componentes numerados de 1 a 8'
  foto:
    arquivo: /anatomia/bomba-centrifuga-foto.jpg
    fonte: 'https://commons.wikimedia.org/wiki/File:Kreiselpumpe-Elektromotor.jpg'
    licenca: 'CC BY-SA 4.0'
    credito: 'HopuWiki (Wikimedia Commons)'
revisado_em: 2026-07-10
---

## Classificação

Máquina **rotodinâmica** — princípio [[dinamicas|Rotodinâmicas]], família Bombas, classe Adição de Energia ao Fluido (a cadeia completa está no caminho acima). Classe **PU** no nível 6 (*equipment unit*) da taxonomia ISO 14224:2016. A distinção fundamental frente às bombas de deslocamento positivo: a centrífuga transfere energia ao fluido **continuamente, por variação de quantidade de movimento angular** — não por confinamento de volume. Consequência prática direta: a vazão entregue depende da resistência do sistema (a bomba opera onde sua curva cruza a curva do sistema — ver Princípio), e operar contra válvula fechada não gera sobrepressão destrutiva imediata, mas aquecimento e recirculação.

É o equipamento rotativo mais numeroso da indústria de processo — tipicamente **mais de 80% do parque rotativo** de uma refinaria ou planta química — e responde por **30–40% dos custos de manutenção de rotativos** (Bloch & Geitner). Essa dupla condição (onipresença + custo) faz da bomba centrífuga o primeiro ativo de qualquer programa sério de confiabilidade.

## Princípio de funcionamento

### A equação de Euler — de onde vem a energia

O impelidor impõe ao fluido uma trajetória giratória. A energia específica teórica transferida é dada pela **equação de Euler das turbomáquinas**:

$$H_{th} = \frac{u_2 \, c_{u2} - u_1 \, c_{u1}}{g}$$

onde $u$ é a velocidade tangencial da pá ($u = \omega r$) e $c_u$ a componente tangencial da velocidade absoluta do fluido, nas seções de entrada (1) e saída (2) do impelidor. Na entrada radial pura ($c_{u1} = 0$), a expressão colapsa para $H_{th} = u_2 c_{u2}/g$: **todo o head nasce na periferia do impelidor**. Por isso diâmetro e rotação dominam o desempenho — e por isso o corte de impelidor (trim) é a ferramenta padrão de adequação de ponto.

O head real fica abaixo do teórico por três famílias de perdas. A primeira é o **escorregamento**: o fluido não é perfeitamente guiado pelo número finito de pás. O fator de escorregamento da correlação clássica de **Wiesner**,

$$\sigma = 1 - \frac{\sqrt{\sin\beta_2}}{Z^{0{,}7}}$$

($\beta_2$ = ângulo de saída da pá; $Z$ = número de pás), quantifica o desconto — tipicamente 10–25% do head de Euler. Somam-se as **perdas hidráulicas** (atrito e choque de incidência fora do ponto de projeto) e as **perdas volumétricas** (recirculação pelos anéis de desgaste).

### Velocidade específica — a forma do impelidor em um número

A **velocidade específica** condensa a geometria hidráulica:

$$n_q = \frac{n \sqrt{Q}}{H^{3/4}}$$

($n$ em rpm, $Q$ em m³/s, $H$ em m, no BEP). Ela define a *forma* do impelidor e quase todo o comportamento da máquina:

| $n_q$ | Geometria | Perfil típico | Comportamento |
| --- | --- | --- | --- |
| 10–40 | **Radial** (alto head, baixa vazão) | Processo, alta pressão | Curva plana; potência cresce com a vazão |
| 40–160 | **Semi-axial / Francis** | Água, condensado, grandes vazões | Intermediário |
| > 160 | **Axial** (alta vazão, baixo head) | Captação, circulação | Curva íngreme; potência máxima no shutoff |

O rendimento máximo atingível também é função de $n_q$ (pico prático na faixa 40–60; $n_q$ muito baixo paga atrito de disco desproporcional) — e a sensibilidade à sucção cresce com a energia do olho do impelidor. É o primeiro eixo da clusterização na seção Tipos.

### Curva H–Q, forma da curva e a janela de operação

O desempenho se expressa na curva **head × vazão (H–Q)** com as curvas associadas de potência, rendimento e NPSHr. Dois atributos da curva têm consequência direta de confiabilidade:

- **Estabilidade**: uma curva **continuamente ascendente até o shutoff** (head máximo com vazão zero, tipicamente 110–120% do head de BEP em máquinas radiais) tem um único ponto de operação possível para cada head. Curvas **planas ou com corcova** (*drooping*) admitem dois pontos para o mesmo head — fonte de oscilação e de divisão instável de carga em operação paralela. A API 610 exige curva continuamente ascendente quando há operação em paralelo.
- **Ponto de máximo rendimento (BEP)** — a referência de saúde operacional: **POR** (*Preferred Operating Region*, ANSI/HI 9.6.3): **70–120% do BEP**; fora dela crescem as cargas radiais, a recirculação interna e a vibração. **AOR** (*Allowable Operating Region*): limites do fabricante; operar fora é consumir vida de [[rolamento|rolamentos]] e [[selo-mecanico|selo]] de forma acelerada. Abaixo da **vazão mínima contínua estável (MCSF)**, recirculação de sucção e aquecimento tornam a operação insustentável — e no limite extremo (*dead-heading*, válvula de descarga fechada) toda a potência vira calor num volume confinado: em bombas de alta energia a vaporização interna destrói o selo em minutos. A linha de vazão mínima (ou válvula ARC) existe para esse cenário.

### A bomba no sistema — ponto de operação, paralelo e série

A bomba **não escolhe** onde opera. O sistema impõe sua própria curva,

$$H_{sys} = H_{est} + k\,Q^2$$

(altura estática + perdas proporcionais a Q²), e o ponto de operação é a **interseção** das duas curvas. Toda ação de operação é uma edição de curva: estrangular a descarga aumenta $k$ (o ponto sobe a curva da bomba para a esquerda); nível de tanque muda $H_{est}$; VFD desloca a curva **da bomba** (leis de afinidade). Ler cavitação, recirculação e sobrecarga como "o ponto se moveu" — e perguntar *quem mexeu em qual curva* — é o hábito diagnóstico mais valioso deste equipamento.

- **Operação em paralelo** soma vazões a head constante — mas o ganho real depende da inclinação da curva do sistema: com sistema íngreme (dominado por atrito), a segunda bomba acrescenta **muito menos** que o dobro da vazão, e ambas deslizam para fora do BEP. Curvas planas/drooping em paralelo dividem carga de forma instável (uma bomba "carrega" a outra).
- **Operação em série** soma heads à mesma vazão (booster) — atenção à classe de pressão da carcaça a jusante.

### Leis de afinidade

Para o mesmo impelidor com rotação variável (VFD) — ou diâmetros próximos:

$$\frac{Q_2}{Q_1} = \frac{N_2}{N_1} \qquad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^2 \qquad \frac{P_2}{P_1} = \left(\frac{N_2}{N_1}\right)^3$$

A dependência **cúbica** da potência é o argumento econômico do acionamento com inversor: reduzir 20% a rotação corta ~49% da potência. Duas leituras de confiabilidade: o **NPSHr também cai com N²** (o VFD é ferramenta anti-[[cavitacao|cavitação]]) — e pequenos **aumentos** de rotação sobrecarregam acionador e mancais de forma desproporcional.

### Potência, partida e empuxos

- **Comportamento da potência**: em máquinas **radiais** ($n_q$ baixo) a potência cresce com a vazão — parte-se com a descarga fechada (menor corrente de partida) e vazão mínima aberta; o motor é dimensionado para o **fim de curva** (*run-out*), não para o BEP. Em máquinas **axiais** é o inverso: potência máxima no shutoff — parte-se com descarga aberta.
- **Empuxo radial**: a voluta simples só equilibra as pressões periféricas no BEP; fora dele a resultante radial cresce (máxima no shutoff — Stepanoff), fletindo o eixo a cada volta (fadiga rotativa, desgaste de selo). **Voluta dupla** divide o escoamento em dois canais defasados 180° e quase anula a resultante — padrão em máquinas grandes.
- **Empuxo axial**: o desequilíbrio de pressão entre as coifas do impelidor empurra o rotor para a sucção. Balanceamento: anéis de desgaste traseiros + furos de alívio (ou palhetas traseiras); em multiestágio, impelidores opostos (*back-to-back*) ou **tambor/disco de balanceamento** com linha de equalização. O resíduo é do rolamento de escora — falhas repetidas de escora pedem auditoria do balanceamento, não rolamento "melhor".

### Rendimento decomposto — onde a energia se perde

$$\eta = \eta_h \cdot \eta_v \cdot \eta_m$$

- **η_h (hidráulico)**: atrito e choque de incidência — cai rápido fora do BEP.
- **η_v (volumétrico)**: recirculação pelos **anéis de desgaste** — dobrar a folga de projeto derruba pontos percentuais de rendimento; é a deriva lenta que o monitoramento de desempenho enxerga (mesma vazão exigindo mais potência).
- **η_m (mecânico)**: mancais, selo e atrito de disco.

Faixas práticas de η no BEP: ~50–70% em bombas pequenas, 75–88% em máquinas de processo bem selecionadas, >90% nas grandes de água. Cada ponto percentual é conta de energia permanente — e rendimento em queda é sintoma mensurável de desgaste interno antes de qualquer falha funcional.

### NPSH — a condição de existência da sucção

$$NPSH_a = \frac{P_0 - P_v(T)}{\rho g} - H_s - \Sigma h_f$$

O **NPSHa** (disponível, propriedade do sistema) precisa exceder o **NPSHr** (requerido, propriedade da bomba, definido pelo critério de queda de 3% do head no teste — ISO 9906/HI) com **margem**: razões NPSHa/NPSHr de **1,1 a 2,5** conforme a energia de sucção (ANSI/HI 9.6.1:2024); a API 610 exige **NPSHa ≥ NPSHr + 1,0 m em toda a região de operação permitida (AOR)**. Margem insuficiente leva à [[cavitacao|cavitação]] — o modo de falha assinatura deste equipamento. O tratamento rigoroso completo (derivação, por que o critério de 3% subestima o dano incipiente, exemplo numérico) está na nota de cavitação, nível Engineer.

### O fluido muda a bomba — viscosidade, densidade, gás e escorva

- **Viscosidade**: as curvas de catálogo valem para água. Fluido viscoso derruba vazão, head e sobretudo rendimento, e sobe a potência — corrigir pelos fatores da **ANSI/HI 9.6.7**; acima de algumas centenas de cSt, a comparação com deslocamento positivo quase sempre vence.
- **Densidade**: o head em metros **não depende de ρ** — mas pressão ($\Delta p = \rho g H$) e potência escalam com ρ. A armadilha de comissionamento: testar com água (ρ = 1.000) uma bomba selecionada para hidrocarboneto leve (ρ ≈ 750) exige ~33% mais potência — motor subdimensionado desarma no teste.
- **Gás livre**: 2–4% em volume já degrada head e rendimento de um impelidor padrão; na faixa de ~10% o escoamento descola e a bomba perde escorva (variantes de impelidor aberto/indutor toleram mais).
- **Escorva**: a centrífuga **não bombeia ar** — carcaça e linha de sucção precisam estar cheias e ventadas antes da partida (válvula de pé, escorva a vácuo, ou variante autoescorvante). Rotação em sentido errado (trifásico invertido) entrega head/vazão baixos e vibração — checagem de comissionamento antes de qualquer diagnóstico hidráulico.
- **Aceitação e baseline**: o teste de desempenho **ISO 9906** (graus de aceitação 1/2/3) na entrega é o *baseline* contra o qual o monitoramento de desempenho (PIMS) medirá toda deriva futura — sem baseline, CBM de desempenho é adivinhação.

## Anatomia

![Bomba centrífuga horizontal de processo acoplada a motor elétrico sobre base comum](/anatomia/bomba-centrifuga-foto.jpg)

*Foto: HopuWiki — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kreiselpumpe-Elektromotor.jpg), CC BY-SA 4.0. Arranjo típico: bomba horizontal monoestágio + acoplamento + motor de indução sobre base metálica comum.*

![Corte esquemático meridional de bomba centrífuga horizontal (OH1) com componentes numerados](/anatomia/bomba-centrifuga.svg)

1. **Voluta (carcaça espiral)** — coleta o fluido na periferia do impelidor e converte energia de velocidade em pressão pela expansão progressiva de seção (difusão). A língua da voluta (*cutwater*) define a interação de passagem de pás — fonte da componente de vibração em BPF (frequência de passagem de pás).
2. **Impelidor** — o coração da máquina: pás curvadas para trás transferem energia pela equação de Euler. Fechado (com paredes), semiaberto ou aberto conforme o serviço; o balanceamento e a folga com os anéis de desgaste governam vibração e perdas volumétricas.
3. **Eixo** — transmite o torque do acionador; em bombas de processo é dimensionado por **rigidez** (deflexão máxima na face do selo, tipicamente < 0,05 mm) tanto quanto por resistência. O índice de flexibilidade $L^3/D^4$ é critério clássico de comparação entre projetos.
4. **[[selo-mecanico|Selo mecânico]]** — vedação dinâmica entre eixo e carcaça: par de faces planas separadas por filme de ~1 μm. É o **item nº 1 de intervenção** do conjunto (ESA: selos registrados em ~60% das falhas de bomba) — e na maioria dos casos a falha do selo é sintoma de causa a montante (operação fora do BEP, perda de flush, cavitação).
5. **[[rolamento|Rolamentos]]** — suportam as cargas radiais (crescem fora do BEP) e o empuxo axial residual; respondem por cerca de **um terço das falhas** do conjunto — selos e rolamentos juntos somam 60–70% das intervenções, e contaminação + lubrificação inadequada dominam as causas.
6. **Bocal de sucção** — entrada axial: a região de menor pressão de todo o sistema, onde a [[cavitacao|cavitação]] nasce quando a margem de NPSH se esgota.
7. **Bocal de recalque** — saída da voluta na pressão de descarga.
8. **Caixa de mancais** — abriga rolamentos e lubrificação (banho de óleo com visor, névoa ou graxa); a temperatura e a condição do óleo são janelas de monitoramento de baixo custo.

## Tipos e diferenças

Uma bomba centrífuga real é a **combinação de uma posição em seis eixos de classificação** — uma Goulds 3196 é: radial + monoestágio + OH1 + selada + ASME B73.1 + processo químico. Ler o parque por esses eixos é o que permite comparar máquinas, prever modos de falha dominantes e especificar substituições:

### Eixo 1 — Hidráulica (forma do rotor, via velocidade específica)

Radial ($n_q$ 10–40, alto head/baixa vazão) → semi-axial/Francis (40–160) → axial (>160, alta vazão/baixo head). Governa a forma da curva, o comportamento da potência e a sensibilidade de sucção (seção Princípio).

### Eixo 2 — Número de estágios

**Monoestágio** até onde head e rotação alcançam; **multiestágio** (impelidores em série no mesmo eixo) para head alto sem rotação nem diâmetro extremos — água de alimentação de caldeira, oleodutos, osmose reversa. Multiestágio traz consigo o problema do empuxo axial acumulado (tambor/disco de balanceamento) e curvas mais íngremes.

### Eixo 3 — Configuração mecânica (nomenclatura API 610)

| Família | Tipos | Configuração | Aplicação típica |
| --- | --- | --- | --- |
| **Overhung (OH)** | OH1 (pé), OH2 (linha de centro), OH3–OH5 (verticais in-line) | Impelidor em balanço na ponta do eixo | Processo geral; OH2 é o padrão de refino |
| **Between-bearings (BB)** | BB1–BB5 (1–2 estágios → multiestágio barril) | Impelidor(es) entre mancais | Alta vazão/pressão, água de caldeira, oleodutos |
| **Vertically suspended (VS)** | VS1–VS7 | Coluna vertical imersa | Sumps, poços, criogenia, captação |

Válida como linguagem mesmo fora do escopo O&G. Complementos de projeto: **voluta simples × dupla** (a dupla equilibra a carga radial fora do BEP — máquinas grandes) e **difusor aletado** (multiestágio e verticais).

### Eixo 4 — Tecnologia de vedação e acionamento

- **Selada convencional**: [[selo-mecanico|selo mecânico]] simples ou duplo com planos de selagem API 682 — o arranjo dominante; o selo é o item nº 1 de manutenção.
- **Acoplamento magnético (*mag-drive*)**: sem selo, sem vazamento — ao custo de sensibilidade a partículas e a operação a seco (o fluido refrigera os mancais internos).
- **Motor encapsulado (*canned motor*)**: rotor do motor imerso no fluido; hermeticidade máxima (serviços tóxicos/letais), mesma sensibilidade.
- **Submersa** (motor sob o fluido — poços profundos, drenagem).

Trocar de posição neste eixo troca o **modo de falha dominante**: a selada falha pelo selo; as *sealless* falham por partícula, seco e mancal interno.

### Eixo 5 — Norma construtiva / severidade de serviço

- **ASME B73.1** — a "ANSI pump": dimensões intercambiáveis para química; a base instalada dominante nas Américas.
- **ISO 2858 / ISO 5199** — o equivalente internacional (dimensões / requisitos); padrão europeu e brasileiro de indústria geral.
- **API 610** — refino/petroquímica/O&G: carcaça, temperaturas, selagem (API 682) e margens exigentes; projetada para 20+ anos de serviço severo.
- **Sanitária** (EHEDG/3-A) e **saneamento/água bruta** completam o espectro.

### Eixo 6 — Casos especiais

**Autoescorvante** (carcaça com reservatório de recirculação), **regenerativa/periférica** (altíssimo head em vazão mínima), **impelidor recuado/vórtice** (sólidos e fibras — rendimento sacrificado), **alta velocidade com multiplicador** (head extremo em máquina compacta), **bombas de polpa** (revestimentos de borracha/alto-cromo — mineração).

### A matriz — exemplos reais nos seis eixos

| Modelo | E1 hidráulica | E2 estágios | E3 config. | E4 vedação | E5 norma | Serviço típico |
| --- | --- | --- | --- | --- | --- | --- |
| Goulds 3196 | Radial | 1 | OH1 | Selada | ASME B73.1 | Processo químico |
| KSB Meganorm | Radial | 1 | OH1 | Selada | ISO 2858 | Indústria geral/água |
| Flowserve HPX | Radial | 1 | OH2 | Selada API 682 | API 610 | Refino |
| Grundfos CR | Radial | Multi | Vertical in-line | Selada | — | Utilidades/pressurização |
| Sulzer AHLSTAR | Radial/Francis | 1 | OH | Selada | ISO 5199 | Papel & celulose |

As fichas individuais de marca/modelo (nível 5 da taxonomia) detalham cada um — em produção nesta fase editorial.

## Marcas e modelos

Referências de mercado citadas como âncora de realidade, com a diferença construtiva que define cada uma (links oficiais; D05 — nunca rehosting de catálogo):

- **[Goulds 3196 (ITT)](https://www.gouldspumps.com/)** — o arquétipo mundial da ASME B73.1 e a bomba de processo químico mais instalada do mundo; décadas de histórico de campo e intercambiabilidade dimensional total entre gerações — o argumento de estoque de sobressalentes que sustenta o padrão ANSI.
- **[KSB Meganorm / Megabloc](https://www.ksb.com/pt-br)** — a linha ISO 2858 de maior presença no Brasil (fabricação local); Meganorm com acoplamento e base, Megabloc monobloco (impelidor na ponta do eixo do motor — menos alinhamento, menos base).
- **[Flowserve](https://www.flowserve.com/)** — portfólio API 610 completo (OH2/BB/VS — ex.: HPX, linha OH2 de refino) e forte presença em selos (legado Durametallic); referência quando o serviço exige API 682 integrado.
- **[Sulzer](https://www.sulzer.com/)** — referência em BB multiestágio (água de caldeira, oleodutos) e nas linhas de processo para papel & celulose (AHLSTAR — bombeio de polpa fibrosa com gás).
- **[Grundfos](https://www.grundfos.com/)** — domínio em verticais in-line multiestágio (série CR) e sistemas prontos com VFD e eletrônica integrados — o extremo "produto de prateleira inteligente" do espectro.
- **[Imbil](https://www.imbil.com.br/)** — fabricante nacional relevante em saneamento, irrigação e indústria geral; alternativa local com prazo e assistência no mercado brasileiro.

## Indústria e aplicações

Setores dominantes: refino e petroquímica (transferência, carga de unidades, refluxo), química, papel e celulose, saneamento (captação e adução), mineração (polpa — com adaptações de projeto), alimentos e farmacêutica (variantes sanitárias), utilidades (água gelada, condensado, alimentação de caldeira). A regra de censo — **>80% dos rotativos são bombas centrífugas** — significa que o padrão de manutenção deste ativo define o padrão da planta inteira: é nele que programas de confiabilidade ganham ou perdem credibilidade.

### Confiabilidade em números

Benchmarks consolidados da literatura (re-verificados na fonte — a régua para o seu parque):

| Indicador | Valor de referência | Fonte |
| --- | --- | --- |
| MTBF/MTBR — refinarias e petroquímicas | **3 a 10 anos** (a dispersão é gestão, não máquina) | Bloch, Pump User's Handbook |
| MTBF — plantas químicas | ~50–60% dos valores de refinaria | Bloch |
| MTBF — bombas ANSI B73.1 (EUA) | média ~2,5 anos · meta 3,75 · excelente 4,5+ | Budris/WaterWorld |
| Componente nº 1 nas falhas | **Selo mecânico — registrado em 60,4% de 3.500 falhas** (18 plantas) | European Sealing Association |
| Causa-raiz das falhas prematuras de selo | 49% operação · 28% manutenção · 23% engenharia | ESA |
| Rolamentos | ~⅓ das falhas do conjunto; 52% delas por contaminação/lubrificação | estimativas históricas de usuários/fabricantes |
| Energia | Sistemas de bombeamento ≈ **25% da energia de motores industriais** | HI/DOE |

Duas leituras: (1) o selo lidera as estatísticas, mas **é majoritariamente sintoma** — as causas-raiz apontam para operação fora do BEP, perda de flush e sucção deficiente; atacar o selo sem atacar o sistema é enxugar gelo. (2) A dispersão de MTBF entre plantas com as mesmas máquinas (3× ou mais) é a prova quantitativa de que confiabilidade de bomba é disciplina de especificação, instalação e operação — exatamente o que este handbook existe para transferir.

## Tecnologias

O estado da prática de monitoramento, em ordem de maturidade:

- **Análise de vibração** (rota mensal ou online): espectro + envelope; acompanha [[rolamento|rolamentos]] (frequências de defeito), desalinhamento (2×RPM), desbalanceamento (1×RPM), passagem de pás (BPF) e a assinatura de banda larga da [[cavitacao|cavitação]].
- **Monitoramento de desempenho** (PIMS): head, vazão e potência contra a curva de referência do teste ISO 9906 — deriva de desempenho é sintoma precoce de desgaste interno (anéis) e recirculação.
- **Análise de óleo** dos mancais: contagem de partículas, água, viscosidade.
- **Sensores online de baixo custo** (aceleração + temperatura, wireless): viabilizaram cobertura de ativos "classe B" antes monitorados só por rota.
- **VFD como instrumento**: corrente e torque do inversor carregam assinaturas de processo (bloqueio, cavitação severa, operação em vazio) sem sensor adicional — e o próprio inversor é a ferramenta de reposicionamento do ponto de operação.

## Componentes

Componentes transversais (D10 — modelados uma única vez, referenciados por todos os equipamentos-pai):

- [[rolamento|Rolamento]] — suporte de cargas; L10, ISO 15243, frequências de defeito.
- [[selo-mecanico|Selo mecânico]] — vedação dinâmica; API 682, fator PV, planos de selagem.

Demais itens mantidos no contexto do equipamento: anéis de desgaste (folga = rendimento volumétrico), acoplamento (alinhamento!), base e grouting (a fundação é parte da máquina).

## Modos de falha

- [[cavitacao|Cavitação]] — o modo assinatura: Mixed/Complex no Fw A, CBM com P-F/2 no Fw B. **Publicado.**
- Falha de selo mecânico — Wear-out/Mixed; frequentemente consequência de operação fora do BEP ou perda de flush. _Em produção (Dia 4b)._
- Falha de rolamento — Wear-out (fadiga) com gatilhos Mixed (lubrificação/contaminação). _Em produção (Dia 4b)._
- Desalinhamento e vibração excessiva — Mixed; detectável em espectro (2×RPM, harmônicos). _Em produção (Dia 4b)._
- Erosão/corrosão de impelidor — Wear-out em serviços abrasivos/corrosivos. _Em produção (Dia 4b)._
