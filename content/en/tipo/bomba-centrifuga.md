---
slug: bomba-centrifuga
tipo_nota: tipo
locale: en
titulo: 'Centrifugal Pump'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
iso14224_code: 'PU'
fontes:
  - 'Karassik et al., Pump Handbook, 4th ed. (2008), ch. 2 and 12'
  - 'Gülich — Centrifugal Pumps, 3rd ed. (2014, Springer), ch. 3–7 and 11'
  - 'API 610, 12th ed. — Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries'
  - 'ASME B73.1 — Horizontal End Suction Centrifugal Pumps for Chemical Process'
  - 'ISO 5199 / ISO 2858 — centrifugal pumps: requirements and dimensions'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'ANSI/HI 9.6.3 — Operating Regions (POR/AOR)'
  - 'ANSI/HI 9.6.7 — Effects of Liquid Viscosity on Rotodynamic Pump Performance'
  - 'ISO 9906:2012 — Rotodynamic Pumps: Hydraulic Performance Acceptance Tests'
  - 'ISO 14224:2016 — equipment taxonomy (class PU, level 6)'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, 4th ed.'
  - 'Bloch — Pump User''s Handbook: Life Extension (MTBF benchmarks)'
  - 'European Sealing Association — Mechanical Seal Reliability (2025): seals in 60.4% of 3,500 recorded failures'
  - 'Wiesner (1967) — A Review of Slip Factors for Centrifugal Impellers, ASME J. Eng. for Power'
  - 'Stepanoff — Centrifugal and Axial Flow Pumps, 2nd ed. (1957) — radial thrust'
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
  - specific speed
  - system curve
anatomia:
  svg: /anatomia/bomba-centrifuga.svg
  alt: 'Schematic meridional cross-section of a horizontal overhung (OH1) centrifugal pump with components numbered 1 to 8'
  foto:
    arquivo: /anatomia/bomba-centrifuga-foto.jpg
    fonte: 'https://commons.wikimedia.org/wiki/File:Kreiselpumpe-Elektromotor.jpg'
    licenca: 'CC BY-SA 4.0'
    credito: 'HopuWiki (Wikimedia Commons)'
revisado_em: 2026-07-10
---

## Classification

A **rotodynamic** machine — principle [[dinamicas|Rotodynamic]], family Pumps, class Energy Addition to the Fluid (the full chain is in the breadcrumb above). Class **PU** at level 6 (*equipment unit*) of the ISO 14224:2016 taxonomy. The fundamental distinction from positive-displacement pumps: the centrifugal transfers energy to the fluid **continuously, through change of angular momentum** — not by trapping volumes. The direct practical consequence: delivered flow depends on the system resistance (the pump operates where its curve crosses the system curve — see Working principle), and running against a closed valve does not produce immediate destructive overpressure, but heating and recirculation.

It is the most numerous rotating equipment in the process industry — typically **more than 80% of the rotating fleet** of a refinery or chemical plant — and accounts for **30–40% of rotating-equipment maintenance cost** (Bloch & Geitner). That double condition (ubiquity + cost) makes the centrifugal pump the first asset of any serious reliability program.

## Working principle

### Euler's equation — where the energy comes from

The impeller forces the fluid into a rotating path. The theoretical specific energy transferred is given by **Euler's turbomachinery equation**:

$$H_{th} = \frac{u_2 \, c_{u2} - u_1 \, c_{u1}}{g}$$

where $u$ is the blade tangential velocity ($u = \omega r$) and $c_u$ the tangential component of the fluid absolute velocity, at impeller inlet (1) and outlet (2). With purely radial inlet ($c_{u1} = 0$) the expression collapses to $H_{th} = u_2 c_{u2}/g$: **all the head is born at the impeller periphery**. That is why diameter and speed dominate performance — and why impeller trimming is the standard tool for duty-point adjustment.

Real head falls below theoretical through three families of losses. The first is **slip**: the fluid is not perfectly guided by the finite number of vanes. The slip factor of **Wiesner's** classic correlation,

$$\sigma = 1 - \frac{\sqrt{\sin\beta_2}}{Z^{0.7}}$$

($\beta_2$ = vane outlet angle; $Z$ = number of vanes), quantifies the discount — typically 10–25% of the Euler head. Added to it are **hydraulic losses** (friction and incidence shock away from design point) and **volumetric losses** (recirculation through the wear rings).

### Specific speed — the impeller's shape in one number

The **specific speed** condenses the hydraulic geometry:

$$n_q = \frac{n \sqrt{Q}}{H^{3/4}}$$

($n$ in rpm, $Q$ in m³/s, $H$ in m, at BEP). It defines the impeller's *shape* and nearly all of the machine's behavior:

| $n_q$ | Geometry | Typical profile | Behavior |
| --- | --- | --- | --- |
| 10–40 | **Radial** (high head, low flow) | Process, high pressure | Flat curve; power grows with flow |
| 40–160 | **Semi-axial / Francis** | Water, condensate, large flows | Intermediate |
| > 160 | **Axial** (high flow, low head) | Intake, circulation | Steep curve; maximum power at shutoff |

Peak attainable efficiency is also a function of $n_q$ (practical maximum around 40–60; very low $n_q$ pays disproportionate disc friction) — and suction sensitivity grows with impeller-eye energy. It is the first axis of the clustering in the Types section.

### H–Q curve, curve shape and the operating window

Performance is expressed by the **head × flow (H–Q)** curve with the associated power, efficiency and NPSHr curves. Two curve attributes have direct reliability consequences:

- **Stability**: a curve **continuously rising to shutoff** (maximum head at zero flow, typically 110–120% of BEP head in radial machines) has a single possible operating point for each head. **Flat or drooping** curves admit two points at the same head — a source of hunting and unstable load sharing in parallel operation. API 610 requires a continuously rising curve for parallel service.
- **Best Efficiency Point (BEP)** — the operational health reference: **POR** (*Preferred Operating Region*, ANSI/HI 9.6.3): **70–120% of BEP**; outside it radial loads, internal recirculation and vibration all grow. **AOR** (*Allowable Operating Region*): manufacturer limits; running outside consumes [[rolamento|bearing]] and [[selo-mecanico|seal]] life at an accelerated rate. Below the **minimum continuous stable flow (MCSF)**, suction recirculation and heating make operation unsustainable — and at the extreme (*dead-heading*, closed discharge valve) all the power becomes heat in a confined volume: in high-energy pumps internal vaporization destroys the seal within minutes. The minimum-flow line (or ARC valve) exists for that scenario.

### The pump in the system — operating point, parallel and series

The pump does **not choose** where it operates. The system imposes its own curve,

$$H_{sys} = H_{est} + k\,Q^2$$

(static head + losses proportional to Q²), and the operating point is the **intersection** of the two curves. Every operating action is a curve edit: throttling the discharge raises $k$ (the point climbs the pump curve to the left); tank level changes $H_{est}$; a VFD shifts the **pump's** curve (affinity laws). Reading cavitation, recirculation and overload as "the point moved" — and asking *who edited which curve* — is this equipment's most valuable diagnostic habit.

- **Parallel operation** adds flows at constant head — but the real gain depends on the system curve's steepness: with a steep (friction-dominated) system, the second pump adds **far less** than double the flow, and both drift away from BEP. Flat/drooping curves in parallel share load unstably (one pump "carries" the other).
- **Series operation** adds heads at the same flow (boosting) — mind the downstream casing pressure class.

### Affinity laws

For the same impeller under variable speed (VFD) — or nearby diameters:

$$\frac{Q_2}{Q_1} = \frac{N_2}{N_1} \qquad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^2 \qquad \frac{P_2}{P_1} = \left(\frac{N_2}{N_1}\right)^3$$

The **cubic** dependence of power is the economic argument for variable-speed drives: reducing speed by 20% cuts ~49% of the power. Two reliability readings: **NPSHr also falls with N²** (the VFD is an anti-[[cavitacao|cavitation]] tool) — and small speed **increases** overload driver and bearings disproportionately.

### Power, start-up and thrusts

- **Power behavior**: in **radial** machines (low $n_q$) power grows with flow — start with the discharge closed (lowest starting load) and the minimum-flow line open; the motor is sized for **end of curve** (*run-out*), not for BEP. **Axial** machines are the opposite: maximum power at shutoff — start with the discharge open.
- **Radial thrust**: a single volute only balances peripheral pressures at BEP; away from it the radial resultant grows (maximum at shutoff — Stepanoff), flexing the shaft once per revolution (rotating fatigue, seal wear). A **double volute** splits the flow into two channels 180° apart and nearly cancels the resultant — standard on large machines.
- **Axial thrust**: the pressure imbalance between impeller shrouds pushes the rotor toward suction. Balancing: rear wear rings + balance holes (or back vanes); in multistage, opposed impellers (*back-to-back*) or a **balance drum/disc** with an equalization line. The residue belongs to the thrust bearing — repeated thrust-bearing failures call for a balance audit, not a "better" bearing.

### Efficiency decomposed — where the energy goes

$$\eta = \eta_h \cdot \eta_v \cdot \eta_m$$

- **η_h (hydraulic)**: friction and incidence shock — falls quickly away from BEP.
- **η_v (volumetric)**: recirculation through the **wear rings** — doubling the design clearance knocks off whole efficiency points; it is the slow drift that performance monitoring sees (same flow demanding more power).
- **η_m (mechanical)**: bearings, seal and disc friction.

Practical BEP efficiency ranges: ~50–70% in small pumps, 75–88% in well-selected process machines, >90% in large water pumps. Every percentage point is a permanent energy bill — and falling efficiency is a measurable symptom of internal wear before any functional failure.

### NPSH — the existence condition of suction

$$NPSH_a = \frac{P_0 - P_v(T)}{\rho g} - H_s - \Sigma h_f$$

**NPSHa** (available — a system property) must exceed **NPSHr** (required — a pump property, defined by the 3% head-drop test criterion — ISO 9906/HI) with **margin**: NPSHa/NPSHr ratios of **1.1 to 2.5** depending on suction energy (ANSI/HI 9.6.1:2024); API 610 requires **NPSHa ≥ NPSHr + 1.0 m throughout the allowable operating region (AOR)**. Insufficient margin leads to [[cavitacao|cavitation]] — this equipment's signature failure mode. The full rigorous treatment (derivation, why the 3% criterion underestimates incipient damage, worked numerical example) lives in the cavitation note, Engineer level.

### The fluid changes the pump — viscosity, density, gas and priming

- **Viscosity**: catalog curves are for water. Viscous fluid knocks down flow, head and above all efficiency, and raises power — correct with the **ANSI/HI 9.6.7** factors; above a few hundred cSt, the comparison with positive displacement almost always wins.
- **Density**: head in metres **does not depend on ρ** — but pressure ($\Delta p = \rho g H$) and power scale with ρ. The commissioning trap: water-testing (ρ = 1,000) a pump selected for light hydrocarbon (ρ ≈ 750) demands ~33% more power — an undersized motor trips during the test.
- **Free gas**: 2–4% by volume already degrades a standard impeller's head and efficiency; around ~10% the flow separates and the pump loses prime (open-impeller/inducer variants tolerate more).
- **Priming**: a centrifugal **does not pump air** — casing and suction line must be full and vented before start-up (foot valve, vacuum priming, or a self-priming variant). Reverse rotation (swapped three-phase leads) delivers low head/flow and vibration — a commissioning check that precedes any hydraulic diagnosis.
- **Acceptance and baseline**: the **ISO 9906** performance test (acceptance grades 1/2/3) at delivery is the *baseline* against which performance monitoring (PIMS) will measure all future drift — without a baseline, performance-based CBM is guesswork.

## Anatomy

![Horizontal process centrifugal pump coupled to an electric motor on a common baseplate](/anatomia/bomba-centrifuga-foto.jpg)

*Photo: HopuWiki — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kreiselpumpe-Elektromotor.jpg), CC BY-SA 4.0. Typical arrangement: horizontal single-stage pump + coupling + induction motor on a common steel baseplate.*

![Schematic meridional cross-section of a horizontal overhung (OH1) centrifugal pump with numbered components](/anatomia/bomba-centrifuga.svg)

1. **Volute (spiral casing)** — collects fluid at the impeller periphery and converts velocity energy into pressure through progressive section expansion (diffusion). The volute tongue (*cutwater*) defines vane-passing interaction — the source of the BPF (blade-passing frequency) vibration component.
2. **Impeller** — the heart of the machine: backward-curved vanes transfer energy per Euler's equation. Closed (shrouded), semi-open or open depending on service; balance and wear-ring clearances govern vibration and volumetric losses.
3. **Shaft** — transmits driver torque; in process pumps it is sized for **stiffness** (maximum deflection at the seal faces, typically < 0.05 mm) as much as for strength. The $L^3/D^4$ flexibility index is the classic design-comparison criterion.
4. **[[selo-mecanico|Mechanical seal]]** — dynamic sealing between shaft and casing: a pair of flat faces separated by a ~1 μm film. It is the assembly's **no. 1 intervention item** (ESA: seals recorded in ~60% of pump failures) — and in most cases seal failure is a symptom of an upstream cause (off-BEP operation, flush loss, cavitation).
5. **[[rolamento|Bearings]]** — carry radial loads (which grow away from BEP) and residual axial thrust; they account for roughly **one third of assembly failures** — seals and bearings together make up 60–70% of interventions, with contamination + poor lubrication dominating the causes.
6. **Suction nozzle** — axial inlet: the lowest-pressure region of the entire system, where [[cavitacao|cavitation]] is born once NPSH margin is exhausted.
7. **Discharge nozzle** — volute outlet at discharge pressure.
8. **Bearing housing** — houses bearings and lubrication (oil bath with sight glass, mist or grease); oil temperature and condition are low-cost monitoring windows.

## Types and differences

A real centrifugal pump is the **combination of one position on each of six classification axes** — a Goulds 3196 is: radial + single-stage + OH1 + sealed + ASME B73.1 + chemical process. Reading a fleet through these axes is what allows comparing machines, anticipating dominant failure modes and specifying replacements:

### Axis 1 — Hydraulics (impeller shape, via specific speed)

Radial ($n_q$ 10–40, high head/low flow) → semi-axial/Francis (40–160) → axial (>160, high flow/low head). Governs curve shape, power behavior and suction sensitivity (Working principle section).

### Axis 2 — Number of stages

**Single-stage** as far as head and speed can reach; **multistage** (impellers in series on the same shaft) for high head without extreme speed or diameter — boiler feedwater, pipelines, reverse osmosis. Multistage brings the accumulated axial-thrust problem (balance drum/disc) and steeper curves.

### Axis 3 — Mechanical configuration (API 610 nomenclature)

| Family | Types | Configuration | Typical application |
| --- | --- | --- | --- |
| **Overhung (OH)** | OH1 (foot), OH2 (centerline), OH3–OH5 (vertical in-line) | Impeller cantilevered at shaft end | General process; OH2 is the refining standard |
| **Between-bearings (BB)** | BB1–BB5 (1–2 stages → barrel multistage) | Impeller(s) between bearings | High flow/pressure, boiler feedwater, pipelines |
| **Vertically suspended (VS)** | VS1–VS7 | Immersed vertical column | Sumps, wells, cryogenics, water intake |

Valid as a common language even outside O&G scope. Design complements: **single × double volute** (the double balances radial load off-BEP — large machines) and **vaned diffuser** (multistage and verticals).

### Axis 4 — Sealing and drive technology

- **Conventionally sealed**: single or dual [[selo-mecanico|mechanical seal]] with API 682 piping plans — the dominant arrangement; the seal is the no. 1 maintenance item.
- **Magnetic drive (*mag-drive*)**: no seal, no leakage — at the cost of sensitivity to particles and dry running (the fluid cools the internal bearings).
- **Canned motor**: motor rotor immersed in the fluid; maximum hermeticity (toxic/lethal services), same sensitivities.
- **Submersible** (motor below the fluid — deep wells, drainage).

Changing position on this axis changes the **dominant failure mode**: the sealed pump fails at the seal; sealless pumps fail from particles, dry running and internal bearings.

### Axis 5 — Construction standard / service severity

- **ASME B73.1** — the "ANSI pump": interchangeable dimensions for chemical service; the dominant installed base in the Americas.
- **ISO 2858 / ISO 5199** — the international equivalent (dimensions / requirements); the European and Brazilian general-industry standard.
- **API 610** — refining/petrochemical/O&G: demanding casing, temperature, sealing (API 682) and margin requirements; designed for 20+ years of severe service.
- **Sanitary** (EHEDG/3-A) and **water/wastewater** complete the spectrum.

### Axis 6 — Special cases

**Self-priming** (casing with a recirculation reservoir), **regenerative/peripheral** (very high head at minimal flow), **recessed-impeller/vortex** (solids and fibres — efficiency sacrificed), **high-speed with gearbox** (extreme head in a compact machine), **slurry pumps** (rubber/high-chrome linings — mining).

### The matrix — real examples across the six axes

| Model | A1 hydraulics | A2 stages | A3 config. | A4 sealing | A5 standard | Typical service |
| --- | --- | --- | --- | --- | --- | --- |
| [[goulds-3196|Goulds 3196]] | Radial | 1 | OH1 | Sealed | ASME B73.1 | Chemical process |
| [[ksb-meganorm|KSB Meganorm]] | Radial | 1 | OH1 | Sealed | ISO 2858 | General industry/water |
| [[flowserve-hpx|Flowserve HPX]] | Radial | 1 | OH2 | Sealed API 682 | API 610 | Refining |
| [[grundfos-cr|Grundfos CR]] | Radial | Multi | Vertical in-line | Sealed | — | Utilities/pressure boosting |
| Sulzer AHLSTAR | Radial/Francis | 1 | OH | Sealed | ISO 5199 | Pulp & paper |

Each model linked in the first column has its **own sheet** (taxonomy level 5 — Brand/Model) with axis positions, catalog ranges, official documentation and a reliability reading; Sulzer AHLSTAR gets its sheet as the collection expands.

## Brands and models

Market references cited as reality anchors, each with the construction difference that defines it (official links; D05 — never catalog rehosting):

- **[[goulds-3196|Goulds 3196 (ITT)]]** ([official site](https://www.gouldspumps.com/)) — the world archetype of ASME B73.1 and the most-installed chemical process pump in the world; decades of field history and full dimensional interchangeability across generations — the spare-parts argument that sustains the ANSI standard.
- **[[ksb-meganorm|KSB Meganorm / Megabloc]]** ([official site](https://www.ksb.com/)) — the ISO 2858 line with the largest presence in Brazil (local manufacturing); Meganorm with coupling and baseplate, Megabloc close-coupled (impeller on the motor shaft end — less alignment, no baseplate).
- **[[flowserve-hpx|Flowserve HPX]]** ([official site](https://www.flowserve.com/)) — the refining OH2 from Flowserve's full API 610 portfolio (OH2/BB/VS), with a strong sealing heritage (Durametallic legacy); the reference when service demands integrated API 682.
- **[Sulzer](https://www.sulzer.com/)** — the reference in multistage BB (boiler feedwater, pipelines) and in pulp & paper process lines (AHLSTAR — pumping fibrous, gas-laden stock).
- **[[grundfos-cr|Grundfos CR]]** ([official site](https://www.grundfos.com/)) — dominance in vertical in-line multistage (CR series) and packaged systems with integrated VFD and electronics — the "smart off-the-shelf product" end of the spectrum.
- **[[imbil-ini|Imbil INI]]** ([official site](https://www.imbil.com.br/)) — relevant Brazilian manufacturer in sanitation, irrigation and general industry; the local alternative for lead time and support in the Brazilian market.

## Industry and applications

Dominant sectors: refining and petrochemicals (transfer, unit charge, reflux), chemicals, pulp and paper, sanitation (intake and transmission), mining (slurry — with design adaptations), food and pharma (sanitary variants), utilities (chilled water, condensate, boiler feed). The census rule — **>80% of rotating equipment are centrifugal pumps** — means this asset's maintenance standard defines the whole plant's standard: it is where reliability programs earn or lose credibility.

### Reliability in numbers

Consolidated literature benchmarks (re-verified at the source — the ruler for your own fleet):

| Indicator | Reference value | Source |
| --- | --- | --- |
| MTBF/MTBR — refineries and petrochemicals | **3 to 10 years** (the spread is management, not machine) | Bloch, Pump User's Handbook |
| MTBF — chemical plants | ~50–60% of refinery values | Bloch |
| MTBF — ANSI B73.1 pumps (US) | average ~2.5 years · target 3.75 · excellent 4.5+ | Budris/WaterWorld |
| No. 1 component in failures | **Mechanical seal — recorded in 60.4% of 3,500 failures** (18 plants) | European Sealing Association |
| Root cause of premature seal failures | 49% operations · 28% maintenance · 23% engineering | ESA |
| Bearings | ~⅓ of assembly failures; 52% of those from contamination/lubrication | historical user/manufacturer estimates |
| Energy | Pumping systems ≈ **25% of industrial motor energy** | HI/DOE |

Two readings: (1) the seal leads the statistics but **is mostly a symptom** — the root causes point to off-BEP operation, flush loss and deficient suction; attacking the seal without attacking the system is mopping with the tap open. (2) The MTBF spread between plants running the same machines (3× or more) is the quantitative proof that pump reliability is a discipline of specification, installation and operation — exactly what this handbook exists to transfer.

## Technologies

The state of monitoring practice, in order of maturity:

- **Vibration analysis** (monthly route or online): spectrum + envelope; tracks [[rolamento|bearings]] (defect frequencies), misalignment (2×RPM), unbalance (1×RPM), blade passing (BPF) and the broadband signature of [[cavitacao|cavitation]].
- **Performance monitoring** (PIMS): head, flow and power against the ISO 9906 test reference curve — performance drift is an early symptom of internal wear (rings) and recirculation.
- **Oil analysis** of the bearing housing: particle count, water, viscosity.
- **Low-cost online sensors** (acceleration + temperature, wireless): made coverage of "class B" assets viable beyond manual routes.
- **The VFD as an instrument**: drive current and torque carry process signatures (blockage, severe cavitation, dry running) without any extra sensor — and the drive itself is the tool for repositioning the operating point.

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
