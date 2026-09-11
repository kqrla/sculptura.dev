# OpenSCAD Jewelry Design Patterns Catalog

research: 2026-09-11 · source: https://blog.usedbytes.com/2019/06/making-jewellery/ , https://codeandmake.com/post/gem-generator , https://gist.github.com/robbintt/aaa7ea33c195d14d051ac15894c0fed6 (+14 more) · status: cited

## thesis

OpenSCAD jewelry modeling in the open-source ecosystem is characterized by two distinct procedural paradigms:

1. **Constructive Solid Geometry (CSG) Primitives (`difference()`, `union()`, `rotate_extrude()`)**: Standard for basic ring shanks, signet tops, and boolean stone seat cutters (e.g., robbintt, yannickbattail, bbo). While accessible, pure CSG relying on nested `hull()` operations (such as initial sphere-chain helix sweeps) suffers severe performance degradation (render times >1 hour at production `$fn`) and non-manifold geometric artifacts.
2. **Functional Vertex/Matrix Polyhedron Extrusion (`polyhedron()`, `sweep()`, `skin()`, `scad-utils`)**: Championed by Oskar Linde, Kit Wallace, and Brian Starkey. By treating OpenSCAD as a functional math engine to evaluate 3D space curves and generating 4x4 transformation matrices for 2D profiles, this approach constructs watertight `polyhedron()` meshes directly. This is the canonical technique for parametric wave, twist, Mobius, and comfort-fit shanks.

From a license discipline standpoint:
- **Directly Liftable (Permissive)**: Only code licensed under `MIT` or `BSD` (e.g., Oskar Linde's `scad-utils` math library and Code and Make's `Gem Generator`) may be integrated directly with attribution.
- **Pattern-Only Reference (Copyleft / ShareAlike)**: `GPL-3.0` (`yannickbattail/openscad-models`), `CC BY-SA 3.0/4.0` (Kit Wallace's gem cuts and SavageRodent's signet ring), and `CC BY-NC-SA 4.0` (bbo's Diva Ring series) are strictly pattern-only reference. Zero code lines may be copied into the `paracraft-jewelry` engine.
- **Unlicensed (Study-Don't-Copy)**: Proprietary or unlicensed scripts (Brian Starkey's double-helix ring, robbintt's wedding band Gist) are study-only. Any dimensions or constant values extracted from unlicensed code must be flagged as `viz-grade, calibrate before production` prior to engine validation.

---

## the patterns — per project

### 1. `scad-utils` & `list-comprehension-demos` — 3D Path Extrusion & Matrix Engine
* **Author**: Oskar Linde
* **URL**: [https://github.com/openscad/scad-utils](https://github.com/openscad/scad-utils) and [https://github.com/openscad/list-comprehension-demos](https://github.com/openscad/list-comprehension-demos)
* **License**: `MIT` (SPDX: `MIT`) — Permissive, liftable with attribution.
* **SCAD Technique**: Mathematical transformation modules (`transformations.scad`, `linalg.scad`, `shapes.scad`), vector algebra, list comprehensions, 4x4 homogeneous transformation matrices (`[x,y,z,1]`), and 3D path extrusion modules (`sweep()`, `skin()`) that output native `polyhedron()` geometries.
* **Vocabulary Mapping**:
  * **Ring Profiles**: `comfort`, `wave`, `twist`, `tapered`, `split`, `bypass`.
* **Cited Dimensions & Data**:
  * Cross-section transformations evaluated across 3D space curve vectors ([https://github.com/openscad/scad-utils](https://github.com/openscad/scad-utils)).
  * Homogeneous transformation matrix math and slice interpolation for smooth curve rendering without CGAL boolean bottlenecks ([https://github.com/openscad/list-comprehension-demos](https://github.com/openscad/list-comprehension-demos)).

### 2. Making Jewellery — 14K Gold Double Helix Ring & Stone Setting Series
* **Author**: Brian Starkey
* **URL**: [https://blog.usedbytes.com/2019/06/making-jewellery/](https://blog.usedbytes.com/2019/06/making-jewellery/)
* **License**: `unlicensed — study-don't-copy` (Author explicitly noted: "Unusually for me, I’m not going to be sharing full source code or models, because I want this design to stay unique.")
* **SCAD Technique**: Transitioned from naive `hull()` sphere chains along space curves (render time >1 hour at moderate `$fn`) to functional matrix evaluation with `scad-utils` (`sweep()`, `skin()`). Uses recursive list comprehensions (`sum_list`) and trigonometric translation/rotation vectors to output watertight `polyhedron()` meshes.
* **Vocabulary Mapping**:
  * **Ring Profiles**: `twist`, `wave`.
  * **Stone Settings**: `bezel`, `prong`.
* **Cited Dimensions & Data**:
  * Ring wall thickness: `2.1mm` (flagged `viz-grade, calibrate before production` — [https://blog.usedbytes.com/2019/06/making-jewellery/](https://blog.usedbytes.com/2019/06/making-jewellery/)).
  * Helix space curve parameters: `helix_radius = 5.0mm`, `z_step = 0.5mm`, `rot_step = 15.0°`, low-poly preview `$fn = 16` ([https://blog.usedbytes.com/2019/06/making-jewellery/](https://blog.usedbytes.com/2019/06/making-jewellery/)).
  * Material target: 14K Gold cast via lost-wax 3D printing (Shapeways process) ([https://blog.usedbytes.com/2019/06/making-jewellery/](https://blog.usedbytes.com/2019/06/making-jewellery/)).

### 3. Gem Generator — Parametric Gemstone Model
* **Author**: Code and Make (codeandmake.com)
* **URL**: [https://codeandmake.com/post/gem-generator](https://codeandmake.com/post/gem-generator) (also hosted at [https://thangs.com/designer/Code%20and%20Make/3d-model/Gem%20Generator-204676](https://thangs.com/designer/Code%20and%20Make/3d-model/Gem%20Generator-204676) and [https://www.printables.com/model/245802-gem-generator](https://www.printables.com/model/245802-gem-generator))
* **License**: `MIT` (SPDX: `MIT` for `.scad` code; CC BY for generated `.stl`) — Permissive, liftable with attribution.
* **SCAD Technique**: Truncated cone/pyramid CSG primitives (`cylinder()` with variable facet resolution `$fn`), `scale()`, `difference()`, and `union()` to parameterize gemstone crown, girdle, pavilion, table, and culet.
* **Vocabulary Mapping**:
  * **Stone Settings**: Stone geometry (brilliant cut, pavilion, crown, table, culet).
* **Cited Dimensions & Data**:
  * Facet symmetry `$fn` steps from `$fn = 6` (hexagonal cut) up to `$fn = 16` ([https://codeandmake.com/post/gem-generator](https://codeandmake.com/post/gem-generator)).
  * Proportional scaling between crown height, pavilion depth, and girdle diameter ([https://thangs.com/designer/Code%20and%20Make/3d-model/Gem%20Generator-204676](https://thangs.com/designer/Code%20and%20Make/3d-model/Gem%20Generator-204676)).

### 4. Gem Cuts & Möbius Strip Modules
* **Author**: Kit Wallace
* **URL**: [https://github.com/KitWallace/openscad](https://github.com/KitWallace/openscad) (specifically `gem.scad` at [https://raw.githubusercontent.com/KitWallace/openscad/master/gem.scad](https://raw.githubusercontent.com/KitWallace/openscad/master/gem.scad) and `mobius-hull-trefoil.scad`)
* **License**: `CC BY-SA 3.0` (SPDX: `CC-BY-SA-3.0` / `CC-BY-SA-4.0`) — Patterns only, zero code copying.
* **SCAD Technique**:
  * `gem.scad`: Recursive CSG boolean subtraction (`difference()`, `gem(facets, n)`) removing 66 planar cutter cubes (`cube()`, `rotate()`, `translate()`) at exact index and axial angles from an initial bounding cube.
  * `mobius-hull-trefoil.scad`: Parameterized 3D space curve point evaluation combined with `polyhedron()` / `hull()` sweeps along a half-twist or full-twist Mobius topology.
* **Vocabulary Mapping**:
  * **Stone Settings**: Stone geometry (brilliant-cut gemstone model with 66 facets).
  * **Ring Profiles**: `twist`, `wave`, Möbius band.
* **Cited Dimensions & Data**:
  * 66-facet brilliant cut angular & height parameters ([https://raw.githubusercontent.com/KitWallace/openscad/master/gem.scad](https://raw.githubusercontent.com/KitWallace/openscad/master/gem.scad)):
    * 1 Table facet: axial angle `0°`, height `2.28mm`.
    * 1 Culet facet: axial angle `180°`, height `7.8mm`.
    * 16 B-facets: axial angle `35°`, height `5.0mm` (index steps 1..32).
    * 8 M-facets: axial angle `30°`, height `4.46mm` (index steps 4..32).
    * 8 S-facets: axial angle `16°`, height `3.46mm` (index steps 2..32).
    * 16 Girdle facets: axial angle `90°`, height `8.5mm` (index steps 2..32).
    * 16 C-facets: axial angle `222°` (`42° + 180°`), height `6.0mm` (index steps 1..32).
    * Bounding cube scale factor: `3x` ([https://raw.githubusercontent.com/KitWallace/openscad/master/gem.scad](https://raw.githubusercontent.com/KitWallace/openscad/master/gem.scad)).

### 5. Diva Ring & OpenSCAD for Jewelers Series
* **Author**: Bowman (`bbo`)
* **URL**: [https://www.thingiverse.com/thing:6172699](https://www.thingiverse.com/thing:6172699) (Diva Ring), [https://www.thingiverse.com/thing:6143836](https://www.thingiverse.com/thing:6143836) (Ring Demonstrations), and [https://www.thingiverse.com/thing:6031961](https://www.thingiverse.com/thing:6031961) (Prong Setting)
* **License**: `CC BY-NC-SA 4.0` (SPDX: `CC-BY-NC-SA-4.0`) — Patterns only, zero code copying.
* **SCAD Technique**: Parametric OpenSCAD modules (`module`) utilizing CSG primitives (`cylinder()`, `sphere()`, `rotate_extrude()`, `difference()`), concentric negative offset cuts for gem seats, and radial array positioning for prong posts.
* **Vocabulary Mapping**:
  * **Ring Profiles**: `flat`, `channel`, `eccentric`.
  * **Stone Settings**: `prong`, `bezel`, `channel`, `flush`.
* **Cited Dimensions & Data**:
  * Recommended print settings for direct investment casting: 2 shell perimeter walls, 8% or 100% infill for filing rework ([https://www.thingiverse.com/thing:6143836](https://www.thingiverse.com/thing:6143836)).
  * Concentric offset depths for flush gem seats and 4-prong setting geometry ([https://www.thingiverse.com/thing:6172699](https://www.thingiverse.com/thing:6172699)).

### 6. Customizable Signet Ring (SavageRodent)
* **Author**: SavageRodent
* **URL**: [https://www.thingiverse.com/thing:6167904](https://www.thingiverse.com/thing:6167904) (also hosted at [https://www.printables.com/model/190791-customizable-signet-ring](https://www.printables.com/model/190791-customizable-signet-ring))
* **License**: `CC BY-SA 4.0` (SPDX: `CC-BY-SA-4.0`) — Patterns only, zero code copying.
* **SCAD Technique**: Debossing custom user bitmap images onto a signet top platform using `surface()`, combined with scaled ellipsoid CSG subtraction for ring shanks (`scale()`, `sphere()`, `cylinder()`, `cube()`).
* **Vocabulary Mapping**:
  * **Ring Profiles**: `signet`.
* **Cited Dimensions & Data**:
  * Standard finger hole diameter: `d = 20.0mm` (approx. US Ring Size 10) ([https://www.thingiverse.com/thing:6167904](https://www.thingiverse.com/thing:6167904)).
  * Adjustable deboss depth and border offset parameters for casting relief ([https://www.printables.com/model/190791-customizable-signet-ring](https://www.printables.com/model/190791-customizable-signet-ring)).

### 7. OpenSCAD Signet Ring Module (yannickbattail)
* **Author**: Yannick Battail
* **URL**: [https://github.com/yannickbattail/openscad-models/tree/main/signetRing](https://github.com/yannickbattail/openscad-models/tree/main/signetRing) (source file: [https://raw.githubusercontent.com/yannickbattail/openscad-models/main/signetRing/signetRing.scad](https://raw.githubusercontent.com/yannickbattail/openscad-models/main/signetRing/signetRing.scad))
* **License**: `GPL-3.0-only` (SPDX: `GPL-3.0-only`) — Patterns only, zero code copying.
* **SCAD Technique**: CSG ellipsoid generated by scaling a sphere `scale([1, 0.8, 1.2]) sphere(d=25)`, subtracted by finger bore `cylinder(d=20, h=50)`, flat top plane `cube(24, center=true)`, and side finger relief cutouts `translate([0, ±44.3, -20]) rotate([90,0,90]) cylinder(d=80, h=50)`. Text embossed with `linear_extrude(text_height)` and `text()`.
* **Vocabulary Mapping**:
  * **Ring Profiles**: `signet`.
* **Cited Dimensions & Data** (all from [https://raw.githubusercontent.com/yannickbattail/openscad-models/main/signetRing/signetRing.scad](https://raw.githubusercontent.com/yannickbattail/openscad-models/main/signetRing/signetRing.scad)):
  * Finger hole inner diameter: `d = 20.0mm`.
  * Base outer sphere diameter: `d = 25.0mm` with scaling matrix `[1.0, 0.8, 1.2]`.
  * Side relief cylinders: `d = 80.0mm`, length `h = 50.0mm`, positioned at `y = ±44.3mm`, `z = -20.0mm`.
  * Top crest flat cut bounding cube: `24.0mm`.
  * Base platform height: `base_height = 1.0mm`.

### 8. OpenSCAD Wedding Band Draft (robbintt)
* **Author**: robbintt
* **URL**: [https://gist.github.com/robbintt/aaa7ea33c195d14d051ac15894c0fed6](https://gist.github.com/robbintt/aaa7ea33c195d14d051ac15894c0fed6)
* **License**: `unlicensed — study-don't-copy`
* **SCAD Technique**: `rotate_extrude()` of 2D difference profiles (`difference() { square(); circle(); }`) rotated and positioned at upper and lower inner/outer boundaries to carve smooth quarter-circle comfort-fit bezels onto a cylindrical ring band.
* **Vocabulary Mapping**:
  * **Ring Profiles**: `flat`, `comfort`, `knife-edge` (edge bevels).
* **Cited Dimensions & Data** (flagged `viz-grade, calibrate before production` — [https://gist.github.com/robbintt/aaa7ea33c195d14d051ac15894c0fed6](https://gist.github.com/robbintt/aaa7ea33c195d14d051ac15894c0fed6)):
  * Ring wall thickness: `thickness = 2.1mm`.
  * Ring height (band width): `height = 5.0mm`.
  * Inner diameter: `diam_inner = 19.35mm` (US Ring Size 9.5).
  * Outer diameter: `diam_outer = 23.55mm` (`diam_inner + 2 * thickness`).
  * Plaster casting tolerance: `plaster_tolerance = 0.05mm` (Precision Casting Book reference).
  * Safe plaster tolerance multiplier: `300%` (`safe_plaster_tolerance = 0.15mm`).
  * Bezel cutout circle diameter: `bezel_circle_diameter = 0.30mm` (`2 * safe_plaster_tolerance`).

### 9. Tiffany Etoile Style Ring Script (M_G)
* **Author**: M_G
* **URL**: [https://www.thingiverse.com/thing:12448](https://www.thingiverse.com/thing:12448)
* **License**: `CC BY-SA 3.0` (SPDX: `CC-BY-SA-3.0`) — Patterns only, zero code copying.
* **SCAD Technique**: Combination of `rotate_extrude()` band profile with conical/cylindrical boolean subtractions (`cylinder()`, `cone()`) to form tension-set and partial-bezel gem seats for round brilliant cut gems.
* **Vocabulary Mapping**:
  * **Ring Profiles**: `flat`, `comfort`.
  * **Stone Settings**: `tension`, `bezel`, `flush`.
* **Cited Dimensions & Data**:
  * Crown bevel angle offsets and seat relief cutouts for round brilliant gems ([https://www.thingiverse.com/thing:12448](https://www.thingiverse.com/thing:12448)).

---

## conditions and caveats

1. **Performance & Render Bottlenecks**:
   - Primitive CSG using `hull()` chains (e.g., Brian Starkey's initial double-helix attempt) takes over 1 hour to render at production `$fn` settings in OpenSCAD.
   - **Recommendation**: `paracraft-jewelry` must avoid `hull()` for space-curve sweeps and instead use path-transformation matrix evaluation (`scad-utils` / `sweep()`) generating direct `polyhedron()` output.

2. **Casting & Manufacturing Tolerances**:
   - Lost-wax investment casting requires explicit shrinkage and plaster detail compensations. As noted in `robbintt`'s wedding band draft, plaster detail resolution limit is `0.05mm`, requiring a `300%` safety factor (`0.15mm`) for inner comfort bezels ([https://gist.github.com/robbintt/aaa7ea33c195d14d051ac15894c0fed6](https://gist.github.com/robbintt/aaa7ea33c195d14d051ac15894c0fed6)).
   - Wall thicknesses under `1.2mm` risk cast failure or porosity in 14K gold/silver casting.

3. **Strict License Hygiene & Code Cleanliness**:
   - **Permissive (`MIT`)**: `scad-utils` (Oskar Linde) and `Gem Generator` (Code and Make) are MIT licensed. Code modules can be refactored into the engine with proper attribution notices.
   - **Copyleft / Restrictive (`GPL-3.0`, `CC BY-SA`, `CC BY-NC-SA`)**: `yannickbattail/openscad-models`, Kit Wallace's gem/mobius scripts, SavageRodent's signet ring, and bbo's Diva Ring series carry GPL or ShareAlike licenses. Their code is strictly **pattern-only reference**; zero lines of code may be copied into `paracraft-jewelry`.
   - **Unlicensed / Proprietary**: Unlicensed blog posts and gists (Brian Starkey, robbintt) must be treated as study-only. All numerical constants extracted are flagged `viz-grade, calibrate before production` and must be validated against real jewelry casting benchmarks.

---

## sources

1. **scad-utils (Oskar Linde)**: [https://github.com/openscad/scad-utils](https://github.com/openscad/scad-utils) · retrieved 2026-09-11
2. **list-comprehension-demos (Oskar Linde)**: [https://github.com/openscad/list-comprehension-demos](https://github.com/openscad/list-comprehension-demos) · retrieved 2026-09-11
3. **Making Jewellery (Brian Starkey)**: [https://blog.usedbytes.com/2019/06/making-jewellery/](https://blog.usedbytes.com/2019/06/making-jewellery/) · retrieved 2026-09-11
4. **Gem Generator (Code and Make)**: [https://codeandmake.com/post/gem-generator](https://codeandmake.com/post/gem-generator) · retrieved 2026-09-11
5. **Kit Wallace OpenSCAD Scripts (gem.scad & mobius)**: [https://github.com/KitWallace/openscad](https://github.com/KitWallace/openscad) (raw: [https://raw.githubusercontent.com/KitWallace/openscad/master/gem.scad](https://raw.githubusercontent.com/KitWallace/openscad/master/gem.scad)) · retrieved 2026-09-11
6. **Diva Ring: OpenSCAD for Jewelers (bbo / Bowman)**: [https://www.thingiverse.com/thing:6172699](https://www.thingiverse.com/thing:6172699) · retrieved 2026-09-11
7. **Ring Demonstrations: OpenSCAD for Jewelers (bbo / Bowman)**: [https://www.thingiverse.com/thing:6143836](https://www.thingiverse.com/thing:6143836) · retrieved 2026-09-11
8. **Prong Setting (bbo / Bowman)**: [https://www.thingiverse.com/thing:6031961](https://www.thingiverse.com/thing:6031961) · retrieved 2026-09-11
9. **Customizable Signet Ring (SavageRodent)**: [https://www.thingiverse.com/thing:6167904](https://www.thingiverse.com/thing:6167904) · retrieved 2026-09-11
10. **signetRing.scad (yannickbattail)**: [https://github.com/yannickbattail/openscad-models/tree/main/signetRing](https://github.com/yannickbattail/openscad-models/tree/main/signetRing) (raw: [https://raw.githubusercontent.com/yannickbattail/openscad-models/main/signetRing/signetRing.scad](https://raw.githubusercontent.com/yannickbattail/openscad-models/main/signetRing/signetRing.scad)) · retrieved 2026-09-11
11. **Draft Wedding Band (robbintt)**: [https://gist.github.com/robbintt/aaa7ea33c195d14d051ac15894c0fed6](https://gist.github.com/robbintt/aaa7ea33c195d14d051ac15894c0fed6) · retrieved 2026-09-11
12. **Ring Creation Script - Tiffany Etoile (M_G)**: [https://www.thingiverse.com/thing:12448](https://www.thingiverse.com/thing:12448) · retrieved 2026-09-11
