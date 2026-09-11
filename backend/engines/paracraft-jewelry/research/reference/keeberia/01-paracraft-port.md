# Keeberia CAD Engine Architecture Digest & Port-Over Analysis for Sculptura

**research:** September 11, 2026  
**source project:** Keeberia (`/app/conversations/6aa3ddf65d5b4135ae96ca6e/keeberia`)  
**target project:** Sculptura (Parametric Jewelry CAD)  
**deliverable target:** `research-drafts/01-paracraft-port.md`

---

## Executive Summary

Keeberia’s CAD engine (`paracraft` and its sub-engine `caps-engine`) provides a pure, deterministic compiler pipeline that projects abstract domain records into vanilla, dependency-free OpenSCAD scripts annotated for customizer interfaces (such as MakerWorld/MakerLab). This digest analyzes the architecture across seven dimensions to extract the CAD engine patterns for porting to **Sculptura**—a parametric jewelry CAD system.

---

## 1. The Generative-OpenSCAD Pattern

### Philosophy: Compiled Parametric Scripts vs. Probabilistic AI CAD
Keeberia explicitly rejects non-deterministic text-to-CAD / LLM mesh generation in favor of **deterministic codegen of parametric scripts**. Pure TypeScript functions compile project records into human-readable OpenSCAD code where every user-facing slider is exposed as a top-level parameter.

> **Path:** `backend/engines/cad/research/notes/generative-openscad.md`  
> *"generative openscad" for keeberia means **deterministic codegen of parametric scripts** — not llm-authored geometry, not text-to-cad, not rodin-style multimodal mesh generation. the case compiler already proves the shape of it: `backend/engines/cad/case-engine` emits **vanilla, dependency-free, parametric openscad** where every knob the app exposes is a top-level variable... traceparency extends to geometry: same project model → same .scad, today and in two years.*

### Module-per-Feature Structure
In `paracraft/src/index.ts` and `paracraft/caps-engine/src/index.ts`, generated OpenSCAD files follow a clean hierarchy of standalone CSG modules representing specific geometric features:

- `module rounded_rect(width, depth, radius)`: Hull-of-four-circles primitive for soft 2D profiles without Minkowski sum overhead.
- `module standoff(x, y)`: Mounting post with central drill hole.
- `module usb_slot()`: Wall cutout computed from placement vector math.
- `module case_body()`: Outer shell minus inner cavity extrusion.
- `module top_plate()`: Mounting plate extruded with switch cutouts and drill holes.
- `module keycap(unit, row)`: Tapered hollow cap body with dish sphere subtraction, stem ring, and wall bridges.
- `module knob()`: Ridged cylinder with D-shaft bore.

> **Path:** `backend/engines/paracraft/src/index.ts`  
> ```openscad
> // rounded rectangle, hull of four circles — no libraries needed
> module rounded_rect(width, depth, radius) {
>   r = max(radius, 0.01);
>   hull()
>     for (x = [-(width / 2 - r), width / 2 - r])
>       for (y = [-(depth / 2 - r), depth / 2 - r])
>         translate([x, y, 0]) circle(r);
> }
> ```

For **Sculptura**, this translates into domain-specific CAD modules:
- `module ring_band(inner_d, width, thickness, profile_type)`
- `module bezel_setting(stone_d, wall_t, seat_depth)`
- `module prong_cluster(count, stone_d, prong_d, angle_offset)`
- `module stone_seat(stone_type, length, width, pavilion_angle)`
- `module gallery_rail(height, thickness, shape)`

### Parameter Naming & OpenSCAD Customizer Protocol
Keeberia emits strict OpenSCAD Customizer annotations (`/* [Tab Name] */`, inline range comments `// [min:step:max]`, and dropdown annotations `// [id1:Name1, id2:Name2]`), enabling any emitted script to immediately function as an interactive web or desktop customizer widget (e.g., MakerLab).

> **Path:** `backend/engines/cad/research/notes/generative-openscad.md`  
> ```openscad
> /* [Mounting] */           // tab name
> mount_type = "sandwich";   // [tray, sandwich, top, integrated]  ← dropdown
> wall_thickness = 3;        // [1:0.5:6]                          ← slider min:step:max
> heatsets = true;           // ← checkbox
> /* [Hidden] */             // machinery params stay out of the ui
> ```

> **Path:** `backend/engines/cad/research/notes/flow-05-caps-and-viz.md`  
> *- **the comment above each variable is its ui label** — `// cap wall thickness, mm` renders as the field name. labeled dropdowns: `Type = "ET"; // [E:Emoji mode, T:Text mode]` — value:Label pairs, richer than our plain id lists.  
> - **sections are ui groups**: `/* [Select modes] */`, `/* [Emoji mode] */` … exactly the section pattern we emit.*

Derived values (PCB outlines, hole coordinates, feature tables) are grouped under the `/* [Hidden] */` tab so the UI stays uncluttered while preserving total parametric recalculation under the hood.

### Inline Comments & Traceability
Generated SCAD includes full traceability metadata in comments, annotating every cutout and post with its source reference from the domain model:

> **Path:** `backend/engines/paracraft/out/hackpad-3key-case.scad`  
> ```openscad
> module standoffs() {
>   standoff(-25.65, -17.98);  // H1
>   standoff(25.65, -17.98);  // H2
> }
> ...
> module top_plate() {
>   ...
>   translate([-26.05, -18.37, -1])
>     cube([14, 14, plate_thickness + 2]);  // SW1 (Cherry MX switch, soldered, PCB mount)
> }
> ```

---

## 2. Carries Over Unchanged (Domain-Generic Machinery)

The core compiler architecture in `paracraft` is completely domain-agnostic and will port directly to `sculpturacraft`:

### Pure Synchronous Codegen Pipeline
- **Signature Pattern**: `generateDesign(record, options?) → { scad, params, warnings, stats }`.
- **Zero-Dependency Script Generation**: The TS compiler requires no CAD binaries or Python dependencies to produce `.scad` text. Generation runs identically on backend servers (Xano, Node.js), CLI workers, or in-browser WASM.
- **Multi-Output Rendering Architecture**:
  1. *Browser Preview*: `openscad-wasm` renders live 3D controls and local STL export.
  2. *Daemon Verification*: Headless `openscad` CLI compiles verified production STLs.
  3. *Community Customizer*: Raw `.scad` pasted into MakerLab/Thingiverse Customizer works out-of-the-box.

> **Path:** `backend/engines/cad/research/notes/generative-openscad.md`  
> ```
> project model
>     ↓  case compiler (pure code, no cad runtime)      ← this is the "portable engine" on xano
> .scad (customizer-annotated, dependency-free)
>     ↓
> three render paths, all from the same file:
>   a. browser: openscad-wasm (official, 424⭐) — instant 3d preview + local stl export, zero infra
>   b. daemon: openscad cli — verified stls, artifacts of record (what we do today)
>   c. community: paste the .scad into makerworld/tinkercad/customizer — it just works, no libs to install
> ```

### Tradeoffs & CSG Kernel Selection
Keeberia accepts CSG mesh limits (no native STEP output, tessellated curves controlled via `$fn`) to gain standalone binary security, WASM execution, and instant execution speed.

> **Path:** `backend/engines/cad/stack/tradeoffs.md`  
> *we chose openscad because it fits our fabrication use case — a standalone executable with a small standalone language, generating printable geometry deterministically. the honest cost: no step files. the honest verdict: worth it.*

### Structured Validation & Human Warnings
Validation rules return explicit human-readable messages rather than internal error codes. Errors block file generation; warnings pass through as metadata.

> **Path:** `backend/engines/paracraft/README.md`  
> *human words, never codes: "the usb port would breach the case floor — raise the standoff height above 4.3mm…", "this board has no mounting holes — the case cannot anchor the pcb…". case errors fail the job (retry rungs can't fix a design flaw); warnings ride along as artifacts.*

### Multi-Part Layout
To facilitate batch 3D printing or casting trees, multiple parts are rendered side-by-side using translation offsets:

> **Path:** `backend/engines/paracraft/src/index.ts`  
> ```openscad
> case_bottom();
> translate([outer_width / 2 + 15, 0, 0]) top_plate();
> ```

---

## 3. Needs Domain Replacement (Keyboard Concepts → Jewelry Analogues)

The table below maps Keeberia’s keyboard concepts explicitly to Sculptura’s jewelry analogues:

| Keeberia (Keyboard CAD) | Sculptura (Parametric Jewelry CAD) | Functional Mapping & Architecture Role |
| :--- | :--- | :--- |
| **PCB Placement Records** (`pcb.placements`) | **Jewelry Component Layout Records** (`jewelry.placements`) | Spatial arrangement of stones, heads, channels, and decorative accents in 3D/spherical space. |
| **Switch Plate (`top_plate`)** | **Ring Shank / Band (`ring_band`)** | The structural chassis supporting components; cutouts are subtracted for stone seats/galleries. |
| **Switch Cutouts (`plateOpening`: 14x14mm)** | **Stone Seats (`seatCutout` / `girdleSeat`)** | Exact negative shapes subtracted from metal for gemstone seating. |
| **Screw Bosses & Standoffs (`standoff`)** | **Bezels & Prongs (`bezel_setting`, `prong_cluster`)** | Anchor geometry protruding from the chassis to lock sub-components/stones in place. |
| **USB-C Wall Slot (`usb_slot`)** | **Sizing Gap / Hallmark Stamp / Inner Engraving Zone** | Structural/functional cutout on the wall/inner perimeter. |
| **Keycaps & Profiles (`CAP_PROFILES`: DSA, Cherry, SA)** | **Gemstone Cuts & Profiles (`GEM_PROFILES`: Round Brilliant, Oval, Emerald)** | Dimensional data table (`base`, `height`, `crownAngle`, `tableWidth`, `pavilionDepth`). |
| **Profile Tilts (`tilts` per row)** | **Facet / Pavilion / Crown Angles** | Angular transformations applied across geometry regions. |
| **Knob Covers (`knob`)** | **Decorative Bezels, Halos, or Crown Rings** | Cylindrical/revolved features with knurling, milgrain, or decorative ridges. |
| **Component Case Projections (`case.plateOpening`)** | **Gemstone Case Projections (`gem.seatCutout`, `gem.prongOffset`)** | Footprint definition linking a component ID to its CAD subtraction/addition shapes. |

---

## 4. Does Not Apply to Jewelry At All

The following electronic and keyboard-specific mechanics must be discarded when porting to Sculptura:

1. **PCB Electrical Architecture**: Netlists, copper trace routing, solder pads, via drilling, FR4 board stackups (1.6mm 2-layer FR4), and MCU pinouts. Jewelry is solid cast metal/wax.
2. **KLE (Keyboard Layout Editor) Format & 1U Unit Pitch**: 19.05mm grid units, key switch staggered rows, and 1u–6.25u keycap unit multipliers. Jewelry uses ring sizing standards (US 3–15, mm inner diameter) and millimeter stone diameters.
3. **Switch Matrix & Mechanical Stems**: MX cross-stems (4.1mm cross standard) and Choc 3-prong stem sockets.
4. **Key Legends**: Text and SVG surface extrusions on keycap tops ("Caps Lock", "Backspace").
5. **Ergonomic Tenting & Split Sectioning**: Tenting support wedges (`tent_support`) and 104-key print-bed split sectioning (`keyboard104.scad`).

---

## 5. Determinism + Testing

### Byte-Identical Codegen & Deterministic Formatting
Keeberia guarantees byte-identical OpenSCAD generation across runs by strictly formatting floating-point values and avoiding non-deterministic structures (no timestamps, environment state, random seeds, or unstructured object iteration).

> **Path:** `backend/engines/paracraft/src/index.ts`  
> `const fmt = (n: number) => (Math.round(n * 100) / 100).toString();`

> **Path:** `backend/engines/paracraft/caps-engine/src/index.ts`  
> `const fmt = (n: number) => Number(n.toFixed(3)).toString();`  
> `const f = (n: number) => Number.isInteger(n) ? `${n}` : fmt(n);`

Placements are iterated in deterministic record order (`holes`, `keys`, `encoders`, `displays`).

### Parameter-Hash Caching Strategy
Because identical input options produce a byte-identical `.scad` file, caching compiled STL artifacts is straightforward:
1. Hash the canonical `.scad` string (or the normalized `params` object) via SHA-256 (`hash = sha256(scad_text)`).
2. Look up `hash.stl` in the artifact store.
3. Skip headless OpenSCAD execution on cache hits.

### Golden-File Test Architecture
Keeberia adopts a spec-test pattern inspired by `alexives/keyboard_lib`:

> **Path:** `backend/engines/cad/research/notes/prior-art-deep-dive-paracraft-upgrade.md`  
> *1. **the spec suite**... mirror keyboard_lib's architecture in our own form — `backend/engines/paracraft/specs/`, one spec per module (plate, walls, usb, standoffs, caps, knob), each with a reference stl in-repo. the render test becomes a golden-master harness: geometry changes prove themselves against reference artifacts before they land.*

In `paracraft/test/render.ts` and `paracraft/caps-engine/test/render.ts`, test suites execute the pipeline against reference layouts, invoke headless OpenSCAD, and verify binary compilation success:

> **Path:** `backend/engines/paracraft/test/render.ts`  
> ```typescript
> for (const [name, layout] of LAYOUTS) {
>   const pcb = generatePcb(layout).result;
>   const c = generateCase(pcb);
>   const file = `out/${name}-case.scad`;
>   writeFileSync(file, c.scad);
>   ...
>   execSync(`QT_QPA_PLATFORM=offscreen ${oscad} -o out/${name}-case.stl ${file}`, { stdio: "pipe", timeout: 120000 });
> }
> ```

---

## 6. Manufacturing Validation / Castability Checks

### Keeberia's 3D Print Validation Rules
Keeberia enforces physical fabrication boundaries directly inside the TS generator:

- **Min Wall Thickness**:
  `wall_thickness = 3; // [1.6:0.2:5] side walls (below 1.6 gets floppy)`
- **Floor Breach / Z-Height Intersections**:
  `if (slotZ0 < opts.baseThickness) warnings.push({ level: "error", message: "the usb port would breach the case floor — raise the standoff height above 4.3mm so the xiao and its shell fit inside" });`
- **Corner Curvature Radius**:
  `if (innerRadius < 0.5) warnings.push({ level: "warning", message: "outer corners are barely rounder than the walls — raise corner radius or thin the walls for visible rounding" });`
- **Fit Clearances**:
  `case_margin` (1.6mm PCB-to-wall clearance), `usbClearance` (0.6mm slot margin), `cap_gap` (0.5mm cap spacing), `tol = 0.2` (MX stem socket tolerance).

### Sculptura Castability & Jewelry Validation Analogues
For lost-wax casting (gold, silver, platinum, resin printing), Sculptura must port these checks into jewelry domain rules:

1. **Investment Casting Metal Shrinkage**:
  Apply global/local scaling factors (1.5%–2.5% expansion added to wax model depending on alloy).
2. **Minimum Wall & Shank Thickness**:
  Flag error if ring shank thickness falls below 1.0mm (gold/silver) or 0.8mm (platinum) to prevent misruns or structural warping.
3. **Prong & Bezel Seat Overlap**:
  Validate that prong seats overlap stone girdles by at least 0.2mm–0.3mm for secure setting without blocking light.
4. **Castability Draft Angles & Under-Gallery Access**:
  Ensure under-gallery cavities do not trap liquid resin or investment plaster; enforce minimum 2° draft angles on deep gallery subtractions.

---

## 7. The Research-Note Format (Status / Citation Conventions)

Keeberia enforces a strict research note structure across `backend/engines/cad/research/notes/` that Sculptura will adopt.

### Standard Note Metadata Header
- **H1 Header**: `# <topic name> — <subtitle>`
- **Metadata Line**: `research: <date> · <method / provenance / companions>`
- **Thesis Section**: `## the thesis` or `## thesis` providing a concise 1–3 sentence architectural summary.

### Citation & Provenance Rules
To prevent intellectual property contamination, Keeberia classifies every studied repository by license type and defines clear usage boundaries:

> **Path:** `backend/engines/cad/research/notes/prior-art-deep-dive-paracraft-upgrade.md`  
> ```markdown
> | source | license | what we may take |
> |---|---|---|
> | keyboard_lib (alex ives) | MIT | code liftable with attribution — but prefer **values + architecture**: keep paracraft dependency-free and our own codegen |
> | scad-keyboard-cases | gpl-3.0 | **zero code, ever** — patterns, module decomposition, and geometry facts only |
> | genKeyboard (anne's files) | **unknown — ask anne the source** | study-don't-copy until the origin is known |
> | kle format | interop | a data format is interop, not copying. always fine |
> | keycap_playground | MIT (owner-confirmed on discord) | values as data with provenance — already doing this |
> ```

### Rules for Sculptura Research Notes
1. **MIT License**: Code liftable with attribution in `THIRD_PARTY_NOTICES.md`, but architecture and parameter values are preferred.
2. **GPL / Copyleft**: **Zero code lift**. Reimplement algorithms from spec; extract physical data facts only.
3. **Unknown / Unlicensed**: Treat as study-don't-copy until license status is resolved.
4. **Data Formats**: Interchange formats (JSON, ring standards, gem specs) are interop and always permitted.

---

*Digest prepared for Sculptura CAD Engine Port (`/app/conversations/6aa3ddf65d5b4135ae96ca6e/research-drafts/01-paracraft-port.md`).*
