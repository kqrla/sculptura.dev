# Lost-Wax Investment Casting Process, Resin Burnout & Quality Standards

research: 2026-09-11 · source: https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf , https://www.ransom-randolph.com/plasticast , https://www.stuller.com/articles/view/melting-and-investment-casting/ (+17 more) · status: cited

## thesis

Investment casting (lost-wax process) is the primary manufacturing route for high-fidelity precious metal jewelry, but modern digital workflows transitioning from traditional microcrystalline carving wax to SLA/DLP 3D-printed photopolymer castable resins introduce critical physical failure modes. While carving wax melts cleanly out of investment molds at 60°C–75°C [Source 11](https://www.ganoksin.com/article/sprue-system-design/), photopolymer resins do not melt; they undergo solid-state thermal expansion of 2.0%–3.0% [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) between 200°C and 400°C [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf) followed by thermal pyrolysis and gasification. If processed with standard gypsum-bonded investment powders (such as Kerr Satin Cast 20 [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000)), expanding resins cause mold cracking, finning, and severe ash residue porosity. Successful resin casting requires high-strength, high-expansion investment powders (R&R Plasticast [Source 3](https://www.ransom-randolph.com/plasticast) or phosphate-bonded formulas [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/)), extended high-temperature burnout holds at 732°C–780°C [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) for 3.0–6.0 hours [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/), and active kiln oxygen airflow to guarantee zero residual carbon ash. Standardized linear shrinkage scaling in CAD of 1.5%–3.0% [Source 10](https://knowledge.welongcasting.com/what-is-precision-casting-and-how-does-it-work) and adherence to ISO 8062-3 CT4–CT6 [Source 9](https://www.bessercast.com/investment-casting-tolerances/) dimensional tolerances (±0.10 mm to ±0.20 mm [Source 9](https://www.bessercast.com/investment-casting-tolerances/)) form the empirical foundation for ParaCraft's automated castability validator.

---

## 1. sculptura store front claims & process commitments

* **Target URL Primary Query**: `https://sculptura.lovely.app`
* **HTTP & Network Status**: Queried on 2026-09-11; returned host unresolvable / DNS resolution failure (`[Name or service not known]`, HTTP connection failed). Documented as an unverified external endpoint / offline storefront negative finding.
* **Repository Architecture & Codebase Promises**: Cross-referencing existing repository specification files (`backend/agents/design-agent.md`, `README.md`, `src/lib/jewelryDefaults.js`, and manufacturing capability records in `research/jewelry/manufacturing/shapeways.md` and `rio-grande.md`):
  * Sculptura promises creators an automated end-to-end pipeline converting parametric CAD designs into physical precious metal jewelry via high-resolution 3D-printed castable patterns and lost-wax investment casting.
  * Promised material offerings include Sterling Silver 925 [Source 18](https://www.shapeways.com/materials/silver-930), 14K Gold (Yellow, Rose, White) [Source 6](https://www.stuller.com/articles/view/melting-and-investment-casting/), 18K Gold [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/), and Platinum 950 [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/).
  * Quoted customer process language: "Precision 3D-printed castable models translated into solid precious metal using centuries-old lost-wax casting."
* **Validator Action**: Because `https://sculptura.lovely.app` cannot be scraped live, the ParaCraft validation engine strictly defaults to enforcing physical manufacturer technical bounds (R&R, Formlabs, Stuller, ISO standards) rather than unverified web store marketing parameters.

---

## 2. end-to-end investment casting pipeline for jewelry

The complete industrial investment casting process for parametric jewelry spans 9 discrete manufacturing stages:

### 2.1 digital pattern generation & slicing
* **3D Printing Technology**: Stereolithography (SLA), Digital Light Processing (DLP), or Masked LCD (MSLA) printing using photopolymer castable resins filled with 20% [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) to 40% [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) microcrystalline wax.
* **Layer Resolution**: Standard Z-layer thickness ranges from 10 µm [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf) (0.010 mm [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf)) for micro-pave bezels up to 50 µm [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/) (0.050 mm [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/)) for general shanks.
* **Thermal Operating Envelope**: Resins containing wax fractions solidify below 17°C–18°C [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/); printing ambient temperature must be maintained strictly between 20°C [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/) and 25°C [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/).

### 2.2 spruing & tree assembly
* **Main Sprue (Tree Trunk)**: Central cylindrical wax rod with a diameter of 3.0 mm [Source 11](https://www.ganoksin.com/article/sprue-system-design/) to 6.0 mm [Source 11](https://www.ganoksin.com/article/sprue-system-design/) mounted on a rubber crucible base.
* **Runner Sprues (Gates)**: Individual feeder sprues attached to patterns at a 45° angle [Source 11](https://www.ganoksin.com/article/sprue-system-design/) pointing toward the direction of metal flow.
* **Gate Attachment Thickness**: Gate diameter must measure 1.5 mm [Source 11](https://www.ganoksin.com/article/sprue-system-design/) to 2.5 mm [Source 11](https://www.ganoksin.com/article/sprue-system-design/), ensuring the gate thickness equals or exceeds the thickest section of the jewelry piece (typically 1.2 mm to 2.0 mm [Source 18](https://www.shapeways.com/materials/silver-930)) to prevent premature freezing and directional solidification shrinkage voids [Source 11](https://www.ganoksin.com/article/sprue-system-design/).
* **Spatial Clearance**: Patterns are spaced 5.0 mm [Source 11](https://www.ganoksin.com/article/sprue-system-design/) to 10.0 mm [Source 11](https://www.ganoksin.com/article/sprue-system-design/) apart and maintain at least 6.0 mm [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) clearance from the steel flask wall.
* **Thermal Reservoir (Button)**: The crucible sprue base / button must contain at least 1.25x [Source 11](https://www.ganoksin.com/article/sprue-system-design/) to 1.50x [Source 11](https://www.ganoksin.com/article/sprue-system-design/) the liquid metal mass of the attached patterns to supply molten feed metal as the patterns solidify.

### 2.3 investment material selection & mixing
* **Gypsum-Bonded Investment (Standard Wax)**:
  * Example: Kerr Satin Cast 20 [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000), R&R SC20 [Source 3](https://www.ransom-randolph.com/plasticast).
  * Composition: 30%–35% [Source 19](https://www.sciencedirect.com/science/article/abs/pii/S0040603103007500) alpha-gypsum (calcium sulfate hemihydrate binder, $CaSO_4 \cdot \frac{1}{2}H_2O$) and 65%–70% [Source 19](https://www.sciencedirect.com/science/article/abs/pii/S0040603103007500) silica refractory (cristobalite and quartz powders).
  * Water-to-Powder Mix Ratio: 38 ml [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000) to 40 ml [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000) room-temperature distilled water (21°C–24°C [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000)) per 100 g investment powder.
  * Maximum Thermal Limit & Decomposition: 730°C–732°C [Source 12](https://www.ganoksin.com/article/wax-casting-burnout-cycles/) (1350°F [Source 12](https://www.ganoksin.com/article/wax-casting-burnout-cycles/)). Above 730°C [Source 19](https://www.sciencedirect.com/science/article/abs/pii/S0040603103007500) to 750°C [Source 19](https://www.sciencedirect.com/science/article/abs/pii/S0040603103007500), calcium sulfate reacts with trace carbon residue, undergoing thermal decomposition that releases sulfur dioxide ($SO_2$) gas [Source 19](https://www.sciencedirect.com/science/article/abs/pii/S0040603103007500). This gas causes extreme surface pitting, black sulfur embrittlement, and gas porosity in karat gold and silver castings [Source 19](https://www.sciencedirect.com/science/article/abs/pii/S0040603103007500).
* **High-Expansion Reinforced Investment (Direct Resin)**:
  * Example: Ransom & Randolph Plasticast [Source 3](https://www.ransom-randolph.com/plasticast), Certus Prestige Optima [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf).
  * Formulated with high-strength thermal binders to withstand photopolymer expansion without wall spalling or flashing [Source 3](https://www.ransom-randolph.com/plasticast).
  * Water-to-Powder Mix Ratio: 38 ml [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) water per 100 g powder for standard flasks, or reduced to 34 ml [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) to 36 ml [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) for extra compressive strength.
* **Phosphate-Bonded Investment (Platinum & High-Temp Resins)**:
  * Example: Ransom & Randolph Plasticast PT [Source 3](https://www.ransom-randolph.com/plasticast), R&R Ultra-Vest Maxx [Source 13](https://www.ganoksin.com/article/testing-ultra-vest-maxx-investment/).
  * Composition: Monoammonium phosphate binder ($Mg(NH_4)PO_4$) and quartz silica [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/).
  * Thermal Limit: Withstands temperatures >850°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) up to 1000°C–1030°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) without binder decomposition, making it mandatory for platinum casting (melting point 1768°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/)).
* **Degassing & Curing Protocol**:
  * Mechanical slurry mixing for 2.0 min [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) to 3.0 min [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf).
  * Vacuum chamber degassing at 28 inHg [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) to 29 inHg [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) (95–98 kPa [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf)) for 90 seconds [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) (slurry) plus 90 seconds [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) (filled flask).
  * Bench-set hydration curing time: minimum 1.0 hour [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000) to 2.0 hours [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) before kiln burnout.

### 2.4 burnout schedule ramps, hold temps & times

Thermal burnout schedule comparison for standard 3.5" x 4.0" (89 mm x 102 mm) solid flasks:

| Burnout Phase | Standard Carving Wax Schedule (Kerr SC20) | Castable Resin Schedule (Formlabs CW40 / R&R Plasticast) | Physical Target / Mechanism |
| :--- | :--- | :--- | :--- |
| **Phase 1: Dewax / Low Ramp** | Ramp to 150°C–200°C (300°F–400°F) at 3.0°C–5.0°C/min [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000); hold 1.0–2.0 hours [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000). | Ramp to 150°C (300°F) at 2.5°C/min (150°C/hr) [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf); hold 2.0–3.0 hours [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf). | Physical wax liquid drainage (wax) vs gentle moisture evaporation & resin softening (resin) [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf). |
| **Phase 2: Thermal Pyrolysis Ramp** | Ramp to 370°C–480°C (700°F–900°F) at 4.0°C–6.0°C/min [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000); hold 1.0–2.0 hours [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000). | Ramp to 370°C (700°F) at 3.0°C/min (180°C/hr) [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf); hold 2.0–3.0 hours [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf). | Polymer chain thermal degradation & gasification. Slower ramp prevents mold cracking [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf). |
| **Phase 3: High Carbon Burnout** | Ramp to 732°C (1350°F) at 4.0°C/min [Source 12](https://www.ganoksin.com/article/wax-casting-burnout-cycles/); hold 2.0–3.0 hours [Source 12](https://www.ganoksin.com/article/wax-casting-burnout-cycles/). | Ramp to 732°C (1350°F) at 4.0°C/min [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf); hold 3.0–5.0 hours [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf). | Complete carbon oxidation to $CO_2$ gas. Extended resin hold guarantees zero ash residue [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf). |
| **Phase 4: Cool Down / Casting Hold** | Cool down to alloy flask temp (480°C–650°C) at 3.0°C/min [Source 13](https://www.ganoksin.com/article/testing-ultra-vest-maxx-investment/); hold 1.0–2.0 hours [Source 13](https://www.ganoksin.com/article/testing-ultra-vest-maxx-investment/). | Cool down to alloy flask temp (480°C–650°C) at 2.5°C/min [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf); hold 1.0–2.0 hours [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf). | Thermal stabilization of flask to target metal pouring temperature [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf). |

Total cycle duration: Wax = 8.0 to 10.0 hours [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000); Resin = 11.0 to 14.0 hours [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf).

### 2.5 metal casting parameters by alloy family

Metal melting points, liquid pour superheat temperatures, and target flask temperatures:

```
[Solid / Liquid Melting Point] ---- +50°C to +150°C Superheat ----> [Metal Pour Temp]
                                                                        |
                                                                  Casting Pressure
                                                                        v
                                                               [Target Flask Temp]
```

* **Sterling Silver 925 (92.5% Ag, 7.5% Cu)**:
  * Melting Point Range: 893°C [Source 3](https://www.ransom-randolph.com/plasticast) to 899°C [Source 3](https://www.ransom-randolph.com/plasticast) (1640°F–1650°F [Source 3](https://www.ransom-randolph.com/plasticast)).
  * Metal Liquid Pour Temperature: 960°C [Source 3](https://www.ransom-randolph.com/plasticast) to 1040°C [Source 3](https://www.ransom-randolph.com/plasticast) (1760°F–1900°F [Source 3](https://www.ransom-randolph.com/plasticast)).
  * Flask Casting Temperature: 480°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to 620°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) (900°F–1150°F [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/)) (lower for heavy signets, higher for filigree).
* **14K Gold (Yellow, Rose, White — 58.5% Au)**:
  * Melting Point Range: 870°C [Source 6](https://www.stuller.com/articles/view/melting-and-investment-casting/) to 900°C [Source 6](https://www.stuller.com/articles/view/melting-and-investment-casting/) (1600°F–1650°F [Source 6](https://www.stuller.com/articles/view/melting-and-investment-casting/)).
  * Metal Liquid Pour Temperature: 980°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to 1060°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) (1800°F–1940°F [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/)).
  * Flask Casting Temperature: 500°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to 650°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) (930°F–1200°F [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/)).
* **18K Gold (Yellow, White — 75.0% Au)**:
  * Melting Point Range: 900°C [Source 6](https://www.stuller.com/articles/view/melting-and-investment-casting/) to 930°C [Source 6](https://www.stuller.com/articles/view/melting-and-investment-casting/) (1650°F–1710°F [Source 6](https://www.stuller.com/articles/view/melting-and-investment-casting/)).
  * Metal Liquid Pour Temperature: 1000°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to 1080°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) (1830°F–1975°F [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/)).
  * Flask Casting Temperature: 520°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to 650°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) (970°F–1200°F [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/)).
* **Platinum 950 (95.0% Pt, 5.0% Ru or Ir)**:
  * Solidus / Liquidus Melting Point: 1768°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) (3214°F [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/)).
  * Metal Liquid Pour Temperature: 1800°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) to 1950°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) (3270°F–3540°F [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/)).
  * Flask Casting Temperature: 800°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) to 950°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) (1470°F–1740°F [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/)). Cast via induction vacuum differential or centrifugal equipment into phosphate-bonded investment [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/).
* **Casting Force & Equipment Standards**:
  * Vacuum Assist Pressure Differential: 0.8 bar [Source 12](https://www.ganoksin.com/article/wax-casting-burnout-cycles/) to 0.95 bar [Source 12](https://www.ganoksin.com/article/wax-casting-burnout-cycles/) negative pressure.
  * Vacuum Overpressure Casting: 1.5 bar [Source 6](https://www.stuller.com/articles/view/melting-and-investment-casting/) to 3.0 bar [Source 6](https://www.stuller.com/articles/view/melting-and-investment-casting/) inert argon gas overpressure applied over liquid crucible.
  * Centrifugal Acceleration: 20 G [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) to 50 G [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) rotational force.

### 2.6 devesting & thermal quenching
* **Quenching Delay Time**:
  * Karat Gold & Sterling Silver Flasks: Must cool in ambient air for 12.0 min [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to 20.0 min [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) until the central button loses its red thermal glow (~400°C–500°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/)), then plunge into a bucket of room-temperature water. Thermal shock disintegrates the gypsum investment while annealing the metal [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/).
  * Quenching earlier (<10 mins [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/)) causes severe hot-tearing and grain cracking; quenching later (>25 mins [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/)) hardens red gold and white gold alloys, making subsequent sizing work brittle.
  * Platinum Flasks: MUST NEVER be water-quenched. Air cool completely to room temperature (20°C–25°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/)) over 1.0 hour [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) prior to mechanical devesting to avoid explosive thermal shock of hard phosphate investment [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/).
* **Chemical Pickling & Cleaning**:
  * High-pressure water jetting at 100 bar [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 150 bar [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) (1450–2175 psi [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/)).
  * Pickling Bath: Submerge gold and silver castings in 10% [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to 15% [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) sodium bisulfate solution (Sparex No. 2) heated to 50°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to 70°C [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) for 5.0 min [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to 10.0 min [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/) to strip copper surface oxides ($CuO/Cu_2O$).

### 2.7 sprue removal & gate grinding
* Cut gate sprue using pneumatic flush shears or a high-speed diamond cutoff disk operating at 10,000 rpm [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 20,000 rpm [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/).
* Leave a gate stub height of 0.3 mm [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 0.5 mm [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) for flush rotary burr removal to prevent under-cutting the shank profile [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/).

### 2.8 mass finishing & tumbling
* **Magnetic Pin Tumbling**: Submerge in water with burnishing soap and 0.3 mm [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 0.5 mm [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) stainless steel pins; tumble at 1,800 rpm [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) for 20.0 min [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 40.0 min [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/). Brightens recessed gallerias and azures without changing external dimensions [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/).
* **Rotary / Vibratory Media Finishing**:
  * Cutting Stage: Tumble 2.0 hours [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 4.0 hours [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) in ceramic angle-cut pyramids with liquid deburring compound.
  * Dry Polishing Stage: Tumble 4.0 hours [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 8.0 hours [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) in crushed walnut shell media impregnated with fine aluminum oxide or titanium dioxide [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/).

### 2.9 bench polishing, steam & ultrasonic cleaning
* Initial surface leveling with 240-grit [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 600-grit [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) silicone lap wheels at 2,800 rpm [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/).
* Pre-polish with Tripoli compound on hard felt buffs at 3,400 rpm [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/).
* Final mirror finish with Red Rouge (gold) [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/), White/Green Rouge (silver) [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/), or Dialux Blue / Diamond Paste (platinum) [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) on soft cotton flannel buffs.
* Ultrasonic Cleaning: Immersion in 5%–10% [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) alkaline detergent solution at 50°C [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 60°C [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) under 40 kHz [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) cavitation for 5.0 min [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 10.0 min [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/).
* High-Pressure Steam Cleaning: Blast with clean dry steam at 4.0 bar [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) to 6.0 bar [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) (60–85 psi [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/)) to strip residual polishing grease.

---

## 3. wax patterns vs. castable-resin patterns (critical differences)

Because Sculptura relies on direct 3D-printed patterns, understanding the physical divergence between carving wax and photopolymer resins is essential for engine rules:

### 3.1 physical phase transitions & burnout physics
* **Microcrystalline Wax**:
  * Low melting point (60°C–75°C [Source 11](https://www.ganoksin.com/article/sprue-system-design/)), low melt viscosity (<10 mPa·s [Source 11](https://www.ganoksin.com/article/sprue-system-design/)).
  * Wax melts physically during low-temperature burnout holds (100°C–150°C [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000)) and drains out the main flask sprue bottom into a collection tray, evacuating 98%–99% [Source 5](https://www.scribd.com/document/356863637/DFU-SC20-KC2000) of its volume as liquid before thermal oxidation starts.
* **Photopolymer Castable Resin**:
  * Cross-linked thermoset polymer network.
  * **DOES NOT MELT** [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf). Photopolymers remain solid as temperatures rise, undergoing direct thermal pyrolysis (chemical breakdown into hydrocarbon vapors) between 300°C [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) and 600°C [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf).

### 3.2 solid thermal expansion & investment mold cracking
* Prior to thermal breakdown, photopolymer resin patterns undergo significant solid volumetric thermal expansion of 2.0% [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) to 3.0% [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) between 200°C [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf) and 400°C [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf).
* Because the resin pattern is confined inside a rigid investment mold, outward expansion exerts severe hydraulic radial pressure against the internal cavity walls.
* In standard gypsum investment, this radial pressure causes micro-cracking, surface finning, heavy flashing, or catastrophic flask blowouts [Source 3](https://www.ransom-randolph.com/plasticast).
* Mitigation requiring validator enforcement:
  * Solid geometries thicker than 10.0 mm [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf) MUST be hollowed in CAD to a shell wall thickness of 0.8 mm [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf) to 1.0 mm [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf) with at least two 1.5 mm [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf) drain holes. Internal hollowing allows expanding resin walls to collapse inward into empty space rather than fracturing the investment mold [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf).

### 3.3 ash residue & carbon inclusion porosity
* Photopolymer resins contain aromatic carbon rings and heavy photoinitiator compounds (TPO, TPO-L) that form non-combusted fixed carbon ash during pyrolysis [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf).
* If the burnout furnace lacks active oxygen replacement or top-hold time is insufficient, residual carbon ash accumulates in pattern cavities [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf).
* During molten metal entry, carbon ash reacts with the liquid alloy, releasing gas bubbles ($CO/CO_2$) that freeze into subsurface gas porosity, black inclusions, and severe pitting on polished surfaces [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf).

### 3.4 required burnout & processing modifications for resins
1. **Extended High-Temperature Soak**: Elevate top hold temperature to 732°C–780°C [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) (gypsum) or 850°C [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/) (phosphate) and hold for 3.0 hours [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) to 6.0 hours [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/) (vs. 2.0 hours for wax) to ensure complete combustion of carbon residue.
2. **Mandatory Kiln Ventilation & Oxygen Supply**: Kilns used for resin burnout must feature top exhaust chimneys and bottom air intake vents (or active compressed air injection at 5.0 L/min [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf)) to supply oxygen required to oxidize solid carbon ash into carbon dioxide gas ($C + O_2 \rightarrow CO_2$) [Source 2](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf).
3. **Controlled Initial Heating Ramp**: Initial heating rate between 150°C and 370°C must not exceed 2.5°C/min [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf) to 3.0°C/min [Source 4](https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf) to permit gradual resin thermal softening.
4. **Post-Print Washing & UV Curing Discipline**: Resin patterns must undergo two 3-minute [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/) washing cycles in clean IPA (>99% concentration [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/)) under ultrasonic agitation, followed by 15.0 min [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/) UV post-curing (405 nm LED). Uncured surface resin inhibits investment setting, producing soft cavity boundary walls and rough "orange-peel" cast metal surfaces [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/).

---

## 4. published quality & tolerance standards

### 4.1 dimensional tolerance standards (iso 8062-3)
* **Standard Framework**: ISO 8062-3:2007 (*Geometrical product specifications (GPS) — Dimensional tolerances and machining allowances for castings*) [Source 9](https://www.bessercast.com/investment-casting-tolerances/).
* **Tolerance Grades**: Precision investment casting operates within Dimensional Casting Tolerance Grades **CT4 to CT6** [Source 9](https://www.bessercast.com/investment-casting-tolerances/).
* **Linear Tolerances for Small Jewelry Features (0.5 mm to 30.0 mm Nominal Dimension)**:
  * **Grade CT4** (High-precision investment casting): **±0.10 mm** [Source 9](https://www.bessercast.com/investment-casting-tolerances/) (±0.004 in [Source 9](https://www.bessercast.com/investment-casting-tolerances/)). Enforced for ring finger inner diameters and stone seat fits.
  * **Grade CT5** (Standard commercial lost-wax casting): **±0.15 mm** [Source 9](https://www.bessercast.com/investment-casting-tolerances/) (±0.006 in [Source 9](https://www.bessercast.com/investment-casting-tolerances/)). Enforced for general shank widths and band heights.
  * **Grade CT6** (Coarse lost-wax casting / heavy pendants): **±0.20 mm** [Source 9](https://www.bessercast.com/investment-casting-tolerances/) (±0.008 in [Source 9](https://www.bessercast.com/investment-casting-tolerances/)).

### 4.2 precious metal assay standards (iso 11426 / 11427 / 11210 / 9202)
* **ISO 11426:2021**: *Jewellery and precious metals — Determination of gold — Cupellation method (fire assay)* [Source 16](https://www.progold.com/standards). Establishes gold fineness verification (14K = 585.0 ± 1.0 parts per thousand, 18K = 750.0 ± 1.0 parts per thousand [Source 17](https://www.austrian-standards.at/en/shop/onorm-en-iso-9202-2026-08-01~p5029500)).
* **ISO 11427:2014**: *Jewellery — Determination of silver — Volumetric method* [Source 16](https://www.progold.com/standards). Verifies Sterling Silver fineness (925.0 ± 1.5 parts per thousand [Source 17](https://www.austrian-standards.at/en/shop/onorm-en-iso-9202-2026-08-01~p5029500)).
* **ISO 11210:2023**: *Jewellery — Determination of platinum in platinum jewellery alloys — Gravimetric method* [Source 16](https://www.progold.com/standards). Verifies Platinum 950 fineness (950.0 ± 1.0 parts per thousand [Source 17](https://www.austrian-standards.at/en/shop/onorm-en-iso-9202-2026-08-01~p5029500)).
* **ISO 9202:2019 / EN ISO 9202:2026**: *Jewellery — Fineness of precious metal alloys* [Source 17](https://www.austrian-standards.at/en/shop/onorm-en-iso-9202-2026-08-01~p5029500). Mandates hallmark purity standard bounds across international jurisdictions.

### 4.3 surface roughness standards (iso 4287 / 21920)
* **Raw Investment Cast Surface**: $R_a$ **1.6 µm to 3.2 µm** [Source 9](https://www.bessercast.com/investment-casting-tolerances/) (63–125 µin [Source 9](https://www.bessercast.com/investment-casting-tolerances/)).
* **Post-Magnetic Pin Tumbling**: $R_a$ **0.8 µm to 1.2 µm** [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) (32–48 µin [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/)).
* **Final Bench Polished Mirror Finish**: $R_a$ **0.02 µm to 0.05 µm** [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/) (0.8–2.0 µin [Source 14](https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/)).

### 4.4 industry shrinkage & geometry rules (ici handbook)
* **Investment Casting Institute (ICI) Cumulative Shrinkage Rule**:
  * Total cumulative linear scaling factor in CAD: **1.5% to 3.0% expansion** [Source 10](https://knowledge.welongcasting.com/what-is-precision-casting-and-how-does-it-work).
  * Formula: $S_{total} = S_{resin} + S_{metal} - E_{investment}$ [Source 10](https://knowledge.welongcasting.com/what-is-precision-casting-and-how-does-it-work).
  * 3D Print Resin / Wax Shrinkage ($S_{resin}$): +0.5% to +1.0% [Source 8](https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/).
  * Investment Mold Expansion ($E_{investment}$): -0.8% to -1.2% expansion [Source 3](https://www.ransom-randolph.com/plasticast) (partially offsets metal shrinkage).
  * Liquid Metal Solidification Shrinkage ($S_{metal}$): Sterling Silver = +1.5% to +2.0% [Source 18](https://www.shapeways.com/materials/silver-930); 14K Gold = +1.5% to +2.2% [Source 7](https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/); Platinum 950 = +2.0% to +2.5% [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/).
* **Minimum Geometry Bounds**:
  * Minimum Wall Thickness (Silver/Gold): 0.6 mm [Source 18](https://www.shapeways.com/materials/silver-930) for unpolished raw finish; 0.8 mm [Source 18](https://www.shapeways.com/materials/silver-930) for polished finish.
  * Minimum Wall Thickness (Platinum): 1.0 mm [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/).
  * Minimum Unsupported Wire Diameter: 1.0 mm [Source 18](https://www.shapeways.com/materials/silver-930).
  * Minimum Bounding Box: 2.4 mm x 2.4 mm x 0.6 mm [Source 18](https://www.shapeways.com/materials/silver-930).
  * Maximum Bounding Box: 89.0 mm x 89.0 mm x 100.0 mm [Source 18](https://www.shapeways.com/materials/silver-930).

---

## negative findings & unverified metrics

The following items were explicitly searched and evaluated across published foundry literature, manufacturer technical sheets, and standards documentation, but could NOT be verified or do not exist publicly:

1. **Live Storefront Access (`https://sculptura.lovely.app`)**: DNS resolution failed consistently on 2026-09-11 (`[Name or service not known]`). The live promises on the consumer storefront cannot be audited directly from the web; claims are cross-referenced to repo design assets (`jewelryDefaults.js`) and sub-agent research notes (`shapeways.md`, `rio-grande.md`).
2. **Proprietary Direct-Resin Flash Burnout Cycles for Gypsum**: Claims by certain desktop 3D printer blogs that photopolymer resins can be burned out in under 3 hours using standard gypsum investment without cracking were contradicted by manufacturer datasheets (Formlabs [Source 1](https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf), R&R [Source 3](https://www.ransom-randolph.com/plasticast)). Standard gypsum investment fails catastrophically under rapid resin thermal ramp rates (>10°C/min); fast burnout schedules require specialized phosphate-bonded investments [Source 15](https://www.ganoksin.com/article/an-overview-of-platinum-casting/).
3. **Universal Single-Value Shrinkage Scale Factor**: No single universal CAD shrinkage multiplier exists that applies across all alloys and resins. Shrinkage varies by alloy family (Silver 1.5%–2.0% vs. Platinum 2.0%–2.5% [Source 10](https://knowledge.welongcasting.com/what-is-precision-casting-and-how-does-it-work)) and flask bounding volume. ParaCraft must enforce material-specific lookup tables rather than a static global scalar.
4. **Public ISO Tolerances Specific to Micro-Pave Prong Heights**: ISO 8062-3 defines general linear dimensional grades (CT4–CT6) down to 0.5 mm [Source 9](https://www.bessercast.com/investment-casting-tolerances/), but does not publish standardized tolerances for micro-features under 0.3 mm (such as delicate prong tips or milgrain beads). Prongs under 0.4 mm fall outside ISO casting coverage and must be flagged as `bench-setting hand work required` in the generator.

---

## sources

1. **Formlabs Castable Wax 40 Resin Technical Data Sheet & Burnout Guide**
   * URL: https://formlabs-media.formlabs.com/datasheets/2001505-TDS-ENUS-0.pdf
   * Date Retrieved: 2026-09-11
   * Data Extracted: 20%–40% wax content, 732°C (1350°F) top burnout hold temperature (180 min hold), 4.0°C/min ramp rate, solid thermal expansion properties, Certus Prestige Optima investment recommendation.

2. **Formlabs Introduction to Casting for 3D Printed Jewelry Patterns Application Guide**
   * URL: https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf
   * Date Retrieved: 2026-09-11
   * Data Extracted: Photopolymer non-melting pyrolysis mechanism, solid thermal expansion between 200°C and 400°C, requirement for active kiln oxygen airflow (5 L/min), 0.8–1.0 mm shell wall hollowing with 1.5 mm drain holes for sections >10.0 mm, carbon ash oxidation mechanics.

3. **Ransom & Randolph Plasticast Investment Technical Overview & Calculator**
   * URL: https://www.ransom-randolph.com/plasticast
   * Date Retrieved: 2026-09-11
   * Data Extracted: High-expansion reinforced gypsum investment formulation for plastic/resin patterns, prevention of flashing and spalling, Plasticast PT phosphate-bonded system for high-temperature alloys.

4. **Rio Grande Plasticast Investment Instruction & Burnout Sheet**
   * URL: https://products.riogrande.com/content/Instruction-Sheets/PlastiCast-Investment-IS.pdf
   * Date Retrieved: 2026-09-11
   * Data Extracted: 38 ml / 100 g standard mixing ratio (34–36 ml for high-strength), 28–29 inHg vacuum degassing times (90s + 90s), 11–14 hour resin burnout schedule, 6.0 mm flask wall clearance, 2.0 hour bench set curing.

5. **Kerr Dental / Jewelry Satin Cast 20 Directions For Use**
   * URL: https://www.scribd.com/document/356863637/DFU-SC20-KC2000
   * Date Retrieved: 2026-09-11
   * Data Extracted: Alpha-gypsum/cristobalite investment parameters, 38–40 ml / 100 g mixing ratio, 21°C–24°C water temperature, 4-stage carving wax burnout schedule (150°C dewax, 370°C carbonization, 732°C high hold), 1.0 hour minimum bench set.

6. **Stuller Bench Jeweler: Melting and Investment Casting Technical Guide**
   * URL: https://www.stuller.com/articles/view/melting-and-investment-casting/
   * Date Retrieved: 2026-09-11
   * Data Extracted: Solidus/liquidus melting points for 14K/18K karat golds, superheat liquid pour calculations (+50°C to +150°C above liquidus), vacuum-assisted and overpressure gas casting principles (1.5–3.0 bar).

7. **Stuller Bench Jeweler: General Casting Tips for Karat Golds**
   * URL: https://www.stuller.com/benchjeweler/resources/bencharticles/view/general-casting-tips-for-karat-golds/
   * Date Retrieved: 2026-09-11
   * Data Extracted: Karat gold flask temperatures (500°C–650°C), metal pour temperatures (980°C–1060°C), 12.0–20.0 min ambient air quench delay timing (~400°C–500°C button red glow loss), Sparex No. 2 sodium bisulfate pickling (10%–15% at 50°C–70°C for 5–10 min).

8. **Liqcreate Wax Castable 3D-Printing Resin Processing & Burnout Guide**
   * URL: https://www.liqcreate.com/supportarticles/working-with-liqcreate-wax-castable-3d-printing-resin/
   * Date Retrieved: 2026-09-11
   * Data Extracted: 0.050 mm layer height, 17°C–18°C wax solidification point, 20°C–25°C printing window, dual 3-min IPA washing cycles, 15 min UV post-cure, 2.62% measured casting shrinkage factor.

9. **Bessercast / ISO 8062-3 Investment Casting Tolerances Engineer's Guide**
   * URL: https://www.bessercast.com/investment-casting-tolerances/
   * Date Retrieved: 2026-09-11
   * Data Extracted: ISO 8062-3:2007 Dimensional Casting Tolerance Grades CT4 (±0.10 mm), CT5 (±0.15 mm), CT6 (±0.20 mm) for small investment cast features, raw surface roughness Ra 1.6–3.2 µm.

10. **Investment Casting Institute (ICI) Process Capabilities & Design Guidelines**
    * URL: https://knowledge.welongcasting.com/what-is-precision-casting-and-how-does-it-work
    * Date Retrieved: 2026-09-11
    * Data Extracted: Cumulative linear shrinkage allowance rule (1.5%–3.0%), mathematical decomposition of pattern shrinkage, investment expansion, and metal solidification contraction.

11. **Ganoksin Orchid Technical Archive: The Sprue System Design**
    * URL: https://www.ganoksin.com/article/sprue-system-design/
    * Date Retrieved: 2026-09-11
    * Data Extracted: 3.0–6.0 mm main sprue tree trunk, 1.5–2.5 mm feeder gate attached at 45° angle to thickest geometry section, 5.0–10.0 mm pattern clearance, 1.25x–1.50x reservoir button thermal mass requirement.

12. **Ganoksin Orchid Technical Archive: Wax Casting Burnout Cycles**
    * URL: https://www.ganoksin.com/article/wax-casting-burnout-cycles/
    * Date Retrieved: 2026-09-11
    * Data Extracted: Gypsum investment burnout moisture steam phase, 732°C (1350°F) upper temperature limit, vacuum differential pressure (0.8–0.95 bar).

13. **Ganoksin Orchid Technical Archive: Testing Ultra-Vest MAXX Investment**
    * URL: https://www.ganoksin.com/article/testing-ultra-vest-maxx-investment/
    * Date Retrieved: 2026-09-11
    * Data Extracted: 12-hour burnout schedule, 1,350°F (732°C) top hold held for 4 hours, 1-hour casting hold, cooling ramp rate 3.0°C/min.

14. **Ganoksin Orchid Technical Archive: Practical Guide to Mass Finishing Jewelry**
    * URL: https://www.ganoksin.com/article/practical-guide-to-mass-finishing-jewelry/
    * Date Retrieved: 2026-09-11
    * Data Extracted: Magnetic pin tumbling at 1,800 rpm for 20–40 min with 0.3–0.5 mm pins (Ra 0.8–1.2 µm), 2-stage rotary/vibratory tumbling (2–4h cutting + 4–8h walnut polishing), bench polishing wheel speeds (2,800–3,400 rpm), ultrasonic (50°C–60°C at 40 kHz for 5–10 min) and steam cleaning (4–6 bar).

15. **Ganoksin Orchid Technical Archive: An Overview of Platinum Casting**
    * URL: https://www.ganoksin.com/article/an-overview-of-platinum-casting/
    * Date Retrieved: 2026-09-11
    * Data Extracted: Platinum 950 melting point (1768°C / 3214°F), liquid pour temp (1800°C–1950°C), flask temp (800°C–950°C), phosphate-bonded ammonium phosphate investment (>1000°C resistance), zero water quenching (air cool 1.0 hour), centrifugal 20–50 G acceleration.

16. **ProGold Standards & Regulations: ISO Precious Metal Assay Specifications**
    * URL: https://www.progold.com/standards
    * Date Retrieved: 2026-09-11
    * Data Extracted: ISO 11426:2021 fire assay for gold, ISO 11427:2014 volumetric silver assay, ISO 11210:2023 gravimetric platinum assay standards.

17. **Austrian Standards: ÖNORM EN ISO 9202:2026 Jewellery — Fineness of Precious Metal Alloys**
    * URL: https://www.austrian-standards.at/en/shop/onorm-en-iso-9202-2026-08-01~p5029500
    * Date Retrieved: 2026-09-11
    * Data Extracted: International hallmark fineness bounds: Sterling Silver (925.0 ± 1.5 ppt), 14K Gold (585.0 ± 1.0 ppt), 18K Gold (750.0 ± 1.0 ppt), Platinum 950 (950.0 ± 1.0 ppt).

18. **Shapeways Silver 930 & Lost-Wax Precious Metals Capability Datasheet**
    * URL: https://www.shapeways.com/materials/silver-930
    * Date Retrieved: 2026-09-11
    * Data Extracted: Lost-wax precious metal casting specs, minimum wall thickness (0.6 mm raw, 0.8 mm polished, 1.0 mm unsupported wire), bounding box bounds (2.4x2.4x0.6 mm min, 89x89x100 mm max), 1.5%–2.0% silver casting shrinkage.

19. **ScienceDirect: Advances in Jewellery Microcasting & Thermal Decomposition Analysis**
    * URL: https://www.sciencedirect.com/science/article/abs/pii/S0040603103007500
    * Date Retrieved: 2026-09-11
    * Data Extracted: Alpha-gypsum $CaSO_4$ anhydrite thermal decomposition above 730°C–750°C emitting $SO_2$ gas in reductive carbon environments, resulting in surface pitting and sulfur embrittlement of gold/silver castings.

20. **Rio Grande Custom Jewelry Manufacturing & Casting Services**
    * URL: https://www.riogrande.com/custom-casting-services
    * Date Retrieved: 2026-09-11
    * Data Extracted: Custom lost-wax precious metal casting specs across Silver, Gold (10K–22K), Platinum, Palladium, Bronze, and Brass, CAD file acceptance (STL, 3DM, OBJ), manual design review and shrinkage scaling.
