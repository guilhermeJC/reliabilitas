---
slug: rolamento
tipo_nota: componente
locale: en
titulo: 'Rolling Bearing'
status: published
taxonomia: []
iso14224_code: 'BE'
resumo: 'Rolling-contact element that supports radial and axial loads with minimum friction. Transversal component (D10): the same physics — Hertzian contact, EHL lubrication, L10 life — governs its failure in pumps, motors and gearboxes.'
fontes:
  - 'ISO 281:2007 — Rolling bearings: dynamic load ratings and rating life'
  - 'ISO 15243:2017 — Rolling bearings: damage and failures — terms, characteristics and causes'
  - 'SKF — Bearing damage analysis with ISO 15243 (Evolution Magazine)'
  - 'Harris & Kotzalas — Rolling Bearing Analysis, 5th ed.'
  - 'Machine Design — The Meaning of Bearing Life (L10 vs MTBF)'
  - 'ABMA 9/11 — Load ratings and fatigue life (American equivalent)'
  - 'ISO 492:2014 / ABMA Std 20 — Rolling bearings: tolerance classes (ABEC 1/3/5/7/9)'
  - 'SKF — General Catalogue (classification by type, shielding/sealing and material)'
tags:
  - L10
  - ISO 15243
  - lubrication
  - BPFO
  - contact fatigue
revisado_em: 2026-07-06
---

## Function and contact physics

The bearing replaces sliding with **rolling bodies** (balls or rollers) between rings, cutting the friction coefficient by ~2 orders of magnitude versus a dry plain bearing. The price of that efficiency is an extreme, invisible working condition: the entire load passes through contact areas of **fractions of a millimetre** — the **Hertzian contact** — where compressive stresses reach **1.5 to 3+ GPa**, an order of magnitude above the yield strength of ordinary steel. The material only survives because the stress is compressive, confined and cyclic — and it is precisely that cycle that defines the component's natural death mode: **rolling-contact fatigue**.

Between rolling bodies and raceways there is (or should be) a lubricant film of **0.1 to 1 μm** in the **elastohydrodynamic (EHL)** regime: local pressure is so high that the oil momentarily behaves as a solid and the surfaces deform elastically. The film ratio $\lambda$ (film thickness ÷ composite roughness) is the master predictor of life: $\lambda > 3$ = separated surfaces, full life; $\lambda < 1$ = metal-to-metal contact and accelerated adhesive wear/surface fatigue.

## Types and differences

The term "bearing" covers a wide family of geometries, each optimized for a different combination of load direction, speed, tolerable misalignment and available space. Choosing the wrong type — not the wrong failure mode — is a silent root cause of short life that no maintenance route detects, because the bearing "fails" exactly as the catalog predicts for an application outside its design envelope.

### By load direction

- **Radial**: designed primarily for load perpendicular to the shaft (the majority of industrial bearings).
- **Thrust (axial)**: designed primarily for load parallel to the shaft — flat or slightly inclined raceways, typically lower operating speed than an equivalent radial.
- **Combined**: capable of supporting radial and axial simultaneously in varying proportions, depending on type (see table below).

### By rolling element — balls vs. rollers

| | Balls | Rollers |
| --- | --- | --- |
| Geometric contact | Point (spherical Hertz) | Line (cylindrical/conical Hertz) |
| Load capacity for same size | Lower | Higher — larger contact area distributes stress |
| Speed limit | Higher (less rolling friction) | Lower |
| Stiffness | Lower | Higher — advantage in precision positioning (spindles, machine shafts) |
| Misalignment sensitivity | Higher in rigid types | Variable — cylindrical are sensitive, spherical/self-aligning are not |

### Ball subtypes

- **Deep groove (Conrad)**: the most common of all — deep raceways allow moderate radial and axial load **in both directions** in the same bearing, no paired mounting needed. Good compromise of speed, load and cost; doesn't tolerate angular misalignment beyond fractions of a degree.
- **Angular contact**: offset raceways produce a contact angle (typically 15°–40°) that allows axial load **in a single direction** per bearing, together with radial — the larger the angle, the higher the axial capacity and the lower the pure-speed capability. Always used **in pairs or sets** (back-to-back, face-to-face, or tandem) to cover both axial directions or multiply capacity — the pair configuration is itself a stiffness and moment-capacity decision.
- **Self-aligning ball**: two rows of balls with a **spherical** outer raceway, letting the whole bearing "rock" and absorb shaft angular misalignment (typically 1.5°–3°) without transmitting bending moment — at the cost of lower load capacity than a rigid bearing of the same size.
- **Thrust ball**: pure axial load, low speed — flat raceways on opposing faces, ball elements between them.

### Roller subtypes

- **Cylindrical**: straight rollers in line contact with the raceways — very high radial capacity and speed, but zero or minimal axial capacity depending on ring configuration (**NU**: no axial capacity, allows free axial float — used as a "floating bearing" on a shaft with another fixed bearing; **NJ**/**NUP**: limited axial capacity in one or two directions via machined ribs). Sensitive to angular misalignment — the contact line concentrates stress at one edge if the shaft bends.
- **Tapered**: conical rollers and raceways — support high radial **and** axial simultaneously, but generate an internal thrust component that **requires mounting in opposed pairs with adjusted clearance/preload** (never alone, unless combined with another bearing that absorbs the thrust). Ubiquitous in automotive hubs and bevel/helical gear reductions.
- **Spherical (self-aligning)**: two rows of barrel rollers with a common spherical outer raceway — combine very high radial capacity with moderate axial capacity **and** misalignment tolerance (typically 1°–2.5°), the classic choice for heavy industrial applications subject to structural deflection (crushers, vibrating screens, mills, large fans).
- **Needle**: long, thin rollers (high length/diameter ratio) allow very high radial capacity in a **minimal radial envelope** — often with no dedicated inner ring, rolling directly on the hardened shaft. Essentially zero axial capacity; highly sensitive to misalignment.
- **Thrust (cylindrical/tapered/spherical)**: axial equivalents of the radial rollers, for heavy thrust loads where a ball thrust bearing wouldn't suffice.

### Degree of protection — the first line of defense against [[contaminacao-lubrificante-rolamento|contamination]]

- **Open**: no protection of its own — depends entirely on the application's external sealing (housing, seal). Cheapest, easiest to regrease, but requires the assembly design to do all the work of keeping particles out.
- **Shielded (Z/ZZ)**: a fixed metal shield on one or both sides, **non-contacting** with the inner ring — keeps grease in and larger solids out without adding friction, allowing higher speeds than a sealed bearing. Partial protection: a residual gap always exists between the shield and the ring.
- **Sealed (RS/2RS)**: a sealing lip (elastomer) with or without actual contact on the inner ring — superior protection against fine particles and moisture, at the cost of added friction (lower speed limit) and needing to replace the whole bearing instead of just regreasing (the grease is factory-sealed).

### Material — beyond standard chrome steel

- **Stainless steel**: corrosion resistance in wet/chemical environments, at the cost of typically lower dynamic load capacity than chrome steel of the same geometry.
- **Ceramic hybrid**: silicon nitride (Si₃N₄) balls in conventional steel rings — lighter (lower centrifugal force at high speed), harder (higher resistance to particle indentation), and **electrically insulating**: the ceramic doesn't conduct current, eliminating the path for **electrical erosion/fluting** that afflicts conventional bearings under VFD drives (see the ISO 15243 table above) — the main reason for adoption in modern high-speed/variable-frequency motors, not just mechanical performance.
- **Full ceramic**: balls and raceways in ceramic — a niche for very high speed/temperature/extreme corrosive environments, at high cost.

### Precision classes

Dimensional and rotational (runout) tolerances are standardized into classes — **ABEC 1/3/5/7/9** (ABMA, American standard) correspond approximately to **ISO classes Normal/P6/P5/P4/P2**, in ascending order of precision. Precision bearings (ABEC 7/9 or ISO P4/P2) are justified in machine-tool spindles and high-speed machine shafts, where the bearing's own runout limits the machine's final accuracy — not in general industrial applications, where the Normal class already suffices comfortably and costs a fraction of the price.

## Rating life — L10 and the bridge to Weibull

Fatigue life is intrinsically statistical. ISO 281 defines the **L10 rating life**: the number of revolutions that **90% of a population** of identical bearings will reach or exceed:

$$L_{10} = \left(\frac{C}{P}\right)^p \quad \text{[million revolutions]}$$

with $C$ = dynamic load rating (catalog), $P$ = equivalent dynamic load and $p = 3$ for balls, $10/3$ for rollers. In hours:

$$L_{10h} = \frac{10^6}{60\,n} \left(\frac{C}{P}\right)^p$$

Three engineering readings the formula hides:

- **Cubic load sensitivity**: 25% overload halves the life. Misalignment, unbalance and off-BEP operation are silent multipliers of $P$.
- **L10 is not MTBF**: median life is ~5× L10; the distribution is Weibull with **β ≈ 1.1–1.5** for genuine fatigue — huge dispersion, predicting early failures in part of the population even with correct design. That is why bearings are natural CBM candidates, never time-based replacement.
- **Modified life** $L_{nm} = a_1 \, a_{ISO} \, L_{10}$ (ISO 281): the $a_{ISO}$ factor incorporates lubrication ($\lambda$), contamination and the fatigue limit — it can move life 1–2 orders of magnitude either way. Contamination and lubrication **are** the design.

## Failure modes — the 6 categories of ISO 15243

ISO 15243:2017 classifies all bearing damage into **6 categories with subcategories**, each with its own morphological signature — an almost perfect mirror of our Framework A. The standard classifies by **observed appearance**, not by isolated root cause, because in practice several mechanisms often act together:

| ISO 15243 category | Subcategory | Appearance | Typical Fw A reading |
| --- | --- | --- | --- |
| **Contact fatigue** (§5.1) | Subsurface (§5.1.2) | Microcracks below the surface at inclusions, propagating into a spall | Wear-out (β>1) — see [[fadiga-subsuperficial-rolamento|dedicated note]] |
| | Surface (§5.1.3) | Microspalling originating at the surface itself | Wear-out, accelerated by low $\lambda$ |
| **Wear** (§5.2) | Abrasive (§5.2.2) | Dull appearance, progressive material removal | Mixed — see [[contaminacao-lubrificante-rolamento|contamination]] |
| | Adhesive (§5.2.3) | Smearing (skidding, galling), material transfer between surfaces | Mixed/Random — see [[falha-lubrificacao-rolamento|lubrication failure]] |
| **Corrosion** (§5.3) | Moisture (§5.3.2) | Deterioration at the rolling-element spacing, typically at standstill | Random |
| | Fretting (§5.3.3.2) | Red/blackish oxidation at the interface, from micro-movement and incorrect fit | Random/Wear-out |
| | False brinelling (§5.3.3.3) | Wear marks at rolling-element spacing + oxidation — see [[falso-brinelamento-rolamento|dedicated note]] | Random |
| **Electrical erosion** (§5.4) | Excessive current (§5.4.2) | Discolored/melted areas, craters from thermal cycling (lightning, poor welding ground) | Random (event) |
| | Leakage current (§5.4.3) | Small, closely-spaced craters, grey washboard pattern — epidemic in VFDs without shaft grounding | Mixed (continuous electrical trigger) |
| **Plastic deformation** (§5.5) | Overload (§5.5.2) | Raceway indentation, nicks on rolling elements, cage/seal damage | Random (event) — see [[montagem-incorreta-rolamento|incorrect mounting]] |
| | Particle (§5.5.3) | Indentation marks from overrolled debris | Mixed |
| **Cracking and fracture** (§5.6) | Forced (§5.6.2) | Complete ring/component separation | Random/Infant |
| | Fatigue (§5.6.3) | Propagating crack through ring or cage | Wear-out |
| | Thermal (§5.6.4) | Cracks perpendicular to the sliding direction | Random (friction event) |

The practical reading: **spalling is the end of the story, not the beginning** — in most real cases the initiator was lubrication, contamination or mounting. SKF field data (Evolution) puts **abrasive wear at roughly 26%**, **surface fatigue at ~16%** and **moisture corrosion at ~14%** of documented occurrences — the three together cover nearly half the cases and point straight at contamination/lubrication as the dominant reliability lever, not metallurgy. Root-cause diagnosis requires reading the damage **morphology** (ISO 15243), not merely finding the spall — hence the 5 failure-mode notes below, each covering the mechanism, the Fw A/B reading and the maintenance plan for one specific category.

## Contamination, lubrication and the $a_{ISO}$ factor

The $L_{10}$ rating life assumes ideal lubrication and no particles — field reality rarely delivers that, and that gap is exactly what the **modified life** (ISO 281:2007) tries to capture:

$$L_{nm} = a_1 \, a_{ISO} \, L_{10}$$

The $a_{ISO}$ factor combines three inputs: the **viscosity ratio** $\kappa$ (actual oil viscosity at operating temperature ÷ the reference viscosity required by the geometry — the direct predictor of $\lambda$), the bearing material's **fatigue load limit** $C_u$, and the **contamination factor** $e_C$ (ISO 4406 cleanliness class, lubrication type — grease, bath, circulating — and bearing size). Engineering narrative: with high $\kappa$ (thick film) and low load, $a_{ISO}$ is barely sensitive to contamination; with low $\kappa$ and load near the limit, the same particle that would be harmless in a well-lubricated system cuts life by 1–2 orders of magnitude. Contamination and lubrication **are not** peripheral care items — together with load, they are the three variables that actually decide whether a bearing reaches anywhere near its catalog L10 or fails at a fraction of it.

## Numerical example — life sensitivity to overload

Deep-groove ball bearing (p=3), $C = 25$ kN, running at $n = 1,800$ rpm with equivalent load $P = 5$ kN:

$$L_{10} = \left(\frac{25}{5}\right)^3 = 125 \text{ million revolutions} \quad\Rightarrow\quad L_{10h} = \frac{10^6}{60 \times 1,800} \times 125 \approx 1,157 \text{ h}$$

A misalignment or unbalance that raises $P$ by 25% (to 6.25 kN) — with nothing else changing — drops $L_{10}$ to $(25/6.25)^3 = 64$ million revolutions: **life is cut in half** purely from the cubic load sensitivity. It is the same calculation, run in reverse, that justifies why precision alignment and balancing are, in practice, bearing-reliability tasks — even without touching the component itself.

## Defect frequencies — the vibration signature

Bearing geometry produces deterministic frequencies when a defect meets the rolling bodies — the basis of envelope/demodulation diagnosis:

- **BPFO** (outer race), **BPFI** (inner race), **BSF** (rolling element), **FTF** (cage) — all functions of ball count, diameters and contact angle, tabulated by manufacturers per designation.
- The classic damage progression: ultrasound/acoustic emission (stage 1) → envelope with BPFx (stage 2) → conventional spectrum with harmonics and sidebands (stage 3) → audible noise and temperature (stage 4, days before the end). This ladder is the component's concrete **P-F interval** — weeks to months in the early stages.

## Selection and good practice

- **Standardized designations** (e.g. 6205, 6309, 22220): interchangeable across SKF, Schaeffler/FAG, NSK, Timken — $C$, $C_0$ and defect-frequency data come from the manufacturer's catalog.
- **Mounting** accounts for a relevant share of infant mortality: induction heating (never open flame), pressing on the correct ring, interference fits per catalog.
- **Lubrication**: quantity and regreasing intervals per catalog; excess grease is as lethal as shortage (thermal churning).
- Under **VFD drives**: verify grounding/shaft discharge ring — electrical fluting is epidemic in modern motors.
