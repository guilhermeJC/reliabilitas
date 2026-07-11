---
slug: sulzer-msd
tipo_nota: marca_modelo
locale: en
titulo: 'Sulzer MSD'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
  - bomba-centrifuga
resumo: 'Sulzer''s reference BB3 — axially split multistage pump with opposed impellers, over 10,000 units in product pipelines, boiler feedwater and water injection.'
fontes:
  - 'Sulzer — official MSD product page (sulzer.com — MSD axially split multistage pump)'
  - 'Sulzer — Axially-split multi-stage pumps family (between-bearing pumps, sulzer.com)'
  - 'Sulzer — official MSD brochure (E00577)'
tags:
  - BB3
  - API 610
  - multistage
  - pipelines
  - boiler feed
revisado_em: 2026-07-11
---

## Identification

Between-bearings multistage pump with an **axially split casing** (designation **BB3**) from **Sulzer** — the line Sulzer itself describes as having the broadest hydraulic coverage of any BB3 on the market, with **over 10,000 units installed** in refined-product pipelines, boiler feedwater, water injection and nuclear safety-related services. It is the canonical example of the step beyond overhung pumps: when the required head exceeds what a single stage can deliver, stages in series take over — see Axis 2 of the clustering in the [[bomba-centrifuga|Centrifugal Pump]] handbook.

## Position on the six axes

| Axis | Position |
| --- | --- |
| Hydraulics | Radial (low-$n_q$ stages) |
| Stages | Multistage (impellers in series, opposed arrangement) |
| Configuration | BB3 (*between-bearings*, axially split casing) |
| Sealing | Sealed — stuffing boxes for mechanical seals per specification |
| Standard | API 610 (BB3 designation) |
| Service | Pipelines, boiler feedwater, water injection |

## Ranges and construction

| Parameter | Catalog value |
| --- | --- |
| Flow | up to 3,200 m³/h (14,000 gpm) |
| Head | up to 2,900 m |
| Pressure | up to 300 bar |
| Temperature | up to 205 °C |
| Speed | up to 6,000 rpm |

**Axially split casing** (the upper half lifts off and exposes the complete rotating assembly without disconnecting suction or discharge piping), **opposed impellers** (*back-to-back* — axial thrust is balanced by the arrangement), **single- or double-suction first-stage impeller** (per the installation's available NPSH), standard and high-pressure casings with **600#, 900# and 1500#** flange classes.

## Line variants

| Variant | What it solves |
| --- | --- |
| MSD | The base platform: axially split multistage for pipelines, boiler feed and injection |
| MSD-RO | Two stages back-to-back for high-pressure reverse-osmosis membrane feed (desalination) |

## Differentials and points of attention

- **Axially split casing**: inspection and removal of the complete rotor by lifting the upper half — multistage maintenance without stage-by-stage disassembly and without disconnecting piping; lower MTTR by design.
- **Opposed impellers**: the stages' axial thrust cancels in pairs by arrangement — the design solution to the problem described in the handbook's thrust section; the thrust bearing carries only the residual.
- **Points of attention**: flange class (600#–1500#) and casing selection (standard × high pressure) follow the accumulated stage pressure; the single- vs. double-suction first-stage choice is an NPSH decision at specification time — revisit it when the service changes.

## Where it stands out / limitations

**Stands out** where extreme head meets critical continuous service: refined-product pipelines, boiler feedwater and water injection — markets where the axially split casing is the maintainability standard for large multistage machines. **Limitations**: it is a large-frame platform for clean service — for moderate flows and heads, the off-the-shelf vertical multistage ([[grundfos-cr|e.g., Grundfos CR]]) solves it at a fraction of the investment; catalog temperature up to 205 °C.

## Official documentation

- [MSD product page — Sulzer](https://www.sulzer.com/en/shared/products/msd-axially-split-multistage-pump) — specifications, official brochure (E00577) and case studies.
- [Axially split multistage family — Sulzer](https://www.sulzer.com/en/products/pumps/between-bearing-pumps/axially-split-multi-stage-pumps) — the line's BB context (D05 — always the official source).

## Reliability

Manufacturers do not publish catalog MTBF — the hard data comes from the field (see "Reliability in numbers" in the [[bomba-centrifuga|Centrifugal Pump]] handbook). Two design readings for this platform: the **opposed impellers** remove the multistage's largest axial load from the thrust bearing — repeated thrust-bearing failures on a BB3 call for an audit of the balancing arrangement, not a "better" bearing — and the **axially split casing** cuts intervention time: on a pipeline or boiler-feed asset, MTTR is half of the availability equation.
