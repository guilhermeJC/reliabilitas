---
slug: hangup-selo-mecanico
tipo_nota: modo_falha
locale: en
titulo: 'Hang-up (Deposit Sticking)'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-HANG'
fontes:
  - 'API 682, 4th ed. — Shaft Sealing Systems for Centrifugal and Rotary Pumps'
  - 'FSA — API 682 Part 5: Piping Plans (heating/cooling plans for coking/crystallizing fluids)'
  - 'Vulcan Seals — Mechanical Seal Troubleshooting: Identifying and Preventing Common Failures'
  - 'John Crane — official technical documentation'
  - 'Karassik et al., Pump Handbook, 4th ed. — sealing chapter'
fw_a:
  categoria: mixed_complex
  beta: '1.2–1.8 (progressive deposit buildup; the formation trigger depends on operating condition)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Monthly (start-up vibration/noise + leakage trend) — extra attention after any prolonged shutdown in coking service'
pf_tipico: 'weeks to a few months, accelerated by frequent shutdowns in coking- or crystallizing-fluid service'
plano_manutencao:
  - tarefa: 'Monitor start-up vibration/noise in deposit-risk services'
    metodo: 'Vibration spectrum and listening at start-up, compared against the healthy-seal pattern, in services with a coking/crystallization history'
    periodicidade: 'At every start-up, in identified-risk services'
    condicao: 'Initial rotation post-shutdown'
    criterio: 'Face tracks the axial movement normally (no irregular friction noise or drag-related vibration)'
    acao: 'Sign of partial sticking at start-up → investigate before assuming normal operation; consider line heating before the next start-up'
    especialidade: 'Predictive / commissioning'
    duracao: '0.2 h'
    passos:
      - 'Record vibration/noise in the first minutes after start-up'
      - 'Compare with the expected healthy-seal pattern'
      - 'If an anomaly is present, assess whether line/seal heating is needed before future start-ups'
    registros:
      - 'Anomaly present at start-up (yes/no)'
      - 'Downtime before start-up [h]'
  - tarefa: 'Validate the heating/cooling plan in coking- or crystallizing-fluid services'
    metodo: 'Check the steam trace/electric heating or cooling plan (Plan 21/23) as specified for the fluid'
    periodicidade: 'Monthly; mandatory before any scheduled prolonged shutdown'
    condicao: 'In operation and before a scheduled shutdown'
    criterio: 'Heating/cooling functional and line temperature within the range that avoids deposit formation'
    acao: 'Inoperative heating/cooling system → fix before allowing a prolonged shutdown'
    especialidade: 'Instrumentation / process'
    duracao: '0.3 h'
    passos:
      - 'Check the steam trace/electric heating or the applicable cooling plan is functional'
      - 'Measure line/chamber temperature and compare with the safe range for the fluid'
      - 'Log and fix before authorizing a prolonged shutdown'
    registros:
      - 'Line/chamber temperature [°C]'
      - 'Heating/cooling system functional (yes/no)'
tags:
  - hang-up
  - coking
  - crystallization
  - sticking
  - API 682
revisado_em: 2026-07-18
---

## Beginner

**What it is.** Some [[selo-mecanico|mechanical seal]] faces are designed to move axially a few micrometers during operation, tracking wear and small thermal shaft movements — that's how the seal keeps the faces in proper contact over its service life. **Hang-up** happens when solid deposits form in the region where that face should slide freely — typically coke (from hydrocarbons thermally degrading near hot surfaces) or crystals (from salts that precipitate as the fluid cools or partially evaporates) — and these deposits **stick** and block the face's axial movement. The seal loses its ability to adjust, and the result is leakage or face damage from lost tracking.

**How to recognize it in the field.** It's most common in services with fluids that **coke** (heavy oil, asphalt, refinery residues) or **crystallize** (saline solutions, some chemical processes) — especially after prolonged shutdowns, when the stagnant fluid has time to cool/settle and form a deposit without the continuous flow that normally keeps it suspended or dissolved.

**Why it matters.** It's an industry/service-specific failure mode — not every application is exposed, but where it is, it's recurring and seasonally tied to maintenance shutdowns, not constant wear. Typical prevention involves keeping the line heated/cooled even while stopped, preventing the fluid from reaching the condition that forms the deposit.

## Specialist

### Mechanism — two paths to the same sticking

**Coking:** heavy hydrocarbons, exposed to heated surfaces (proximity to friction faces, or process heating), undergo thermal degradation and form hard, adherent carbonaceous deposits — exactly in the face's axial-movement region, the worst possible place for a rigid deposit to form.

**Crystallization:** fluids with dissolved salts near saturation can precipitate crystals when temperature drops (solubility typically decreases with cooling) or when a fraction of the fluid evaporates at the seal's atmospheric face, concentrating the remaining salts to saturation. The classic pattern: it happens more during shutdowns (stagnant fluid, time to precipitate) than during continuous operation (constant flow keeps the solution).

### Framework A — diagnosis

`Mixed/Complex`: the deposit accumulates progressively with exposure time to risk conditions (β>1 in the buildup), but the formation trigger (a prolonged shutdown, a specific temperature drop) is operational and not always predictable on a calendar — IT-MNT-001 would treat this case as a candidate for FMEA decomposition: the deposit itself is wear-out, but the event that triggers formation is situational.

### Framework B — prescription

**CBM** with two fronts: monitoring the symptom (start-up vibration/noise, once sticking already exists) and — of higher value — **attacking the cause** by keeping the line heated/cooled even during shutdowns, so the fluid never reaches the deposit-forming condition. It's one of the few component failure modes where operational strategy (thermal management of the stopped line) matters more than any inspection of the seal itself.

## Engineer

### Why shutdowns are the highest-risk moment

In continuous operation, constant flow through the sealing chamber tends to keep particles suspended and dilute local salt concentrations near the face — even in fluids with crystallization risk, flow "washes" the region before local saturation is reached. During a shutdown, that flow stops: the fluid in the chamber becomes stagnant, exposed to ambient temperature variation for hours to days, enough time for the slow precipitation/coking processes to complete exactly at the seal's most sensitive geometry.

### The design lesson: thermal piping plans

API 682 Part 5 includes specific heating plans (steam trace/electric on the chamber) and cooling plans (Plans 21/23, which recirculate fluid through a heat exchanger) — the existence of these plans in the normative catalog confirms that temperature-driven hang-up is a recognized, design-addressed failure mode, not a rare anomaly. The correct audit when specifying a new seal explicitly asks: "does this fluid coke or crystallize under any plausible shutdown condition?" — if so, the thermal plan is not optional.

### Relation to other modes

A seal that suffered hang-up and had its face forced beyond its normal tracking travel can develop localized face damage analogous to [[abrasao-faces-selo-mecanico|abrasion]] — the rigid deposit, if fragmented during an attempted movement, itself becomes an abrasive particle trapped at the interface. A post-mortem on a seal with recurring hang-up should investigate both damage patterns.
