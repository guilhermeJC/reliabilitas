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
