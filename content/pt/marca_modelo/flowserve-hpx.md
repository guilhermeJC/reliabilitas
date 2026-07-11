---
slug: flowserve-hpx
tipo_nota: marca_modelo
locale: pt
titulo: 'Flowserve HPX'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
  - bomba-centrifuga
resumo: 'A OH2 API 610 de refino da Flowserve — linha de centro, câmara de selagem API 682, o degrau de severidade acima da bomba química.'
fontes:
  - 'Flowserve — página oficial do HPX API Process Pump (flowserve.com)'
  - 'Flowserve — brochura HPX Centerline Mounted Process Pump API 610 (OH2)'
tags:
  - API 610
  - OH2
  - ISO 13709
  - refino
revisado_em: 2026-07-11
---

## Identificação

Bomba de processo horizontal monoestágio *overhung* **API 610 / ISO 13709 tipo OH2** da **Flowserve**: carcaça suportada pela **linha de centro** (a diferença construtiva que define a OH2 — a carcaça dilata simetricamente em serviço quente, preservando o alinhamento) e câmara de selagem conforme **API 682**. É o degrau de severidade acima das plataformas químicas B73.1/ISO 5199: hidrocarbonetos, alta temperatura, alta pressão, exigência de 20+ anos de vida de projeto.

## Posição nos seis eixos

| Eixo | Posição |
| --- | --- |
| Hidráulica | Radial (monoestágio) |
| Estágios | 1 |
| Configuração | **OH2** (linha de centro) |
| Vedação | Selada — câmara API 682, planos de selagem completos |
| Norma | API 610 / ISO 13709 |
| Serviço | Refino, petroquímica, O&G |

## Faixas e construção

| Parâmetro | Valor de catálogo |
| --- | --- |
| Vazão | até ~2.000 m³/h |
| Head | até ~350 m |
| Pressão | até ~80 bar |
| Temperatura | **−160 °C a +450 °C** |

Suporte de linha de centro para cargas de bocal acima do exigido pela API 610; aleta-guia no bocal de sucção (uniformiza o escoamento — margem de NPSH); materiais nas classes API (S-6 a A-8, incl. duplex). A faixa criogênica (−160 °C) cobre GLP/GNL leve.

## Variantes da linha

| Variante | O que resolve |
| --- | --- |
| HPX | A OH2 padrão de refino (faixas da tabela acima) |
| HPXM | Baixa vazão / alto head (até ~30 m³/h e ~215 m) com hidráulica dedicada e curva ascendente estável até a vazão mínima — o serviço que arruinaria uma OH2 padrão fora do BEP |
| HPX-V | A mesma plataforma em vertical in-line (API 610 OH3) — footprint mínimo |
| HPX6000 | Execução para serviços com sólidos (slurry) da mesma família |

Materiais nas classes da API 610 (aço carbono, cromo, austeníticos, duplex), conforme datasheet do serviço.

## Diferenciais e pontos de atenção

- **Indutor opcional**: para instalações com NPSHa apertado, o indutor axial de alta velocidade específica de sucção reduz o NPSHr do conjunto — a solução de catálogo para o problema tratado na nota de [[cavitacao|cavitação]].
- **Aleta-guia no bocal de sucção**: uniformiza o escoamento na entrada do impelidor — margem de NPSH e estabilidade em vazões parciais.
- **Suporte de linha de centro** dimensionado para cargas de bocal ACIMA do exigido pela API 610 — preserva alinhamento com tubulação quente.
- **Ponto de atenção**: como toda plataforma API, o valor aparece no serviço severo — em serviço frio e brando a HPX é o overspec clássico que a própria API desaconselha (pagar B73.1/ISO 5199 resolve).

## Onde se destaca / limitações

**Destaca-se** exatamente onde a B73.1 para: serviço quente (a montagem por pé da OH1 desalinha com a dilatação — a linha de centro não), hidrocarbonetos com selagem crítica (API 682 nativa), auditoria de projeto O&G (datasheets API completos). **Limitações**: custo de aquisição múltiplo de uma bomba química equivalente — especificar API 610 para serviço frio e brando é o clássico *overspec* que a própria API desaconselha; para head acima da faixa, o caminho é a BB multiestágio ([[sulzer-msd|ex.: Sulzer MSD]]).

## Documentação oficial

- [Página do produto HPX — Flowserve](https://www.flowserve.com/products/products-catalog/pumps/overhung-pumps/flowserve-hpx-api-process-pump-0/) — especificações e literatura.
- Brochura técnica oficial (PUBR000427) e IOM na biblioteca de literatura Flowserve (D05 — sempre a fonte oficial).

## Confiabilidade

Sem MTBF de catálogo, como toda a categoria — mas é para esta classe que valem os melhores benchmarks de campo: **refinarias bem geridas operam bombas API entre 3 e 10 anos de MTBF** (Bloch), e a API 610 existe precisamente para comprar essa longevidade por projeto (margens, cargas de bocal, selagem 682). Hierarquia de falhas e leitura crítica em "Confiabilidade em números" no handbook [[bomba-centrifuga|Bomba Centrífuga]].
