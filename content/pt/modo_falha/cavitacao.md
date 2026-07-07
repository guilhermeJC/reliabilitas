---
slug: cavitacao
tipo_nota: modo_falha
locale: pt
titulo: 'Cavitação'
status: published
taxonomia:
  - transferencia-de-fluidos-liquidos
  - bombas
  - dinamicas
  - bomba-centrifuga
iso14224_code: 'ERO'
fontes:
  - 'ASTM G40 — Standard Terminology Relating to Wear and Erosion'
  - 'ASTM G32 — Cavitation Erosion Using Vibratory Apparatus'
  - 'Franc & Michel — Fundamentals of Cavitation (2004, Springer), cap. 8'
  - 'Brennen — Cavitation and Bubble Dynamics (1995, Oxford), cap. 2 e 5'
  - 'Rayleigh (1917) — On the pressure developed in a liquid during the collapse of a spherical cavity, Phil. Mag. 34'
  - 'Naude & Ellis (1961) — ASME J. Basic Engineering 83, p. 648–656 (microjato)'
  - 'Plesset & Chapman (1971) — J. Fluid Mech. 47 (colapso assimétrico)'
  - 'Hutchings & Shipway — Tribology (2017, Elsevier), caps. 4–6'
  - 'ASM Handbook Vol. 11 — Failure Analysis and Prevention (2002)'
  - 'Karassik et al., Pump Handbook, 4ª ed. (2008), cap. 2'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'Moubray, RCM II (1997), cap. 8 — intervalo P-F'
  - 'Nowlan & Heap (1978) — padrões de taxa de falha'
fw_a:
  categoria: mixed_complex
  beta: 'variável (gatilho operacional aleatório + erosão progressiva β≈1,5–3)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'P-F/2 (inspeção mensal típica; contínuo via monitoramento online)'
pf_tipico: 'dias a semanas (erosão); minutos (colapso severo de desempenho)'
plano_manutencao:
  - tarefa: 'Análise de vibração'
    metodo: 'Espectro + envelope; energia banda larga em alta frequência, modulada por BPF'
    periodicidade: 'Mensal (P-F/2)'
  - tarefa: 'Inspeção acústica'
    metodo: 'Ultrassom/estetoscópio na voluta e sucção (ruído de "cascalho")'
    periodicidade: 'Mensal, junto à rota de vibração'
  - tarefa: 'Monitoramento de processo'
    metodo: 'NPSHa calculado vs NPSHr; vazão vs BEP; tendência no PIMS'
    periodicidade: 'Contínuo (alarme de desvio)'
  - tarefa: 'Inspeção visual interna'
    metodo: 'Boroscopia do impelidor em parada de oportunidade; morfologia dos pits'
    periodicidade: 'Oportunidade / anual'
tags:
  - NPSH
  - erosão
  - Rayleigh-Plesset
  - ASTM G32
  - vibração
revisado_em: 2026-07-06
---

## Beginner

**O que é.** Dentro de uma [[bomba-centrifuga|bomba centrífuga]], a pressão na entrada do impelidor pode cair abaixo da **pressão de vapor** do líquido. Nesse instante o líquido ferve localmente — não por calor, mas por falta de pressão: formam-se bolhas de vapor que, arrastadas para regiões de maior pressão, **colapsam violentamente** contra as superfícies metálicas.

**A violência do fenômeno.** Cada bolha que colapsa perto da parede dispara um **microjato de líquido a 100–500 m/s** — velocidade comparável à de um projétil de fuzil — e uma onda de choque local que pode alcançar pressões **milhares de vezes maiores** que a pressão de operação da bomba. Um evento isolado é inofensivo; o problema é que ocorrem **centenas a milhares de colapsos por segundo, sempre no mesmo lugar**.

**Como reconhecer em campo.** Ruído característico de "bombear cascalho", queda de vazão e pressão, vibração elevada e — com o tempo — superfície do impelidor esburacada como casca de laranja.

**Consequências.** Erosão do impelidor, danos em [[selo-mecanico|selo mecânico]] e [[rolamento|rolamentos]] pela vibração, perda de desempenho e, se ignorada, falha funcional da bomba.

**A causa de fundo é quase sempre do sistema, não da bomba:** nível baixo no tanque de sucção, filtro entupido, temperatura alta do fluido, ou a bomba operando longe do ponto para o qual foi selecionada.

## Specialist

### Classificação normativa

A cavitação é normativamente um modo de **erosão** — *cavitation erosion*, conforme a **ASTM G40** (terminologia de desgaste e erosão): "erosão causada pela formação e colapso de cavidades em um líquido junto a uma superfície sólida". A **ASTM G32** padroniza o ensaio de resistência dos materiais ao fenômeno. Essa classificação situa o dano no campo da tribologia e o distingue com precisão de outros modos que produzem resultados superficialmente parecidos — distinção que decide material de reposição, estratégia e correção.

### Diagnóstico diferencial — o que a cavitação NÃO é

**Não é abrasão.** O desgaste abrasivo (Hutchings, cap. 4; lei de Archard) exige partículas duras ou contato deslizante — remove material por micro-corte tangencial e deixa **sulcos orientados** na direção do escoamento. Na cavitação com fluido limpo não há partícula nem deslizamento: o impacto é **perpendicular** e produz **crateras sem direção preferencial**. Consequência prática: revestimentos duros (WC-Co) que resolvem abrasão têm eficácia limitada contra cavitação — dureza não é o parâmetro governante (Franc & Michel, cap. 8: cerâmicas duras porém frágeis podem se sair pior que ligas mais macias e tenazes).

**Não é corrosão (como mecanismo primário).** Pites de corrosão têm bordas suaves, produtos de corrosão acumulados e aparecem onde a eletroquímica manda (metais dissimilares, frestas, depósitos). Pites de cavitação têm **bordas rugosas e metal limpo** (o impacto remove continuamente o filme passivo) e aparecem exatamente onde a termodinâmica prevê — as regiões de menor pressão do escoamento. A prova definitiva: inox 316L com excelente resistência química é severamente erodido por cavitação em água limpa (ASM Handbook Vol. 11, seção de identificação de mecanismos de desgaste).

### O que ocorre — os mecanismos reais

1. **Erosão por impacto** (primário): microjato + onda de choque removem material diretamente, formando os pits.
2. **Deformação plástica repetitiva com encruamento**: impactos abaixo do limiar de remoção deformam a superfície; o material encrua, perde ductilidade local.
3. **Fadiga superficial**: os ciclos de impacto nucleiam e propagam trincas subsuperficiais — placas inteiras se destacam (a fase de perda acelerada de massa).
4. **Tribocorrosão** (situacional): em fluidos agressivos, o impacto remove o filme passivo e a corrosão ataca o metal nu — sinergia em que o dano combinado excede a soma das parcelas.

### Tipos de cavitação em bombas

- **Clássica de sucção (NPSH insuficiente)** — a mais comum; dano na face de baixa pressão das pás, próximo ao olho do impelidor.
- **Recirculação de sucção/descarga** — operação longe do BEP; dano em posições características (lado de pressão na recirculação de sucção).
- **Vórtice de superfície** — nível baixo/submergência insuficiente arrasta ar+vapor.
- **Falsa cavitação (entrada de ar)** — diagnóstico diferencial obrigatório: sintomas acústicos parecidos, correção completamente diferente (estanqueidade da sucção, não NPSH).

### Framework A — diagnóstico

`Mixed/Complex`: o **gatilho é operacional e aleatório** (pode surgir a qualquer momento em que a margem de NPSH se esgote ou o ponto de operação fuja do BEP), mas o **dano é progressivo** — a erosão acumula com β>1. Decompor por FMEA quando a causa raiz for recorrente: a resposta correta para "cavita toda vez que o tanque opera baixo" é operacional, não de manutenção.

### Framework B — prescrição

Existe **P-F detectável** (vibração, ruído, tendência de desempenho) e a falha é **evidente** → **CBM com periodicidade P-F/2**. Tarefas no plano exportável abaixo da página. A correção definitiva é operacional/de projeto — as camadas de ação, em ordem de custo-eficácia:

1. **Operacional**: restaurar nível/pressão de sucção, limpar filtros, reposicionar ponto de operação (válvula, rotação).
2. **Sistema**: rebaixar a bomba, aumentar diâmetro/encurtar sucção, resfriar o fluido, indutor no olho do impelidor.
3. **Material** (paliativo consciente): impelidor em duplex/aço inox austenítico com maior encruamento, recuperação por solda com ligas resistentes — compra tempo, não elimina a causa.

## Engineer

### Termodinâmica e nucleação

A cavitação inicia quando a pressão estática local cruza a **pressão de vapor** $P_v(T)$ do líquido. Água a 20 °C: $P_v \approx 2{,}34$ kPa; a 80 °C: $\approx 47{,}4$ kPa — a margem de NPSH derrete com a temperatura. A nucleação real é heterogênea: microbolhas de gás dissolvido e cavidades em partículas/paredes servem de embriões (a água "pura" de laboratório resiste a trações muito maiores).

### A dinâmica da bolha — Rayleigh-Plesset

O crescimento e colapso de uma bolha esférica de raio $R(t)$ num líquido é governado pela equação de **Rayleigh-Plesset**:

$$\rho \left( R\ddot{R} + \frac{3}{2}\dot{R}^2 \right) = P_v - P_\infty(t) - \frac{2\sigma}{R} - \frac{4\mu \dot{R}}{R}$$

Do caso ideal de Rayleigh (1917) sai o **tempo de colapso** de uma cavidade vazia:

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

O impacto excede o limite de escoamento de qualquer liga de engenharia por 1–2 ordens de grandeza — em área microscópica, por microssegundos, **repetidamente**. Nenhum material "resiste"; os melhores apenas falham mais devagar.

### NPSH — formulação rigorosa

$$NPSH_a = \frac{P_{\text{sucção}} - P_{\text{vapor}}}{\rho g} + z - h_f$$

O **NPSHr** de catálogo é definido pelo critério **HI de queda de 3% do head** no teste — um critério de *desempenho*, não de *dano*: a erosão incipiente começa tipicamente com NPSHa bem acima do NPSHr₃%. Daí as margens normativas: **NPSHa/NPSHr = 1,1–2,5** conforme a energia de sucção (ANSI/HI 9.6.1, rev. 2024) e **NPSHa ≥ NPSHr + 0,6 m** (API 610). Parâmetros associados: velocidade específica de sucção $N_{ss}$ (projetos com $N_{ss}$ agressivo estreitam a janela estável de vazão) e o número de cavitação $\sigma = (P_\infty - P_v)/(\tfrac{1}{2}\rho U^2)$, que adimensionaliza a propensão do escoamento.

### Resistência dos materiais

O ranking prático de resistência à erosão por cavitação (ensaios ASTM G32) **não segue a dureza**, e sim a combinação tenacidade + capacidade de encruamento + resistência à fadiga superficial:

ferro fundido (pior) → aço carbono → bronze-alumínio → 316L → **duplex/super duplex** → **stellite (Co-Cr)** e aços austeníticos com transformação induzida (os melhores da prática industrial).

### Detecção quantitativa

- **Vibração**: energia de **banda larga em alta frequência** (sem raia discreta dominante), modulada pela passagem de pás ($BPF = n_{\text{pás}} \times N$). A assinatura estocástica distingue cavitação de defeitos determinísticos ([[rolamento|rolamento]], desalinhamento).
- **Emissão acústica/ultrassom**: detecta o colapso antes do espectro convencional — o estágio mais precoce do P-F.
- **Desempenho**: queda de head ≥ 3% define o limiar de teste; em operação, a *tendência* (PIMS) de head e potência contra a curva de referência denuncia o regime.
- **Estado da arte**: sensores MEMS de alta frequência + classificadores ML sobre espectros têm elevado a taxa de detecção precoce em monitoramento contínuo; *digital twins* hidráulicos calculam NPSHa em tempo real a partir da instrumentação de processo.

### Conexão com confiabilidade — Weibull e o P-F

Tratando a erosão como desgaste: **β ≈ 1,5–3** sobre o tempo em condição cavitante — use a calculadora abaixo para sensibilidade de $R(t)$, MTTF e B10. O intervalo P-F observado (dias a semanas entre vibração detectável e perda funcional; minutos no colapso severo de desempenho) sustenta a periodicidade **P-F/2 mensal** para rotas (Moubray, cap. 8) e justifica monitoramento contínuo em ativos críticos. No Fw A a categoria é **Mixed/Complex** (Nowlan & Heap: padrões D/E/F dominam gatilhos operacionais): a decisão TBM seria tecnicamente inválida — não há idade característica de falha enquanto a condição operacional não se instala.
