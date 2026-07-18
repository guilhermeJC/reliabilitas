---
slug: dinamicas
tipo_nota: principio
locale: en
titulo: 'Rotodynamic Pumps'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
fontes:
  - 'Karassik et al., Pump Handbook, 4th ed. (2008), ch. 2'
  - 'Hydraulic Institute — pumps.org'
revisado_em: 2026-07-18
resumo: 'Principle where a rotating impeller continuously transfers energy to the liquid (Euler equation). Falling H-Q curve; performance anchored at the best efficiency point (BEP).'
ordem: 1
---

Working principle where a **rotating impeller** continuously transfers energy to the liquid: the angular momentum imposed by the vanes converts into pressure rise. In summary — the full version, with Bernoulli explained first and the complete derivation, is in the [[bomba-centrifuga|Centrifugal Pump]] handbook — the **Euler turbomachinery equation** governs that conversion:

$$H_{th} = \frac{u_2 \, c_{u2} - u_1 \, c_{u1}}{g}$$

- $H_{th}$ — theoretical head, in meters of fluid column [m]: the energy potential the impeller delivers to the fluid, before subtracting real losses.
- $u$ — blade tangential velocity [m/s], $u = \omega r$ ($\omega$ = shaft angular velocity [rad/s]; $r$ = impeller radius at that point [m]).
- $c_u$ — tangential component of the fluid's absolute velocity [m/s].
- $g$ — gravitational acceleration [m/s²].
- Subscripts $1$ and $2$ — impeller inlet and outlet, respectively.

Since the fluid enters with little to no swirl in most designs ($c_{u1} \approx 0$), the expression reduces to $H_{th} = u_2 c_{u2}/g$: **all the head is born at the impeller periphery** — the larger the diameter and the speed, the larger the theoretical head. In practice, the real head delivered is lower than the theoretical one: part is lost to slip (the fluid is not perfectly guided by the finite number of vanes), another part to hydraulic friction, and another to internal recirculation — the handbook details all three.

## H-Q curve and the best efficiency point (BEP)

A rotodynamic pump's performance boils down to one curve: the **head (H)** it delivers falls as **flow (Q)** rises — more flow demands more fluid velocity inside the impeller, and that velocity "steals" energy that would otherwise convert into pressure. The actual operating point is not chosen by the pump: it is the **intersection** of that curve with the curve of the system it is connected to (the [[bomba-centrifuga|Centrifugal Pump]] note details that interaction).

Along that curve there is a point where hydraulic efficiency peaks — the **BEP** (Best Efficiency Point). It is the central reference of operational health: the farther the pump runs from BEP (flow much higher or much lower than it), the greater the internal recirculation, vibration, wear and susceptibility to [[cavitacao|cavitation]] — a large share of this principle's failure modes is born exactly there. The diagram below illustrates the curve's typical shape and the BEP marked on it:

![Generic H-Q curve with BEP marked, and the same curve at reduced speed linked by the affinity laws](/anatomia/curva-hq-generica.svg)

## Affinity laws

For the same impeller varying only speed $N$ (e.g. via a variable-frequency drive), three proportionalities link the old operating point to the new one:

$$\frac{Q_2}{Q_1} = \frac{N_2}{N_1} \qquad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^{2} \qquad \frac{P_2}{P_1} = \left(\frac{N_2}{N_1}\right)^{3}$$

- $Q$ — flow [m³/s or m³/h].
- $H$ — head [m].
- $P$ — absorbed power [W or kW].
- $N$ — speed [rpm]; subscripts $1$ and $2$ — reference condition and new condition.

In practice: cutting speed by 20% cuts flow by 20%, head by ~36% and power by ~49% — the central economic argument for variable-frequency drives. And since the whole BEP slides along that same rule (the diagram above shows the BEP migrating to lower $Q$ and $H$ at reduced speed), **required NPSH also falls with $N^2$** — reducing speed is, in practice, a tool against [[cavitacao|cavitation]], not only an energy-saving one.

## NPSH — the margin that avoids cavitation

Every rotodynamic pump has, at the impeller inlet, a region of minimum pressure — and if that pressure drops below the liquid's vapor pressure, it vaporizes locally and cavitates. Two numbers summarize that condition: **NPSHd** (available — how much the installation delivers, a *system* property: elevation, friction losses, fluid temperature) and **NPSHr** (required — how much the pump *needs* to run without cavitating, a *machine* property, given by the manufacturer). The design rule is simple to state and tricky to apply correctly: **NPSHd must exceed NPSHr with margin** — the [[cavitacao|Cavitation]] note (Engineer level) carries the rigorous formulation, the derivation from Bernoulli, the exact normative margins and a complete numerical example.

## Usual types

The criteria below are **orthogonal** — a given pump combines one of each:

- **Flow geometry**: **radial** centrifugal (the dominant one), **mixed-flow** and **axial** — specific speed grows in that order; the **helico-axial** extends the principle to multiphase mixtures (gas + liquid);
- **Staging**: single-stage × multistage (high pressures);
- **Construction/installation**: horizontal, vertical, in-line, submersible, axially split case, vertical turbine and deep-well, self-priming;
- **Service**: cryogenic, circulating, booster.

*(handbooks per type in Phase 1)* — Main type in the collection: [[bomba-centrifuga|Centrifugal Pump]].
