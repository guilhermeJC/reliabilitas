---
slug: cavitacao
tipo_nota: modo_falha
locale: pt
titulo: 'Cavitação'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
  - bomba-centrifuga
iso14224_code: 'CAV'
fontes:
  - 'ASTM G40 — Standard Terminology Relating to Wear and Erosion'
  - 'ASTM G32 — Cavitation Erosion Using Vibratory Apparatus'
  - 'ISO 14224:2016 — Tabela B.2 (cavitação como mecanismo de falha próprio)'
  - 'Franc & Michel — Fundamentals of Cavitation (2004, Springer), caps. 4 e 8'
  - 'Brennen — Cavitation and Bubble Dynamics (1995, Oxford), caps. 2, 3 e 5'
  - 'Gülich — Centrifugal Pumps, 3ª ed. (2014, Springer), caps. 3, 6 e 11'
  - 'Rayleigh (1917) — On the pressure developed in a liquid during the collapse of a spherical cavity, Phil. Mag. 34'
  - 'Naude & Ellis (1961) — ASME J. Basic Engineering 83, p. 648–656 (microjato)'
  - 'Plesset & Chapman (1971) — J. Fluid Mech. 47 (colapso assimétrico)'
  - 'Paris & Erdogan (1963) — ASME J. Basic Engineering 85 (lei de propagação de trinca)'
  - 'Hattori, Maeda & Otobe (2004) — Wear 257 (dureza × resistência à cavitação)'
  - 'Fraser (1981) — Recirculation in Centrifugal Pumps, ASME 81-WA/FE-6'
  - 'Hutchings & Shipway — Tribology (2017, Elsevier), caps. 4–6'
  - 'ASM Handbook Vol. 11 — Failure Analysis and Prevention (2002)'
  - 'Karassik et al., Pump Handbook, 4ª ed. (2008), cap. 2'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, 4ª ed. (2012), cap. 7'
  - 'Perez — Troubleshooting Rotating Machinery (2022, Wiley), cap. 4'
  - 'Japikse, Marscher & Furst — Centrifugal Pump Design and Performance (1997), cap. 8 (indutores)'
  - 'Çengel & Boles — Thermodynamics: An Engineering Approach, 8ª ed., Tabela A-4'
  - 'Budynas & Nisbett — Shigley''s Mechanical Engineering Design, 10ª ed., cap. 6 (fadiga, Kt)'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'ANSI/HI 9.8 — Rotodynamic Pumps: Intake Design'
  - 'API 610, 12ª ed. — Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries'
  - 'ISO 9906:2012 — Rotodynamic Pumps: Hydraulic Performance Acceptance Tests'
  - '"A Review of Pump Cavitation Fault Detection Methods Based on Different Signals" — Processes (MDPI) 11(7):2007, 2023'
  - 'Suslick (1990) — Sonochemistry, Science 247 (temperaturas de colapso)'
  - 'Moubray, RCM II (1997), caps. 6 e 7 — tarefas preventivas e preditivas, intervalo P-F'
  - 'Nowlan & Heap (1978) — padrões de taxa de falha'
fw_a:
  categoria: mixed_complex
  beta: 'variável (gatilho operacional aleatório + erosão progressiva β≈1,5–3)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'P-F/2 (inspeção mensal típica; contínuo via monitoramento online em ativos críticos)'
pf_tipico: '~1 semana (ferro fundido, cavitação severa) a ~6 meses (inox, moderada) — Bloch & Geitner; minutos no colapso severo de desempenho'
plano_manutencao:
  - tarefa: 'Analisar vibração em banda de alta frequência'
    metodo: 'Espectro + envelope com bomba em carga; energia banda larga 10–25 kHz modulada por BPF; comparar contra baseline da máquina sã'
    periodicidade: 'Mensal (P-F/2)'
  - tarefa: 'Inspecionar acusticamente a sucção e a voluta'
    metodo: 'Ultrassom/estetoscópio com bomba em carga; ruído de "cascalho" contínuo; distinguir de entrada de ar (teste de estanqueidade)'
    periodicidade: 'Mensal, junto à rota de vibração'
  - tarefa: 'Monitorar margem de NPSH e posição no BEP'
    metodo: 'NPSHa calculado da instrumentação vs NPSHr de curva; vazão vs BEP; tendência de head e potência no PIMS'
    periodicidade: 'Contínuo (alarme de desvio)'
  - tarefa: 'Inspecionar visualmente o impelidor'
    metodo: 'Boroscopia em parada de oportunidade; morfologia dos pits (bordas rugosas, metal limpo) e profundidade vs critério de reparo'
    periodicidade: 'Oportunidade / anual'
tags:
  - NPSH
  - erosão
  - Rayleigh-Plesset
  - ASTM G32
  - vibração
  - recirculação
revisado_em: 2026-07-10
---

## Beginner

**O que é.** Dentro de uma [[bomba-centrifuga|bomba centrífuga]], a pressão na entrada do impelidor pode cair abaixo da **pressão de vapor** do líquido. Nesse instante o líquido ferve localmente — não por calor, mas por falta de pressão: formam-se bolhas de vapor que, arrastadas para regiões de maior pressão dentro do impelidor, **colapsam violentamente** contra as superfícies metálicas. É a diferença entre ebulição (mudança de fase por temperatura) e cavitação (mudança de fase por queda de pressão).

**A violência do fenômeno.** Cada bolha que colapsa perto da parede dispara um **microjato de líquido a 100–500 m/s** — velocidade comparável à de um projétil de fuzil — e uma onda de choque local que supera **milhares de vezes** a pressão de operação da bomba. No núcleo da bolha em colapso, a temperatura chega por microssegundos a valores comparáveis à superfície do Sol. Um evento isolado é inofensivo; o problema é que ocorrem **centenas a milhares de colapsos por segundo, sempre no mesmo lugar**.

**Como reconhecer em campo.** Ruído característico de "bombear cascalho" ou estalidos, vazão e pressão instáveis ou em queda, vibração elevada e — com o tempo — superfície do impelidor esburacada como casca de laranja.

**O que a cavitação custa.** Três contas ao mesmo tempo: **energia** (o rendimento hidráulico cai e a bomba passa a gastar mais para entregar menos), **reparo** (impelidor erodido exige solda especializada ou substituição — um dos componentes mais caros do conjunto) e **indisponibilidade** (a falha madura para em dias, não em meses). Há ainda o dano colateral: a vibração de cavitação acelera a falha do [[selo-mecanico|selo mecânico]] e dos [[rolamento|rolamentos]] — é comum o selo falhar *antes* de o impelidor furar.

**A causa de fundo é quase sempre do sistema, não da bomba:** nível baixo no tanque de sucção, filtro entupido, temperatura alta do fluido, ou a bomba operando longe do ponto para o qual foi selecionada. E a regra de ouro do operador: **nunca "alivie" a cavitação fechando a válvula de sucção** — isso derruba ainda mais a pressão na entrada e agrava o fenômeno. Reduza a vazão pela **descarga**, nunca pela sucção.

## Specialist

### Classificação normativa — as duas convenções

Pela **ASTM G40** (terminologia de desgaste e erosão), a cavitação é um modo de **erosão** — *cavitation erosion*: "erosão causada pela formação e colapso de cavidades em um líquido junto a uma superfície sólida". A **ASTM G32** padroniza o ensaio de resistência dos materiais. Já a **ISO 14224:2016** (Tabela B.2) — a norma que estrutura a taxonomia desta plataforma — lista a **cavitação como mecanismo de falha próprio**, subdivisão da categoria *material failure*, **distinto** de erosão e de corrosão. As duas convenções não conflitam: a ISO nomeia o *mecanismo* (o processo físico); a ASTM descreve o *resultado* (dano erosivo). Esta nota usa o código `CAV` da convenção ISO e descreve o dano na convenção ASTM. A distinção decide material de reposição, estratégia de manutenção e correção.

### Diagnóstico diferencial — o que a cavitação NÃO é

**Não é abrasão.** O desgaste abrasivo (Hutchings, cap. 4) exige partículas duras ou contato deslizante e obedece à lei de Archard, $W = k \, F_N / H$ — o volume removido é inversamente proporcional à **dureza** $H$. Remove material por micro-corte tangencial e deixa **sulcos orientados** na direção do escoamento. Na cavitação com fluido limpo não há partícula nem deslizamento: o impacto é **perpendicular** e produz **crateras sem direção preferencial**. Consequência prática direta: revestimentos duros (WC-Co) que resolvem abrasão têm eficácia limitada contra cavitação — dureza não é o parâmetro governante (Franc & Michel, cap. 8: cerâmicas duras porém frágeis podem se sair pior que ligas mais macias e tenazes).

**Não é corrosão (como mecanismo primário).** Pites de corrosão têm bordas suaves, produtos de corrosão acumulados e aparecem onde a eletroquímica manda (metais dissimilares, frestas, depósitos). Pites de cavitação têm **bordas rugosas e metal limpo** (o impacto remove continuamente o filme passivo) e aparecem exatamente onde a termodinâmica prevê — as regiões de menor pressão do escoamento. A prova definitiva: inox 316L com excelente resistência química é severamente erodido por cavitação em água limpa (ASM Handbook Vol. 11).

### Diagnóstico de campo — a tabela das confusões clássicas

Quatro fenômenos produzem sintomas parecidos e correções completamente diferentes. Errar aqui é trocar impelidor para resolver um flange que suga ar:

| | Cavitação de sucção | Entrada de ar (falsa cavitação) | Recirculação (off-BEP) | Flashing (fluido saturado) |
| --- | --- | --- | --- | --- |
| **Causa raiz** | NPSHa < exigido | Vazamento na linha/vedação de sucção | Operação longe do BEP | Fluido próximo da saturação vaporiza na sucção |
| **Quando piora** | Ao **aumentar** vazão (NPSHr sobe) | Independe da margem de NPSH | Em **baixa** vazão | Ao subir temperatura / cair pressão do sistema |
| **Som/assinatura** | Cascalho contínuo; banda larga alta frequência | Estalos irregulares; bolhas visíveis no visor | Ruído intermitente; **sub-síncronos 0,3–0,8×RPM** | Como cavitação, com histórico térmico |
| **Teste de campo** | Melhora ao reduzir vazão pela descarga ou subir nível | Não muda com NPSH; teste de estanqueidade acha o ponto | Melhora ao **aumentar** vazão | Correlaciona com T e pressão de vapor |
| **Correção** | Restaurar margem de NPSH | Estanqueidade da sucção | Reposicionar ponto de operação (VFD/válvula) | Subresfriar/pressurizar a sucção |

### O que ocorre — os mecanismos reais

1. **Erosão por impacto** (primário): microjato + onda de choque removem material diretamente, formando os pits característicos.
2. **Deformação plástica repetitiva com encruamento**: impactos abaixo do limiar de remoção deformam a superfície; a densidade de discordâncias cresce, o material encrua — fica mais duro e **menos dúctil**. Amostras em ensaio ASTM G32 mostram aumento mensurável de microdureza superficial *antes* de qualquer perda de massa (Franc & Michel): o dano começa invisível, no **período de incubação**.
3. **Fadiga superficial**: a borda de cada pit é um concentrador de tensão ($K_t \approx 3$ para descontinuidade circular — Shigley, cap. 6) e a camada encruada tem energia de fratura reduzida; os ciclos de impacto nucleiam e propagam microtrincas que coalescem e destacam placas inteiras — a fase de perda acelerada de massa.
4. **Tribocorrosão** (situacional): em fluidos agressivos (água do mar, pH extremo), o impacto remove o filme passivo e a corrosão ataca o metal nu antes da repassivação — sinergia em que o dano combinado excede a soma das parcelas (fatores de 2–5× reportados).

O resultado macroscópico é o ciclo autocatalítico: pit → concentrador de tensão → microtrinca → lasca → pit maior. A matemática da propagação está no nível Engineer.

### Tipos de cavitação em bombas

- **Clássica de sucção (NPSH insuficiente)** — a mais comum; bolhas nucleiam na face de baixa pressão das pás junto ao olho do impelidor e colapsam ao avançar para a zona de pressão. Dano na borda de ataque, lado de sucção. **Piora ao aumentar a vazão** (o NPSHr cresce com Q²).
- **Recirculação de sucção** — em baixa vazão o fluido não é guiado pelas pás e forma vórtices de recirculação na entrada, com núcleos de baixíssima pressão — **mesmo com NPSHa adequado** (Fraser, 1981). Dano no **lado de pressão** das pás. Quanto maior a energia e a velocidade específica de sucção do projeto, mais cedo (em vazões relativamente mais altas) a recirculação se instala.
- **Recirculação de descarga** — operação muito abaixo do BEP; refluxo na saída do impelidor e na língua da voluta. Assinatura típica: **componentes sub-síncronos (0,3–0,8×RPM)** e nível de vibração instável — diferente da cavitação de sucção, que produz nível elevado estável.
- **Vórtice de superfície / submergência insuficiente** — nível baixo no poço arrasta um cordão de ar+vapor para o bocal (critérios de submergência mínima: ANSI/HI 9.8).
- **Falsa cavitação (entrada de ar)** — diagnóstico diferencial obrigatório (tabela acima): sintomas acústicos parecidos, correção completamente diferente.

O caso "o NPSH está adequado mas ela cavita" é quase sempre **recirculação**: o engenheiro confere a margem, encontra folga e descarta cavitação — quando o problema é a **posição no BEP**, não a sucção.

### Framework A — diagnóstico

`Mixed/Complex`: o **gatilho é operacional e aleatório** (surge quando a margem de NPSH se esgota ou o ponto foge do BEP), mas o **dano é progressivo** — a erosão acumula com β>1. A IT-MNT-001 lista "cavitação intermitente em bombas" como exemplo canônico da categoria — e manda **decompor por FMEA**: a resposta correta para "cavita toda vez que o tanque opera baixo" é operacional (controle de nível), não uma tarefa de manutenção.

### Framework B — prescrição

Existe **P-F detectável** (vibração, ruído, tendência de desempenho) e a falha é **evidente** → **CBM com periodicidade P-F/2**. Tarefas no plano exportável abaixo da página. A correção definitiva é operacional/de projeto — as camadas de ação, em ordem de custo e reversibilidade:

1. **Operacional imediata** (sem parar a máquina): restaurar nível/pressão de sucção; limpar filtros; reduzir vazão **pela válvula de descarga** — **nunca pela sucção** (estrangular a sucção derruba a pressão de entrada e intensifica o colapso; erro de operação clássico documentado por Perez, cap. 4); reduzir rotação via VFD — pelas leis de similaridade o **NPSHr cai com o quadrado da rotação** (−20% de rotação ≈ −36% de NPSHr, com bônus de −49% de potência).
2. **Instalação**: aumentar o diâmetro da linha de sucção — as perdas caem com a **quinta potência** do diâmetro (ver Engineer): +20% de diâmetro ≈ −60% de perdas; dobrar ≈ −97%. Encurtar e retificar a sucção (mínimo de 5–10 diâmetros retos antes do bocal); redutor **excêntrico com face plana para cima** (API 610 — o concêntrico cria bolsão de ar); velocidade na sucção ≤ 1,5 m/s para água limpa (ANSI/HI 9.8); resfriar o fluido; rebaixar a bomba ou subir o nível.
3. **Intervenção na bomba**: indutor axial no olho do impelidor (reduz o NPSHr do conjunto em 50–70% — Japikse); impelidor com olho de sucção maior (reavaliar BEP); troca de material (paliativo consciente — compra vida, não elimina a causa).

**Prevenção por projeto:** margem de NPSH pela **ANSI/HI 9.6.1 (2024)** — razão NPSHa/NPSHr de **1,1 a 2,5** conforme energia de sucção e velocidade específica; pela **API 610**, NPSHa ≥ NPSHr + **1,0 m em toda a região de operação permitida** (AOR). Teste de desempenho e NPSH conforme **ISO 9906**. Geometria de captação conforme **ANSI/HI 9.8**.

## Engineer

### Termodinâmica: $P_v(T)$ e a margem que derrete

A cavitação inicia quando a pressão estática local cruza a pressão de vapor $P_v(T)$. A dependência com a temperatura é governada pela equação de **Clausius-Clapeyron** (com vapor ideal):

$$\frac{dP_v}{dT} = \frac{L_{vap} \, P_v}{R_v \, T^2}$$

— o crescimento é **exponencial**, não linear. Para a água (Çengel & Boles, Tabela A-4):

| T (°C) | $P_v$ (kPa) | vs. 20 °C |
| --- | --- | --- |
| 20 | 2,34 | 1,0× |
| 40 | 7,38 | 3,2× |
| 60 | 19,94 | 8,5× |
| 70 | 31,19 | 13,3× |
| 80 | 47,39 | 20,3× |
| 100 | 101,33 | 43,3× |

A leitura operacional: uma instalação com margem confortável a 25 °C pode cavitar severamente **sem nenhuma modificação física** — basta o processo aquecer. O exemplo numérico abaixo quantifica exatamente isso. A nucleação real é heterogênea: microbolhas de gás dissolvido e cavidades em partículas/paredes servem de embriões (água desgaseificada de laboratório resiste a trações muito maiores antes de cavitar — Brennen, cap. 1).

### A dinâmica da bolha — Rayleigh-Plesset

O crescimento e colapso de uma bolha esférica de raio $R(t)$ é governado por:

$$\rho \left( R\ddot{R} + \frac{3}{2}\dot{R}^2 \right) = P_B - P_\infty(t) - \frac{2\sigma}{R} - \frac{4\mu \dot{R}}{R}$$

onde $P_B = P_v + P_g$ é a pressão interna (vapor + gás não condensável residual — o termo que amortece o colapso final e alimenta o rebote). O lado esquerdo é a inércia do líquido; $P_B - P_\infty$ é o motor: quando a bolha entra na zona de alta pressão do impelidor, $P_\infty$ salta, o termo fica fortemente negativo e o colapso é instável — quanto menor $R$, mais rápido ele se acelera. Do caso ideal de Rayleigh (1917) sai o **tempo de colapso** de uma cavidade vazia:

$$\tau \approx 0{,}915\, R_0 \sqrt{\frac{\rho}{P_\infty - P_v}}$$

— para $R_0 = 1$ mm em água à pressão atmosférica, $\tau \approx 91$ μs: o colapso é praticamente instantâneo, e a energia potencial de pressão se concentra num volume que tende a zero.

### Colapso assimétrico: microjato e onda de choque

Perto de uma parede o colapso é **assimétrico** (Plesset & Chapman, 1971): o lado da bolha voltado ao fluido livre acelera antes, atravessando a bolha como um **microjato** que atinge a superfície perpendicularmente a **100–500 m/s** (visualizado por Naude & Ellis, 1961). O rebote emite ainda uma **onda de choque** com picos locais de **1–10 GPa** por microssegundos em raios micrométricos (Brennen, cap. 5; Franc & Michel, cap. 8).

| Referência de pressão | Ordem de grandeza |
| --- | --- |
| Descarga de bomba de processo | 0,5–3 MPa |
| Sistema hidráulico industrial | 10–40 MPa |
| Injeção diesel common rail | 150–300 MPa |
| Escoamento do aço 316L | ~170 MPa |
| **Onda de choque do colapso** | **1.000–10.000 MPa** |

O impacto excede o limite de escoamento de qualquer liga de engenharia por 1–2 ordens de grandeza — em área microscópica, por microssegundos, **repetidamente**: com 100 a 10.000 colapsos por segundo por cm² (Brennen, cap. 3), uma bomba cavitando acumula até **~10⁸ impactos por hora por cm²** — fadiga de ciclo ultra-alto, muito além dos 10⁷ ciclos da curva S-N convencional. No núcleo da bolha, a sonoluminescência evidencia temperaturas de 5.000–15.000 K no colapso final (Suslick) — mais quente que a superfície do Sol, em volume nanométrico.

### Do impacto à perda de massa — a micromecânica

A sequência quantificável: (1) impactos acima do limite de escoamento deformam plasticamente a superfície; o **encruamento** eleva a microdureza local antes de qualquer perda de massa — a impressão digital do período de **incubação** da curva MDE do ensaio G32. (2) A borda de cada pit concentra tensão ($K_t \approx 3$); a camada encruada, agora frágil, nucleia microtrincas. (3) A propagação segue a lei de **Paris & Erdogan**:

$$\frac{da}{dN} = C \, (\Delta K)^m$$

— e como cada colapso sobre um pit existente aumenta $\Delta K$ conforme a trinca cresce, a propagação acelera de forma não linear: trincas coalescem, placas se destacam, e a curva de perda de massa sai da incubação para a taxa máxima. É por isso que a erosão por cavitação **não é linear no tempo** — e por que inspeção visual precoce subestima o dano.

### NPSH — formulação rigorosa

Aplicando Bernoulli do nível do reservatório de sucção (0) ao flange de entrada da bomba (1), com perdas $\Sigma h_f$:

$$NPSH_a = \frac{P_0 - P_v(T)}{\rho g} - H_s - \Sigma h_f$$

onde $P_0$ é a pressão absoluta na superfície do líquido, $H_s$ a altura estática (positiva com a bomba **acima** do nível; negativa quando afogada) e $\Sigma h_f$ as perdas na linha de sucção. Referência de cota: linha de centro do eixo (horizontais). Cada termo é uma alavanca de intervenção:

- $P_0/\rho g$: fixado pela altitude quando o tanque é atmosférico — 10,33 m ao nível do mar, ~9,2 m a 1.000 m, ~8,1 m a 2.000 m. Instalações no Planalto Central partem com ~1 m a menos que a costa.
- $H_s$: cada metro de elevação da bomba subtrai um metro de NPSHa.
- $\Sigma h_f$: por Darcy-Weisbach, $h_f = f \, (L/D) \, V^2/2g$; com vazão fixa, $V \propto D^{-2}$, logo $h_f \propto D^{-5}$ (f ≈ constante). A alavanca mais forte da instalação:

| Diâmetro da sucção | Redução nas perdas |
| --- | --- |
| D × 1,2 | ~60% |
| D × 1,5 | ~87% |
| D × 2,0 | ~97% |

- $P_v(T)/\rho g$: cresce exponencialmente com a temperatura (tabela acima).

**O que o NPSHr de catálogo significa — e o que não significa.** O NPSHr é o **NPSH₃**: o valor em que o head já caiu 3% no teste (ISO 9906 / HI) — um critério de *desempenho*, não de *dano*. A **cavitação incipiente (NPSHi) ocorre com NPSH muito ACIMA do NPSH₃** — tipicamente 2 a 6 vezes, conforme Gülich (cap. 6): no ponto de catálogo a bomba já cavita audivelmente e erode; ela só ainda não perdeu 3% de head. É essa hierarquia que fundamenta as margens normativas: razão NPSHa/NPSHr de **1,1–2,5** por energia de sucção (ANSI/HI 9.6.1:2024) e **≥ +1,0 m em toda a AOR** (API 610).

Parâmetros associados: velocidade específica de sucção $N_{ss}$ (projetos agressivos estreitam a janela estável de vazão e recirculam mais cedo); número de cavitação $\sigma = (P_\infty - P_v)/(\tfrac{1}{2}\rho U^2)$, que adimensionaliza a propensão do escoamento; e a lei de similaridade $NPSH_r \propto N^2$ — a base quantitativa da correção por VFD.

### Exemplo numérico — a mesma instalação em duas temperaturas

Tanque atmosférico ao nível do mar, bomba 2,0 m acima do nível mínimo, perdas de sucção 1,2 m, NPSHr₃ = 4,0 m no ponto de operação.

**Água a 60 °C** ($\rho = 983$ kg/m³; $P_v = 19{,}94$ kPa): $NPSH_a = 10{,}51 - 2{,}0 - 1{,}2 - 2{,}07 = 5{,}24$ m → margem de +1,24 m e razão 1,31 — atende à API 610 e à HI para baixa energia de sucção (alta energia pediria mais).

**O processo aquece para 80 °C** ($\rho = 972$ kg/m³; $P_v = 47{,}39$ kPa): $NPSH_a = 10{,}63 - 2{,}0 - 1{,}2 - 4{,}97 = 2{,}46$ m → **2,46 < 4,0**: cavitação franca, sem que nada na instalação tenha mudado. As opções, na ordem das camadas: subresfriar/subir nível (+), reduzir rotação (NPSHr cai com N²), rebaixar a bomba, ou indutor. A conta inteira pode ser refeita com os seus números — é a auditoria de sucção que antecede qualquer troca de material.

### Resistência dos materiais

A correlação entre dureza e resistência à cavitação é **fraca** (Hattori et al., 2004: R² < 0,5 entre famílias metálicas) — os parâmetros que governam são limite de fadiga, tenacidade e capacidade de encruar sem fraturar. O ensaio **ASTM G32** (horn vibratório a 20 kHz, amplitude 50 μm, amostra em água destilada) mede a perda de massa e expressa o resultado como MDE (profundidade média de erosão) e MDER (taxa). O ranking consolidado (Franc & Michel; ASM Handbook Vol. 18), em taxa relativa de erosão (menor = melhor):

| Material | MDER relativo | Nota de aplicação |
| --- | --- | --- |
| Stellite 6 (Co-Cr-W) | 1 (referência) | Revestimento de áreas críticas |
| Aço CA6NM (13Cr-4Ni) | ~3 | Padrão de rotores hidráulicos |
| Duplex UNS S31803 | ~4 | Bombas de processo severo |
| AISI 316L | ~8 | Processo químico geral |
| Bronze naval | ~20 | Água do mar (com sacrifício) |
| Aço carbono | ~35 | Evitar em zona cavitante |
| Ferro fundido cinzento | ~50–80 | O pior caso — ver abaixo |

O ferro fundido cinzento falha tão rápido por razão microestrutural: as **lamelas de grafita** têm resistência à tração ~nula e funcionam como rede de pré-trincas distribuída ($K_t$ locais > 5 em bordas agudas) — cada impacto encontra trincas prontas para propagar e conectar. **Critério de intervenção:** pits rasos e dispersos → acompanhar por boroscopia; pits coalescendo ou borda de ataque comprometida → recuperação por solda com liga resistente (eletrodos base Co ou inox austenítico com alto encruamento) e balanceamento; recorrência em serviço inevitavelmente cavitante → upgrade de material (duplex/CA6NM) *depois* de esgotar as correções de sistema — material melhor compra vida, não elimina causa.

### Severidade, taxa de erosão e o P-F

As correlações empíricas de Gülich (cap. 6) indicam taxa de erosão crescendo com potência alta da velocidade na entrada do impelidor (expoente ≈ 6) e com o comprimento da cavidade de vapor — a severidade escala de forma brutal com rotação e energia de sucção. É por isso que o intervalo P-F varia ordens de grandeza: **~1 semana** (ferro fundido, cavitação severa, água quente) a **~6 meses** (inox, cavitação moderada, hidrocarboneto leve) nos casos industriais de Bloch & Geitner (cap. 7). Calibre a rota para o **pior P-F plausível do seu par material×serviço** — e migre para monitoramento contínuo quando P-F/2 ficar menor que o ciclo de rota praticável.

### Detecção quantitativa

- **Vibração**: energia de **banda larga em 10–25 kHz** (sem raia discreta dominante), modulada pela passagem de pás ($BPF = n_{\text{pás}} \times N$); kurtosis elevada na banda alta distingue a impulsividade da cavitação de outros ruídos de banda larga. A assinatura estocástica separa cavitação de defeitos determinísticos ([[rolamento|rolamento]], desalinhamento); sub-síncronos 0,3–0,8×RPM apontam recirculação. **Baseline primeiro**: estabeleça a referência da máquina sã em condição de carga conhecida e alarme por desvio (ex.: 2× o RMS de banda alta do baseline) — o valor absoluto varia máquina a máquina.
- **Emissão acústica (100 kHz–1 MHz)**: capta o colapso e a nucleação de microtrincas antes do espectro convencional — o estágio mais precoce do P-F; exige sensor dedicado e disciplina contra ruído industrial.
- **Pulsação de pressão**: transdutores dinâmicos na sucção/descarga; amplitude em BPF e harmônicos cresce com cavitação; componentes de baixa frequência denunciam instabilidade de recirculação (Gülich, cap. 10).
- **Corrente do motor (via VFD)**: oscilações de torque pela variação de densidade do fluido bifásico aparecem na assinatura de corrente — detecção sem sensor adicional, útil em frotas distribuídas.
- **Desempenho**: queda de head ≥ 3% define o limiar de teste; em operação, a *tendência* (PIMS) de head e potência contra a curva de referência denuncia o regime antes disso.
- **Estado da arte**: a revisão de Liu et al. (Processes, 2023) consolida o campo — vibração é o método mais difundido, emissão acústica o mais precoce; classificadores de ML sobre espectros alcançam acurácias altas em bancada (fusão de sinais supera sinal único), com o gargalo prático na escassez de dados rotulados de cavitação real — *transfer learning* é a fronteira ativa. *Digital twins* hidráulicos calculam NPSHa em tempo real da instrumentação de processo e alarmam a margem, não o sintoma.

### Conexão com confiabilidade — Weibull e o fechamento RCM

Tratando a erosão como desgaste: **β ≈ 1,5–3** sobre o tempo em condição cavitante — use a calculadora abaixo para sensibilidade de $R(t)$, MTTF e B10. No Fw A a categoria é **Mixed/Complex** (Nowlan & Heap: os padrões de gatilho aleatório dominam): não há idade característica de falha enquanto a condição operacional não se instala — **TBM é tecnicamente inválida** (trocar impelidor "a cada N meses" não remove nem antecipa o gatilho). Com P-F detectável e falha evidente, a decisão é **CBM com periodicidade P-F/2** (Moubray, cap. 7 — tarefas preditivas), monitoramento contínuo justificado em ativos críticos ou de P-F curto. A saída definitiva permanece operacional/de projeto: margem de NPSH e posição no BEP são variáveis de engenharia, não de manutenção.
