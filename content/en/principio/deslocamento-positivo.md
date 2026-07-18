---
slug: deslocamento-positivo
tipo_nota: principio
locale: en
titulo: 'Positive Displacement Pumps'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
fontes:
  - 'Hydraulic Institute — ANSI/HI 3.1-3.5 (Rotary Pumps) and 6.1-6.5 (Reciprocating Pumps)'
  - 'Karassik et al., Pump Handbook, 4th ed. (2008), ch. 3'
revisado_em: 2026-07-18
resumo: 'Principle where discrete volumes of liquid are captured and mechanically displaced. Flow nearly independent of pressure (vertical curve) — requires a relief valve. Splits into reciprocating (piston/diaphragm) and rotary (gear/screw/lobe).'
ordem: 2
---

Working principle in which **discrete volumes** of liquid are captured mechanically. "Discrete volume" means this: instead of a rotor continuously accelerating a stream (as in the [[dinamicas|rotodynamic]] principle), here a **chamber of fixed, known volume** fills with liquid at the suction, closes, and is physically displaced to the discharge — a piston advancing in a cylinder, a pair of gears carrying liquid between the teeth and the casing, a screw pushing fluid between its flights. Each cycle (or revolution) displaces always the **same volume**, with minimal internal clearances — it is this trait, not the material or the size, that defines the principle.

Direct consequence: flow depends only on chamber geometry and speed (rotation or strokes per minute) — **not** on the pressure it works against. The characteristic Q×P curve is nearly **vertical**: the same nominal flow, delivered at any pressure within the machine's mechanical limits.

## Why the relief valve is mandatory

A rotodynamic pump always has an internal escape path: the clearance at the [[bomba-centrifuga|wear rings]] lets liquid recirculate from the high-pressure side back to the suction. If the discharge is blocked, flow simply falls to zero and the pump settles at its **shutoff head** — a finite value, set by the machine's own curve (see Centrifugal Pump, Working Principle section).

A positive-displacement pump has **no such escape path** — the chamber is sealed by construction, and that very seal is what guarantees constant flow in the first place. If the discharge is blocked (closed valve, plugged line, clogged filter), the pump **keeps trying to displace the same volume every cycle** against a dead end: pressure rises with no theoretical limit, until the weakest component in the system fails — casing, flange, hose, or the pumping element itself. This is not a remote possibility: it is the direct mathematical consequence of "constant flow" once the outlet is removed. That is why every positive-displacement installation carries, **by standard practice**, a relief (or safety) valve on the discharge line, sized to divert the entire nominal flow back to suction or to a reservoir before the design pressure is exceeded — it is not an optional safety accessory, it is part of the working principle.

## Self-priming

"Self-priming" means the pump can **evacuate air** from its own suction line by itself, without needing the line already full of liquid to start working — unlike the rotodynamic pump, which depends on liquid in the rotor to generate centrifugal force (a rotor spinning in air pumps nothing). Because the positive-displacement element (piston, gear, lobe) displaces **whatever fluid is in the chamber** — liquid or gas — it also displaces the air initially trapped in the line, cycle after cycle, until liquid arrives and the pump starts pumping normally. This is why positive-displacement pumps are the natural choice for priming deep wells, emptying tanks down to the bottom, and services where the suction line cannot be guaranteed to stay full.

## Usual types

*(handbooks per type in Phase 1)*

- **Reciprocating** — volume trapped by rectilinear motion, pulsating flow: piston, plunger and diaphragm (total process isolation — hazardous fluids);
- **Rotary** — volume trapped by rotation, smoother flow: external and internal gear, lobe, single/twin/triple screw, vane, **progressing cavity** (Mono — the classic choice for slurries, sludges and viscous multiphase), peristaltic (the flexible hose is the only wetted element) and flexible impeller.

Dominant failure modes shift from sealing faces and valves (reciprocating) to clearances and wear of rotary elements.

## Flow nearly independent of pressure — the Q×P comparison

The widget below compares the two responses side by side: close the discharge valve (the same physical move in both cases) and watch what happens. In the rotodynamic pump, flow smoothly falls to zero — the machine's own curve limits the head at shutoff, and nothing breaks. In the positive-displacement pump, flow barely moves — it is the pressure required to sustain it that spikes, illustrating exactly why the relief valve from the section above is not optional.
