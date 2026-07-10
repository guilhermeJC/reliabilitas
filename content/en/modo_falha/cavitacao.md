---
slug: cavitacao
tipo_nota: modo_falha
locale: en
titulo: 'Cavitation'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
  - bomba-centrifuga
iso14224_code: 'CAV'
fontes:
  - 'ASTM G40 — Standard Terminology Relating to Wear and Erosion'
  - 'ASTM G32 — Cavitation Erosion Using Vibratory Apparatus'
  - 'ISO 14224:2016 — Table B.2 (cavitation as a failure mechanism in its own right)'
  - 'Franc & Michel — Fundamentals of Cavitation (2004, Springer), ch. 4 and 8'
  - 'Brennen — Cavitation and Bubble Dynamics (1995, Oxford), ch. 2, 3 and 5'
  - 'Gülich — Centrifugal Pumps, 3rd ed. (2014, Springer), ch. 3, 6 and 11'
  - 'Rayleigh (1917) — On the pressure developed in a liquid during the collapse of a spherical cavity, Phil. Mag. 34'
  - 'Naude & Ellis (1961) — ASME J. Basic Engineering 83, p. 648–656 (microjet)'
  - 'Plesset & Chapman (1971) — J. Fluid Mech. 47 (asymmetric collapse)'
  - 'Paris & Erdogan (1963) — ASME J. Basic Engineering 85 (crack propagation law)'
  - 'Hattori, Maeda & Otobe (2004) — Wear 257 (hardness × cavitation resistance)'
  - 'Fraser (1981) — Recirculation in Centrifugal Pumps, ASME 81-WA/FE-6'
  - 'Hutchings & Shipway — Tribology (2017, Elsevier), ch. 4–6'
  - 'ASM Handbook Vol. 11 — Failure Analysis and Prevention (2002)'
  - 'Karassik et al., Pump Handbook, 4th ed. (2008), ch. 2'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, 4th ed. (2012), ch. 7'
  - 'Perez — Troubleshooting Rotating Machinery (2022, Wiley), ch. 4'
  - 'Japikse, Marscher & Furst — Centrifugal Pump Design and Performance (1997), ch. 8 (inducers)'
  - 'Çengel & Boles — Thermodynamics: An Engineering Approach, 8th ed., Table A-4'
  - 'Budynas & Nisbett — Shigley''s Mechanical Engineering Design, 10th ed., ch. 6 (fatigue, Kt)'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'ANSI/HI 9.8 — Rotodynamic Pumps: Intake Design'
  - 'API 610, 12th ed. — Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries'
  - 'ISO 9906:2012 — Rotodynamic Pumps: Hydraulic Performance Acceptance Tests'
  - '"A Review of Pump Cavitation Fault Detection Methods Based on Different Signals" — Processes (MDPI) 11(7):2007, 2023'
  - 'Suslick (1990) — Sonochemistry, Science 247 (collapse temperatures)'
  - 'Moubray, RCM II (1997), ch. 6 and 7 — preventive and predictive tasks, P-F interval'
  - 'Nowlan & Heap (1978) — failure rate patterns'
fw_a:
  categoria: mixed_complex
  beta: 'variable (random operational trigger + progressive erosion β≈1.5–3)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'P-F/2 (typical monthly inspection; continuous online monitoring on critical assets)'
pf_tipico: '~1 week (cast iron, severe cavitation) to ~6 months (stainless, moderate) — Bloch & Geitner; minutes in severe performance collapse'
plano_manutencao:
  - tarefa: 'Analyze high-frequency band vibration'
    metodo: 'Spectrum + envelope; broadband 10–25 kHz energy modulated by BPF; high-band kurtosis'
    periodicidade: 'Monthly (P-F/2)'
    condicao: 'In operation, stable load — record flow and operating point at measurement'
    criterio: '10–25 kHz band RMS ≤ 2× the healthy-machine baseline; no 0.3–0.8×RPM sub-synchronous'
    acao: 'Confirm with ultrasound; audit NPSHa and BEP position; correct through the operational layer before intervening in the pump'
  - tarefa: 'Inspect suction and volute acoustically'
    metodo: 'Ultrasound/stethoscope; continuous "gravel" noise; distinguish from air entrainment (tightness test)'
    periodicidade: 'Monthly, with the vibration route'
    condicao: 'In operation, with the vibration route'
    criterio: 'No continuous gravel noise; ultrasonic level stable against baseline'
    acao: 'Noise present with adequate NPSHa → investigate recirculation and air entrainment (differential diagnosis table)'
  - tarefa: 'Monitor NPSH margin and BEP position'
    metodo: 'NPSHa computed from instrumentation vs curve NPSHr; flow vs BEP; head and power trending in the PIMS'
    periodicidade: 'Continuous (deviation alarm)'
    condicao: 'Continuous, in operation (PIMS)'
    criterio: 'NPSHa within the normative margin (1.1–2.5 ratio — HI 9.6.1; ≥ NPSHr + 1 m — API 610); flow inside the POR (70–120% of BEP)'
    acao: 'Margin violated → restore suction level/pressure, reduce flow at the discharge or reduce speed (NPSHr ∝ N²)'
  - tarefa: 'Inspect the impeller visually'
    metodo: 'Boroscopy; pit morphology (rough edges, clean metal) and depth vs repair criterion'
    periodicidade: 'Opportunity / yearly'
    condicao: 'Opportunity shutdown, pump drained and isolated'
    criterio: 'Shallow, dispersed pits; leading edge intact; no coalescing cracks'
    acao: 'Coalescence or compromised leading edge → weld repair with resistant alloy + balancing; recurrence → evaluate material upgrade'
tags:
  - NPSH
  - erosion
  - Rayleigh-Plesset
  - ASTM G32
  - vibration
  - recirculation
revisado_em: 2026-07-10
---

## Beginner

**What it is.** Inside a [[bomba-centrifuga|centrifugal pump]], pressure at the impeller inlet can drop below the liquid's **vapor pressure**. At that instant the liquid boils locally — not from heat, but from lack of pressure: vapor bubbles form and, dragged into higher-pressure regions inside the impeller, **collapse violently** against metal surfaces. That is the difference between boiling (phase change by temperature) and cavitation (phase change by pressure drop).

**The violence of the phenomenon.** Each bubble collapsing near the wall fires a **liquid microjet at 100–500 m/s** — comparable to a rifle bullet — plus a local shock wave that exceeds the pump's operating pressure by **thousands of times**. For microseconds, the collapsing bubble core reaches temperatures comparable to the surface of the Sun. One isolated event is harmless; the problem is that **hundreds to thousands of collapses per second happen at the same spot**.

**How to recognize it in the field.** Characteristic "pumping gravel" noise or crackling, unstable or falling flow and pressure, elevated vibration and — over time — an impeller surface pitted like an orange peel.

**What cavitation costs.** Three bills at once: **energy** (hydraulic efficiency drops, so the pump spends more to deliver less), **repair** (an eroded impeller demands specialized weld repair or replacement — one of the most expensive components in the assembly) and **downtime** (mature cavitation kills in days, not months). Plus the collateral damage: cavitation vibration accelerates [[selo-mecanico|mechanical seal]] and [[rolamento|bearing]] failure — the seal commonly fails *before* the impeller is holed.

**The underlying cause is almost always the system, not the pump:** low suction-tank level, clogged strainer, high fluid temperature, or the pump running far from the point it was selected for. And the operator's golden rule: **never "relieve" cavitation by closing the suction valve** — that drops the inlet pressure further and makes the phenomenon worse. Reduce flow at the **discharge**, never at the suction.

## Specialist

### Normative classification — the two conventions

Per **ASTM G40** (wear and erosion terminology), cavitation is an **erosion** mode — *cavitation erosion*: "erosion caused by the formation and collapse of cavities in a liquid at a solid surface". **ASTM G32** standardizes the material resistance test. Meanwhile **ISO 14224:2016** (Table B.2) — the standard that structures this platform's taxonomy — lists **cavitation as a failure mechanism in its own right**, a subdivision of *material failure*, **distinct** from erosion and from corrosion. The two conventions do not conflict: ISO names the *mechanism* (the physical process); ASTM describes the *result* (erosive damage). This note uses the ISO convention's `CAV` code and describes the damage in ASTM terms. The distinction decides replacement material, maintenance strategy and correction.

### Differential diagnosis — what cavitation is NOT

**Not abrasion.** Abrasive wear (Hutchings, ch. 4) requires hard particles or sliding contact and obeys Archard's law, $W = k \, F_N / H$ — removed volume is inversely proportional to **hardness** $H$. It removes material by tangential micro-cutting and leaves **grooves oriented** along the flow. In cavitation with clean fluid there is no particle and no sliding: the impact is **perpendicular** and produces **craters with no preferred direction**. Direct practical consequence: hard coatings (WC-Co) that solve abrasion have limited effectiveness against cavitation — hardness is not the governing parameter (Franc & Michel, ch. 8: hard but brittle ceramics can perform worse than softer, tougher alloys).

**Not corrosion (as the primary mechanism).** Corrosion pits have smooth edges, accumulated corrosion products, and appear where electrochemistry dictates (dissimilar metals, crevices, deposits). Cavitation pits have **rough edges and clean metal** (the impact continuously strips the passive film) and appear exactly where thermodynamics predicts — the lowest-pressure regions of the flow. The definitive proof: 316L stainless with excellent chemical resistance is severely eroded by cavitation in clean water (ASM Handbook Vol. 11).

### Field diagnosis — the classic-confusions table

Four phenomena produce similar symptoms and completely different corrections. Getting this wrong means replacing an impeller to fix a flange that sucks air:

| | Suction cavitation | Air entrainment (false cavitation) | Recirculation (off-BEP) | Flashing (saturated fluid) |
| --- | --- | --- | --- | --- |
| **Root cause** | NPSHa below requirement | Leak in suction line/sealing | Operation far from BEP | Near-saturation fluid vaporizes in the suction |
| **When it worsens** | As flow **increases** (NPSHr rises) | Independent of NPSH margin | At **low** flow | As temperature rises / system pressure falls |
| **Sound/signature** | Continuous gravel; high-frequency broadband | Irregular crackling; bubbles in the sight glass | Intermittent noise; **0.3–0.8×RPM sub-synchronous** | Like cavitation, with a thermal history |
| **Field test** | Improves when reducing flow at discharge or raising level | Unchanged by NPSH; tightness test finds the spot | Improves when **increasing** flow | Correlates with T and vapor pressure |
| **Correction** | Restore NPSH margin | Suction air-tightness | Reposition operating point (VFD/valve) | Subcool/pressurize the suction |

### What does occur — the real mechanisms

1. **Impact erosion** (primary): microjet + shock wave remove material directly, forming the characteristic pits.
2. **Repetitive plastic deformation with work hardening**: impacts below the removal threshold deform the surface; dislocation density grows, the material work-hardens — harder and **less ductile**. ASTM G32 specimens show measurable surface microhardness increase *before* any mass loss (Franc & Michel): damage starts invisible, in the **incubation period**.
3. **Surface fatigue**: each pit edge is a stress concentrator ($K_t \approx 3$ for a circular discontinuity — Shigley, ch. 6) and the work-hardened layer has reduced fracture energy; impact cycles nucleate and propagate microcracks that coalesce and detach whole platelets — the accelerated mass-loss phase.
4. **Tribocorrosion** (situational): in aggressive fluids (seawater, extreme pH), impact strips the passive film and corrosion attacks bare metal before repassivation — a synergy where combined damage exceeds the sum of the parts (factors of 2–5× reported).

The macroscopic result is the autocatalytic cycle: pit → stress concentrator → microcrack → platelet loss → bigger pit. The propagation mathematics lives in the Engineer level.

### Types of cavitation in pumps

- **Classic suction cavitation (insufficient NPSH)** — the most common; bubbles nucleate on the low-pressure face of the vanes near the impeller eye and collapse as they advance into the pressure zone. Damage on the leading edge, suction side. **Worsens as flow increases** (NPSHr grows with Q²).
- **Suction recirculation** — at low flow the fluid is no longer guided by the vanes and forms recirculation vortices at the inlet with very-low-pressure cores — **even with adequate NPSHa** (Fraser, 1981). Damage on the **pressure side** of the vanes. The higher the design's energy and suction specific speed, the earlier (at relatively higher flows) recirculation sets in.
- **Discharge recirculation** — operation far below BEP; backflow at the impeller exit and volute tongue. Typical signature: **sub-synchronous components (0.3–0.8×RPM)** and an unstable vibration level — unlike suction cavitation, which produces a stable elevated level.
- **Surface vortex / insufficient submergence** — low sump level drags an air+vapor rope into the nozzle (minimum submergence criteria: ANSI/HI 9.8).
- **False cavitation (air entrainment)** — mandatory differential diagnosis (table above): similar acoustic symptoms, completely different correction.

The "NPSH is fine but it still cavitates" case is almost always **recirculation**: the engineer checks the margin, finds slack and rules out cavitation — when the problem is the **BEP position**, not the suction.

### Framework A — diagnosis

`Mixed/Complex`: the **trigger is operational and random** (it appears whenever NPSH margin vanishes or the operating point drifts from BEP), but the **damage is progressive** — erosion accumulates with β>1. IT-MNT-001 lists "intermittent cavitation in pumps" as the canonical example of the category — and mandates **decomposition via FMEA**: the correct answer to "it cavitates every time the tank runs low" is operational (level control), not a maintenance task.

### Framework B — prescription

There is a **detectable P-F** (vibration, noise, performance trend) and the failure is **evident** → **[[cbm|CBM]] at [[curva-pf|P-F]]/2 periodicity**. Tasks in the exportable plan below the page. Definitive correction is operational/design — the action layers, in order of cost and reversibility:

1. **Immediate operational** (without stopping the machine): restore suction level/pressure; clean strainers; reduce flow **at the discharge valve** — **never at the suction** (throttling the suction drops inlet pressure and intensifies collapse; the classic operating error documented by Perez, ch. 4); reduce speed via VFD — by the similarity laws **NPSHr falls with the square of speed** (−20% speed ≈ −36% NPSHr, with a −49% power bonus).
2. **Installation**: enlarge the suction line diameter — losses fall with the **fifth power** of diameter (see Engineer): +20% diameter ≈ −60% losses; doubling ≈ −97%. Shorten and straighten the suction (minimum 5–10 straight diameters before the nozzle); **eccentric reducer, flat side up** (API 610 — a concentric one traps an air pocket); suction velocity ≤ 1.5 m/s for clean water (ANSI/HI 9.8); cool the fluid; lower the pump or raise the level.
3. **Pump intervention**: axial inducer at the impeller eye (cuts the set's NPSHr by 50–70% — Japikse); impeller with a larger suction eye (re-check BEP); material upgrade (a conscious palliative — buys life, does not remove the cause).

**Prevention by design:** NPSH margin per **ANSI/HI 9.6.1 (2024)** — NPSHa/NPSHr ratio of **1.1 to 2.5** by suction energy and specific speed; per **API 610**, NPSHa ≥ NPSHr + **1.0 m throughout the allowable operating region** (AOR). Performance and NPSH testing per **ISO 9906**. Intake geometry per **ANSI/HI 9.8**.

## Engineer

### Thermodynamics: $P_v(T)$ and the melting margin

Cavitation starts when local static pressure crosses the vapor pressure $P_v(T)$. Its temperature dependence is governed by the **Clausius-Clapeyron** equation (ideal vapor):

$$\frac{dP_v}{dT} = \frac{L_{vap} \, P_v}{R_v \, T^2}$$

— growth is **exponential**, not linear. For water (Çengel & Boles, Table A-4):

| T (°C) | $P_v$ (kPa) | vs. 20 °C |
| --- | --- | --- |
| 20 | 2.34 | 1.0× |
| 40 | 7.38 | 3.2× |
| 60 | 19.94 | 8.5× |
| 70 | 31.19 | 13.3× |
| 80 | 47.39 | 20.3× |
| 100 | 101.33 | 43.3× |

The operational reading: an installation with a comfortable margin at 25 °C can cavitate severely **with no physical modification at all** — the process merely warming up is enough. The numerical example below quantifies exactly that. Real nucleation is heterogeneous: dissolved-gas microbubbles and cavities on particles/walls act as embryos (degassed laboratory water withstands far greater tensions before cavitating — Brennen, ch. 1).

### Bubble dynamics — Rayleigh-Plesset

Growth and collapse of a spherical bubble of radius $R(t)$ is governed by:

$$\rho \left( R\ddot{R} + \frac{3}{2}\dot{R}^2 \right) = P_B - P_\infty(t) - \frac{2\sigma}{R} - \frac{4\mu \dot{R}}{R}$$

where $P_B = P_v + P_g$ is the internal pressure (vapor + residual non-condensable gas — the term that cushions the final collapse and feeds the rebound). The left side is the liquid's inertia; $P_B - P_\infty$ is the engine: when the bubble enters the impeller's high-pressure zone, $P_\infty$ jumps, the term turns strongly negative and the collapse is unstable — the smaller $R$, the faster it accelerates. From Rayleigh's ideal case (1917) comes the **collapse time** of an empty cavity:

$$\tau \approx 0.915\, R_0 \sqrt{\frac{\rho}{P_\infty - P_v}}$$

— for $R_0 = 1$ mm in water at atmospheric pressure, $\tau \approx 91$ μs: collapse is practically instantaneous, and the pressure potential energy concentrates into a volume that tends to zero.

### Asymmetric collapse: microjet and shock wave

Near a wall the collapse is **asymmetric** (Plesset & Chapman, 1971): the bubble side facing the free fluid accelerates first, crossing the bubble as a **microjet** that strikes the surface perpendicularly at **100–500 m/s** (visualized by Naude & Ellis, 1961). The rebound also emits a **shock wave** with local peaks of **1–10 GPa** for microseconds within micrometre radii (Brennen, ch. 5; Franc & Michel, ch. 8).

| Pressure reference | Order of magnitude |
| --- | --- |
| Process pump discharge | 0.5–3 MPa |
| Industrial hydraulic system | 10–40 MPa |
| Common-rail diesel injection | 150–300 MPa |
| 316L steel yield strength | ~170 MPa |
| **Bubble-collapse shock wave** | **1,000–10,000 MPa** |

The impact exceeds the yield strength of any engineering alloy by 1–2 orders of magnitude — over a microscopic area, for microseconds, **repeatedly**: at 100 to 10,000 collapses per second per cm² (Brennen, ch. 3), a cavitating pump accumulates up to **~10⁸ impacts per hour per cm²** — ultra-high-cycle fatigue, far beyond the 10⁷ cycles of the conventional S-N curve. At the bubble core, sonoluminescence evidences temperatures of 5,000–15,000 K at final collapse (Suslick) — hotter than the surface of the Sun, in a nanometric volume.

### From impact to mass loss — the micromechanics

The quantifiable sequence: (1) impacts above yield deform the surface plastically; **work hardening** raises local microhardness before any mass loss — the fingerprint of the **incubation** period on the G32 MDE curve. (2) Each pit edge concentrates stress ($K_t \approx 3$); the now-brittle hardened layer nucleates microcracks. (3) Propagation follows the **Paris & Erdogan** law:

$$\frac{da}{dN} = C \, (\Delta K)^m$$

— and since every collapse onto an existing pit raises $\Delta K$ as the crack grows, propagation accelerates non-linearly: cracks coalesce, platelets detach, and the mass-loss curve leaves incubation for maximum rate. That is why cavitation erosion is **not linear in time** — and why early visual inspection understates the damage.

### NPSH — rigorous formulation

Applying Bernoulli from the suction reservoir level (0) to the pump inlet flange (1), with losses $\Sigma h_f$:

$$NPSH_a = \frac{P_0 - P_v(T)}{\rho g} - H_s - \Sigma h_f$$

where $P_0$ is the absolute pressure at the liquid surface, $H_s$ the static lift (positive with the pump **above** the level; negative when flooded) and $\Sigma h_f$ the suction-line losses. Elevation datum: shaft centerline (horizontal pumps). Each term is an intervention lever:

- $P_0/\rho g$: fixed by altitude for an atmospheric tank — 10.33 m at sea level, ~9.2 m at 1,000 m, ~8.1 m at 2,000 m. High-plateau installations start ~1 m short of coastal ones.
- $H_s$: every metre of pump elevation subtracts a metre of NPSHa.
- $\Sigma h_f$: by Darcy-Weisbach, $h_f = f \, (L/D) \, V^2/2g$; at fixed flow, $V \propto D^{-2}$, hence $h_f \propto D^{-5}$ (f ≈ constant). The installation's strongest lever:

| Suction diameter | Loss reduction |
| --- | --- |
| D × 1.2 | ~60% |
| D × 1.5 | ~87% |
| D × 2.0 | ~97% |

- $P_v(T)/\rho g$: grows exponentially with temperature (table above).

**What catalog NPSHr means — and what it does not.** NPSHr is **NPSH₃**: the value at which head has already dropped 3% in the test (ISO 9906 / HI) — a *performance* criterion, not a *damage* one. **Incipient cavitation (NPSHi) occurs at NPSH well ABOVE NPSH₃** — typically 2 to 6 times, per Gülich (ch. 6): at the catalog point the pump already cavitates audibly and erodes; it merely has not yet lost 3% of head. That hierarchy is what grounds the normative margins: NPSHa/NPSHr ratio of **1.1–2.5** by suction energy (ANSI/HI 9.6.1:2024) and **≥ +1.0 m throughout the AOR** (API 610).

Associated parameters: suction specific speed $N_{ss}$ (aggressive designs narrow the stable flow window and recirculate earlier); cavitation number $\sigma = (P_\infty - P_v)/(\tfrac{1}{2}\rho U^2)$, which non-dimensionalizes the flow's propensity; and the similarity law $NPSH_r \propto N^2$ — the quantitative basis of the VFD correction.

### Numerical example — the same installation at two temperatures

Atmospheric tank at sea level, pump 2.0 m above minimum level, suction losses 1.2 m, NPSHr₃ = 4.0 m at the duty point.

**Water at 60 °C** ($\rho = 983$ kg/m³; $P_v = 19.94$ kPa): $NPSH_a = 10.51 - 2.0 - 1.2 - 2.07 = 5.24$ m → margin +1.24 m, ratio 1.31 — meets API 610 and HI for low suction energy (high energy would demand more).

**The process warms to 80 °C** ($\rho = 972$ kg/m³; $P_v = 47.39$ kPa): $NPSH_a = 10.63 - 2.0 - 1.2 - 4.97 = 2.46$ m → **2.46 < 4.0**: outright cavitation, with nothing in the installation having changed. The options, in layer order: subcool/raise level, reduce speed (NPSHr falls with N²), lower the pump, or an inducer. Redo the whole account with your numbers — it is the suction audit that precedes any material change.

### Material resistance

The correlation between hardness and cavitation resistance is **weak** (Hattori et al., 2004: R² < 0.5 across metallic families) — the governing parameters are fatigue limit, toughness and the capacity to work-harden without fracturing. The **ASTM G32** test (20 kHz vibratory horn, 50 μm amplitude, specimen in distilled water) measures mass loss and reports MDE (mean depth of erosion) and MDER (rate). The consolidated ranking (Franc & Michel; ASM Handbook Vol. 18), as relative erosion rate (lower = better):

| Material | Relative MDER | Application note |
| --- | --- | --- |
| Stellite 6 (Co-Cr-W) | 1 (reference) | Overlay for critical areas |
| CA6NM steel (13Cr-4Ni) | ~3 | Hydro-rotor standard |
| Duplex UNS S31803 | ~4 | Severe process pumps |
| AISI 316L | ~8 | General chemical process |
| Naval bronze | ~20 | Seawater (sacrificially) |
| Carbon steel | ~35 | Avoid in cavitating zones |
| Grey cast iron | ~50–80 | The worst case — see below |

Grey cast iron fails so fast for a microstructural reason: **graphite lamellae** have near-zero tensile strength and act as a distributed pre-crack network (local $K_t$ > 5 at sharp lamella edges) — every impact finds cracks ready to propagate and connect. **Intervention criteria:** shallow, dispersed pits → track by boroscopy; coalescing pits or a compromised leading edge → weld repair with a resistant alloy (Co-based electrodes or high-work-hardening austenitic stainless) plus balancing; recurrence in unavoidably cavitating service → material upgrade (duplex/CA6NM) *after* exhausting system corrections — better material buys life, it does not remove cause.

### Severity, erosion rate and the P-F

Gülich's empirical correlations (ch. 6) put the erosion rate growing with a high power of the velocity at the impeller inlet (exponent ≈ 6) and with the vapor-cavity length — severity scales brutally with speed and suction energy. That is why the P-F interval spans orders of magnitude: **~1 week** (cast iron, severe cavitation, hot water) to **~6 months** (stainless, moderate cavitation, light hydrocarbon) in the industrial cases of Bloch & Geitner (ch. 7). Calibrate the route for the **worst plausible P-F of your material×service pair** — and migrate to continuous monitoring when P-F/2 becomes shorter than the practicable route cycle.

### Quantitative detection

- **Vibration**: **broadband energy at 10–25 kHz** (no dominant discrete peak), modulated by vane passing ($BPF = n_{\text{vanes}} \times N$); elevated kurtosis in the high band distinguishes cavitation's impulsiveness from other broadband noise. The stochastic signature separates cavitation from deterministic defects ([[rolamento|bearing]], misalignment); 0.3–0.8×RPM sub-synchronous points to recirculation. **Baseline first**: establish the healthy-machine reference at a known load condition and alarm on deviation (e.g., 2× the baseline high-band RMS) — absolute values vary machine to machine.
- **Acoustic emission (100 kHz–1 MHz)**: captures collapse and microcrack nucleation before the conventional spectrum — the earliest stage of the P-F; demands a dedicated sensor and discipline against industrial noise.
- **Pressure pulsation**: dynamic transducers at suction/discharge; BPF and harmonic amplitudes grow with cavitation; low-frequency components expose recirculation instability (Gülich, ch. 10).
- **Motor current (via VFD)**: torque oscillations from the two-phase fluid's density variation show up in the current signature — detection with no extra sensor, useful in distributed fleets.
- **Performance**: head drop ≥ 3% defines the test threshold; in operation, the PIMS *trend* of head and power against the reference curve exposes the regime before that.
- **State of the art**: the Liu et al. review (Processes, 2023) consolidates the field — vibration is the most widespread method, acoustic emission the earliest; ML classifiers over spectra reach high accuracies on test rigs (signal fusion outperforms single signals), with the practical bottleneck in the scarcity of labeled real-cavitation data — *transfer learning* is the active frontier. Hydraulic *digital twins* compute NPSHa in real time from process instrumentation and alarm on the margin, not the symptom.

### Reliability connection — Weibull and the RCM close

Treating erosion as wear-out: **β ≈ 1.5–3** over time under cavitating condition — use the calculator below for $R(t)$, MTTF and B10 sensitivity. In Fw A the category is **Mixed/Complex** (Nowlan & Heap: random-trigger patterns dominate): there is no characteristic failure age until the operating condition sets in — **[[tbm|TBM]] is technically invalid** (swapping the impeller "every N months" neither removes nor anticipates the trigger). With a detectable P-F and an evident failure, the decision is **[[cbm|CBM]] at P-F/2** (Moubray, ch. 7 — predictive tasks), with continuous monitoring justified on critical or short-P-F assets. The definitive way out remains operational/design: NPSH margin and BEP position are engineering variables, not maintenance ones.
