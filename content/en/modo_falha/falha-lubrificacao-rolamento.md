---
slug: falha-lubrificacao-rolamento
tipo_nota: modo_falha
locale: en
titulo: 'Lubrication Failure (Adhesive Wear)'
status: published
taxonomia:
  - rolamento
iso14224_code: 'BE-LUB'
fontes:
  - 'ISO 15243:2017 — §5.2.3 (adhesive wear — smearing/galling)'
  - 'ISO 281:2007 — viscosity ratio $\kappa$ and film ratio $\lambda$'
  - 'SKF Evolution — Bearing damage analysis with ISO 15243'
  - 'Harris & Kotzalas — Rolling Bearing Analysis, 5th ed., ch. 20 (elastohydrodynamic lubrication)'
  - 'Machine Design — The Meaning of Bearing Life (L10 vs MTBF)'
  - 'Moubray, RCM II (1997), ch. 3 — failure patterns'
fw_a:
  categoria: mixed_complex
  beta: 'near 1 when abrupt (sudden grease loss); >1.3 when progressive (insufficient regreasing)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Monthly thermography/vibration; regreasing-plan check at every intervention'
pf_tipico: 'days (sudden loss — jammed grease pump, ruptured seal) to months (chronic under-greasing)'
plano_manutencao:
  - tarefa: 'Audit the regreasing plan against the manufacturer catalog'
    metodo: 'Compare the interval and quantity programmed in the CMMS against the manufacturer recommendation for the actual designation, speed and temperature'
    periodicidade: 'At every plan review or change in operating condition (speed, ambient temperature)'
    condicao: 'Documentary review — no shutdown required'
    criterio: 'Interval and quantity within the manufacturer-recommended range for the measured actual conditions'
    acao: 'Mismatch → correct the CMMS plan; excess grease is as harmful as too little — never "grease more just to be safe"'
    especialidade: 'Reliability engineering'
    duracao: '0.5 h per asset'
    passos:
      - 'Determine actual speed (rpm), operating temperature and bearing designation'
      - 'Consult the manufacturer regreasing table for those conditions'
      - 'Compare with the interval/quantity programmed in the CMMS'
      - 'Correct mismatches and document the recommendation source'
    registros:
      - 'Programmed vs. recommended regreasing interval [h]'
      - 'Programmed vs. recommended grease quantity [g]'
  - tarefa: 'Monitor temperature and broadband vibration as a marginal-lubrication indicator'
    metodo: 'Thermography + vibration (broadband RMS, not focused on discrete frequencies)'
    periodicidade: 'Monthly'
    condicao: 'In operation, stable load'
    criterio: 'Temperature and broadband RMS stable against baseline'
    acao: 'Both rising with no process explanation → suspect marginal lubrication; regrease/inspect before waiting for a fatigue signal'
    especialidade: 'Predictive'
    duracao: '0.3 h'
    passos:
      - 'Measure housing temperature and broadband vibration RMS'
      - 'Compare with baseline at the same load condition'
      - 'If both are elevated, check the regreasing plan before escalating to intervention'
    registros:
      - 'Housing temperature [°C]'
      - 'Broadband vibration RMS [mm/s]'
tags:
  - lubrication
  - EHL
  - adhesive wear
  - smearing
  - regreasing
revisado_em: 2026-07-18
---

## Beginner

**What it is.** Unlike [[contaminacao-lubrificante-rolamento|contamination]], here the problem is not what's *in* the oil/grease, but the **absence or insufficiency of the film itself**. It happens from excess speed/temperature relative to the chosen lubricant's viscosity, wrong grease quantity (too little or — surprisingly — **too much**, which generates heat from the grease's own internal friction), an over-long regreasing interval, or sudden loss (jammed grease pump, ruptured seal). Without the protective film, metal surfaces contact each other directly — not particle scratching as in contamination, but **pure metal-to-metal friction**, which generates heat, "welds" microscopically, and tears away tiny bits of material (so-called *smearing*, or scoring).

**How to recognize it in the field.** Abnormally high temperature is the most direct and earliest signal — often before any perceptible vibration. At an advanced stage, rising noise and, in the worst case, bearing seizure from cold-welding between the surfaces.

**Why it matters.** It is one of the most **preventable and cheapest-to-prevent** failure modes — the fix is essentially a maintenance-plan audit, not an expensive physical intervention. And it is treacherous: excess grease is as dangerous as too little, which makes "regreasing out of caution, without following the manufacturer's table" a counterproductive practice.

## Specialist

### Mechanism — adhesive wear (ISO 15243 §5.2.3)

When the film ratio $\lambda$ (see [[rolamento|Rolling Bearing]]) drops below ~1, surface asperities contact directly. Under Hertzian contact pressure, microwelds form instantly between the asperities and break on the following movement, tearing material from one surface and transferring it to the other (*smearing*, *galling*). The visual result is a surface with a "smeared"/hazy appearance, distinct from the dull polish of abrasive wear (which removes material by cutting, not by adhesive transfer).

### The two paths to insufficient film

1. **Insufficient viscosity for the actual condition** — the correct lubricant on paper can become wrong if operating temperature rises (viscosity drops exponentially with temperature) or actual speed diverges from what the design assumed.
2. **Wrong grease quantity** — too little grease doesn't fill the spaces needed to renew the film; **excess** grease creates resistance to the rolling elements' motion, which in turn generates heat from internal friction — the excess itself destroys local viscosity through the heating it causes (an effect known as *churning*/thermal churning).

### Framework A — diagnosis

`Mixed/Complex`: when the trigger is a sudden, complete loss (jammed grease pump, ruptured seal), behavior is close to **Random** — damage evolves fast and there is no "characteristic age"; when it's chronic, progressive under-greasing (over-long interval, marginal viscosity), wear accumulates more predictably, with **β>1**. IT-MNT-001 treats this as a spectrum, not a single category — the correct reading depends on auditing the cause before assuming the pattern.

### Framework B — prescription

**CBM**, with two complementary layers: the documentary regreasing-plan audit attacks the **root cause** (prevents the problem from starting), while thermography/broadband vibration monitors the **condition** (detects marginal lubrication already present, before it progresses to visible wear). Note this is one of the few maintenance tasks that **requires no specialized sensor** — comparing the plan against the manufacturer catalog is engineering audit, not field measurement.

## Engineer

### $\kappa$, $\lambda$ and the safe operating window

The viscosity ratio $\kappa$ (actual viscosity at operating temperature ÷ the minimum viscosity required by the geometry/speed) is the design parameter the Reliability discipline should audit whenever the operating condition changes — a load swap, a speed increase (via VFD), or operation in a hotter environment than the original design assumed. $\kappa < 1$ already signals significant adhesive-wear risk even with the correct grease quantity, because the problem is not *how much* lubricant exists, but whether it has enough viscosity at the actual temperature to form the EHL film.

### Why excess grease heats up faster than a shortage, at first

Thermal churning occurs because excess grease in the gaps between moving components must be continuously sheared with every revolution — that shearing work converts to heat, which in turn reduces the remaining grease's effective viscosity, creating a cycle that can push operating temperature well above design before any "shortage" symptom appears. That's why the regreasing quantity is always a fraction of the free-cavity volume (typically 1/3 to 1/2), never a full fill.

### Relation to other failure modes

A marginal film ($\lambda$ low) that hasn't yet crossed into visible adhesive wear already accelerates the nucleation of [[fadiga-subsuperficial-rolamento|contact fatigue]] — the boundary between "marginal lubrication accelerating fatigue" and "full adhesive wear" is a matter of degree, not a distinct mechanism, and a post-mortem sometimes finds both patterns coexisting on the same raceway.
