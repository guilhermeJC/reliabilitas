---
slug: montagem-incorreta-rolamento
tipo_nota: modo_falha
locale: en
titulo: 'Incorrect Mounting (Infant Mortality)'
status: published
taxonomia:
  - rolamento
iso14224_code: 'BE-MONT'
fontes:
  - 'ISO 15243:2017 — §5.5.2 (overload plastic deformation) and §5.6.2 (forced fracture)'
  - 'SKF Evolution — Bearing damage analysis with ISO 15243'
  - 'Harris & Kotzalas — Rolling Bearing Analysis, 5th ed., ch. 21 (mounting and fits)'
  - 'Nowlan & Heap (1978) — infant mortality patterns (bathtub curve)'
  - 'Moubray, RCM II (1997), ch. 3 — 6 failure patterns'
  - 'SKF — Mounting and dismounting of rolling bearings (official technical guide)'
fw_a:
  categoria: infant
  beta: '<1 (classic infant mortality — Nowlan & Heap pattern B/F)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Intensive monitoring for the first 30 days post-commissioning/replacement (bathtub rule); mounting inspection built into the installation procedure'
pf_tipico: 'hours to a few weeks — the shortest in the component; many mounting failures show up within the very first operating cycles'
plano_manutencao:
  - tarefa: 'Audit the mounting procedure against the manufacturer guide'
    metodo: 'Installation checklist: heating method, tools used, interference fit, residual internal clearance check'
    periodicidade: 'At every bearing replacement, before start-up'
    condicao: 'During installation, before returning to operation'
    criterio: 'Induction heating (never open flame or direct hammering on the ring); pressing applied only to the ring receiving the fit; residual clearance within manufacturer range'
    acao: 'Incorrect method identified (hammer, open flame, pressing on the wrong ring) → treat the bearing as suspect and reconsider replacement before start-up'
    especialidade: 'Mechanical / precision mounting'
    duracao: '0.5 h per mounted bearing'
    passos:
      - 'Confirm induction heating temperature within the recommended range (typically 80–100 °C, never open flame)'
      - 'Verify that press force was applied only to the ring with the interference fit (never transmitted through the rolling elements)'
      - 'Measure residual internal clearance post-mounting and compare with the specification'
      - 'Log the procedure followed and any deviation'
    registros:
      - 'Applied heating temperature [°C]'
      - 'Measured residual internal clearance [μm]'
      - 'Pressing method used'
  - tarefa: 'Intensive vibration monitoring for the first 30 days post-commissioning'
    metodo: 'High-frequency vibration route (weekly instead of monthly) during the run-in period'
    periodicidade: 'Weekly for the first 30 days; return to the normal (monthly) route afterward if no anomaly'
    condicao: 'In operation, from the first week post-start-up'
    criterio: 'No BPFx or abnormal noise already in the first weeks — infant mortality shows up early, not as late fatigue'
    acao: 'Any anomaly within the 30-day window → treat as a strong suspicion of a mounting defect, not natural fatigue; consider reopening and inspection'
    especialidade: 'Predictive / commissioning'
    duracao: '0.5 h per weekly route'
    passos:
      - 'Apply the same vibration route as the normal routine, but at weekly frequency'
      - 'Compare each collection with the previous one, watching for any new signal (not just the absolute baseline)'
      - 'If 30 days pass with no anomaly, return to the standard plan periodicity'
    registros:
      - 'Vibration amplitude — week 1 to 4 [mm/s]'
tags:
  - infant mortality
  - mounting
  - interference fit
  - commissioning
  - bathtub curve
revisado_em: 2026-07-18
---

## Beginner

**What it is.** Unlike the other failure modes of the [[rolamento|rolling bearing]], which develop over time in operation, this one happens **at the moment of installation** — and the resulting failure shows up early, sometimes within hours or days of operation. Classic causes: heating with an open flame instead of induction (distorts the ring's metallurgy), hammering directly on the outer or inner ring instead of controlled pressing (leaves microscopic indentations or cracks), a wrong interference fit for the shaft/housing (excessive tightness preloads the bearing beyond design; insufficient tightness allows relative movement and seat wear), or transmitting the mounting force through the **rolling elements** instead of through the correct ring — the most common and most destructive error, because it marks the raceway with indentations at the exact rolling-element spacing before the first rotation even happens.

**How to recognize it in the field.** It is the failure mode with the **shortest P-F** in the component — often hours to weeks, not months. If a newly installed bearing shows abnormal vibration or noise within the first few days of operation, incorrect mounting should be the first suspicion, not natural fatigue (which would take much longer to show up).

**Why it matters.** It is the clearest example of infant mortality (the classic reliability "bathtub": high failure rate right at the start, dropping afterward) — and it is entirely avoidable with the correct procedure. A good share of warranty cost and rework on new bearings comes from here, not from manufacturing defects.

## Specialist

### Mechanism — how a mounting error becomes physical damage

**Incorrect heating:** the standard method is controlled induction (typically 80–100 °C), which expands the inner ring enough to slide onto the shaft without force. An open flame heats unevenly, can exceed the steel's tempering temperature and alter raceway hardness/microstructure — permanent metallurgical damage that reduces fatigue resistance before the first revolution even happens.

**Direct hammering:** applying impact force directly to the ring (instead of using a mounting sleeve that distributes the load) frequently transmits part of the force **through the rolling elements**, producing micro-indentations on the raceway at the exact ball/roller spacing — the classic signature of **overload plastic deformation** (ISO 15243 §5.5.2), which later becomes an early fatigue nucleation site.

**Incorrect interference fit:** every bearing designation has a fit range (shaft and housing) specified by the manufacturer as a function of load and rotation type (rotating vs. stationary ring). Excessive fit reduces the operating internal clearance below what's needed, preloading the bearing and continuously raising Hertzian contact stress — a chronic, silent form of overload that accelerates any of the component's other failure modes. Insufficient fit allows relative micro-movement between ring and seat — the same fretting mechanism discussed under [[falso-brinelamento-rolamento|false brinelling]], but at the seat instead of the raceway.

### Framework A — diagnosis

`Infant`, with **β < 1** — the classic Nowlan & Heap signature for defects introduced at installation: decreasing failure rate over time, concentrated in the first weeks of operation. It is one of the patterns classic RCM documented back in the 1960s–70s (bathtub curve) and remains the most common explanation for "a new bearing that failed fast."

### Framework B — prescription

The correct prescription for infant mortality is **not time-based replacement** (the problem is already there; a new replacement just reintroduces the same risk if the procedure doesn't change) — it is **mounting-process quality** (the procedure-audit task, which attacks the cause) combined with **intensive monitoring during the risk window** (the first weeks), when a mounting defect, if present, will manifest. Once that period passes with no anomaly, this specific failure mode's risk drops to practically zero — and the bearing is then governed by the other modes (fatigue, contamination, lubrication) with their own much longer P-F intervals.

## Engineer

### The physics of interference fit and residual clearance

The interference fit between ring and shaft/housing exists to eliminate any clearance that would allow relative micro-movement under load (fretting at the seat) — but the fit reduces the bearing's own **radial internal clearance** (the design space between rolling elements and raceways) proportionally to the tightness magnitude. The manufacturer specifies the original clearance (before mounting) precisely to compensate for that reduction — so that the **residual clearance post-mounting** falls within the designed operating range. Measuring residual clearance (e.g., with a dial gauge before and after mounting) is the only direct way to confirm the applied fit is correct — heating temperature and pressing method are correct procedures *in practice*, but residual clearance is the **numerical proof** that the result fell within specification.

### Why "it seems to have worked" is not sufficient evidence

An incorrectly mounted bearing frequently rotates normally for hours or even days with no perceptible symptom — indentation damage or overheating-induced work hardening doesn't generate detectable vibration immediately; it reduces **expected life**, not immediate functionality. That is why procedure auditing (a checklist at the moment of mounting) has more value than any subsequent inspection: by the time vibration shows up, the damage is already done — this mode's P-F is short enough that real "early detection" is, in practice, prevention at the very act of mounting.

### Intersection with the component's other 4 modes

Incorrect mounting is the only bearing failure mode whose prevention is **entirely procedural** — it doesn't depend on a sensor, oil analysis or continuous monitoring, it depends on procedure discipline at time zero. All 4 other modes ([[fadiga-subsuperficial-rolamento|fatigue]], [[contaminacao-lubrificante-rolamento|contamination]], [[falha-lubrificacao-rolamento|lubrication]], [[falso-brinelamento-rolamento|false brinelling]]) can, to a greater or lesser degree, be accelerated by a poorly done mounting that left the bearing preloaded, misaligned or with latent damage — making mounting audit, in practice, an indirect defense against the other four as well.
