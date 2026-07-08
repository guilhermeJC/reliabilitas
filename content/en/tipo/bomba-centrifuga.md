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
  - 'Karassik et al., Pump Handbook, 4th ed. (2008), ch. 2 and 12'
  - 'API 610, 12th ed. — Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries'
  - 'ASME B73.1 — Horizontal End Suction Centrifugal Pumps for Chemical Process'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'ANSI/HI 9.6.3 — Operating Regions (POR/AOR)'
  - 'ISO 14224:2016 — equipment taxonomy (class PU, level 6)'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, 4th ed.'
  - 'Gülich — Centrifugal Pumps, 3rd ed. (Springer)'
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
  - cavitation
  - NPSH
  - pump curve
  - BEP
  - API 610
  - affinity laws
anatomia:
  svg: /anatomia/bomba-centrifuga.svg
  alt: 'Schematic meridional cross-section of a horizontal overhung (OH1) centrifugal pump with components numbered 1 to 8'
revisado_em: 2026-07-06
---

## Classification

A **rotodynamic** machine — principle [[dinamicas|Dynamic]], family Pumps, class Fluid Transfer — Liquids (the full chain is in the breadcrumb above). Class **PU** at level 6 (*equipment unit*) of the ISO 14224:2016 taxonomy. The fundamental distinction from positive-displacement pumps: the centrifugal transfers energy to the fluid **continuously, through change of angular momentum** — not by trapping volumes. The direct practical consequence: delivered flow depends on the system resistance (the pump operates where its curve crosses the system curve), and running against a closed valve does not produce immediate destructive overpressure, but heating and recirculation.

It is the most numerous rotating equipment in the process industry — typically **more than 80% of the rotating fleet** of a refinery or chemical plant — and accounts for **30–40% of rotating-equipment maintenance cost** (Bloch & Geitner). That double condition (ubiquity + cost) makes the centrifugal pump the first asset of any serious reliability program.

## Working principle

### Euler's equation — where the energy comes from

The impeller forces the fluid into a rotating path. The theoretical specific energy transferred is given by **Euler's turbomachinery equation**:

$$H_{th} = \frac{u_2 \, c_{u2} - u_1 \, c_{u1}}{g}$$

where $u$ is the blade tangential velocity ($u = \omega r$) and $c_u$ the tangential component of the fluid absolute velocity, at impeller inlet (1) and outlet (2). With purely radial inlet ($c_{u1} = 0$) the expression collapses to $H_{th} = u_2 c_{u2}/g$: **all the head is born at the impeller periphery**. That is why diameter and speed dominate performance — and why impeller trimming is the standard tool for duty-point adjustment.

Real head falls below theoretical through three families of losses: **slip** (the fluid is not perfectly guided by the vanes — Stodola/Wiesner factor), **hydraulic losses** (friction and incidence shock away from design point) and **volumetric losses** (recirculation through the wear rings).

### H–Q curve, BEP and the operating window

Performance is expressed by the **head × flow (H–Q)** curve with the associated power, efficiency and NPSHr curves. The point of maximum efficiency is the **BEP** (*Best Efficiency Point*) — the machine's operational health reference:

- **POR** (*Preferred Operating Region*, ANSI/HI 9.6.3): **70–120% of BEP**. Outside it, radial loads on the shaft, internal recirculation and vibration all grow.
- **AOR** (*Allowable Operating Region*): manufacturer limits; operating outside it consumes [[rolamento|bearing]] and [[selo-mecanico|seal]] life at an accelerated rate.
- Minimum continuous stable flow (MCSF): below it, suction recirculation and heating make operation unsustainable.

### Affinity laws

For the same impeller under variable speed (VFD) — or nearby diameters:

$$\frac{Q_2}{Q_1} = \frac{N_2}{N_1} \qquad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^2 \qquad \frac{P_2}{P_1} = \left(\frac{N_2}{N_1}\right)^3$$

The **cubic** dependence of power is the economic argument for variable-speed drives: reducing speed by 20% cuts ~49% of the power. It is also a reliability warning: small speed increases overload driver and bearings disproportionately.

### NPSH — the existence condition of suction

$$NPSH_a = \frac{P_{\text{suction}} - P_{\text{vapor}}}{\rho g} + z - h_f$$

**NPSHa** (available — a system property) must exceed **NPSHr** (required — a pump property, defined by the 3% head-drop criterion of the HI test) with **margin**: typical NPSHa/NPSHr ratios of **1.1 to 2.5** depending on suction energy (ANSI/HI 9.6.1); API 610 requires **NPSHa ≥ NPSHr + 0.6 m** at the rated point. Insufficient margin leads to [[cavitacao|cavitation]] — this equipment's signature failure mode. The full rigorous treatment (including why the 3% criterion underestimates incipient damage) lives in the cavitation note, Engineer level.

## Anatomy

![Schematic meridional cross-section of a horizontal overhung (OH1) centrifugal pump with numbered components](/anatomia/bomba-centrifuga.svg)

1. **Volute (spiral casing)** — collects fluid at the impeller periphery and converts velocity energy into pressure through progressive section expansion (diffusion). The volute tongue (*cutwater*) defines vane-passing interaction — the source of the BPF (blade-passing frequency) vibration component.
2. **Impeller** — the heart of the machine: backward-curved vanes transfer energy per Euler's equation. Closed (shrouded), semi-open or open depending on service; balance and wear-ring clearances govern vibration and volumetric losses.
3. **Shaft** — transmits driver torque; in process pumps it is sized for **stiffness** (maximum deflection at the seal faces, typically < 0.05 mm) as much as for strength. The $L^3/D^4$ flexibility index is the classic design-comparison criterion.
4. **[[selo-mecanico|Mechanical seal]]** — dynamic sealing between shaft and casing: a pair of flat faces separated by a ~1 μm film. Together with the bearings, the main recurring cost item of the assembly.
5. **[[rolamento|Bearings]]** — carry radial loads (which grow away from BEP) and residual axial thrust; the origin of **45–55% of failures** of the pump assembly.
6. **Suction nozzle** — axial inlet: the lowest-pressure region of the entire system, where [[cavitacao|cavitation]] is born once NPSH margin is exhausted.
7. **Discharge nozzle** — volute outlet at discharge pressure.
8. **Bearing housing** — houses bearings and lubrication (oil bath with sight glass, mist or grease); oil temperature and condition are low-cost monitoring windows.

## Types and differences

The consecrated configuration nomenclature is **API 610**'s (12th ed.), valid as a common language even outside O&G scope:

| Family | Types | Configuration | Typical application |
| --- | --- | --- | --- |
| **Overhung (OH)** | OH1 (foot), OH2 (centerline), OH3–OH5 (vertical in-line) | Impeller cantilevered at shaft end | General process; OH2 is the refining standard |
| **Between-bearings (BB)** | BB1–BB5 (1–2 stages → barrel multistage) | Impeller(s) between bearings | High flow/pressure, boiler feedwater, pipelines |
| **Vertically suspended (VS)** | VS1–VS7 | Immersed vertical column | Sumps, wells, cryogenics, water intake |

Other design splits with direct reliability consequence:

- **Single × double volute:** the double balances radial load at off-BEP flows — mitigates shaft deflection in large machines.
- **Vaned diffuser** (typical in multistage and verticals): converts velocity into pressure with stationary vanes instead of the spiral.
- **ANSI/ASME B73.1 × API 610 × ISO 5199:** B73.1 standardizes interchangeable dimensions for chemical service (the classic OH1 "ANSI pump"); API 610 imposes robustness, temperature and sealing requirements for hydrocarbons; ISO 5199 is the international equivalent of intermediate severity.
- **Sealless:** magnetic drive or canned motor — eliminates the mechanical seal at the cost of sensitivity to particles and dry running.

## Brands and models

Market references cited as reality anchors (official links; D05 — never catalog rehosting):

- **KSB Meganorm / Megabloc** — the most widespread ISO/DIN process line in Brazil.
- **Goulds 3196 (ITT)** — the world archetype of ANSI B73.1; decades of documented field history.
- **Sulzer** — reference in multistage BB and severe refining/pulp services.
- **Grundfos** — dominance in vertical in-lines and packaged systems with integrated VFD.
- **Imbil** — relevant Brazilian manufacturer in sanitation and general industry.
- **Flowserve** — full API 610 portfolio (OH2/BB/VS) for O&G.

## Industry and applications

Dominant sectors: refining and petrochemicals (transfer, unit charge, reflux), chemicals, pulp and paper, sanitation (intake and transmission), mining (slurry — with design adaptations), food and pharma (sanitary variants), utilities (chilled water, condensate, boiler feed). The census rule — **>80% of rotating equipment are centrifugal pumps** — means this asset's maintenance standard defines the whole plant's standard: it is where reliability programs earn or lose credibility.

## Technologies

The state of monitoring practice, in order of maturity:

- **Vibration analysis** (monthly route or online): spectrum + envelope; tracks [[rolamento|bearings]] (defect frequencies), misalignment (2×RPM), unbalance (1×RPM), blade passing (BPF) and the broadband signature of [[cavitacao|cavitation]].
- **Performance monitoring** (PIMS): head, flow and power against the reference curve — performance drift is an early symptom of internal wear and recirculation.
- **Oil analysis** of the bearing housing: particle count, water, viscosity.
- **Low-cost online sensors** (acceleration + temperature, wireless): made coverage of "class B" assets viable beyond manual routes.
- **The VFD as an instrument**: drive current and torque carry process signatures (blockage, severe cavitation) without any extra sensor.

## Components

Transversal components (D10 — modeled once, referenced by every parent equipment):

- [[rolamento|Rolling bearing]] — load support; L10, ISO 15243, defect frequencies.
- [[selo-mecanico|Mechanical seal]] — dynamic sealing; API 682, PV factor, piping plans.

Other items kept in equipment context: wear rings (clearance = volumetric efficiency), coupling (alignment!), baseplate and grouting (the foundation is part of the machine).

## Failure modes

- [[cavitacao|Cavitation]] — the signature mode: Mixed/Complex in Fw A, CBM at P-F/2 in Fw B. **Published.**
- Mechanical seal failure — Wear-out/Mixed; frequently a consequence of off-BEP operation or flush loss. _In production (Day 4b)._
- Bearing failure — Wear-out (fatigue) with Mixed triggers (lubrication/contamination). _In production (Day 4b)._
- Misalignment and excessive vibration — Mixed; detectable in spectrum (2×RPM, harmonics). _In production (Day 4b)._
- Impeller erosion/corrosion — Wear-out in abrasive/corrosive services. _In production (Day 4b)._
