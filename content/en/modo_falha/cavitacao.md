---
slug: cavitacao
tipo_nota: modo_falha
locale: en
titulo: 'Cavitation'
status: published
taxonomia:
  - transferencia-de-fluidos-liquidos
  - bombas
  - dinamicas
  - bomba-centrifuga
iso14224_code: 'ERO'
fontes:
  - 'ASTM G40 — Standard Terminology Relating to Wear and Erosion'
  - 'ASTM G32 — Cavitation Erosion Using Vibratory Apparatus'
  - 'Franc & Michel — Fundamentals of Cavitation (2004, Springer), ch. 8'
  - 'Brennen — Cavitation and Bubble Dynamics (1995, Oxford), ch. 2 and 5'
  - 'Rayleigh (1917) — On the pressure developed in a liquid during the collapse of a spherical cavity, Phil. Mag. 34'
  - 'Naude & Ellis (1961) — ASME J. Basic Engineering 83, p. 648–656 (microjet)'
  - 'Plesset & Chapman (1971) — J. Fluid Mech. 47 (asymmetric collapse)'
  - 'Hutchings & Shipway — Tribology (2017, Elsevier), ch. 4–6'
  - 'ASM Handbook Vol. 11 — Failure Analysis and Prevention (2002)'
  - 'Karassik et al., Pump Handbook, 4th ed. (2008), ch. 2'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'Moubray, RCM II (1997), ch. 8 — P-F interval'
  - 'Nowlan & Heap (1978) — failure rate patterns'
fw_a:
  categoria: mixed_complex
  beta: 'variable (random operational trigger + progressive erosion β≈1.5–3)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'P-F/2 (typical monthly inspection; continuous via online monitoring)'
pf_tipico: 'days to weeks (erosion); minutes (severe performance collapse)'
plano_manutencao:
  - tarefa: 'Vibration analysis'
    metodo: 'Spectrum + envelope; broadband high-frequency energy, modulated by BPF'
    periodicidade: 'Monthly (P-F/2)'
  - tarefa: 'Acoustic inspection'
    metodo: 'Ultrasound/stethoscope at volute and suction ("gravel" noise)'
    periodicidade: 'Monthly, with the vibration route'
  - tarefa: 'Process monitoring'
    metodo: 'Calculated NPSHa vs NPSHr; flow vs BEP; PIMS trending'
    periodicidade: 'Continuous (deviation alarm)'
  - tarefa: 'Internal visual inspection'
    metodo: 'Impeller boroscopy at opportunity shutdowns; pit morphology'
    periodicidade: 'Opportunity / yearly'
tags:
  - NPSH
  - erosion
  - Rayleigh-Plesset
  - ASTM G32
  - vibration
revisado_em: 2026-07-06
---

## Beginner

**What it is.** Inside a [[bomba-centrifuga|centrifugal pump]], pressure at the impeller inlet can drop below the liquid's **vapor pressure**. At that instant the liquid boils locally — not from heat, but from lack of pressure: vapor bubbles form and, dragged into higher-pressure regions, **collapse violently** against metal surfaces.

**The violence of the phenomenon.** Each bubble collapsing near the wall fires a **liquid microjet at 100–500 m/s** — comparable to a rifle bullet — plus a local shock wave that can reach pressures **thousands of times higher** than the pump's operating pressure. One isolated event is harmless; the problem is that **hundreds to thousands of collapses per second happen at the same spot**.

**How to recognize it in the field.** Characteristic "pumping gravel" noise, drop in flow and pressure, elevated vibration and — over time — an impeller surface pitted like an orange peel.

**Consequences.** Impeller erosion, [[selo-mecanico|mechanical seal]] and [[rolamento|bearing]] damage through vibration, performance loss and, if ignored, functional failure of the pump.

**The underlying cause is almost always the system, not the pump:** low suction-tank level, clogged strainer, high fluid temperature, or the pump running far from the point it was selected for.

## Specialist

### Normative classification

Cavitation is normatively an **erosion** mode — *cavitation erosion* per **ASTM G40** (wear and erosion terminology): "erosion caused by the formation and collapse of cavities in a liquid at a solid surface". **ASTM G32** standardizes the material resistance test. This classification places the damage within tribology and distinguishes it precisely from other modes that produce superficially similar results — a distinction that decides replacement material, strategy and correction.

### Differential diagnosis — what cavitation is NOT

**Not abrasion.** Abrasive wear (Hutchings, ch. 4; Archard's law) requires hard particles or sliding contact — it removes material by tangential micro-cutting and leaves **grooves oriented** along the flow. In cavitation with clean fluid there is no particle and no sliding: the impact is **perpendicular** and produces **craters with no preferred direction**. Practical consequence: hard coatings (WC-Co) that solve abrasion have limited effectiveness against cavitation — hardness is not the governing parameter (Franc & Michel, ch. 8: hard but brittle ceramics can perform worse than softer, tougher alloys).

**Not corrosion (as the primary mechanism).** Corrosion pits have smooth edges, accumulated corrosion products, and appear where electrochemistry dictates (dissimilar metals, crevices, deposits). Cavitation pits have **rough edges and clean metal** (the impact continuously strips the passive film) and appear exactly where thermodynamics predicts — the lowest-pressure regions of the flow. The definitive proof: 316L stainless with excellent chemical resistance is severely eroded by cavitation in clean water (ASM Handbook Vol. 11, wear-mechanism identification section).

### What does occur — the real mechanisms

1. **Impact erosion** (primary): microjet + shock wave remove material directly, forming the pits.
2. **Repetitive plastic deformation with work hardening**: impacts below the removal threshold deform the surface; the material hardens and loses local ductility.
3. **Surface fatigue**: impact cycles nucleate and propagate subsurface cracks — whole platelets detach (the accelerated mass-loss phase).
4. **Tribocorrosion** (situational): in aggressive fluids, impact strips the passive film and corrosion attacks bare metal — a synergy where combined damage exceeds the sum of the parts.

### Types of cavitation in pumps

- **Classic suction cavitation (insufficient NPSH)** — the most common; damage on the low-pressure face of the vanes near the impeller eye.
- **Suction/discharge recirculation** — operation far from BEP; damage in characteristic positions (pressure side for suction recirculation).
- **Surface vortex** — low level/insufficient submergence drags air+vapor in.
- **False cavitation (air entrainment)** — mandatory differential diagnosis: similar acoustic symptoms, completely different correction (suction air-tightness, not NPSH).

### Framework A — diagnosis

`Mixed/Complex`: the **trigger is operational and random** (it can appear whenever NPSH margin vanishes or the operating point drifts from BEP), but the **damage is progressive** — erosion accumulates with β>1. Decompose via FMEA when the root cause is recurrent: the correct answer to "it cavitates every time the tank runs low" is operational, not maintenance.

### Framework B — prescription

There is a **detectable P-F** (vibration, noise, performance trend) and the failure is **evident** → **CBM at P-F/2 periodicity**. Tasks in the exportable plan below the page. Definitive correction is operational/design — the action layers, in cost-effectiveness order:

1. **Operational**: restore suction level/pressure, clean strainers, reposition operating point (valve, speed).
2. **System**: lower the pump, enlarge/shorten suction piping, cool the fluid, inducer at the impeller eye.
3. **Material** (conscious palliative): duplex/austenitic impeller with higher work-hardening capacity, weld repair with resistant alloys — buys time, does not remove the cause.

## Engineer

### Thermodynamics and nucleation

Cavitation starts when local static pressure crosses the liquid's **vapor pressure** $P_v(T)$. Water at 20 °C: $P_v \approx 2.34$ kPa; at 80 °C: $\approx 47.4$ kPa — NPSH margin melts with temperature. Real nucleation is heterogeneous: dissolved-gas microbubbles and cavities on particles/walls act as embryos (truly "pure" laboratory water withstands far greater tensions).

### Bubble dynamics — Rayleigh-Plesset

Growth and collapse of a spherical bubble of radius $R(t)$ in a liquid is governed by the **Rayleigh-Plesset** equation:

$$\rho \left( R\ddot{R} + \frac{3}{2}\dot{R}^2 \right) = P_v - P_\infty(t) - \frac{2\sigma}{R} - \frac{4\mu \dot{R}}{R}$$

From Rayleigh's ideal case (1917) comes the **collapse time** of an empty cavity:

$$\tau \approx 0.915\, R_0 \sqrt{\frac{\rho}{P_\infty - P_v}}$$

— for $R_0 = 1$ mm in water at atmospheric pressure, $\tau \approx 91$ μs: collapse is practically instantaneous, and the pressure potential energy concentrates into a volume that tends to zero.

### Asymmetric collapse: microjet and shock wave

Near a wall the collapse is **asymmetric** (Plesset & Chapman, 1971): the bubble side facing the free fluid accelerates first, crossing the bubble as a **microjet** that strikes the surface perpendicularly at **100–500 m/s** (first visualized by Naude & Ellis, 1961). The rebound also emits a **shock wave** with local peaks of **1–10 GPa** for microseconds within micrometre radii (Brennen, ch. 5; Franc & Michel, ch. 8).

| Pressure reference | Order of magnitude |
| --- | --- |
| Process pump discharge | 0.5–3 MPa |
| Industrial hydraulic system | 10–40 MPa |
| Common-rail diesel injection | 150–300 MPa |
| 316L steel yield strength | ~170 MPa |
| **Bubble-collapse shock wave** | **1,000–10,000 MPa** |

The impact exceeds the yield strength of any engineering alloy by 1–2 orders of magnitude — over a microscopic area, for microseconds, **repeatedly**. No material "resists"; the best merely fail more slowly.

### NPSH — rigorous formulation

$$NPSH_a = \frac{P_{\text{suction}} - P_{\text{vapor}}}{\rho g} + z - h_f$$

Catalog **NPSHr** is defined by the **HI 3% head-drop** test criterion — a *performance* criterion, not a *damage* one: incipient erosion typically begins with NPSHa well above NPSHr₃%. Hence the normative margins: **NPSHa/NPSHr = 1.1–2.5** depending on suction energy (ANSI/HI 9.6.1, 2024 rev.) and **NPSHa ≥ NPSHr + 0.6 m** (API 610). Associated parameters: suction specific speed $N_{ss}$ (aggressive $N_{ss}$ designs narrow the stable flow window) and the cavitation number $\sigma = (P_\infty - P_v)/(\tfrac{1}{2}\rho U^2)$, which non-dimensionalizes the flow's propensity.

### Material resistance

The practical ranking of cavitation-erosion resistance (ASTM G32 testing) does **not follow hardness**, but the combination of toughness + work-hardening capacity + surface-fatigue resistance:

cast iron (worst) → carbon steel → aluminium bronze → 316L → **duplex/super duplex** → **stellite (Co-Cr)** and transformation-hardening austenitic steels (the best of industrial practice).

### Quantitative detection

- **Vibration**: **broadband high-frequency** energy (no dominant discrete peak), modulated by vane passing ($BPF = n_{\text{vanes}} \times N$). The stochastic signature distinguishes cavitation from deterministic defects ([[rolamento|bearing]], misalignment).
- **Acoustic emission/ultrasound**: detects collapse before the conventional spectrum — the earliest stage of the P-F.
- **Performance**: head drop ≥ 3% defines the test threshold; in operation, the PIMS *trend* of head and power against the reference curve exposes the regime.
- **State of the art**: high-frequency MEMS sensors + ML classifiers over spectra have raised early-detection rates in continuous monitoring; hydraulic *digital twins* compute NPSHa in real time from process instrumentation.

### Reliability connection — Weibull and the P-F

Treating erosion as wear-out: **β ≈ 1.5–3** over time under cavitating condition — use the calculator below for $R(t)$, MTTF and B10 sensitivity. The observed P-F interval (days to weeks between detectable vibration and functional loss; minutes in severe performance collapse) supports **monthly P-F/2** periodicity for routes (Moubray, ch. 8) and justifies continuous monitoring on critical assets. In Fw A the category is **Mixed/Complex** (Nowlan & Heap: patterns D/E/F dominate operational triggers): a TBM decision would be technically invalid — there is no characteristic failure age until the operating condition sets in.
