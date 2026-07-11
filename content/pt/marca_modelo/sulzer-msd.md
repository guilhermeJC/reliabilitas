---
slug: sulzer-msd
tipo_nota: marca_modelo
locale: pt
titulo: 'Sulzer MSD'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
  - bomba-centrifuga
resumo: 'A BB3 de referência da Sulzer — multiestágio de carcaça bipartida axial com impelidores opostos, mais de 10.000 unidades em oleodutos, água de alimentação de caldeira e injeção de água.'
fontes:
  - 'Sulzer — página oficial do produto MSD (sulzer.com — MSD axially split multistage pump)'
  - 'Sulzer — família Axially-split multi-stage pumps (between-bearing pumps, sulzer.com)'
  - 'Sulzer — brochura oficial do MSD (E00577)'
tags:
  - BB3
  - API 610
  - multiestágio
  - oleodutos
  - água de caldeira
revisado_em: 2026-07-11
---

## Identificação

Bomba multiestágio *between-bearings* de **carcaça bipartida axial** (designação **BB3**) do fabricante **Sulzer** — a linha que a própria Sulzer descreve como a de maior cobertura hidráulica entre as BB3 do mercado, com **mais de 10.000 unidades instaladas** em oleodutos de derivados, água de alimentação de caldeira, injeção de água e serviços nucleares relacionados à segurança. É o exemplo canônico do degrau seguinte às *overhung*: quando o head exigido ultrapassa o alcance do monoestágio, os estágios em série assumem — ver o Eixo 2 da clusterização no handbook [[bomba-centrifuga|Bomba Centrífuga]].

## Posição nos seis eixos

| Eixo | Posição |
| --- | --- |
| Hidráulica | Radial (estágios de $n_q$ baixo) |
| Estágios | Multiestágio (impelidores em série, montagem oposta) |
| Configuração | BB3 (*between-bearings*, carcaça bipartida axial) |
| Vedação | Selada — caixas de selagem para selo mecânico conforme especificação |
| Norma | API 610 (designação BB3) |
| Serviço | Oleodutos, água de caldeira, injeção de água |

## Faixas e construção

| Parâmetro | Valor de catálogo |
| --- | --- |
| Vazão | até 3.200 m³/h (14.000 gpm) |
| Head | até 2.900 m |
| Pressão | até 300 bar |
| Temperatura | até 205 °C |
| Rotação | até 6.000 rpm |

Carcaça **bipartida axialmente** (a metade superior sai e expõe o conjunto girante completo sem desconectar a tubulação de sucção e descarga), **impelidores em montagem oposta** (*back-to-back* — o empuxo axial se equilibra por arranjo), primeira roda com **sucção simples ou dupla** (conforme o NPSH disponível na instalação), carcaças padrão e de alta pressão com flanges classe **600#, 900# e 1500#**.

## Variantes da linha

| Variante | O que resolve |
| --- | --- |
| MSD | A plataforma-base: multiestágio bipartida axial para oleodutos, água de caldeira e injeção |
| MSD-RO | Dois estágios *back-to-back* para alimentação de membranas de osmose reversa em alta pressão (dessalinização) |

## Diferenciais e pontos de atenção

- **Carcaça bipartida axial**: inspeção e retirada do rotor completo levantando a metade superior — manutenção de multiestágio sem desmontagem estágio a estágio e sem desconectar a tubulação; MTTR menor por projeto.
- **Impelidores opostos**: o empuxo axial dos estágios se cancela aos pares pelo arranjo — a solução de projeto para o problema descrito na seção de empuxos do handbook; o mancal de escora responde só pelo resíduo.
- **Pontos de atenção**: a seleção da classe de flange (600#–1500#) e da carcaça (padrão × alta pressão) acompanha a pressão acumulada dos estágios; a escolha entre primeira roda de sucção simples × dupla é decisão de NPSH na especificação — reavaliar quando o serviço mudar.

## Onde se destaca / limitações

**Destaca-se** onde head extremo encontra serviço contínuo crítico: transporte de derivados em oleodutos, água de alimentação de caldeira e injeção de água — mercados em que a bipartida axial é o padrão de manutenibilidade do multiestágio de grande porte. **Limitações**: é uma plataforma de grande porte para serviço limpo — para vazões e heads moderados, o multiestágio vertical de prateleira ([[grundfos-cr|ex.: Grundfos CR]]) resolve com fração do investimento; temperatura de catálogo até 205 °C.

## Documentação oficial

- [Página do produto MSD — Sulzer](https://www.sulzer.com/en/shared/products/msd-axially-split-multistage-pump) — especificações, brochura oficial (E00577) e estudos de caso.
- [Família de bipartidas axiais multiestágio — Sulzer](https://www.sulzer.com/en/products/pumps/between-bearing-pumps/axially-split-multi-stage-pumps) — o contexto BB da linha (D05 — sempre a fonte oficial).

## Confiabilidade

Fabricantes não publicam MTBF de catálogo — o dado duro vem do campo (ver "Confiabilidade em números" no handbook [[bomba-centrifuga|Bomba Centrífuga]]). Duas leituras de projeto desta plataforma: os **impelidores opostos** removem do mancal de escora a maior carga axial do multiestágio — falha repetida de escora numa BB3 pede auditoria do balanceamento do arranjo, não rolamento "melhor" —, e a **bipartida axial** reduz o tempo de intervenção: em ativo de oleoduto ou caldeira, MTTR é metade da conta de disponibilidade.
