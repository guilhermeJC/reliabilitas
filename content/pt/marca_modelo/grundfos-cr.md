---
slug: grundfos-cr
tipo_nota: marca_modelo
locale: pt
titulo: 'Grundfos CR'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
  - bomba-centrifuga
resumo: 'A vertical in-line multiestágio de referência — 16 tamanhos, até 36 estágios, com a variante CRE de motor e inversor integrados de fábrica.'
fontes:
  - 'Grundfos — data booklet oficial CR, CRI, CRN (api.grundfos.com/literature)'
  - 'Grundfos — página de produto e Grundfos Product Center (grundfos.com)'
tags:
  - multiestágio
  - vertical in-line
  - pressurização
  - CRE
revisado_em: 2026-07-10
---

## Identificação

Bomba centrífuga **vertical in-line multiestágio** da **Grundfos** — a resposta compacta ao head alto: impelidores empilhados em série num eixo vertical, sucção e recalque alinhados na mesma linha de tubulação, footprint mínimo. Família com **16 tamanhos (CR 1s a CR 255)** e variantes de material: CR (ferro fundido/inox), CRI (inox 304), CRN (inox 316L integral). A variante **CRE** traz motor com **inversor de frequência integrado de fábrica** — a bomba regula a própria rotação por setpoint de pressão.

## Posição nos seis eixos

| Eixo | Posição |
| --- | --- |
| Hidráulica | Radial (estágios de baixa $n_q$) |
| Estágios | **Multiestágio — até 36** |
| Configuração | Vertical in-line |
| Vedação | Selada (selo cartucho) |
| Norma | — (produto de catálogo; motores NEMA/IEC) |
| Serviço | Utilidades, pressurização, água industrial, osmose |

## Faixas e construção

| Parâmetro | Valor de catálogo |
| --- | --- |
| Vazão | até ~340 m³/h (1.500 gpm) |
| Head | até ~280 m (910 ft) |
| Temperatura | −15 °C a +90 °C (padrão, conforme selo) |
| Materiais | ferro fundido · 304 · 316L |

Estágios em inox estampado (rendimento alto em máquina pequena), selo mecânico tipo cartucho de troca rápida pelo topo, acoplamento rígido bipartido. O empuxo axial acumulado dos estágios é absorvido pelo mancal do motor — dimensionado para isso pelo fabricante.

## Onde brilha / limitações

**Brilha** em pressurização e utilidades: head alto sem rotação extrema, footprint vertical mínimo, e o ecossistema eletrônico (CRE + sensores + BMS) que faz o "sistema de bombeamento inteligente" de prateleira — o extremo oposto do espectro em relação à bomba de processo API. **Limitações**: fluidos limpos e frios (estágios estampados não toleram sólidos; faixa térmica limitada); manutenção de estágio exige desmontagem da pilha; não é plataforma para processo severo ou normas de O&G.

## Documentação oficial

- [Grundfos — site oficial e Product Center](https://www.grundfos.com/) — seleção, curvas e dimensionamento online.
- [Data booklet CR/CRI/CRN (PDF oficial)](https://api.grundfos.com/literature/Grundfosliterature-6014742.pdf) — faixas, curvas e limites por tamanho (D05 — fonte oficial).

## Confiabilidade

Sem MTBF publicado (regra do setor). O perfil de falha desloca-se com a arquitetura: menos problemas de alinhamento/base (in-line, acoplamento rígido), selo cartucho de troca rápida — e sensibilidade concentrada em qualidade da água (abrasivos nos estágios) e, na CRE, na eletrônica de potência. Benchmarks gerais e hierarquia de falhas em "Confiabilidade em números" no handbook [[bomba-centrifuga|Bomba Centrífuga]].
