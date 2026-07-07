---
slug: bomba-centrifuga
tipo_nota: tipo
locale: pt
titulo: 'Bomba Centrífuga'
status: published
taxonomia:
  - transferencia-de-fluidos-liquidos
  - bombas
  - dinamicas
iso14224_code: 'PU'
fontes:
  - 'Karassik et al., Pump Handbook, 4ª ed. (2008), caps. 2 e 12'
  - 'API 610, 12ª ed. — Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries'
  - 'ASME B73.1 — Horizontal End Suction Centrifugal Pumps for Chemical Process'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'ANSI/HI 9.6.3 — Operating Regions (POR/AOR)'
  - 'ISO 14224:2016 — taxonomia de equipamentos (classe PU, nível 6)'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, 4ª ed.'
  - 'Gülich — Centrifugal Pumps, 3ª ed. (Springer)'
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
anatomia:
  svg: /anatomia/bomba-centrifuga.svg
  alt: 'Corte esquemático meridional de bomba centrífuga horizontal (OH1) com componentes numerados de 1 a 8'
revisado_em: 2026-07-06
---

## Classificação

Máquina **rotodinâmica** da cadeia [[transferencia-de-fluidos-liquidos|Transferência de Fluidos — Líquidos]] → [[bombas|Bombas]] → [[dinamicas|Dinâmicas]], classe **PU** no nível 6 (*equipment unit*) da taxonomia ISO 14224:2016. A distinção fundamental frente às bombas de deslocamento positivo: a centrífuga transfere energia ao fluido **continuamente, por variação de quantidade de movimento angular** — não por confinamento de volume. Consequência prática direta: a vazão entregue depende da resistência do sistema (a bomba opera onde sua curva cruza a curva do sistema), e operar contra válvula fechada não gera sobrepressão destrutiva imediata, mas aquecimento e recirculação.

É o equipamento rotativo mais numeroso da indústria de processo — tipicamente **mais de 80% do parque rotativo** de uma refinaria ou planta química — e responde por **30–40% dos custos de manutenção de rotativos** (Bloch & Geitner). Essa dupla condição (onipresença + custo) faz da bomba centrífuga o primeiro ativo de qualquer programa sério de confiabilidade.

## Princípio de funcionamento

### A equação de Euler — de onde vem a energia

O impelidor impõe ao fluido uma trajetória giratória. A energia específica teórica transferida é dada pela **equação de Euler das turbomáquinas**:

$$H_{th} = \frac{u_2 \, c_{u2} - u_1 \, c_{u1}}{g}$$

onde $u$ é a velocidade tangencial da pá ($u = \omega r$) e $c_u$ a componente tangencial da velocidade absoluta do fluido, nas seções de entrada (1) e saída (2) do impelidor. Na entrada radial pura ($c_{u1} = 0$), a expressão colapsa para $H_{th} = u_2 c_{u2}/g$: **todo o head nasce na periferia do impelidor**. Por isso diâmetro e rotação dominam o desempenho — e por isso o corte de impelidor (trim) é a ferramenta padrão de adequação de ponto.

O head real fica abaixo do teórico por três famílias de perdas: **escorregamento** (o fluido não é perfeitamente guiado pelas pás — fator de Stodola/Wiesner), **perdas hidráulicas** (atrito e choque de incidência fora do ponto de projeto) e **perdas volumétricas** (recirculação pelos anéis de desgaste).

### Curva H–Q, BEP e a janela de operação

O desempenho se expressa na curva **head × vazão (H–Q)** com as curvas associadas de potência, rendimento e NPSHr. O ponto de máximo rendimento é o **BEP** (*Best Efficiency Point*) — a referência de saúde operacional da máquina:

- **POR** (*Preferred Operating Region*, ANSI/HI 9.6.3): **70–120% do BEP**. Fora dela crescem as cargas radiais sobre o eixo, a recirculação interna e a vibração.
- **AOR** (*Allowable Operating Region*): limites do fabricante; operar fora é consumir vida útil de [[rolamento|rolamentos]] e [[selo-mecanico|selo]] de forma acelerada.
- Vazão mínima contínua estável (MCSF): abaixo dela, recirculação de sucção e aquecimento tornam a operação insustentável.

### Leis de afinidade

Para o mesmo impelidor com rotação variável (VFD) — ou diâmetros próximos:

$$\frac{Q_2}{Q_1} = \frac{N_2}{N_1} \qquad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^2 \qquad \frac{P_2}{P_1} = \left(\frac{N_2}{N_1}\right)^3$$

A dependência **cúbica** da potência é o argumento econômico do acionamento com inversor: reduzir 20% a rotação corta ~49% da potência. É também um alerta de confiabilidade: pequenos aumentos de rotação sobrecarregam acionador e mancais de forma desproporcional.

### NPSH — a condição de existência da sucção

$$NPSH_a = \frac{P_{\text{sucção}} - P_{\text{vapor}}}{\rho g} + z - h_f$$

O **NPSHa** (disponível, propriedade do sistema) precisa exceder o **NPSHr** (requerido, propriedade da bomba, definido pelo critério de queda de 3% do head no teste HI) com **margem**: razões NPSHa/NPSHr típicas de **1,1 a 2,5** conforme a energia de sucção (ANSI/HI 9.6.1); a API 610 exige **NPSHa ≥ NPSHr + 0,6 m** no ponto nominal. Margem insuficiente leva à [[cavitacao|cavitação]] — o modo de falha assinatura deste equipamento. O tratamento rigoroso completo (inclusive por que o critério de 3% subestima o dano incipiente) está na nota de cavitação, nível Engineer.

## Anatomia

![Corte esquemático meridional de bomba centrífuga horizontal (OH1) com componentes numerados](/anatomia/bomba-centrifuga.svg)

1. **Voluta (carcaça espiral)** — coleta o fluido na periferia do impelidor e converte energia de velocidade em pressão pela expansão progressiva de seção (difusão). A língua da voluta (*cutwater*) define a interação de passagem de pás — fonte da componente de vibração em BPF (frequência de passagem de pás).
2. **Impelidor** — o coração da máquina: pás curvadas para trás transferem energia pela equação de Euler. Fechado (com paredes), semiaberto ou aberto conforme o serviço; o balanceamento e a folga com os anéis de desgaste governam vibração e perdas volumétricas.
3. **Eixo** — transmite o torque do acionador; em bombas de processo é dimensionado por **rigidez** (deflexão máxima na face do selo, tipicamente < 0,05 mm) tanto quanto por resistência. O índice de flexibilidade $L^3/D^4$ é critério clássico de comparação entre projetos.
4. **[[selo-mecanico|Selo mecânico]]** — vedação dinâmica entre eixo e carcaça: par de faces planas separadas por filme de ~1 μm. Junto com os rolamentos, o principal item de custo recorrente do conjunto.
5. **[[rolamento|Rolamentos]]** — suportam as cargas radiais (crescem fora do BEP) e o empuxo axial residual; origem de **45–55% das falhas** do conjunto bomba.
6. **Bocal de sucção** — entrada axial: a região de menor pressão de todo o sistema, onde a [[cavitacao|cavitação]] nasce quando a margem de NPSH se esgota.
7. **Bocal de recalque** — saída da voluta na pressão de descarga.
8. **Caixa de mancais** — abriga rolamentos e lubrificação (banho de óleo com visor, névoa ou graxa); a temperatura e a condição do óleo são janelas de monitoramento de baixo custo.

## Tipos e diferenças

A nomenclatura de configuração consagrada é a da **API 610** (12ª ed.), válida como linguagem mesmo fora do escopo O&G:

| Família | Tipos | Configuração | Aplicação típica |
| --- | --- | --- | --- |
| **Overhung (OH)** | OH1 (pé), OH2 (linha de centro), OH3–OH5 (verticais in-line) | Impelidor em balanço na ponta do eixo | Processo geral; OH2 é o padrão de refino |
| **Between-bearings (BB)** | BB1–BB5 (1 ou 2 estágios → multiestágio barril) | Impelidor(es) entre mancais | Alta vazão/pressão, água de alimentação de caldeira, oleodutos |
| **Vertically suspended (VS)** | VS1–VS7 | Coluna vertical imersa | Sumps, poços, criogenia, água de captação |

Outras divisões de projeto com consequência direta em confiabilidade:

- **Voluta simples × dupla:** a dupla equilibra a carga radial em vazões fora do BEP — mitiga deflexão de eixo em máquinas grandes.
- **Difusor aletado** (típico em multiestágio e verticais): converte velocidade em pressão com aletas estacionárias em vez da espiral.
- **ANSI/ASME B73.1 × API 610 × ISO 5199:** a B73.1 padroniza dimensões intercambiáveis para química (a clássica "ANSI pump" OH1); a API 610 impõe requisitos de robustez, temperatura e selagem para hidrocarbonetos; a ISO 5199 é o equivalente internacional de severidade intermediária.
- **Sem selo** (*sealless*): acoplamento magnético ou motor encapsulado (*canned*) — elimina o selo mecânico ao custo de sensibilidade a partículas e à operação a seco.

## Marcas e modelos

Referências de mercado citadas como âncora de realidade (links oficiais; D05 — nunca rehosting de catálogo):

- **KSB Meganorm / Megabloc** — a linha ISO/DIN de processo mais difundida no Brasil.
- **Goulds 3196 (ITT)** — o arquétipo mundial da ANSI B73.1; décadas de histórico de campo documentado.
- **Sulzer** — referência em BB multiestágio e serviços severos de refino/papel.
- **Grundfos** — domínio em in-line verticais e sistemas prontos com VFD integrado.
- **Imbil** — fabricante nacional relevante em saneamento e indústria geral.
- **Flowserve** — portfólio API 610 completo (OH2/BB/VS) para O&G.

## Indústria e aplicações

Setores dominantes: refino e petroquímica (transferência, carga de unidades, refluxo), química, papel e celulose, saneamento (captação e adução), mineração (polpa — com adaptações de projeto), alimentos e farmacêutica (variantes sanitárias), utilidades (água gelada, condensado, alimentação de caldeira). A regra de censo — **>80% dos rotativos são bombas centrífugas** — significa que o padrão de manutenção deste ativo define o padrão da planta inteira: é nele que programas de confiabilidade ganham ou perdem credibilidade.

## Tecnologias

O estado da prática de monitoramento, em ordem de maturidade:

- **Análise de vibração** (rota mensal ou online): espectro + envelope; acompanha [[rolamento|rolamentos]] (frequências de defeito), desalinhamento (2×RPM), desbalanceamento (1×RPM), passagem de pás (BPF) e a assinatura de banda larga da [[cavitacao|cavitação]].
- **Monitoramento de desempenho** (PIMS): head, vazão e potência contra a curva de referência — deriva de desempenho é sintoma precoce de desgaste interno e recirculação.
- **Análise de óleo** dos mancais: contagem de partículas, água, viscosidade.
- **Sensores online de baixo custo** (aceleração + temperatura, wireless): viabilizaram cobertura de ativos "classe B" antes monitorados só por rota.
- **VFD como instrumento**: corrente e torque do inversor carregam assinaturas de processo (bloqueio, cavitação severa) sem sensor adicional.

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
