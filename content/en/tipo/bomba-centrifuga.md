---
slug: bomba-centrifuga
tipo_nota: tipo
locale: en
titulo: 'Centrifugal Pump'
status: published
taxonomia:
  - transferencia-de-fluidos-liquidos
  - bombas
  - dinamicas
iso14224_code: 'PU'
fontes:
  - 'Karassik et al., Pump Handbook, 4th ed. (2008)'
  - 'API 610, 12th ed. — Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries'
  - 'ASME B73.1 — Horizontal End Suction Centrifugal Pumps for Chemical Process'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
secoes:
  - classificacao
  - principio
  - anatomia
  - tipos
  - marcas
  - industria
  - componentes
  - modos_falha
componentes: []
revisado_em: 2026-07-04
---

## Classification

Rotodynamic machine in the chain [[transferencia-de-fluidos-liquidos|Fluid Transfer — Liquids]] → [[bombas|Pumps]] → [[dinamicas|Dynamic]]. It is the most numerous rotating equipment in the process industry: typically more than 80% of the rotating fleet of a refinery or chemical plant.

## Working principle

The impeller accelerates the liquid radially; the volute (or diffuser) converts kinetic energy into pressure. The energy transferred per unit weight follows the Euler turbomachinery equation — in practice, performance is read from the manufacturer's **H-Q curve**, with three landmarks: shutoff (Q=0), **BEP** (best efficiency point) and runout (maximum flow).

Physical rules that govern reliable operation:

- **Affinity laws:** Q ∝ N · H ∝ N² · P ∝ N³
- **NPSHa > NPSHr + margin** (ANSI/HI 9.6.1; API 610 requires ≥ 0.6 m at rated point) — insufficient margin leads to [[cavitacao|cavitation]]
- **Preferred operating region (POR):** 70–120% of BEP; outside it, recirculation, vibration and radial loads grow

## Anatomy

_Visual trio (D18): real photo + SVG cross-section diagram land on development Day 4; 3D render progressively._

Main elements: impeller (closed/semi-open/open), volute, shaft, bearings, mechanical seal (or packing), stuffing box, wear rings, coupling.

## Types and differences

| Configuration | Typical standard | Application |
| --- | --- | --- |
| Overhung (OH1/OH2) | API 610 / ASME B73.1 | General process, chemical (ANSI), refining (OH2) |
| Between-bearings (BB) | API 610 | High flow/pressure, multistage |
| Vertical (VS) | API 610 | Sumps, wells, cryogenics |

Single vs multistage: the number of impellers multiplies head. Single vs double suction: axial thrust balance at high flows.

## Brands and models

Market reference lines (own record cards in Phase 1): KSB Meganorm/Megabloc · Goulds 3196 (ITT) · Sulzer · Grundfos · Imbil (BR).

## Industry usage

Transfer, recirculation, column feed, cooling water, firefighting. Usually high criticality: 30–40% of the rotating maintenance cost of a typical plant originates in centrifugal pumps.

## Components

Bearings and mechanical seal are transversal components (ISO 14224 *maintainable items*) — their own notes land on Day 4 and will be referenced here.

## Failure modes

- [[cavitacao|Cavitation]]
- _Mechanical seal failure, bearing failure, misalignment, impeller erosion — Day 4._
