---
slug: dry-running-selo-mecanico
tipo_nota: modo_falha
locale: en
titulo: 'Dry Running'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-DRY'
fontes:
  - 'API 682, 4th ed. — Pumps: Shaft Sealing Systems for Centrifugal and Rotary Pumps'
  - 'FSA — API 682 Part 5: Piping Plans'
  - 'QM Seals — How Dry Running Damages Mechanical Seals in Pumps'
  - 'FBU Seals — Mechanical Pump Seal Failure: 8 Common Causes & Prevention'
  - 'Karassik et al., Pump Handbook, 4th ed. — sealing chapter'
  - 'Moubray, RCM II (1997), ch. 3 — random failure patterns'
fw_a:
  categoria: random
  beta: '~1 (operational event — film loss, not accumulated wear)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Continuous (chamber temperature/piping-plan pressure alarm)'
pf_tipico: 'minutes to a few tens of minutes between film loss and thermal destruction of the faces'
plano_manutencao:
  - tarefa: 'Continuously monitor seal chamber temperature'
    metodo: 'Fixed temperature sensor with deviation alarm, compared against the normal-operation baseline'
    periodicidade: 'Continuous'
    condicao: 'In operation'
    criterio: 'Temperature stable within the normal range for the fluid and process condition'
    acao: 'Fast, sustained rise → strongly suspect film loss; check chamber level/pressure and stop the pump if confirmed, before total face destruction'
    especialidade: 'Automation / process instrumentation'
    duracao: 'Continuous; monthly alarm audit'
    passos:
      - 'Confirm the temperature sensor is calibrated and the alarm set with adequate margin above baseline'
      - 'Immediately investigate any fast (minutes) rise outside the process pattern'
      - 'Correlate with seal chamber level/pressure before acting'
      - 'Log the event and the action taken'
    registros:
      - 'Seal chamber temperature [°C]'
      - 'Time between alarm and action [min]'
  - tarefa: 'Check piping-plan level/pressure and start-up interlocks'
    metodo: 'Instrumentation inspection (barrier pot level, plan 11/32/53 pressure) + test of the interlock that blocks start-up without minimum level'
    periodicidade: 'Monthly; mandatory after any intervention on the sealing line'
    condicao: 'In operation and before any start-up after maintenance'
    criterio: 'Level/pressure within design range; start-up interlock functional (tested)'
    acao: 'Inoperative interlock or chronically low level → fix before the next start-up, not after'
    especialidade: 'Instrumentation / automation'
    duracao: '0.5 h'
    passos:
      - 'Check the barrier pot level (plans 53) or injection pressure (plan 32)'
      - 'Test the start-up block interlock for missing minimum sealing condition, if fitted'
      - 'Log and fix any deviation before the next start-up'
    registros:
      - 'Barrier pot level [%]'
      - 'Interlock tested (OK/failed)'
tags:
  - dry running
  - API 682
  - piping plan
  - PV factor
revisado_em: 2026-07-18
---

## Beginner

**What it is.** The [[selo-mecanico|mechanical seal]] depends on a ~1 μm fluid film between the faces to seal AND lubricate at the same time — without that film, it's pure metal-to-metal friction between rotating surfaces. **Dry running** is exactly that: the seal chamber runs short of fluid (emptying, a suction vortex, gas ingress, or a piping plan that stopped working), the film disappears, and the faces generate heat through direct friction. Since the faces are designed for a micrometer-thick film, not direct contact, temperature rises extremely fast — **minutes**, not hours — until thermal shock, radial cracks in the ceramic faces, and total destruction.

**How to recognize it in the field.** It's one of the few seal failure modes with a clear, simple early signal: **seal chamber temperature rising fast and out of pattern**. It doesn't require sophisticated analysis — a well-calibrated temperature sensor with an alarm detects the event in minutes, enough time to act before total destruction.

**Why it matters.** It is typically the component's **fastest and most expensive** failure mode — from normal operation to a destroyed seal in a matter of minutes, often leading to process leakage (with safety/environmental risks depending on the fluid). The root cause is almost always **outside the seal**: cavitation at the pump suction, a low tank level, or a sealing-plan block valve mistakenly closed.

## Specialist

### Film-loss pathways

1. **Empty chamber** — low suction level, lost prime, or the pump operating without enough fluid circulating through the chamber.
2. **Vortexing/gas ingress** — an obstructed or undersized recirculation (Plan 11) lets dissolved gas or air ingress replace the liquid in the chamber.
3. **Inoperative piping plan** — a valve mistakenly closed, a clogged Plan 11 orifice, a stopped Plan 23 circulation pump, or lost barrier pressure on Plans 53.
4. **Cavitation at the pump suction** — severe [[cavitacao|cavitation]] reduces the effective fluid density in the chamber, an indirect but real path to partial dry running.

### Framework A — diagnosis

`Random`, **β ≈ 1**: the event is triggered by a one-off operating condition (a closed valve, a low level), not by cycle accumulation — a new seal and an old seal are equally vulnerable if exposed to the same film loss. There is no characteristic failure age for this mode.

### Framework B — prescription

**Continuous CBM via temperature**, the component's shortest and most critical P-F — the difference between detection in seconds/minutes and late detection is the difference between "seal saved" and "destroyed seal + process leak." The second layer (level/pressure and interlock checks) attacks the **cause**, preventing the dry-running condition from ever setting in.

## Engineer

### Why destruction is so fast — the PV factor physics without a film

Without a lubricating film, the face friction coefficient jumps from very low values (hydrodynamic regime) to typical dry carbon-ceramic contact values — an order of magnitude higher. Since frictional heat generation scales with the product of normal force × speed × friction coefficient, the same PV condition that was safe in the lubricated regime greatly exceeds the faces' thermal limit in the dry regime — hence the timescale of minutes, not hours: the "PV factor" discussed under [[selo-mecanico|Mechanical Seal]] assumes a film is present; without it, the physics changes category.

### Relationship to the upstream process

Dry running is rarely a defect of the seal itself — it is almost always a symptom of a **process** or **pump** condition that the seal merely reveals first (being the component with the smallest thermal margin). This makes it an excellent "canary": a recurring dry-running history at the same pumping point should trigger investigation of tank level, suction sizing or [[cavitacao|cavitation]] before any repeat seal replacement — replacing the seal without treating the cause just guarantees the next failure.
