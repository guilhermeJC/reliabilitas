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

A ISO 15243:2017 classifica todo dano de rolamento em **6 categorias com subcategorias**, cada uma com assinatura morfológica própria — um espelho quase perfeito do nosso Framework A:

| Categoria ISO 15243 | Mecanismo | Leitura Fw A típica |
| --- | --- | --- |
| Fadiga de contato (subsuperficial/superficial) | Trincas por ciclos hertzianos → *spalling* | Wear-out (β>1) |
| Desgaste (abrasivo/adesivo) | Partículas ou contato metal-metal ($\lambda$ baixo) | Mixed |
| Corrosão (umidade/fricção — *fretting*, *false brinelling*) | Química + micromovimento parado | Random/Wear-out |
| Erosão elétrica (descarga/corrente de fuga) | Arcos VFD → *fluting* | Mixed (gatilho elétrico) |
| Deformação plástica (*true brinelling*, sobrecarga) | Impacto/estática acima do limite | Random (evento) |
| Trinca e fratura | Sobrecarga, ajuste, defeito | Random/Infant |

A leitura prática: **spalling é o fim da história, não o começo** — na maioria dos casos reais, o iniciador foi lubrificação, contaminação ou montagem (estatísticas de campo: ~50% dos casos têm origem em contaminação + lubrificação). Diagnóstico de causa raiz exige ler a **morfologia** do dano (ISO 15243), não apenas constatar o spall.

## Frequências de defeito — a assinatura na vibração

A geometria do rolamento produz frequências determinísticas quando um defeito toca os corpos rolantes — a base do diagnóstico por envelope/demodulação:

- **BPFO** (pista externa), **BPFI** (pista interna), **BSF** (corpo rolante), **FTF** (gaiola) — todas funções do número de esferas, diâmetros e ângulo de contato, tabeladas pelos fabricantes por designação.
- A progressão clássica do dano: ultrassom/emissão acústica (estágio 1) → envelope com BPFx (estágio 2) → espectro convencional com harmônicos e bandas laterais (estágio 3) → ruído audível e temperatura (estágio 4, dias antes do fim). Essa escada é o **intervalo P-F** concreto do componente — semanas a meses nos estágios iniciais.

## Seleção e boas práticas

- **Designações padronizadas** (ex.: 6205, 6309, 22220): intercambiáveis entre SKF, Schaeffler/FAG, NSK, Timken — os dados de $C$, $C_0$ e frequências de defeito vêm do catálogo do fabricante.
- **Montagem** responde por parcela relevante de mortalidade infantil: aquecimento por indução (nunca chama direta), prensagem pelo anel correto, ajustes de interferência conforme catálogo.
- **Lubrificação**: quantidade e relubrificação por catálogo; excesso de graxa é tão letal quanto falta (batimento térmico).
- Em acionamento por **VFD**: verificar aterramento/anel de descarga do eixo — o *fluting* elétrico é epidêmico em motores modernos.
