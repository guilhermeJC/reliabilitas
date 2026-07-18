---
slug: bombas
tipo_nota: familia
locale: en
titulo: 'Pumps'
status: published
taxonomia:
  - adicao-de-energia
iso14224_code: 'PU'
fontes:
  - 'ISO 14224:2016, table A.4 (equipment class PU)'
  - 'Hydraulic Institute — ANSI/HI 1.1-1.2 (Rotodynamic Pumps: Nomenclature and Definitions)'
  - 'Karassik et al., Pump Handbook, 4th ed. (2008), ch. 1'
revisado_em: 2026-07-06
resumo: 'Family of machines that add energy to a liquid to move it. The Hydraulic Institute classifies them into kinetic (rotodynamic + special-effect) and positive displacement — the choice of principle defines physics, curve and failure modes.'
---

Machines that **add energy to a liquid** to transfer it between process points — overcoming elevation, pressure and friction losses. In the most common form, energy travels through a 3-stage chain: (1) the **driver** converts an external energy source — electrical, thermal, hydraulic — into rotation at its own shaft; (2) the shaft transmits that **mechanical energy** to the pump element (rotor, piston, gear); (3) that element transfers the energy to the liquid as **hydraulic energy** (pressure + velocity). The most common industrial case is a three-phase electric motor driving a rotor — covered in detail in the [[bomba-centrifuga|Centrifugal Pump]] note. In [[efeito-especial|special-effect]] devices this mechanical link simply does not exist: energy reaches the liquid directly from a motive fluid/gas or an electromagnetic field, with no shaft or rotating element.

## How energy is supplied to the liquid

What distinguishes the equipment that moves liquids is not *whether* it adds energy — all of them do — but **where that energy comes from and by which mechanism it is transferred**:

| Equipment | Energy source | Transfer mechanism |
| --- | --- | --- |
| **Pump** (rotor, piston, gears) | motor → shaft → mechanical element | the mechanical element accelerates or displaces the liquid directly |
| **Ejector / eductor** (jet pump) | high-pressure motive fluid | a motive jet entrains and pressurizes the drawn liquid (Venturi effect) |
| **Air lift** (gas-lift pump) | compressed air (compressor) | injected air lowers the column density, which then rises |
| **Hydraulic ram** | kinetic energy of the water itself | water hammer lifts a fraction of the flow to great height |
| **Hydraulic intensifier** | another hydraulic circuit | converts the pressure of one fluid into higher pressure in another |

An important standards point: under the **Hydraulic Institute** classification, the three moving-part-free, fluid-driven devices — **ejector, air lift and hydraulic ram** — are not separate categories but **special-effect pumps**, a subfamily of **kinetic** pumps (alongside the rotodynamic ones). The **intensifier** is the only one that departs: it is a **pressure multiplier**, not a fluid transporter — handled separately.

## Working principles

The family splits into fundamental principles — the choice between them defines the physics, the characteristic curve and the dominant failure modes:

- [[dinamicas|Rotodynamic]] — energy is transferred continuously by a rotating impeller (Euler's equation); e.g. centrifugal, axial. Flow varies with system pressure.
- [[deslocamento-positivo|Positive displacement]] — discrete volumes are captured and displaced (gear, piston, screw). Flow nearly independent of pressure; requires a relief valve.
- [[efeito-especial|Special effect]] — no moving parts, driven by a motive fluid or gas (ejector, air lift, hydraulic ram). Robust and cheap, with low efficiency.

More than 80% of the rotating assets in a typical process plant are pumps — dominated by the [[bomba-centrifuga|centrifugal pump]].
