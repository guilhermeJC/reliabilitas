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
tags:
  - cavitation
  - NPSH
  - pump curve
anatomia:
  svg: /anatomia/bomba-centrifuga.svg
  alt: 'Schematic meridional cross-section of a horizontal overhung (OH1) centrifugal pump with components numbered 1 to 8'
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

![Schematic meridional cross-section of a horizontal overhung (OH1) centrifugal pump with numbered components](/anatomia/bomba-centrifuga.svg)

1. **Volute (spiral casing)** — collects fluid from the impeller and converts velocity into pressure through progressive section expansion.
2. **Impeller** — the heart of the machine: backward-curved vanes transfer energy to the fluid (Euler's equation).
3. **Shaft** — transmits driver torque to the impeller; sized for stiffness (deflection at the seal) as much as for strength.
4. **[[selo-mecanico|Mechanical seal]]** — dynamic sealing between shaft and casing; the main recurring cost item together with bearings.
5. **[[rolamento|Bearings]]** — carry radial and axial loads; origin of 45–55% of assembly failures.
6. **Suction nozzle** — axial inlet; the lowest-pressure region of the whole system — where [[cavitacao|cavitation]] is born.
7. **Discharge nozzle** — tangential outlet of the volute, at discharge pressure.
8. **Bearing housing** — houses the bearings and the lubrication system (oil bath, mist or grease).

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
