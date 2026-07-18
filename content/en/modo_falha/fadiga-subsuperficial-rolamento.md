---
slug: fadiga-subsuperficial-rolamento
tipo_nota: modo_falha
locale: en
titulo: 'Rolling Contact Fatigue (Spalling)'
status: published
taxonomia:
  - rolamento
iso14224_code: 'BE-FAT'
fontes:
  - 'ISO 15243:2017 — Rolling bearings: damage and failures — terms, characteristics and causes, §5.1'
  - 'ISO 281:2007 — Rolling bearings: dynamic load ratings and rating life'
  - 'SKF Evolution — Bearing damage analysis with ISO 15243'
  - 'Harris & Kotzalas — Rolling Bearing Analysis, 5th ed., ch. 24 (contact fatigue)'
  - 'Lundberg & Palmgren (1947) — Dynamic Capacity of Rolling Bearings, Acta Polytechnica'
  - 'Machine Design — The Meaning of Bearing Life (L10 vs MTBF)'
  - 'Tallian — Failure Atlas for Hertz Contact Machine Elements, 2nd ed. (1999, ASME Press)'
  - 'Moubray, RCM II (1997), ch. 7 — predictive tasks and P-F interval'
fw_a:
  categoria: wear_out
  beta: '1.1–1.5 (classic Hertzian contact fatigue)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'P-F/2 (monthly route; continuous on critical assets)'
pf_tipico: 'weeks to a few months between the first envelope/BPFx signal and functional failure — Tallian, Failure Atlas'
plano_manutencao:
  - tarefa: 'Monitor vibration spectrum/envelope at the defect frequencies (BPFO/BPFI/BSF)'
    metodo: 'Envelope (high-frequency demodulation) + conventional spectrum; compare amplitude and harmonic count against the healthy-machine baseline'
    periodicidade: 'Monthly (P-F/2); continuous on critical assets'
    condicao: 'In operation, stable load and speed — record actual RPM (not nameplate) to compute the correct defect frequencies'
    criterio: 'No BPFO/BPFI/BSF above baseline; no month-over-month growth in harmonics or sidebands'
    acao: 'Emerging BPFx → increase route frequency and start replacement planning; multiple harmonics + sidebands → advanced stage, prioritize replacement at the next outage'
    especialidade: 'Predictive / vibration analysis'
    duracao: '0.5 h per point'
    passos:
      - 'Confirm actual operating RPM (tachometer or process reference) to compute the correct BPFO/BPFI/BSF/FTF for the bearing designation'
      - 'Collect conventional spectrum and envelope at the same points/directions as the baseline'
      - 'Identify presence and amplitude of defect frequencies and their harmonics'
      - 'Compare with the previous collection — watch the progression (stage 2→3→4), not just the absolute value'
      - 'Log in the CMMS and update the trend; if stage 3+ (harmonics and sidebands), open a replacement plan'
    registros:
      - 'BPFO/BPFI/BSF amplitude [g or gE]'
      - 'Number of harmonics detected'
      - 'Measured actual RPM [rpm]'
  - tarefa: 'Check housing/bearing temperature trend'
    metodo: 'Spot thermography or fixed sensor; compare with history at an equivalent load condition'
    periodicidade: 'Alongside the vibration route'
    condicao: 'In operation, stable load for at least 30 min'
    criterio: 'Temperature stable within ±5 °C of baseline at the same load condition'
    acao: 'Sustained rise with no process explanation → correlate with vibration; reinforced suspicion of an advanced stage'
    especialidade: 'Predictive / thermography'
    duracao: '0.1 h'
    passos:
      - 'Measure temperature at the same reference point as the baseline'
      - 'Confirm the load/process is in a comparable condition to the history'
      - 'Record and compare the trend'
    registros:
      - 'Housing temperature [°C]'
tags:
  - ISO 15243
  - spalling
  - Hertzian fatigue
  - BPFO
  - BPFI
  - Weibull
revisado_em: 2026-07-18
---

## Beginner

**What it is.** Every [[rolamento|rolling bearing]] converts sliding into rolling — but the price of that efficiency is that the entire load passes through contact areas the size of a fingernail, generating enormous compressive pressures (1.5 to 3+ GPa), well above the yield strength of ordinary steel. The material only survives because the stress is compressive, confined and **cyclic** — every revolution is another stress cycle beneath the surface. After millions to billions of such cycles, microcracks form below the surface (at microscopic inclusions in the steel), grow slowly, and eventually reach the surface: a piece of metal breaks loose, leaving a crater — the **spall**. This is the bearing's natural wear-out death, and the reason no bearing lasts "forever."

**How to recognize it in the field.** Rising vibration at specific frequencies (the so-called BPFO/BPFI/BSF — each tied to a different part of the bearing), rhythmic metallic noise that worsens over time, and — at an advanced stage — elevated temperature and audible noise. The good news: this process is **slow and progressive**, giving weeks to months of warning before functional failure — enough time to plan the replacement instead of an unplanned stoppage.

**What it costs if left untreated.** A bearing that sheds a large spall can seize, generate extreme heat and damage the surrounding shaft and housing — a foreseeable maintenance issue turns into an expensive unplanned outage. The right strategy here is not fixed-interval replacement (real life varies widely bearing to bearing, even identical ones) — it is **condition monitoring**, replacing when the signal appears.

## Specialist

### What sets this failure mode apart from the component's others

Contact fatigue is the **only** one of the 6 ISO 15243 modes that is purely mechanical-statistical — it does not depend on contamination, chemistry or a mounting error to occur (though all of those can *accelerate* it via [[contaminacao-lubrificante-rolamento|contamination]] or [[falha-lubrificacao-rolamento|film loss]]). A perfectly lubricated, clean, well-mounted bearing will still fail by fatigue one day — that is the difference between **rated** life (L10, see [[rolamento|Rolling Bearing]]) and life **modified** by external factors.

**Subsurface vs. surface (ISO 15243 §5.1.2/§5.1.3):** the classic subcategory nucleates **below** the raceway, at non-metallic inclusions where the orthogonal shear stress peaks (at roughly 0.5× the contact-radius depth); surface fatigue nucleates **at the surface itself**, almost always from marginal lubrication ($\lambda < 1$) that exposes the surface to metal-to-metal contact — in that case fatigue is a symptom of a film problem, not "pure" fatigue. Distinguishing the two in a post-mortem matters: recurring subsurface fatigue points to overload/undersized design life; recurring surface fatigue points to lubrication.

### Framework A — diagnosis

Classic `Wear-out`, **β ≈ 1.1–1.5** (Lundberg & Palmgren; confirmed by decades of field data compiled by Tallian). It is one of the few failure modes genuinely suited to the classic RCM Weibull reading — but even so it **does not** justify fixed-interval replacement (Fw B below), because the dispersion is large (median life ≈5× L10) and the condition is monitorable well in advance.

### Framework B — prescription

**CBM with P-F/2 periodicity.** This mode's P-F is one of the best documented in industrial reliability: stage 1 (ultrasound/acoustic emission, weeks to months ahead) → stage 2 (envelope with BPFx, this route's trigger point) → stage 3 (conventional spectrum with harmonics and sidebands) → stage 4 (audible noise and temperature, days before the end). The highest-value task is **envelope/demodulation** — sensitive to the nascent spall's low-energy impact long before it appears in the conventional spectrum.

## Engineer

### Lundberg-Palmgren mechanics

The classic theory (1947), the basis for ISO 281, models fatigue life as a function of the maximum orthogonal shear stress $\tau_0$ below the surface and the stressed material volume $V$:

$$L \propto \left(\frac{1}{\tau_0}\right)^{c} \cdot \frac{1}{V^{e}}$$

with empirical exponents ($c \approx 9$, $e \approx 2.3$ in the classic formulations) that make life **extremely sensitive** to contact stress — small load increases (which raise $\tau_0$) produce disproportionate life drops, the same physical root behind the cubic sensitivity of $L_{10} = (C/P)^p$ discussed in [[rolamento|Rolling Bearing]].

### Why β ≈ 1.1–1.5 and not higher

The relatively low Weibull dispersion (compared to random failure modes with β≈1) reflects the statistical nature of inclusion distribution in the material — each bearing from the same batch has a different population of microscopic defects that initiate the crack, and the nucleation+propagation process has a genuinely random component even under identical load. This differs from failure modes with a purely external trigger (e.g. [[falso-brinelamento-rolamento|false brinelling]], where the decisive event is transport vibration, not the material's intrinsic fatigue).

### Practical reading of the P-F for route sizing

Knowing that the envelope stage precedes the conventional spectrum by weeks, a monthly conventional vibration route only catches the failure at stage 2–3 — still with margin, but less than a route with dedicated envelope monitoring. Critical assets with a documented short P-F (from load severity or a recurrence history) justify migrating to continuous monitoring, following the same scaling logic applied in [[cavitacao|Cavitation]].
