---
slug: selo-mecanico
tipo_nota: componente
locale: en
titulo: 'Mechanical Seal'
status: published
taxonomia: []
iso14224_code: 'SE'
resumo: 'Dynamic shaft sealing by a pair of flat faces separated by a ~1 μm fluid film. Transversal component (D10): the leading cause of pump intervention together with bearings, and the highest recurring-cost item in rotating equipment.'
fontes:
  - 'API 682, 4th ed. — Pumps: Shaft Sealing Systems for Centrifugal and Rotary Pumps'
  - 'FSA — API 682 Part 5: Piping Plans (Fluid Sealing Association)'
  - 'John Crane — official technical documentation (Type 21, Type 1, API 682 cartridges)'
  - 'Karassik et al., Pump Handbook, 4th ed. — sealing chapter'
  - 'AESSEAL — API 682 4th edition whitepaper'
  - 'John Crane — Metal Bellows Seals (technical documentation on metal bellows and dry gas seals)'
  - 'FBU Seals / Cow Seal — Bellows Mechanical Seals: metal vs. elastomeric (technical comparison)'
tags:
  - API 682
  - PV factor
  - piping plans
  - seal faces
  - dry running
revisado_em: 2026-07-06
---

## Function and principle

The mechanical seal closes the shaft passage through the casing with a pair of **flat faces in rotating contact** — one turns with the shaft, the other is stationary — lapped to flatness of **2–3 light bands** (~1 μm deviation). Between them forms a **~1 μm fluid film** that simultaneously seals and lubricates: a well-operated mechanical seal **leaks by design** — a film evaporating at the atmospheric face, invisible to the naked eye. This delicate physics explains the component's golden rule: a seal rarely "dies of old age"; it is **killed by an operating condition** that destroyed the film.

## Functional anatomy

- **Rotating face + stationary face** — the tribological heart. Typical pairs: carbon-graphite against silicon carbide (general service); SiC against SiC (abrasives); tungsten carbide (mechanical shock).
- **Force elements** — springs (single, multiple) or metal bellows: keep the faces closed at rest and compensate wear and axial movements.
- **Secondary seals** — O-rings/elastomers (or graphite in bellows seals): seal statically and dynamically between seal, shaft and chamber. Fluid chemistry and temperature dictate the material (NBR, EPDM, FKM/Viton, FFKM/Kalrez).
- **Sleeve and gland** — mechanical interface with shaft and seal chamber.
- **Cartridge**: the whole assembly pre-mounted and pre-set at the factory — the API 682 standard, which eliminates the "field setting" variable, historically the component's largest source of infant mortality.

## Types and differences

"Mechanical seal" is a family of solutions that differ in **how many seals exist**, **how the face is pushed against the shaft**, and **how the assembly arrives at the pump** — each classification axis solves a different application risk, and picking the wrong type is, along with incorrect installation, one of the most common root causes of short life wrongly attributed to "poor-quality seal."

### By seal count — the 3 API 682 arrangements

- **Arrangement 1 (single seal)**: a single sealing face directly exposed to the process fluid. Simplest and cheapest; the only barrier between process and atmosphere is the film between the faces.
- **Arrangement 2 (dual unpressurized/tandem)**: two seals in series, with a **non-pressurized** buffer fluid (below process pressure) in the chamber between them — the outer seal only comes into play if the inner one leaks, acting as secondary containment and an alarm system (a change in the buffer signals primary seal failure) without requiring the barrier to withstand full process pressure.
- **Arrangement 3 (dual pressurized)**: two seals with a barrier fluid **pressurized above** process pressure between them — in this arrangement, if either seal leaks, what crosses over is the barrier fluid **into the process or the atmosphere**, never the process fluid outward. It's the only arrangement that makes process leakage **physically impossible** while the barrier holds pressure — mandatory for toxic/hazardous fluids.

### By closing mechanism — pusher × non-pusher (bellows)

- **Pusher (with a sliding secondary seal)**: a dynamic O-ring slides along the shaft/sleeve as the primary face wears, maintaining closure. Simpler and cheaper construction — but the sliding O-ring is exactly the vulnerable point for [[hangup-selo-mecanico|hang-up]]: deposits or corrosion products on the shaft/sleeve can jam that movement, and abrasive fluids can pack into the sliding interface.
- **Non-pusher (bellows — metal or elastomeric)**: a flexible, corrugated element simultaneously replaces the spring and the dynamic O-ring — the bellows itself provides the closing force **and** seals the gap between the rotating and stationary parts, **with no sliding secondary element at all**. This structurally eliminates the shaft-deposit hang-up failure mode (there's no sliding surface to jam), at the cost of more expensive construction and, for metal bellows, sensitivity to fatigue of the corrugated metal itself under repeated thermal/pressure cycles.
  - **Metal bellows**: welded alloys (stainless steel, AM350, Inconel, Hastelloy, titanium depending on process chemistry) — a very wide temperature envelope (cryogenic to > 400°C) and superior chemical resistance; fatigue from repeated flexing of the thin metal is the bellows' own characteristic failure mode, distinct from the component's 5 modes listed below.
  - **Elastomeric bellows**: similar geometry, a rubber element instead of metal — cheaper and simpler, but with a temperature/chemistry envelope limited by the elastomer itself (see [[degradacao-elastomeros-selo-mecanico|elastomer degradation]]).

### By assembly form — component × cartridge

- **Component (build-up)**: individual parts (spring, faces, secondary elements, sleeve) assembled and adjusted in the field, with spring compression set manually by the technician — requires precise measurement and experience; historically the component's largest source of [[instalacao-incorreta-selo-mecanico|infant mortality]] before the cartridge standard.
- **Cartridge**: the whole assembly pre-mounted, pre-set and tested at the factory on its own sleeve — installed as a single unit, with no manual compression adjustment. The standard mandated by API 682 precisely to eliminate the field variable; it does not, however, eliminate the risk of shaft-coupling misalignment, which is external to the seal (see [[instalacao-incorreta-selo-mecanico|incorrect installation note]]).

### API 682's 3 normative types

The standard defines 3 base types combining the axes above into industry-recognized packages: **Type A** (balanced, inside-mounted, cartridge, multi-spring pusher, elastomeric secondaries — the general-purpose seal); **Type B** and **Type C** (both balanced, inside-mounted, cartridge, **metal bellows** — differing in size/duty range) — the choice between them is primarily a matter of fluid temperature/chemistry (metal bellows) versus cost/simplicity (Type A).

### Special cases

- **Split seals**: designed to open into two halves and be installed without disassembling the entire pump/shaft — essential on large or hard-to-access shafts (e.g. agitators, equipment that can't be opened from the end).
- **Gas seals (dry gas seals)**: faces with spiral grooves that generate a **gas** (not liquid) film under rotation, operating **without contact** between the faces in steady state — near-zero process emission, with no liquid barrier fluid consumption; standard in compressors and very-high-speed applications, where conventional liquid dry running would be untenable.

## Balance and the PV factor

Two design quantities govern face capability:

- **Balance ratio** $B$: the fraction of hydraulic pressure that actually closes the faces. **Balanced** seals ($B \approx 0.75$) reduce closing load and survive much higher pressures than unbalanced ones ($B > 1$).
- **PV factor**: the product of contact pressure × peripheral speed — the rate of frictional heat generation at the faces. Each material pair has a PV limit; exceeding it (through pressure, speed, or film loss) leads to film flashing, dry contact and destruction within minutes. Every piping plan exists, ultimately, to **manage face heat**.

## Piping plans — API 682 / Part 5

The piping plans standardize the environment that keeps the seal alive (classic API 682 numbering, popularized by the FSA):

| Plan | What it does | When |
| --- | --- | --- |
| **11** | Recirculation from discharge → chamber through orifice | The clean-service default |
| **32** | Injection of clean external fluid into the chamber | Dirty/abrasive fluids |
| **53A/B/C** | Pressurized dual seal with barrier fluid | Toxic/hazardous fluids (~zero emission) |
| **74** | Pressurized **gas** barrier (gas seal) | The zero-emission state of the art |

**Single × dual** seals (API arrangements 1, 2 and 3): the decision is born from fluid risk — arrangement 3 (pressurized dual) makes process leakage physically impossible while the barrier holds pressure.

## Typical failure modes

The component's field statistics are dominated by **operational events**, not natural wear — life is ~random (**β ≈ 1** in Fw A), which invalidates time-based preventive replacement:

- **Dry running**: film loss through empty chamber, vortexing, or inoperative piping plan — thermal destruction of the faces within minutes. Random. See [[dry-running-selo-mecanico|dedicated note]].
- **Face abrasion**: solids in the film (dirty fluid without a plan 32) score the faces and open a leak path. Accelerated wear-out. See [[abrasao-faces-selo-mecanico|dedicated note]].
- **Elastomer degradation**: incompatible chemistry or temperature — they swell, harden, extrude. Chemical wear-out. See [[degradacao-elastomeros-selo-mecanico|dedicated note]].
- **Hang-up**: deposits (coke, crystallization) prevent axial face tracking. Mixed. See [[hangup-selo-mecanico|dedicated note]].
- **Mounting infant mortality**: largely eliminated by the cartridge standard — where it still appears, investigate procedure and shaft deflection (> 0.05 mm at the face is a death sentence). See [[instalacao-incorreta-selo-mecanico|dedicated note]].

Correct diagnosis starts with the **seal autopsy** (the faces tell the story: radial heat cracks = thermal shock; ring-shaped wear = abrasion; perfect faces + destroyed elastomer = chemistry) — a discipline formalized in FSA and manufacturer failure-analysis guides. The 5 notes above detail the mechanism, Fw A/B and maintenance plan for each mode.

## Numerical example — PV factor and the face limit

Balanced seal ($B \approx 0.75$) on a 50 mm shaft, chamber pressure 10 bar (1.0 MPa), 1,800 rpm:

$$v = \pi \, d \, n = \pi \times 0.05 \times (1{,}800/60) \approx 4.71 \text{ m/s}$$

$$PV = P_{\text{face}} \times v \approx (0.75 \times 1.0 \times 10^6) \times 4.71 \approx 3.5 \times 10^6 \text{ Pa·m/s}$$

Against a typical limit for reference carbon×SiC faces (on the order of $3$–$5 \times 10^6$ Pa·m/s depending on the material pair and piping plan), this operating point is already at the ceiling — any partial loss of the cooling/lubrication plan (e.g. a partially clogged Plan 11) or an increase in pressure/speed pushes the pair out of the safe window, precipitating film flashing. This is why unbalanced seals ($B > 1$) are only justified at low pressures: the same PV reasoning explains why the balance ratio is the first variable to review when a seal keeps failing in the same service.

## Selection and good practice

- **API 682** is the selection and qualification reference even outside O&G: test-qualified seals, cartridge design, 25,000 h (3-year) design life target.
- The root cause of seal failure frequently lies **outside the seal**: off-BEP operation (shaft deflection), marginal NPSH ([[cavitacao|cavitation]] in the chamber), start-up without venting, undersized piping plan.
- Monitoring: chamber temperature, barrier pot pressure/level (plans 53), and good old visual drip inspection — a change in leakage pattern is the component's accessible P-F.
