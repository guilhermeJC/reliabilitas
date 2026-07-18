---
slug: bomba-centrifuga
tipo_nota: tipo
locale: en
titulo: 'Centrifugal Pump'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
iso14224_code: 'PU'
fontes:
  - 'Karassik et al., Pump Handbook, 4th ed. (2008), ch. 2 and 12'
  - 'Gülich — Centrifugal Pumps, 3rd ed. (2014, Springer), ch. 3–7 and 11'
  - 'API 610, 12th ed. — Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries'
  - 'ASME B73.1 — Horizontal End Suction Centrifugal Pumps for Chemical Process'
  - 'ISO 5199 / ISO 2858 — centrifugal pumps: requirements and dimensions'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'ANSI/HI 9.6.3 — Operating Regions (POR/AOR)'
  - 'ANSI/HI 9.6.7 — Effects of Liquid Viscosity on Rotodynamic Pump Performance'
  - 'ISO 9906:2012 — Rotodynamic Pumps: Hydraulic Performance Acceptance Tests'
  - 'ISO 14224:2016 — equipment taxonomy (class PU, level 6)'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, 4th ed.'
  - 'Bloch — Pump User''s Handbook: Life Extension (MTBF benchmarks)'
  - 'European Sealing Association — Mechanical Seal Reliability (2025): seals in 60.4% of 3,500 recorded failures'
  - 'Wiesner (1967) — A Review of Slip Factors for Centrifugal Impellers, ASME J. Eng. for Power'
  - 'Stepanoff — Centrifugal and Axial Flow Pumps, 2nd ed. (1957) — radial thrust'
secoes:
  - classificacao
  - principio
  - anatomia
  - tipos
  - marcas
  - industria
  - tecnologias
  - componentes
  - modos_falha
componentes:
  - rolamento
  - selo-mecanico
tags:
  - cavitation
  - NPSH
  - pump curve
  - BEP
  - API 610
  - affinity laws
  - specific speed
  - system curve
anatomia:
  svg: /anatomia/bomba-centrifuga.svg
  alt: 'Technical cutaway of a horizontal overhung (OH1) centrifugal pump: opened volute with impeller, seal chamber, bearing housing with bearings and oil sump, coupling with guard — with the fluid path from suction to discharge'
  foto:
    arquivo: /anatomia/bomba-centrifuga-foto.jpg
    fonte: 'https://commons.wikimedia.org/wiki/File:Kreiselpumpe-Elektromotor.jpg'
    licenca: 'CC BY-SA 4.0'
    credito: 'HopuWiki (Wikimedia Commons)'
revisado_em: 2026-07-11
---

## Classification

A **rotodynamic** machine — principle [[dinamicas|Rotodynamic]], family Pumps, class Energy Addition to the Fluid (the full chain is in the breadcrumb above). Class **PU** at level 6 (*equipment unit*) of the ISO 14224:2016 taxonomy. The fundamental distinction from [[deslocamento-positivo|positive-displacement pumps]]: the centrifugal transfers energy to the fluid **continuously, through change of angular momentum** — not by trapping a sealed volume. The direct practical consequence: the pump does **not decide alone** how much flow and pressure it delivers — the piping, equipment and valves of the installation it is connected to decide (the Working Principle section shows exactly how).

And, for that same reason, it does not run the same risk as a positive-displacement pump if the discharge is blocked: because some internal clearance always lets liquid recirculate (the clearance between impeller and casing — see wear rings, further down), the pump never gets trapped against a truly dead-end path. Closing the discharge valve does not make pressure rise without limit — it makes flow fall, the pump start recirculating its own liquid internally, and head stop climbing at the maximum value the machine's own curve allows (*shutoff*, Working Principle section). All the mechanical energy that keeps coming in no longer becomes pressure: it becomes **heat**, warming the trapped volume of liquid — in high-energy pumps, enough to vaporize the fluid internally and destroy the seal within minutes, with no casing rupture at all.

It is the most numerous rotating equipment in the process industry — typically **more than 80% of the rotating fleet** of a refinery or chemical plant — and accounts for **30–40% of rotating-equipment maintenance cost** (Bloch & Geitner). That double condition (ubiquity + cost) makes the centrifugal pump the first asset of any serious reliability program.

## Working principle

### Where the energy comes from — Bernoulli first, Euler second

The simplest way to understand a pump is through **energy conservation** — the same Bernoulli equation used for any flow, just with an extra term for the energy the pump injects:

$$\frac{p_1}{\rho g} + \frac{v_1^2}{2g} + z_1 \; + \; H_{pump} \;=\; \frac{p_2}{\rho g} + \frac{v_2^2}{2g} + z_2 \; + \; \Sigma h_f$$

- $p$ — static pressure [Pa], at points 1 (suction) and 2 (discharge).
- $v$ — mean fluid velocity [m/s], at 1 and 2.
- $z$ — elevation (geometric reference height) [m], at 1 and 2.
- $\rho$ — fluid density [kg/m³].
- $g$ — gravitational acceleration [m/s²].
- $H_{pump}$ — the specific energy the pump adds to the fluid, the **head** [m of fluid column] — this is what we are solving for.
- $\Sigma h_f$ — sum of friction losses between 1 and 2 [m].

Rearranging to isolate $H_{pump}$: the pump must deliver **exactly** the energy missing to take the fluid from state 1 to state 2 — overcoming the pressure difference, the velocity difference, the elevation difference, and the friction losses along the way. That is precisely the calculation, worked out for the real installation, that sizes the pump (the "Pump in the system" section below shows how this becomes the system curve).

Bernoulli explains **how much** energy is needed — but it treats the pump as a black box. To understand **how** the impeller physically delivers that energy, the tool is **Euler's turbomachinery equation**:

$$H_{th} = \frac{u_2 \, c_{u2} - u_1 \, c_{u1}}{g}$$

- $H_{th}$ — theoretical head (the energy the impeller delivers before any losses) [m].
- $u$ — blade tangential velocity [m/s]: $u = \omega r$, where $\omega$ is the shaft's angular velocity [rad/s] and $r$ is the impeller radius at that point [m] — this is why **impeller diameter** is one of the two variables (alongside speed) the manufacturer uses to size and select the right pump for a given duty point.
- $c_u$ — tangential component of the fluid's absolute velocity [m/s].
- $g$ — gravitational acceleration [m/s²].
- Subscripts $1$ and $2$ — impeller inlet and outlet, respectively.

With purely radial inlet ($c_{u1} = 0$, the usual design), the expression collapses to $H_{th} = u_2 c_{u2}/g$: **all the head is born at the impeller periphery**. Since $u_2$ grows with radius and with speed, those two variables dominate performance — which is why reducing the impeller's outer diameter (*trimming*, a controlled mechanical cut) is the standard way to adjust a catalog pump to a specific duty point without changing the casing or the motor.

The real head delivered falls below the theoretical $H_{th}$ through three families of losses, each with its own physical cause:

- **Slip**: the fluid is not perfectly guided by the finite number of vanes — part of the angular momentum "escapes" before converting into pressure. Typically subtracts 10–25% of the Euler head; more vanes, more backward-curved, less slip.
- **Hydraulic losses**: friction on internal surfaces and incidence shock when the pump runs away from the flow the vanes were designed for — grow quickly away from BEP (below).
- **Volumetric losses**: part of the already-pressurized liquid recirculates back through the wear-ring clearance instead of reaching the discharge — the same clearance that, at the extreme of a blocked valve, keeps pressure from rising without limit (Classification section).

### H–Q curve, the best efficiency point (BEP) and minimum flow

Every pump's performance is summarized in a **head × flow (H–Q)** curve, factory-measured together with the associated power, efficiency and NPSHr curves — the interactive widget right below this section makes the curve's shape and the effect of speed tangible. Three references on that curve carry direct reliability consequences:

- **BEP (Best Efficiency Point)** — the point on the curve where hydraulic efficiency peaks. It is the central reference of operational health, not a catalog footnote: the farther the pump runs **from** BEP — flow much higher or much lower — the greater the internal recirculation, the radial shaft load and the vibration. The recommended operating range, the **POR** (*Preferred Operating Region*, ANSI/HI 9.6.3), is **70–120% of BEP flow**; the **AOR** (*Allowable Operating Region*) is the manufacturer's absolute limit — running outside the AOR consumes [[rolamento|bearing]] and [[selo-mecanico|seal]] life at an accelerated, not gradual, rate.
- **MCSF (Minimum Continuous Stable Flow)** — the real lower bound, distinct from simply "below 70% of BEP": it is the flow below which suction recirculation becomes severe enough to generate unstable vibration and heating that the pump cannot dissipate in continuous service — more restrictive than the POR in high-specific-energy pumps. Below it, sustained operation is not advisable even with good maintenance; the automatic recirculation (ARC) valve or minimum-flow line exists precisely to guarantee this minimum flow when the process demands less.
- **Curve stability** — a curve **continuously rising to shutoff** (maximum head at zero flow, typically 110–120% of BEP head in radial machines) has a single possible operating point for each head. **Flat or drooping** curves admit two different flow points at the same head — a source of hunting and unstable load sharing whenever two pumps run in parallel. API 610 requires a continuously rising curve whenever parallel operation is present.

### The pump in the system — who decides the operating point

The installation the pump is connected to — the piping, the process equipment, the valves — imposes the **system curve**:

$$H_{sys} = H_{est} + k\,Q^2$$

- $H_{sys}$ — head the system demands from the pump to deliver flow $Q$ [m].
- $H_{est}$ — static head: the elevation and/or pressure difference between the two reservoirs the pump connects, the portion that **does not depend** on flow [m].
- $k$ — system resistance coefficient (piping, valve and fitting friction) [s²/m⁵], derived from the piping itself (diameter, length, fittings).
- $Q$ — flow [m³/s].

The real operating point — the flow and head the pump actually delivers — is always the **intersection** of that system curve with the pump's own H-Q curve: neither one "wins" alone, the point is where the two agree. Every operating action, at bottom, is editing one of these two curves — and the most valuable diagnostic habit for this equipment is asking exactly **which curve changed**:

- **Closing (throttling) the discharge valve** raises $k$ — the system curve gets steeper, and the intersection point slides along the PUMP's own curve toward lower flow and higher head.
- **Changing a tank level or a vessel's pressure** changes $H_{est}$ — it shifts the entire system curve up or down, without changing its shape.
- **Varying speed via a VFD** (*variable frequency drive*, the electronic equipment that converts the grid's fixed frequency into a variable one, continuously controlling motor speed) shifts the **pump's** curve, not the system's — it is the only one of the three actions that changes the machine itself, and it does so following the affinity laws (next).

Reading cavitation, recirculation or motor overload as "the operating point moved" — and asking *which curve was edited and why* — resolves most field diagnoses before the pump is ever opened.

- **Parallel operation** (two pumps on the same discharge) adds flows at constant head — but the real gain depends on the system curve's steepness: with a steep (friction-dominated) system, the second pump adds **far less** than double the flow, and both drift away from BEP. Flat or drooping curves in parallel share load unstably (one pump ends up "carrying" the other).
- **Series operation** (one pump feeding the other's suction) adds heads at the same flow — the classic booster arrangement; mind the pressure class of the downstream pump's casing, which receives the sum of both pressures.

### Specific speed — the impeller's shape in one number

Different impeller designs deliver the same BEP (same nominal flow and head) with radically different geometries — a narrow, large-diameter wheel, or a wide, compact propeller. The **specific speed** $n_q$ is the practically-dimensionless number that identifies **which** of these shapes best solves a given flow-head pair, independent of the machine's physical size:

$$n_q = \frac{n \sqrt{Q}}{H^{3/4}}$$

- $n_q$ — specific speed, computed at the BEP.
- $n$ — speed [rpm].
- $Q$ — flow at BEP [m³/s].
- $H$ — head at BEP [m].

| $n_q$ | Geometry | Typical profile | Behavior |
| --- | --- | --- | --- |
| 10–40 | **Radial** (high head, low flow) | Process, high pressure | Flat curve; power grows with flow |
| 40–160 | **Semi-axial / Francis** | Water, condensate, large flows | Intermediate |
| > 160 | **Axial** (high flow, low head) | Intake, circulation | Steep curve; maximum power at shutoff |

Peak attainable efficiency is also a function of $n_q$ (practical maximum around 40–60; very low $n_q$ pays disproportionate disc friction relative to useful head) — and cavitation sensitivity grows with impeller-eye energy, which also scales with $n_q$. It is the first axis of the clustering in the Types section, below.

### Affinity laws

A direct consequence of $H_{th} = u_2 c_{u2}/g$ (and $u_2 = \omega r_2$): varying only the speed of the SAME impeller — the VFD case — shifts the whole H-Q curve predictably, with no new test required:

$$\frac{Q_2}{Q_1} = \frac{N_2}{N_1} \qquad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^{2} \qquad \frac{P_2}{P_1} = \left(\frac{N_2}{N_1}\right)^{3}$$

- $Q$ — flow [m³/s or m³/h], at the homologous point (same relative position on the curve).
- $H$ — head [m].
- $P$ — absorbed power [W or kW].
- $N$ — speed [rpm]; subscripts $1$ and $2$ — reference condition (e.g. nominal speed) and new condition (e.g. speed reduced by the VFD).

**Numerical example:** reducing speed by 20% (from $N_1$ to $N_2 = 0.8 N_1$) delivers $Q_2 = 0.8\,Q_1$ (−20% flow), $H_2 = 0.64\,H_1$ (−36% head) and $P_2 = 0.512\,P_1$ (−49% power) — the **cubic** dependence of power on speed is the central economic argument for variable-frequency drives: a modest flow cut already gives back almost half the energy consumed.

Two reliability readings follow directly from the same law: **NPSHr also falls with $N^2$** — reducing speed is, in practice, an active tool against [[cavitacao|cavitation]], not just an energy-saving one; and, in the opposite direction, small speed **increases** above nominal overload the driver and bearings disproportionately (power rises with the cube) — never run above the design speed without re-evaluating the whole mechanical chain.

### Power, start-up and thrusts

- **Power behavior**: in **radial** machines (low $n_q$) power grows with flow — start with the discharge closed (lowest starting load) and the minimum-flow line open; the motor is sized for **end of curve** (*run-out*), not for BEP. **Axial** machines are the opposite: maximum power at shutoff — start with the discharge open.
- **Radial thrust**: a single volute only balances peripheral pressures at BEP; away from it the radial resultant grows (maximum at shutoff — Stepanoff), flexing the shaft once per revolution (rotating fatigue, seal wear). A **double volute** splits the flow into two channels 180° apart and nearly cancels the resultant — standard on large machines.
- **Axial thrust**: the pressure imbalance between impeller shrouds pushes the rotor toward suction. Balancing: rear wear rings + balance holes (or back vanes); in multistage, opposed impellers (*back-to-back*) or a **balance drum/disc** with an equalization line. The residue belongs to the thrust bearing — repeated thrust-bearing failures call for a balance audit, not a "better" bearing.

### Efficiency decomposed — where the energy goes

$$\eta = \eta_h \cdot \eta_v \cdot \eta_m$$

- **η_h (hydraulic)**: friction and incidence shock — falls quickly away from BEP.
- **η_v (volumetric)**: recirculation through the **wear rings** — doubling the design clearance knocks off whole efficiency points; it is the slow drift that performance monitoring sees (same flow demanding more power).
- **η_m (mechanical)**: bearings, seal and disc friction.

Practical BEP efficiency ranges: ~50–70% in small pumps, 75–88% in well-selected process machines, >90% in large water pumps. Every percentage point is a permanent energy bill — and falling efficiency is a measurable symptom of internal wear before any functional failure.

### NPSH — the existence condition of suction

Every centrifugal pump has, at the impeller inlet, a region of minimum pressure — a direct consequence of Euler's equation itself: to convert velocity into pressure, the fluid must first accelerate, and wherever it accelerates most, local pressure drops the most. If that minimum pressure falls below the liquid's vapor pressure, it vaporizes right there — the onset of [[cavitacao|cavitation]], this equipment's signature failure mode. **NPSH** (*Net Positive Suction Head*) is the ruler that measures the margin before that happens:

$$NPSH_a = \frac{P_0 - P_v(T)}{\rho g} - H_s - \Sigma h_f$$

- $NPSH_a$ — available NPSH: how much the installation actually delivers at the pump inlet, above vapor pressure [m].
- $P_0$ — absolute pressure at the liquid surface in the suction reservoir [Pa] (atmospheric, if the tank is open).
- $P_v(T)$ — the liquid's vapor pressure at the operating temperature $T$ [Pa] — rises sharply with temperature (see the Cavitation note, Engineer level, for the full curve).
- $\rho$ — liquid density [kg/m³].
- $g$ — gravitational acceleration [m/s²].
- $H_s$ — static suction head [m]: positive when the pump is **above** the liquid level (penalizes NPSHa), negative when it is **below** (favors NPSHa) — the "Pump installation" section below shows the real-world scenarios.
- $\Sigma h_f$ — sum of friction losses in the suction line (friction + fittings) [m].

This **NPSHa**, a property of the installation, must exceed **NPSHr** (required NPSH, a property of the pump — the manufacturer measures it on a test stand and states it on the curve, using the 3% head-drop criterion) with a **safety margin**: NPSHa/NPSHr ratios of **1.1 to 2.5** depending on the design's suction energy (ANSI/HI 9.6.1:2024); API 610 goes further and requires, directly, **NPSHa ≥ NPSHr + 1.0 m throughout the allowable operating region (AOR)**. Insufficient margin — from excessive suction lift, friction losses larger than assumed, or simply the process heating up (which raises $P_v$ exponentially) — is the most common root cause of field cavitation.

A quick example to make this concrete: an installation with a comfortable NPSH margin at 25 °C can start cavitating severely **with no physical change at all** — just by the process heating to 70–80 °C, because $P_v(T)$ rises far faster than any other variable in the equation. The [[cavitacao|Cavitation]] note (Engineer level) carries the full derivation from Bernoulli, the $P_v(T)$ table and a worked numerical example of the same installation at two temperatures.

### Pump installation — flooded, elevated, submerged and variable-level suction

A common misconception: saying the pump **"sucks"** or "pulls" the fluid in. It does not pull — it **pushes**, always by a pressure difference. The impeller creates a low-pressure zone at the inlet and a high-pressure zone at the outlet; it is atmospheric (or vessel) pressure pushing liquid from the suction reservoir toward that low-pressure zone that actually moves the fluid to the pump — from there, the impeller pushes the liquid onward to the discharge. Understanding this reframes every installation scenario: what matters is not the distance to the pump, it is the **pressure difference available** to push the liquid there — exactly what the NPSH equation above quantifies through the $H_s$ term.

- **Flooded suction** (pump **below** the liquid level): $H_s$ is negative and **adds to** NPSHa — the most favorable condition, because the liquid column above the pump already pushes fluid into it before the impeller does anything at all. This is the recommended layout whenever plant geometry allows it.

  ![Flooded-suction installation: the tank sits above the pump, H_s adds to NPSHa](/anatomia/bomba-instalacao-afogada.svg)

- **Suction lift** (pump **above** the liquid level): $H_s$ is positive and **subtracts from** NPSHa — every metre the pump sits above the level is a metre less of margin. Requires priming (the suction line does not fill by itself) and, typically, a foot valve to retain the liquid column when the pump stops.

  ![Suction-lift installation: the tank sits below the pump, H_s subtracts from NPSHa](/anatomia/bomba-instalacao-sucao-positiva.svg)

- **Submerged pump** (the rotor+motor assembly immersed in the liquid itself — wells, drainage, intake): removes $H_s$ as a problem altogether (the pump is already at the most favorable level possible), but trades it for another challenge — **minimum submergence** (ANSI/HI 9.8): the minimum liquid depth above the inlet needed to prevent a surface vortex from dragging air into the nozzle, which degrades effective NPSHa just as much as insufficient elevation margin would.

  ![Submerged pump: the assembly is immersed in the well, with the minimum-submergence dimension marked](/anatomia/bomba-instalacao-submersa.svg)

- **Variable suction level** (e.g. draining a tank, a sump, or a tanker truck during operation): the suction line stays fixed, but the liquid level falls over time — $H_s$ **worsens progressively** during the operation itself, even if the installation was designed with a comfortable margin at the start. This is a classic cavitation scenario that only shows up at the end of the pumping cycle, and one the NPSH audit must evaluate at the **worst instant** (lowest level), not the average.

  ![Suction level falling over time: H_s grows and NPSHa progressively worsens](/anatomia/bomba-instalacao-nivel-variavel.svg)

### The fluid changes the pump — viscosity, density, gas and priming

- **Viscosity**: catalog curves are for water. Viscous fluid knocks down flow, head and above all efficiency, and raises power — correct with the **ANSI/HI 9.6.7** factors; above a few hundred cSt, the comparison with positive displacement almost always wins.
- **Density**: head in metres **does not depend on ρ** — but pressure ($\Delta p = \rho g H$) and power scale with ρ. The commissioning trap: water-testing (ρ = 1,000) a pump selected for light hydrocarbon (ρ ≈ 750) demands ~33% more power — an undersized motor trips during the test.
- **Free gas**: 2–4% by volume already degrades a standard impeller's head and efficiency; around ~10% the flow separates and the pump loses prime (open-impeller/inducer variants tolerate more).
- **Priming**: a centrifugal **does not pump air** — casing and suction line must be full and vented before start-up (foot valve, vacuum priming, or a self-priming variant). Reverse rotation (swapped three-phase leads) delivers low head/flow and vibration — a commissioning check that precedes any hydraulic diagnosis.
- **Acceptance and baseline**: the **ISO 9906** performance test (acceptance grades 1/2/3) at delivery is the *baseline* against which performance monitoring (PIMS) will measure all future drift — without a baseline, performance-based CBM is guesswork.

## Anatomy

![Horizontal process centrifugal pump coupled to an electric motor on a common baseplate](/anatomia/bomba-centrifuga-foto.jpg)

*Photo: HopuWiki — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kreiselpumpe-Elektromotor.jpg), CC BY-SA 4.0. Typical arrangement: horizontal single-stage pump + coupling + induction motor on a common steel baseplate.*

The **interactive** technical cutaway below opens the machine component by component — from the suction nozzle to the coupling guard, with the **fluid path** traced from inlet to outlet. Each numbered point explains the component's function, where it tends to fail and where to go deeper: the transversal components [[rolamento|rolling bearing]] and [[selo-mecanico|mechanical seal]] have their own handbooks, and [[cavitacao|cavitation]] has the full failure-mode note.

## Types and differences

A real centrifugal pump is the **combination of one position on each of six classification axes** — a Goulds 3196 is: radial + single-stage + OH1 + sealed + ASME B73.1 + chemical process. Reading a fleet through these axes is what allows comparing machines, anticipating dominant failure modes and specifying replacements:

### Axis 1 — Hydraulics (impeller shape, via specific speed)

Radial ($n_q$ 10–40, high head/low flow) → semi-axial/Francis (40–160) → axial (>160, high flow/low head). Governs curve shape, power behavior and suction sensitivity (Working principle section).

### Axis 2 — Number of stages

**Single-stage** as far as head and speed can reach; **multistage** (impellers in series on the same shaft) for high head without extreme speed or diameter — boiler feedwater, pipelines, reverse osmosis. Multistage brings the accumulated axial-thrust problem (balance drum/disc) and steeper curves.

### Axis 3 — Mechanical configuration (API 610 nomenclature)

| Family | Types | Configuration | Typical application |
| --- | --- | --- | --- |
| **Overhung (OH)** | OH1 (foot), OH2 (centerline), OH3–OH5 (vertical in-line) | Impeller cantilevered at shaft end | General process; OH2 is the refining standard |
| **Between-bearings (BB)** | BB1–BB5 (1–2 stages → barrel multistage) | Impeller(s) between bearings | High flow/pressure, boiler feedwater, pipelines |
| **Vertically suspended (VS)** | VS1–VS7 | Immersed vertical column | Sumps, wells, cryogenics, water intake |

Valid as a common language even outside O&G scope. Design complements: **single × double volute** (the double balances radial load off-BEP — large machines) and **vaned diffuser** (multistage and verticals).

### Axis 4 — Sealing and drive technology

- **Conventionally sealed**: single or dual [[selo-mecanico|mechanical seal]] with API 682 piping plans — the dominant arrangement; the seal is the no. 1 maintenance item.
- **Magnetic drive (*mag-drive*)**: no seal, no leakage — at the cost of sensitivity to particles and dry running (the fluid cools the internal bearings).
- **Canned motor**: motor rotor immersed in the fluid; maximum hermeticity (toxic/lethal services), same sensitivities.
- **Submersible** (motor below the fluid — deep wells, drainage).

Changing position on this axis changes the **dominant failure mode**: the sealed pump fails at the seal; sealless pumps fail from particles, dry running and internal bearings.

### Axis 5 — Construction standard / service severity

- **ASME B73.1** — the "ANSI pump": interchangeable dimensions for chemical service; the dominant installed base in the Americas.
- **ISO 2858 / ISO 5199** — the international equivalent (dimensions / requirements); the European and Brazilian general-industry standard.
- **API 610** — refining/petrochemical/O&G: demanding casing, temperature, sealing (API 682) and margin requirements; designed for 20+ years of severe service.
- **Sanitary** (EHEDG/3-A) and **water/wastewater** complete the spectrum.

### Axis 6 — Special cases

**Self-priming** (casing with a recirculation reservoir), **regenerative/peripheral** (very high head at minimal flow), **recessed-impeller/vortex** (solids and fibres — efficiency sacrificed), **high-speed with gearbox** (extreme head in a compact machine), **slurry pumps** (rubber/high-chrome linings — mining).

### The matrix — real examples across the six axes

| Model | A1 hydraulics | A2 stages | A3 config. | A4 sealing | A5 standard | Typical service |
| --- | --- | --- | --- | --- | --- | --- |
| [[goulds-3196|Goulds 3196]] | Radial | 1 | OH1 | Sealed | ASME B73.1 | Chemical process |
| [[ksb-meganorm|KSB Meganorm]] | Radial | 1 | OH1 | Sealed | ISO 2858 | General industry/water |
| [[flowserve-hpx|Flowserve HPX]] | Radial | 1 | OH2 | Sealed API 682 | API 610 | Refining |
| [[grundfos-cr|Grundfos CR]] | Radial | Multi | Vertical in-line | Sealed | — | Utilities/pressure boosting |
| [[sulzer-msd|Sulzer MSD]] | Radial | Multi | BB3 | Sealed | API 610 | Pipelines/boiler feed |
| Sulzer AHLSTAR | Radial/Francis | 1 | OH | Sealed | ISO 5199 | Pulp & paper |

Each model linked in the first column has its **own sheet** (taxonomy level 5 — Brand/Model) with axis positions, catalog ranges, official documentation and a reliability reading; Sulzer AHLSTAR gets its sheet as the collection expands.

## Brands and models

Market references cited as reality anchors, each with the construction difference that defines it (official links; D05 — never catalog rehosting):

- **[[goulds-3196|Goulds 3196 (ITT)]]** ([product page](https://www.gouldspumps.com/products/3196-i-frame)) — the world archetype of ASME B73.1 and the most-installed chemical process pump in the world; decades of field history and full dimensional interchangeability across generations — the spare-parts argument that sustains the ANSI standard.
- **[[ksb-meganorm|KSB Meganorm / Megabloc]]** ([product page](https://www.ksb.com/en-us/lc/products/pump/dry-installed-pump/meganorm/M52B)) — the ISO 2858 line with the largest presence in Brazil (local manufacturing); Meganorm with coupling and baseplate, Megabloc close-coupled (impeller on the motor shaft end — less alignment, no baseplate).
- **[[flowserve-hpx|Flowserve HPX]]** ([product page](https://www.flowserve.com/products/products-catalog/pumps/overhung-pumps/flowserve-hpx-api-process-pump-0/)) — the refining OH2 from Flowserve's full API 610 portfolio (OH2/BB/VS), with a strong sealing heritage (Durametallic legacy); the reference when service demands integrated API 682.
- **[[sulzer-msd|Sulzer MSD]]** ([product page](https://www.sulzer.com/en/shared/products/msd-axially-split-multistage-pump)) — the reference BB3 of heavy multistage duty (boiler feedwater, refined-product pipelines): axially split casing with opposed impellers, over 10,000 units installed. Sulzer is also the reference in pulp & paper (AHLSTAR line — fibrous, gas-laden stock).
- **[[grundfos-cr|Grundfos CR]]** ([CR family page](https://product-selection.grundfos.com/us/products/cr-cre-cri-crie-crn-crne-crt-crte)) — dominance in vertical in-line multistage (CR series) and packaged systems with integrated VFD and electronics — the "smart off-the-shelf product" end of the spectrum.
- **[[imbil-ini|Imbil INI]]** ([INI line page](https://imbil.com.br/produtos/ini/)) — relevant Brazilian manufacturer in sanitation, irrigation and general industry; the local alternative for lead time and support in the Brazilian market.

## Industry and applications

Dominant sectors: refining and petrochemicals (transfer, unit charge, reflux), chemicals, pulp and paper, sanitation (intake and transmission), mining (slurry — with design adaptations), food and pharma (sanitary variants), utilities (chilled water, condensate, boiler feed). The census rule — **>80% of rotating equipment are centrifugal pumps** — means this asset's maintenance standard defines the whole plant's standard: it is where reliability programs earn or lose credibility.

### Reliability in numbers

Consolidated literature benchmarks (re-verified at the source — the ruler for your own fleet):

| Indicator | Reference value | Source |
| --- | --- | --- |
| MTBF/MTBR — refineries and petrochemicals | **3 to 10 years** (the spread is management, not machine) | Bloch, Pump User's Handbook |
| MTBF — chemical plants | ~50–60% of refinery values | Bloch |
| MTBF — ANSI B73.1 pumps (US) | average ~2.5 years · target 3.75 · excellent 4.5+ | Budris/WaterWorld |
| No. 1 component in failures | **Mechanical seal — recorded in 60.4% of 3,500 failures** (18 plants) | European Sealing Association |
| Root cause of premature seal failures | 49% operations · 28% maintenance · 23% engineering | ESA |
| Bearings | ~⅓ of assembly failures; 52% of those from contamination/lubrication | historical user/manufacturer estimates |
| Energy | Pumping systems ≈ **25% of industrial motor energy** | HI/DOE |

Two readings: (1) the seal leads the statistics but **is mostly a symptom** — the root causes point to off-BEP operation, flush loss and deficient suction; attacking the seal without attacking the system is mopping with the tap open. (2) The MTBF spread between plants running the same machines (3× or more) is the quantitative proof that pump reliability is a discipline of specification, installation and operation — exactly what this handbook exists to transfer.

## Technologies

The state of monitoring practice, in order of maturity:

- **Vibration analysis** (monthly route or online): spectrum + envelope; tracks [[rolamento|bearings]] (defect frequencies), misalignment (2×RPM), unbalance (1×RPM), blade passing (BPF) and the broadband signature of [[cavitacao|cavitation]].
- **Performance monitoring** (PIMS): head, flow and power against the ISO 9906 test reference curve — performance drift is an early symptom of internal wear (rings) and recirculation.
- **Oil analysis** of the bearing housing: particle count, water, viscosity.
- **Low-cost online sensors** (acceleration + temperature, wireless): made coverage of "class B" assets viable beyond manual routes.
- **The VFD as an instrument**: drive current and torque carry process signatures (blockage, severe cavitation, dry running) without any extra sensor — and the drive itself is the tool for repositioning the operating point.

## Components

Transversal components (D10 — modeled once, referenced by every parent equipment):

- [[rolamento|Rolling bearing]] — load support; L10, ISO 15243, defect frequencies.
- [[selo-mecanico|Mechanical seal]] — dynamic sealing; API 682, PV factor, piping plans.

Other items kept in equipment context: wear rings (clearance = volumetric efficiency), coupling (alignment!), baseplate and grouting (the foundation is part of the machine).

## Failure modes

- [[cavitacao|Cavitation]] — the signature mode: Mixed/Complex in Fw A, CBM at P-F/2 in Fw B.
- Mechanical seal failure — Wear-out/Mixed; frequently a consequence of off-BEP operation or flush loss.
- Bearing failure — Wear-out (fatigue) with Mixed triggers (lubrication/contamination).
- Misalignment and excessive vibration — Mixed; detectable in spectrum (2×RPM, harmonics).
- Impeller erosion/corrosion — Wear-out in abrasive/corrosive services.
