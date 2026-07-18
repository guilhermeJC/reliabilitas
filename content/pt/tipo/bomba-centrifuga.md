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
  alt: 'Corte técnico de bomba centrífuga horizontal (OH1): voluta aberta com impelidor, caixa de selagem, caixa de mancais com rolamentos e carter de óleo, acoplamento com proteção — com o caminho do fluido da sucção ao recalque'
  foto:
    arquivo: /anatomia/bomba-centrifuga-foto.jpg
    fonte: 'https://commons.wikimedia.org/wiki/File:Kreiselpumpe-Elektromotor.jpg'
    licenca: 'CC BY-SA 4.0'
    credito: 'HopuWiki (Wikimedia Commons)'
revisado_em: 2026-07-11
---

## Classificação

Máquina **rotodinâmica** — princípio [[dinamicas|Rotodinâmicas]], família Bombas, classe Adição de Energia ao Fluido (a cadeia completa está no caminho acima). Classe **PU** no nível 6 (*equipment unit*) da taxonomia ISO 14224:2016. A distinção fundamental frente às [[deslocamento-positivo|bombas de deslocamento positivo]]: a centrífuga transfere energia ao fluido **continuamente, por variação de quantidade de movimento angular** — não por confinamento de um volume fechado. Consequência prática direta: a bomba **não decide sozinha** quanto de vazão e pressão entrega — quem decide é a tubulação, os equipamentos e as válvulas da instalação a que ela está ligada (a seção Princípio detalha exatamente como).

E, por essa mesma razão, ela também não corre o mesmo risco que a de deslocamento positivo caso a descarga seja bloqueada: como sempre existe alguma folga interna por onde o líquido recircula (a folga entre o impelidor e a carcaça — ver anéis de desgaste, adiante), a bomba nunca fica presa contra um caminho totalmente sem saída. Fechar a válvula de descarga não faz a pressão subir sem limite — faz a vazão cair, a bomba passar a recircular internamente o próprio líquido, e o head parar de subir no valor máximo que a curva da máquina permite (o *shutoff*, seção Princípio). Toda a energia mecânica que continua entrando não vira mais pressão: vira **calor**, aquecendo o volume de líquido preso — em bombas de alta energia, o suficiente para vaporizar o fluido internamente e destruir o selo em minutos, mesmo sem nenhuma ruptura da carcaça.

É o equipamento rotativo mais numeroso da indústria de processo — tipicamente **mais de 80% do parque rotativo** de uma refinaria ou planta química — e responde por **30–40% dos custos de manutenção de rotativos** (Bloch & Geitner). Essa dupla condição (onipresença + custo) faz da bomba centrífuga o primeiro ativo de qualquer programa sério de confiabilidade.

## Princípio de funcionamento

### De onde vem a energia — Bernoulli primeiro, Euler depois

A forma mais simples de entender uma bomba é pela **conservação de energia** — a mesma equação de Bernoulli usada para qualquer escoamento, só que com um termo extra para a energia que a bomba injeta:

$$\frac{p_1}{\rho g} + \frac{v_1^2}{2g} + z_1 \; + \; H_{bomba} \;=\; \frac{p_2}{\rho g} + \frac{v_2^2}{2g} + z_2 \; + \; \Sigma h_f$$

- $p$ — pressão estática [Pa], nos pontos 1 (sucção) e 2 (descarga).
- $v$ — velocidade média do fluido [m/s], em 1 e 2.
- $z$ — cota (altura geométrica de referência) [m], em 1 e 2.
- $\rho$ — massa específica do fluido [kg/m³].
- $g$ — aceleração da gravidade [m/s²].
- $H_{bomba}$ — energia específica que a bomba adiciona ao fluido, o **head** [m de coluna do fluido] — é o que buscamos.
- $\Sigma h_f$ — soma das perdas de carga por atrito entre 1 e 2 [m].

Rearranjando para isolar $H_{bomba}$: a bomba precisa entregar **exatamente** a energia que falta para levar o fluido do estado 1 ao estado 2 — vencendo a diferença de pressão, de velocidade, de cota, e ainda as perdas por atrito no caminho. É essa conta, montada para a instalação real, que dimensiona a bomba (a seção "A bomba no sistema", abaixo, mostra como isso vira a curva do sistema).

Bernoulli explica **quanto** de energia é necessário — mas trata a bomba como uma caixa-preta. Para entender **como** o impelidor entrega essa energia fisicamente, a ferramenta é a **equação de Euler das turbomáquinas**:

$$H_{th} = \frac{u_2 \, c_{u2} - u_1 \, c_{u1}}{g}$$

- $H_{th}$ — head teórico (a energia que o impelidor entrega antes de qualquer perda) [m].
- $u$ — velocidade tangencial da pá [m/s]: $u = \omega r$, onde $\omega$ é a velocidade angular do eixo [rad/s] e $r$ é o raio do impelidor naquele ponto [m] — é por isso que o **diâmetro do impelidor** é uma das duas variáveis (junto da rotação) que a fábrica usa para dimensionar e selecionar a bomba certa para cada ponto de operação.
- $c_u$ — componente tangencial da velocidade absoluta do fluido [m/s].
- $g$ — aceleração da gravidade [m/s²].
- Índices $1$ e $2$ — entrada e saída do impelidor, respectivamente.

Na entrada radial pura ($c_{u1} = 0$, o projeto usual), a expressão colapsa para $H_{th} = u_2 c_{u2}/g$: **todo o head nasce na periferia do impelidor**. Como $u_2$ cresce com o raio e com a rotação, essas duas variáveis dominam o desempenho — e por isso reduzir o diâmetro externo do impelidor (o *trim*, um corte mecânico controlado) é a forma padrão de ajustar uma bomba de catálogo a um ponto de operação específico sem trocar a carcaça nem o motor.

O head real entregue fica abaixo do teórico $H_{th}$ por três famílias de perdas, cada uma com sua própria causa física:

- **Escorregamento**: o fluido não é perfeitamente guiado pelo número finito de pás — parte do momento angular "escapa" antes de ser convertido em pressão. Tipicamente subtrai 10–25% do head de Euler; quanto mais pás e mais curvadas para trás, menor o escorregamento.
- **Perdas hidráulicas**: atrito nas superfícies internas e choque de incidência quando a bomba opera fora do ponto para o qual as pás foram desenhadas — crescem rapidamente longe do BEP (adiante).
- **Perdas volumétricas**: parte do líquido já pressurizado recircula de volta pela folga dos anéis de desgaste, sem chegar à descarga — é essa mesma folga que, no extremo de válvula fechada, evita que a pressão suba sem limite (seção Classificação).

### Curva H–Q, o ponto de melhor eficiência (BEP) e a vazão mínima

O desempenho de cada bomba se resume numa curva **head × vazão (H–Q)**, medida de fábrica com as curvas associadas de potência, rendimento e NPSHr — o widget interativo logo abaixo desta seção deixa a forma da curva e o efeito da rotação tangíveis. Três referências dessa curva têm consequência direta de confiabilidade:

- **BEP (*Best Efficiency Point*, ponto de melhor eficiência)** — o ponto da curva onde o rendimento hidráulico é máximo. É a referência central de saúde operacional, não um detalhe de catálogo: quanto mais a bomba opera **longe** do BEP — vazão muito maior ou muito menor — maior a recirculação interna, a carga radial no eixo e a vibração. A faixa recomendada de operação, o **POR** (*Preferred Operating Region*, ANSI/HI 9.6.3), é **70–120% da vazão de BEP**; a **AOR** (*Allowable Operating Region*) são os limites absolutos do fabricante — operar fora da AOR consome vida de [[rolamento|rolamentos]] e [[selo-mecanico|selo]] de forma acelerada, não gradual.
- **MCSF (*Minimum Continuous Stable Flow*, vazão mínima contínua estável)** — o limite inferior real, distinto do simples "abaixo de 70% do BEP": é a vazão abaixo da qual a recirculação de sucção se torna severa o bastante para gerar vibração instável e aquecimento que a bomba não dissipa em regime contínuo — mais restritivo que o POR em bombas de alta energia específica. Abaixo dela, a operação sustentada não é recomendável nem com boa manutenção; a válvula ou linha de recirculação automática (ARC) existe exatamente para garantir essa vazão mínima quando o processo pede menos.
- **Estabilidade da curva** — uma curva **continuamente ascendente até o shutoff** (o head máximo, com vazão zero, tipicamente 110–120% do head de BEP em máquinas radiais) tem um único ponto de operação possível para cada head. Curvas **planas ou com corcova** (*drooping*) admitem dois pontos de vazão diferentes para o mesmo head — fonte de oscilação e de divisão instável de carga quando duas bombas operam em paralelo. A API 610 exige curva continuamente ascendente sempre que houver operação em paralelo.

### A bomba no sistema — quem decide o ponto de operação

A instalação a que a bomba está ligada — a tubulação, os equipamentos de processo, as válvulas — impõe a **curva do sistema**:

$$H_{sys} = H_{est} + k\,Q^2$$

- $H_{sys}$ — head que o sistema exige da bomba para entregar a vazão $Q$ [m].
- $H_{est}$ — altura estática: a diferença de cota e/ou de pressão entre os dois reservatórios que a bomba liga, a parcela que **não depende** da vazão [m].
- $k$ — coeficiente de resistência do sistema (atrito da tubulação, válvulas, acessórios) [s²/m⁵], obtido da própria tubulação (diâmetro, comprimento, acessórios).
- $Q$ — vazão [m³/s].

O ponto de operação real — a vazão e o head que a bomba efetivamente entrega — é sempre a **interseção** dessa curva do sistema com a curva H-Q da própria bomba: nenhuma das duas "vence" sozinha, o ponto é onde as duas concordam. Toda ação de operação, no fundo, é mexer em uma das duas curvas — e o hábito de diagnóstico mais valioso deste equipamento é perguntar exatamente **qual curva mudou**:

- **Fechar (estrangular) a válvula de descarga** aumenta $k$ — a curva do sistema fica mais íngreme, e o ponto de interseção desliza pela curva DA BOMBA para uma vazão menor e um head maior.
- **Mudar o nível de um tanque ou a pressão de um vaso** muda $H_{est}$ — desloca a curva do sistema inteira para cima ou para baixo, sem mudar sua forma.
- **Variar a rotação via VFD** (*variable frequency drive*, inversor de frequência: o equipamento eletrônico que converte a frequência fixa da rede elétrica numa frequência variável, controlando a velocidade do motor de forma contínua) desloca a curva **da bomba**, não a do sistema — é a única das três ações que muda a máquina em si, e o faz seguindo as leis de afinidade (a seguir).

Ler cavitação, recirculação ou sobrecarga de motor como "o ponto de operação se moveu" — e perguntar *quem mexeu em qual curva e por quê* — resolve a maioria dos diagnósticos de campo antes de abrir a bomba.

- **Operação em paralelo** (duas bombas na mesma descarga) soma vazões a head constante — mas o ganho real depende da inclinação da curva do sistema: com sistema íngreme (dominado por atrito), a segunda bomba acrescenta **muito menos** que o dobro da vazão, e ambas deslizam para fora do BEP. Curvas planas ou com corcova em paralelo dividem carga de forma instável (uma bomba passa a "carregar" a outra).
- **Operação em série** (uma bomba alimenta a sucção da outra) soma heads à mesma vazão — o arranjo *booster* clássico; atenção à classe de pressão da carcaça da bomba a jusante, que recebe a soma das duas pressões.

### Velocidade específica — a forma do impelidor em um número

Diferentes projetos de impelidor entregam o mesmo BEP (mesma vazão e head nominais) com geometrias radicalmente diferentes — uma roda estreita e de grande diâmetro, ou uma hélice larga e compacta. A **velocidade específica** $n_q$ é o número adimensional-na-prática que identifica **qual** dessas formas geométricas melhor resolve um dado par vazão-head, independente do tamanho físico da máquina:

$$n_q = \frac{n \sqrt{Q}}{H^{3/4}}$$

- $n_q$ — velocidade específica, calculada no ponto de BEP.
- $n$ — rotação [rpm].
- $Q$ — vazão no BEP [m³/s].
- $H$ — head no BEP [m].

| $n_q$ | Geometria | Perfil típico | Comportamento |
| --- | --- | --- | --- |
| 10–40 | **Radial** (alto head, baixa vazão) | Processo, alta pressão | Curva plana; potência cresce com a vazão |
| 40–160 | **Semi-axial / Francis** | Água, condensado, grandes vazões | Intermediário |
| > 160 | **Axial** (alta vazão, baixo head) | Captação, circulação | Curva íngreme; potência máxima no shutoff |

O rendimento máximo atingível também é função de $n_q$ (pico prático na faixa 40–60; $n_q$ muito baixo paga atrito de disco desproporcional ao head útil) — e a sensibilidade à cavitação cresce com a energia do olho do impelidor, que também escala com $n_q$. É o primeiro eixo da clusterização na seção Tipos, abaixo.

### Leis de afinidade

Uma consequência direta de $H_{th} = u_2 c_{u2}/g$ (e $u_2 = \omega r_2$): variar só a rotação do MESMO impelidor — o caso do VFD — desloca toda a curva H-Q de forma previsível, sem precisar de nenhum ensaio novo:

$$\frac{Q_2}{Q_1} = \frac{N_2}{N_1} \qquad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^{2} \qquad \frac{P_2}{P_1} = \left(\frac{N_2}{N_1}\right)^{3}$$

- $Q$ — vazão [m³/s ou m³/h], no ponto homólogo (mesma posição relativa na curva).
- $H$ — head [m].
- $P$ — potência absorvida [W ou kW].
- $N$ — rotação [rpm]; índices $1$ e $2$ — condição de referência (ex.: rotação nominal) e condição nova (ex.: rotação reduzida pelo VFD).

**Exemplo numérico:** reduzir a rotação em 20% (de $N_1$ para $N_2 = 0{,}8 N_1$) entrega $Q_2 = 0{,}8\,Q_1$ (−20% de vazão), $H_2 = 0{,}64\,H_1$ (−36% de head) e $P_2 = 0{,}512\,P_1$ (−49% de potência) — a dependência **cúbica** da potência com a rotação é o argumento econômico central do acionamento com inversor de frequência: um corte modesto de vazão já devolve quase metade da energia consumida.

Duas leituras de confiabilidade que seguem direto da mesma lei: o **NPSHr também cai com $N^2$** — reduzir a rotação é, na prática, uma ferramenta ativa contra a [[cavitacao|cavitação]], não só de economia de energia; e, no sentido contrário, pequenos **aumentos** de rotação acima da nominal sobrecarregam acionador e mancais de forma desproporcional (a potência sobe com o cubo) — nunca operar acima da rotação de projeto sem reavaliar toda a cadeia mecânica.

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

Toda bomba centrífuga tem, na entrada do impelidor, uma região de pressão mínima — consequência direta da própria equação de Euler: para converter velocidade em pressão, o fluido primeiro PRECISA acelerar, e onde ele acelera mais, a pressão local cai mais. Se essa pressão mínima cair abaixo da pressão de vapor do líquido, ele vaporiza ali mesmo — o início da [[cavitacao|cavitação]], o modo de falha assinatura deste equipamento. O **NPSH** (*Net Positive Suction Head*) é a régua que mede a margem antes disso acontecer:

$$NPSH_a = \frac{P_0 - P_v(T)}{\rho g} - H_s - \Sigma h_f$$

- $NPSH_a$ — NPSH disponível: quanto a instalação efetivamente entrega na entrada da bomba, acima da pressão de vapor [m].
- $P_0$ — pressão absoluta na superfície do líquido no reservatório de sucção [Pa] (atmosférica, se o tanque for aberto).
- $P_v(T)$ — pressão de vapor do líquido na temperatura de operação $T$ [Pa] — cresce fortemente com a temperatura (ver nota de Cavitação, nível Engineer, para a curva completa).
- $\rho$ — massa específica do líquido [kg/m³].
- $g$ — aceleração da gravidade [m/s²].
- $H_s$ — altura estática de sucção [m]: positiva quando a bomba está **acima** do nível do líquido (penaliza o NPSHa), negativa quando está **abaixo** (favorece o NPSHa) — a seção "Instalação da bomba", logo adiante, mostra os cenários reais.
- $\Sigma h_f$ — soma das perdas de carga na linha de sucção (atrito + acessórios) [m].

Esse **NPSHa**, propriedade da instalação, precisa exceder o **NPSHr** (NPSH requerido, propriedade da bomba — o fabricante mede em bancada e informa na curva, pelo critério de queda de 3% do head) com uma **margem de segurança**: razões NPSHa/NPSHr de **1,1 a 2,5** conforme a energia de sucção do projeto (ANSI/HI 9.6.1:2024); a API 610 exige, de forma ainda mais direta, **NPSHa ≥ NPSHr + 1,0 m em toda a região de operação permitida (AOR)**. Margem insuficiente — por altura de sucção excessiva, perdas de carga maiores que o previsto, ou simplesmente o processo aquecendo (o que sobe $P_v$ exponencialmente) — é a causa raiz mais comum de cavitação em campo.

Um exemplo rápido para tornar isso concreto: uma instalação com folga confortável de NPSH a 25 °C pode passar a cavitar severamente **sem nenhuma modificação física** — só pelo processo aquecer para 70–80 °C, porque $P_v(T)$ sobe muito mais rápido que qualquer outra variável da equação. A nota de [[cavitacao|Cavitação]] (nível Engineer) traz a derivação completa a partir de Bernoulli, a tabela de $P_v(T)$ e um exemplo numérico da mesma instalação em duas temperaturas.

### Instalação da bomba — sucção afogada, elevada, submersa e nível variável

Um erro conceitual comum: dizer que a bomba **"puxa"** o fluido pela sucção. Ela não puxa — ela **empurra**, sempre por diferença de pressão. O impelidor gera uma zona de baixa pressão na entrada e uma zona de alta pressão na saída; é a pressão atmosférica (ou do vaso) empurrando o líquido do reservatório de sucção em direção a essa zona de baixa pressão que efetivamente move o fluido até a bomba — o impelidor, a partir daí, empurra o líquido para a descarga. Entender isso muda a leitura de cada cenário de instalação: o que importa não é a distância até a bomba, é a **diferença de pressão disponível** para empurrar o líquido até lá — exatamente o que a equação de NPSH, acima, quantifica através do termo $H_s$.

- **Sucção afogada** (bomba **abaixo** do nível do líquido): $H_s$ é negativo e **soma** ao NPSHa — a condição mais favorável, porque a própria coluna de líquido acima da bomba já empurra o fluido para dentro dela antes mesmo do impelidor agir. É a configuração recomendada sempre que a geometria da planta permitir.

  ![Instalação com sucção afogada: o tanque fica acima da bomba, H_s soma-se ao NPSHa](/anatomia/bomba-instalacao-afogada.svg)

- **Sucção positiva / elevação de sucção** (bomba **acima** do nível do líquido): $H_s$ é positivo e **subtrai** do NPSHa — cada metro que a bomba fica acima do nível é um metro a menos de margem. Exige escorva (a linha de sucção não enche sozinha) e, tipicamente, uma válvula de pé para reter a coluna de líquido quando a bomba para.

  ![Instalação com sucção positiva: o tanque fica abaixo da bomba, H_s subtrai do NPSHa](/anatomia/bomba-instalacao-sucao-positiva.svg)

- **Bomba submersa** (o conjunto rotor+motor imerso no próprio líquido — poços, drenagem, captação): elimina H_s como problema (a bomba já está no nível mais favorável possível), mas troca o desafio por outro — a **submergência mínima** (ANSI/HI 9.8): profundidade mínima de líquido acima da entrada para evitar que um vórtice de superfície arraste ar para o bocal, o que degrada o NPSHa efetivo tanto quanto uma margem insuficiente por altura.

  ![Bomba submersa: o conjunto fica imerso no poço, com cota de submergência mínima marcada](/anatomia/bomba-instalacao-submersa.svg)

- **Nível de sucção variável** (ex.: esvaziando um tanque, uma cisterna ou um caminhão-tanque durante a operação): a linha de sucção fica fixa, mas o nível do líquido cai ao longo do tempo — $H_s$ **piora progressivamente** durante a própria operação, mesmo que a instalação tenha sido projetada com margem confortável no início. É um cenário clássico de cavitação que só aparece no fim do ciclo de bombeamento, e que a auditoria de NPSH precisa avaliar no **pior instante** (nível mais baixo), não na média.

  ![Nível de sucção caindo ao longo do tempo: H_s cresce e o NPSHa piora progressivamente](/anatomia/bomba-instalacao-nivel-variavel.svg)

### O fluido muda a bomba — viscosidade, densidade, gás e escorva

- **Viscosidade**: as curvas de catálogo valem para água. Fluido viscoso derruba vazão, head e sobretudo rendimento, e sobe a potência — corrigir pelos fatores da **ANSI/HI 9.6.7**; acima de algumas centenas de cSt, a comparação com deslocamento positivo quase sempre vence.
- **Densidade**: o head em metros **não depende de ρ** — mas pressão ($\Delta p = \rho g H$) e potência escalam com ρ. A armadilha de comissionamento: testar com água (ρ = 1.000) uma bomba selecionada para hidrocarboneto leve (ρ ≈ 750) exige ~33% mais potência — motor subdimensionado desarma no teste.
- **Gás livre**: 2–4% em volume já degrada head e rendimento de um impelidor padrão; na faixa de ~10% o escoamento descola e a bomba perde escorva (variantes de impelidor aberto/indutor toleram mais).
- **Escorva**: a centrífuga **não bombeia ar** — carcaça e linha de sucção precisam estar cheias e ventadas antes da partida (válvula de pé, escorva a vácuo, ou variante autoescorvante). Rotação em sentido errado (trifásico invertido) entrega head/vazão baixos e vibração — checagem de comissionamento antes de qualquer diagnóstico hidráulico.
- **Aceitação e baseline**: o teste de desempenho **ISO 9906** (graus de aceitação 1/2/3) na entrega é o *baseline* contra o qual o monitoramento de desempenho (PIMS) medirá toda deriva futura — sem baseline, CBM de desempenho é adivinhação.

## Anatomia

![Bomba centrífuga horizontal de processo acoplada a motor elétrico sobre base comum](/anatomia/bomba-centrifuga-foto.jpg)

*Foto: HopuWiki — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kreiselpumpe-Elektromotor.jpg), CC BY-SA 4.0. Arranjo típico: bomba horizontal monoestágio + acoplamento + motor de indução sobre base metálica comum.*

O corte técnico **interativo** abaixo abre a máquina componente a componente — do bocal de sucção à proteção do acoplamento, com o **caminho do fluido** marcado da entrada à saída. Cada ponto numerado explica a função do componente, onde ele costuma falhar e para onde aprofundar: os componentes transversais [[rolamento|rolamento]] e [[selo-mecanico|selo mecânico]] têm handbooks próprios, e a [[cavitacao|cavitação]] tem a nota de modo de falha completa.

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
| [[goulds-3196|Goulds 3196]] | Radial | 1 | OH1 | Selada | ASME B73.1 | Processo químico |
| [[ksb-meganorm|KSB Meganorm]] | Radial | 1 | OH1 | Selada | ISO 2858 | Indústria geral/água |
| [[flowserve-hpx|Flowserve HPX]] | Radial | 1 | OH2 | Selada API 682 | API 610 | Refino |
| [[grundfos-cr|Grundfos CR]] | Radial | Multi | Vertical in-line | Selada | — | Utilidades/pressurização |
| [[sulzer-msd|Sulzer MSD]] | Radial | Multi | BB3 | Selada | API 610 | Oleodutos/água de caldeira |
| Sulzer AHLSTAR | Radial/Francis | 1 | OH | Selada | ISO 5199 | Papel & celulose |

Cada modelo linkado na primeira coluna tem **ficha própria** (nível 5 da taxonomia — Marca/Modelo) com posição nos eixos, faixas de catálogo, documentação oficial e leitura de confiabilidade; a Sulzer AHLSTAR ganha ficha na expansão do acervo.

## Marcas e modelos

Referências de mercado citadas como âncora de realidade, com a diferença construtiva que define cada uma (links oficiais; D05 — nunca rehosting de catálogo):

- **[[goulds-3196|Goulds 3196 (ITT)]]** ([página do produto](https://www.gouldspumps.com/products/3196-i-frame)) — o arquétipo mundial da ASME B73.1 e a bomba de processo químico mais instalada do mundo; décadas de histórico de campo e intercambiabilidade dimensional total entre gerações — o argumento de estoque de sobressalentes que sustenta o padrão ANSI.
- **[[ksb-meganorm|KSB Meganorm / Megabloc]]** ([página do produto](https://www.ksb.com/pt-br/lc/produtos/bomba/bomba-de-instalacao-a-seco/meganorm/M52B)) — a linha ISO 2858 de maior presença no Brasil (fabricação local); Meganorm com acoplamento e base, Megabloc monobloco (impelidor na ponta do eixo do motor — menos alinhamento, menos base).
- **[[flowserve-hpx|Flowserve HPX]]** ([página do produto](https://www.flowserve.com/products/products-catalog/pumps/overhung-pumps/flowserve-hpx-api-process-pump-0/)) — a OH2 de refino do portfólio API 610 completo da Flowserve (OH2/BB/VS), com forte presença em selos (legado Durametallic); referência quando o serviço exige API 682 integrado.
- **[[sulzer-msd|Sulzer MSD]]** ([página do produto](https://www.sulzer.com/en/shared/products/msd-axially-split-multistage-pump)) — a BB3 de referência do multiestágio pesado (água de alimentação de caldeira, oleodutos de derivados): carcaça bipartida axial com impelidores opostos, mais de 10.000 unidades instaladas. A Sulzer é também referência em papel & celulose (linha AHLSTAR — polpa fibrosa com gás).
- **[[grundfos-cr|Grundfos CR]]** ([página da família CR](https://product-selection.grundfos.com/us/products/cr-cre-cri-crie-crn-crne-crt-crte)) — domínio em verticais in-line multiestágio (série CR) e sistemas prontos com VFD e eletrônica integrados — o extremo "produto de prateleira inteligente" do espectro.
- **[[imbil-ini|Imbil INI]]** ([página da linha INI](https://imbil.com.br/produtos/ini/)) — fabricante nacional relevante em saneamento, irrigação e indústria geral; alternativa local com prazo e assistência no mercado brasileiro.

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

- [[cavitacao|Cavitação]] — o modo assinatura: Mixed/Complex no Fw A, CBM com P-F/2 no Fw B.
- Falha de selo mecânico — Wear-out/Mixed; frequentemente consequência de operação fora do BEP ou perda de flush.
- Falha de rolamento — Wear-out (fadiga) com gatilhos Mixed (lubrificação/contaminação).
- Desalinhamento e vibração excessiva — Mixed; detectável em espectro (2×RPM, harmônicos).
- Erosão/corrosão de impelidor — Wear-out em serviços abrasivos/corrosivos.
