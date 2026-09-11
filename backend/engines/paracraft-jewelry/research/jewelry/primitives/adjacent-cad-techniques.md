# programmatic jewelry cad techniques — domain extraction for paracraft-jewelry

research: 2026-09-11 · source: https://a-m.shop/blogs/news/9990381-how-wide-should-my-ring-be , https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf , https://gemvy.com/blog/semi-mount-ring-settings-a-complete-guide.html (+9 more) · status: cited

## thesis

open-source programmatic CAD (OpenSCAD, CadQuery, build123d, FreeCAD) and commercial GUI jewelry CAD systems (MatrixGold, RhinoGold, CrossGems, RhinoArtisan) operate on identical underlying jeweler manufacturing physics. While GUI tools rely on interactive sweep wizards, profile placers, and dynamic cutters, a CSG-based engine (`paracraft-jewelry`) can represent all domain-standard jewelry features—from seat cutters and gallery rails to azures, milgrain, and sizing bars—by composing native OpenSCAD 2D/3D primitives (`rotate_extrude`, `linear_extrude`, `offset`, `hull`, `polyhedron`, `difference`). Every geometric parameter used in the engine's validation and generation pipelines must trace to production bench-setting and casting specifications; unverified numbers are strictly flagged as viz-grade or omitted.

## the techniques — organized by jewelry feature

### 1. ring shank profiles & sweeps
- **what it is**: The main finger band created by sweeping a closed 2D cross-sectional profile (e.g., flat, comfort-fit, D-shape, knife-edge, court, tapered) along a circular or elliptical finger rail.
- **how cad tools construct it**: In MatrixGold / RhinoGold / CrossGems, a `Ring Rail` curve defines the inner finger boundary, while `Profile Placer` positions 2D cross-section sketches at cardinal stations (12, 3, 6, 9 o'clock). A `Sweep1` or `Sweep2` operation constructs the solid shank. In CadQuery / build123d, a 2D `Sketch` (e.g., rounded rectangle or stadium) is swept along a circular wire via `.sweep()`. FreeCAD's Ring Workbench sweeps 2D sketches along circular paths using `Part Sweep`.
- **which scad primitive could express it**: `rotate_extrude()` applied to a 2D profile created via `polygon()` or `offset()`. For non-uniform or tapered shanks (cathedral, bypass, tapered shoulders), a sequence of 2D profiles lofted/skinned using `hull()` or CSG slices along the ring rail axis.
- **source url & cited metrics**:
  - Post-polish minimum shank wall thickness: 1.5 mm minimum for general wear ([Aide-memoire / Rio Grande](https://a-m.shop/blogs/news/9990381-how-wide-should-my-ring-be)); 1.8 mm minimum thickness at the sizing bar ([Engagement Ring Designs](https://www.reddit.com/r/EngagementRingDesigns/comments/1sn24pv/ring_measurements_concern/)).
  - Band width: 1.5 mm to 2.5 mm for delicate/women's bands ([Blue Nile Ring Width Guide](https://www.bluenile.com/blog/diamonds-jewelry/ring-band-width)); 4.0 mm to 8.0 mm for men's bands ([Larson Jewelers](https://www.larsonjewelers.com/pages/ring-width-guide)).
  - Finishing cleanup allowance: Add +0.1 mm to desired finished measurements across outer surfaces ([Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).

### 2. stone seat cutters & bearing geometry
- **what it is**: An inverse conical or stepped cutting geometry boolean-subtracted from prongs, bezels, or channels to create a flat or angled bearing ledge where the gemstone girdle rests level and secure.
- **how cad tools construct it**: MatrixGold / RhinoGold `Gem Cutter` builds a multi-stepped cutter matching the gemstone profile (crown clearance cylinder, girdle belt, pavilion cone, culet piercer). Bench stone setting relies on 70° or 45° hart (bearing) burs to cut seats in metal.
- **which scad primitive could express it**: `difference()` subtracting a composite revolved cutter built from `rotate_extrude()` or combined `cylinder()` and `cone` (`cylinder(r1, r2)`) primitives aligned with the stone's Z-axis.
- **source url & cited metrics**:
  - Seat cutter angle: 70° bearing (hart) bur angle (35° half-angle relative to Z-axis) matching diamond pavilion geometry ([Tom Weishaar / Ganoksin Channel Setting](https://www.ganoksin.com/article/channel-setting-round-diamonds/)).
  - Seat depth into wall: Indicator seat indentations cut no deeper than 0.35 mm into metal ([Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).
  - Seat placement: Places gemstone girdle approximately 0.5 mm below the top rim of the mounting wall ([Tashvi Bezel CAD Guide](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial)).

### 3. gallery rails & trellis architecture
- **what it is**: Horizontal metal wire loops or bars connecting vertical prongs below the gemstone girdle to reinforce head stability, prevent prong sprawling, and visually frame the stone pavilion.
- **how cad tools construct it**: MatrixGold `Under Bezel` or Rhino `Pipe` / `Sweep1` along a curve offset from the stone girdle, placed at a specific height along the prong cluster.
- **which scad primitive could express it**: `rotate_extrude()` of a circular wire profile along a girdle-conformal ring path, or a `hull()` chain of cylinders connecting prong centers at a fixed Z-elevation.
- **source url & cited metrics**:
  - Rule of thirds placement: Divide girdle-to-culet height into 3 equal Z-segments. Upper gallery wire centered at 1/3 Z-depth below girdle ([Charlie Herner / Ganoksin Prong Settings](https://www.ganoksin.com/article/cad-modeling-prong-settings/)).
  - Gallery wire thickness: Wire diameter >= 1/3 of the girdle-to-culet height ([Charlie Herner / Ganoksin Prong Settings](https://www.ganoksin.com/article/cad-modeling-prong-settings/)).
  - Pavilion clearance gap: 0.2 mm to 0.3 mm clearance between upper gallery wire and pavilion for diamonds; 0.3 mm to 0.5 mm for colored gemstones with bulging pavilions ([Charlie Herner / Ganoksin Prong Settings](https://www.ganoksin.com/article/cad-modeling-prong-settings/)).
  - Top-down occlusion: Gallery wire diameter must remain within the stone girdle footprint so wires are hidden when viewed top-down ([Charlie Herner / Ganoksin Prong Settings](https://www.ganoksin.com/article/cad-modeling-prong-settings/)).

### 4. prongs & claws (prong builder)
- **what it is**: Vertical or angled metallic posts extending up from the shank/head past the gemstone girdle, designed to be bent over the crown facets by a stone setter.
- **how cad tools construct it**: MatrixGold `Prong Builder` / RhinoGold `Prong Studio` generates tapered cylindrical/capsule solids with spherical top caps, placed relative to gem perimeter points and projected down to intersect the head/shank.
- **which scad primitive could express it**: Tapered `cylinder(r1, r2, h)` or a `hull()` of two spheres (`sphere(r)`), oriented using `rotate()` and `translate()` around the stone center.
- **source url & cited metrics**:
  - Center stone prong diameter: 0.8 mm to 1.2 mm minimum diameter for center stone settings ([Gemvy Semi-Mount Guide](https://gemvy.com/blog/semi-mount-ring-settings-a-complete-guide.html); [Zuanfa Buying Guide](https://smartbuy.alibaba.com/buyingguides/zuanfa-jewelry)).
  - Micro-pave prong diameter: 0.5 mm minimum diameter with a height of 0.65 mm above girdle ([Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).
  - Bench setting extension length: Add +1.0 mm prong length extending above the girdle for 2–4 mm center stones to allow setter bending and trimming ([Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).
  - Absolute minimum prong thickness: No prongs thinner than 0.5 mm ([Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).

### 5. bezel settings & lip geometry
- **what it is**: A continuous metal collar surrounding the gemstone girdle, whose top lip is burnished down over the crown facets to encapsulate the stone.
- **how cad tools construct it**: MatrixGold / RhinoGold `Bezel Studio` / FreeCAD extracts the girdle outline, offsets it outward by the wall thickness, extrudes vertically, and subtracts an interior stone seat and culet hole.
- **which scad primitive could express it**: `difference()` between an outer extruded shape (`linear_extrude()` of 2D `offset()`) and an inner subtracted cone/cylinder seat cutter.
- **source url & cited metrics**:
  - Bezel wall thickness: 0.5 mm to 1.0 mm ([Tashvi Bezel CAD Guide](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial)).
  - Bezel lip extension height: Lip extends 0.3 mm to 0.5 mm above girdle edge for burnishing over crown ([Tashvi Bezel CAD Guide](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial)).
  - Cabochon bezel wall height: Finished wall height >= 33% (1/3) of total stone height; heights below 25% risk stone dislodgement ([Tashvi Bezel CAD Guide](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial)).
  - Stone diameter tolerance sensitivity: Bezel settings require stone diameter fit within 5% variation (compared to 10–20% for prong settings) ([Tashvi Bezel CAD Guide](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial)).

### 6. channel settings
- **what it is**: A continuous metallic channel/groove holding a row of stones edge-to-edge without individual prongs between them.
- **how cad tools construct it**: MatrixGold / Rhino `Channel Cutter` extrudes a channel profile along a rail and boolean-subtracts grooved seats using 70° bearing bur geometry.
- **which scad primitive could express it**: `difference()` subtracting a continuous 70° cutter extrusion or a linear array of revolved seat cutters from parallel extruded channel walls.
- **source url & cited metrics**:
  - Channel width: 90% to 95% of gemstone diameter ([Tom Weishaar / Ganoksin Channel Setting](https://www.ganoksin.com/article/channel-setting-round-diamonds/)).
  - Channel depth: 75% to 100% of stone total depth ([Tom Weishaar / Ganoksin Channel Setting](https://www.ganoksin.com/article/channel-setting-round-diamonds/)).
  - Stone table depth: Stones <= 3.0 mm set table flush with metal surface; stones > 3.0 mm set table slightly above metal surface ([Tom Weishaar / Ganoksin Channel Setting](https://www.ganoksin.com/article/channel-setting-round-diamonds/)).
  - Inter-stone clearance gap: 0.1 mm gap (thickness of two paper sheets) between adjacent stones to prevent girdle overlapping and chipping during setting ([Tom Weishaar / Ganoksin Channel Setting](https://www.ganoksin.com/article/channel-setting-round-diamonds/)).

### 7. azures & light holes (culet openings)
- **what it is**: Tapered or faceted cutouts pierced through the underside of stone seats to let light reach transparent stones and facilitate bench cleaning/ultrasonic fluid flow.
- **how cad tools construct it**: MatrixGold `Azure Cutter` / `Honeycomb Azure` projects conical, pyramid, or hexagonal cutters through the base plate beneath each stone center.
- **which scad primitive could express it**: `difference()` subtracting a cone `cylinder(r1, r2)` or polygonal pyramid `cylinder(r1, r2, $fn=6)` through the setting floor.
- **source url & cited metrics**:
  - Minimum azure / drill hole diameter: 0.7 mm minimum diameter; narrow holes (e.g. 0.3 mm diameter x 3.0 mm depth) cause investment failure/breakage during casting resulting in voids ([Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).
  - Inset engraving / lettering depth: 0.35 mm to 0.40 mm max depth ([Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).

### 8. milgrain & decorative beading
- **what it is**: A vintage decorative border composed of a close-packed linear array of tiny hemispherical/spherical metal beads along edges or seams.
- **how cad tools construct it**: RhinoArtisan / MatrixGold / Rhino `Milgrain` tool distributes small spheres along a curve with fixed pitch/spacing, followed by boolean union with the main model.
- **which scad primitive could express it**: `union()` of `translate()` sphere primitives arrayed using a OpenSCAD `for()` loop along a 3D curve, with interpenetration to ensure manifold geometry.
- **source url & cited metrics**:
  - Bead sphere diameter: 0.2 mm to 0.3 mm (up to 0.4 mm for bold vintage borders) ([Tashvi Bezel CAD Guide](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial)).
  - Bead pitch / overlap: Spaced at pitch slightly less than sphere diameter (~0.05 mm overlap) to eliminate zero-thickness non-manifold edges during boolean union ([Tashvi Bezel CAD Guide](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial)).

### 9. hollowing, weight reduction & scooping
- **what it is**: Shelling or removing internal metal volume beneath signet heads, thick shanks, or heavy pendants to minimize precious metal mass, reduce thermal mass during casting, and prevent sink marks.
- **how cad tools construct it**: MatrixGold 4.0 `Scoop Tool` / Rhino `Shell` offsets internal surfaces inward by a target wall thickness, adding cylindrical escape/drain holes for uncured resin or investment removal.
- **which scad primitive could express it**: `difference()` subtracting an inner offset volume (`offset(delta=-wall_thickness)` in 2D or scaled CSG shape in 3D), plus subtraction of cylindrical drain holes.
- **source url & cited metrics**:
  - General castable minimum wall thickness: 0.7 mm minimum for general casting ([Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).
  - Hollowing shell wall thickness: 0.8 mm to 1.0 mm shell thickness for cast silver/gold patterns ([Formlabs Jewelry Casting Guide](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf)).
  - Solid metal hollowing threshold: Solid sections thicker than 10.0 mm MUST be hollowed ([Formlabs Jewelry Casting Guide](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf)).
  - Drain / escape hole diameter: 1.5 mm to 2.0 mm minimum diameter for resin/slurry cleanout ([Formlabs Jewelry Casting Guide](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf)).

### 10. sizing bars & stretch marks
- **what it is**: A smooth, un-patterned, solid segment at the bottom (6 o'clock position) of an engagement ring or wedding band, specifically reserved for bench resizing (cutting, stretching, or soldering extra metal without ruining shoulder detailing or stone layouts).
- **how cad tools construct it**: MatrixGold / Rhino models a flat profile region at 6 o'clock interrupting eternity or textured patterns on the shank.
- **which scad primitive could express it**: CSG conditional blending or `difference()` replacing patterned geometry with a solid rectangular/stadium cross-section along the bottom arc angles (-20° to +20° relative to 6 o'clock).
- **source url & cited metrics**:
  - Post-polish minimum thickness at sizing bar: 1.8 mm minimum thickness ([Engagement Ring Designs](https://www.reddit.com/r/EngagementRingDesigns/comments/1sn24pv/ring_measurements_concern/)).
  - Sizing bar arc width: 3.0 mm to 5.0 mm minimum unpatterned section width along bottom arc ([Westover Jewelers Eternity Bands Guide](https://www.westoverjewelers.com/eternity-bands-vs-anniversary-bands)).

### 11. production & casting shrinkage compensation
- **what it is**: Global or feature-specific linear scale expansion applied to CAD geometry before 3D printing and investment casting to ensure finished metal pieces match target dimensions after shrinkage and polishing.
- **how cad tools construct it**: Global 3D `Scale` matrix transform applied prior to mesh export.
- **which scad primitive could express it**: `scale([s, s, s])` wrapping the top-level module.
- **source url & cited metrics**:
  - Direct 3D print resin casting shrinkage scale: 2% to 3% linear scale-up ([Tashvi Bezel CAD Guide](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial); [Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).
  - Mold vulcanization + wax injection shrinkage scale: 5% to 8% cumulative scale-up ([Tashvi Bezel CAD Guide](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial); [Ganoksin Orchid / Cadsmithing](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291)).

## conditions and caveats

- **Phase 1 (Band-Class Geometry) Scope**: Phase 1 generator support is strictly restricted to plain, single-surface band-class geometries (flat, comfort-fit, D-shape, knife-edge, signet, tapered shanks) with continuous rotational symmetry (`rotate_extrude()`) and optional flat sizing bar regions.
- **Phase 2 & 3 Reach Features**:
  - *Stone Setting & Head Cutters*: Conical seat cutters, prong clusters, gallery rails, and bezel walls are Phase 2 features requiring multi-body CSG `difference()` and exact stone asset bounding boxes.
  - *Channel Settings & Azures*: Multi-stone channel cuts and honeycomb azure drill patterns require CSG repetition loops and spatial collision checks (Phase 2.5).
  - *Milgrain & Filigree*: High-density sphere arrays (`for()` loops of 0.2–0.3 mm spheres) introduce significant OpenSCAD `$fn` facet count inflation and compilation overhead; they belong in Phase 3 fine-detail embellishment modules.
  - *Hollowing & Shelling*: CSG hollowing requires clean interior offset evaluations without self-intersecting faces; Phase 1 models remain solid or single-lathe extruded.
- **Validator Discipline**: Every numerical constraint enforced in `casting-tolerances.json` and the OpenSCAD generator MUST carry a citable production source URL. Any visual approximation parameter without a published manufacturing benchmark is explicitly tagged `viz-grade, calibrate before production` and blocked from production gating.

## sources

1. [Ganoksin Orchid Forum — Basic guidelines for jewelry design (Thomas / Cadsmithing)](https://orchid.ganoksin.com/t/basic-guidelines-for-jewelry-design/42291) — retrieved 2026-09-11
2. [Tashvi — Step-by-Step Guide to Creating a Bezel Setting in CAD](https://tashvi.ai/blog/step-by-step-bezel-setting-cad-tutorial) — retrieved 2026-09-11
3. [Ganoksin Learning Center — CAD Modeling Prong Settings (Charlie Herner)](https://www.ganoksin.com/article/cad-modeling-prong-settings/) — retrieved 2026-09-11
4. [Ganoksin Learning Center — Channel Setting Round Diamonds (Tom Weishaar)](https://www.ganoksin.com/article/channel-setting-round-diamonds/) — retrieved 2026-09-11
5. [Formlabs — Introduction to Casting for 3D Printed Jewelry Patterns](https://cdn.webshopapp.com/shops/234164/files/356849424/1805016-gd-enus-0p.pdf) — retrieved 2026-09-11
6. [Reddit r/EngagementRingDesigns — Ring Measurements Concern & Sizing Bar Thickness](https://www.reddit.com/r/EngagementRingDesigns/comments/1sn24pv/ring_measurements_concern/) — retrieved 2026-09-11
7. [Aide-memoire Jewelry — How Wide or Thick Should My Ring Be?](https://a-m.shop/blogs/news/9990381-how-wide-should-my-ring-be) — retrieved 2026-09-11
8. [Blue Nile — Choosing Your Ring Band Width Guide](https://www.bluenile.com/blog/diamonds-jewelry/ring-band-width) — retrieved 2026-09-11
9. [Larson Jewelers — Ring Width Guide](https://www.larsonjewelers.com/pages/ring-width-guide) — retrieved 2026-09-11
10. [Gemvy — Semi-Mount Engagement Ring Settings Guide](https://gemvy.com/blog/semi-mount-ring-settings-a-complete-guide.html) — retrieved 2026-09-11
11. [Zuanfa Jewelry — Buying Guide for Claw Settings](https://smartbuy.alibaba.com/buyingguides/zuanfa-jewelry) — retrieved 2026-09-11
12. [Westover Jewelers — Eternity Bands vs. Anniversary Bands & Sizing Bars](https://www.westoverjewelers.com/eternity-bands-vs-anniversary-bands) — retrieved 2026-09-11
