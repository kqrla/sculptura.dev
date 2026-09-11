# openscad language reference digest for paracraft-jewelry

research: 2026-09-11 · source: https://openscad.org/docs/ , https://openscad.org/cheatsheet/ , https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/ · status: cited

## thesis

OpenSCAD source text is the canonical artifact for paracraft-jewelry, requiring strict adherence to vanilla, dependency-free language primitives to ensure dual compilation across browser (`openscad-wasm`) and CLI worker environments, as well as community customizer compatibility. Parametric jewelry generation relies heavily on 2D profile operations (`offset`, `polygon`), rotational/linear extrusions (`rotate_extrude`, `linear_extrude`), and Boolean CSG (`difference`, `union`, `intersection`). Facet density must be managed via explicit `$fn` preview/export splitting (`$preview ? 32 : 192`), leveraging `$fn` values divisible by 4 for exact axis alignment. Canonical `.scad` outputs must enforce zero-thickness prevention, mandatory face overlap epsilons (`0.01`mm), and strict Customizer header structure to guarantee deterministic, manifold manufacturing geometry across all downstream pipelines.

## the reference

### 1. Extrusion Primitives: `rotate_extrude` & `linear_extrude`

| Primitive | Parameter | Type / Range | Default | Official Documentation Rules & Behavior |
|---|---|---|---|---|
| `rotate_extrude()` | `angle` | Number (deg) | `360` | Sweeps 2D profile counter-clockwise (Right-Hand Rule) around Z-axis (source: [2]). Positive sweeps CCW; negative sweeps clockwise (source: [2]). Requires OpenSCAD 2019.05+ (source: [2]). |
| | `convexity` | Integer | `2` | OpenCSG render preview hint (source: [2]). Set to `10` for complex concave cross-sections (source: [2]). |
| | `$fn`, `$fa`, `$fs` | Special Vars | Inherited | Controls rotational segment density around the sweep axis (source: [2]). |
| | *2D Profile Rule* | Geometry | `x >= 0` | Profile must lie in X-Y plane strictly on `x >= 0` (or strictly `x <= 0`) (source: [2]). Spanning `x = 0` triggers console warning and ignores extrusion (source: [2]). Touching `x = 0` must occur along a 2D line segment, not a 0D point (point touch causes 0-thickness CGAL error, source: [2]). |
| `linear_extrude()` | `height` | Number (> 0) | `5` | Extrusion height along vector `v` (source: [2]). Height must be strictly positive (source: [2]). |
| | `center` | Boolean | `false` | When `true`, centers solid along Z from `-height/2` to `+height/2`; when `false`, extrudes `0` to `height` (source: [2]). |
| | `twist` | Number (deg) | `0` | Rotates 2D profile around extrusion vector as it extrudes upward (Left-Hand Rule) (source: [2]). |
| | `scale` | Scalar or `[x,y]` | `1.0` | Scales 2D profile factor over height (source: [2]). |
| | `slices` | Integer | `1` / `20` | Intermediate Z-height slices for twist/scale (default `1` when `twist = 0`, usage templates show `20`, source: [2]). |
| | `v` | Vector `[x,y,z]` | `[0,0,1]` | Extrusion direction vector pointing into positive Z direction (source: [2]). |
| | *Implicit Projection* | Rule | Hardcoded | 2D inputs transformed in 3D prior to extrusion undergo implicit `projection()` onto X-Y plane, ignoring Z coordinates (source: [2]). |

### 2. Transformations & Morphing: `offset`, `hull`, `minkowski`

| Operator | Mode / Argument | Default | Official Documentation Rules & Behavior |
|---|---|---|---|
| `offset()` | `r = amount` | `r = 1` | Radial offset using rolling circle of radius `r` (positive `r` expands exterior, negative `r` shrinks interior) (source: [3]). Requires OpenSCAD 2015.03+ (source: [3]). |
| | `delta = amount` | Unset | Straight delta offset by fixed perpendicular distance outward/inward (source: [3]). |
| | `chamfer = bool` | `false` | When `true` in delta mode, chamfers sharp exterior corners instead of joining edges (source: [3]). |
| | *Fillet / Round Idioms* | Pattern | N/A | Fillet (round concave corners): `offset(r = -3) offset(delta = +3)` (holes `< 2*r` vanish, source: [3]). Round (round convex corners): `offset(r = +3) offset(delta = -3)` (walls `< 2*r` vanish, source: [3]). |
| `hull()` | Children | N/A | Computes 2D or 3D convex hull enclosing all child nodes (source: [3]). |
| | *2D Performance Rule* | Guideline | N/A | Performing 2D `hull()` on 2D circles followed by `linear_extrude()` is computationally far faster than 3D `hull()` on cylinders (source: [3]). |
| `minkowski()` | Children | N/A | Computes Minkowski sum of child nodes (source: [3]). |
| | *Dimension Sum Rule* | Behavior | Summed | Outer dimensions and height are explicitly summed: `cube([10,10,1])` + `cylinder(r=2, h=1)` yields outer size `14`x`14`x`2`mm, expanding width by `2*r = 4`mm and height by `1`mm (source: [3]). |
| | *Origin Dependency* | Alignment | Origin | Child object origins determine expansion symmetry (centered cylinder expands Z symmetrically `±0.5`, uncentered expands `+1` in Z, source: [3]). |

### 3. Boolean CSG Operations: `union`, `difference`, `intersection`

| Operation | Logical Function | Official Documentation Rules & Requirements |
|---|---|---|
| `union()` | Logical OR | Merges child solids into a single volume (source: [4]). Implicit when multiple statements are grouped (source: [4]). |
| `difference()` | Logical AND NOT | Subtracts 2nd through Nth child solids from the 1st child solid (source: [4]). |
| `intersection()` | Logical AND | Retains only volume shared/common to all child solids (source: [4]). |
| *Coincident Surfaces* | Boundary Violation | Coincident faces on merged or subtracted boundaries produce undefined behavior, non-manifold geometry, or dropped volumes in CGAL (source: [4]). |
| *Epsilon Overlap Rule* | Manifold Requirement | Subtraction cuts and overlapping joins MUST extend beyond boundaries using a small epsilon (e.g. `eps = 0.01`mm) to guarantee clean manifold mesh generation (source: [4]). |
| `render()` | Preview CSG Engine | Forces full CGAL polyhedral CSG computation in F5 preview mode (source: [4]). Default `convexity = 1`; `10` recommended for complex shapes (source: [4]). |

### 4. Facet Resolution: `$fn`, `$fa`, `$fs` Semantics

| Variable | Description | Default | Minimum Value | Official Behavioral Rules |
|---|---|---|---|---|
| `$fa` | Minimum angle per segment (deg) | `12` (30 segs/360°) | `0.01` | Sets max segment angle for arcs/circles (source: [5]). Setting `< 0.01` triggers a console warning (source: [5]). |
| `$fs` | Minimum segment length (units) | `2` | `0.01` | Sets min segment length so small circles get fewer facets (source: [5]). Setting `< 0.01` triggers a warning (source: [5]). |
| `$fn` | Fixed facet count for 360° | `0` (disabled) | `0` | When `$fn > 0`, `$fa` and `$fs` are COMPLETELY IGNORED (source: [5]). |

- Official C-Code Resolution Logic (source: [5]):
```c
int get_line_segments_from_r(double r, double fn, double fs, double fa) {
    if (r < GRID_FINE) return 3;
    if (fn > 0.0) return (int)(fn >= 3 ? fn : 3);
    return (int)ceil(fmax(fmin(360.0 / fa, r * 2 * M_PI / fs), 5));
}
```
- Core Facet Rules:
  1. When `$fn == 0`, segment count is `ceil(max(min(360/$fa, 2*PI*r/$fs), 5))`, enforcing a hard minimum floor of `5` segments for any arc/circle (source: [5]).
  2. Values of `$fn > 128` are discouraged for general performance; values `< 50` are recommended during active design (source: [5]).
  3. Preview/Export Split: The built-in boolean `$preview` is `true` in F5 preview and `false` in F6 export (source: [1], [5]). Idiom: `$fn = $preview ? 32 : 192;` (source: [5]).
  4. Axis Alignment Rule: Setting `$fn` to a multiple of `4` (e.g. 16, 32, 64, 192) places vertices exactly on coordinate axes (0°, 90°, 180°, 270°), ensuring integer bounding boxes (source: [5]).

### 5. Customizer Syntax & Parameter Annotations

- System Requirements: Requires OpenSCAD version `2019.05` or higher (source: [6]).
- Placement & Literal Assignment Rules:
  - Customizer variables MUST be assigned in the root of the main file before any `{` syntax block or before `/* [Hidden] */` (source: [6]).
  - Variable values MUST be simple literals (string, number, boolean, or 1D vector of up to `4` numbers, source: [6]).
  - Variable expressions (e.g. `w = 10 + 2;` or `s = str("a","b");`) are NOT supported as Customizer parameters and will be ignored by the GUI parser (source: [6]).
- Annotation Comment Syntax & Widgets:
  - Tab Grouping: `/* [Tab Name] */` creates tab groups (source: [6]). `/* [Global] */` parameters appear in all tabs; `/* [Hidden] */` hides all subsequent variables from the GUI (source: [6]).
  - Range Sliders: `var = 34; // [10:100]` or step slider `var = 2; // [0:5:100]` or max bounded `var = 34; // [50]` (source: [6]).
  - Dropdown ComboBox: `var = 2; // [0, 1, 2, 3]` or labeled `var = "S"; // [S:Small, M:Medium, L:Large]` (source: [6]).
  - Spinbox / Textbox / Checkbox: `var = true;` / `str = "hello"; // 8` (source: [6]).
  - Vectors: `vec = [12, 34, 45]; // [1:2:50]` (up to `4` elements, source: [6]).
- JSON Parameter Sets & CLI:
  - Parameter files use JSON structure with `"fileFormatVersion": "1"` and `"parameterSets"` keys (source: [6]).
  - CLI usage: `openscad -o output.stl -p parameters.json -P SetName input.scad` (source: [6]).
  - Proxy Variable `-D` Override Pattern: Parameters in JSON customizer sets CANNOT be overridden directly with `-D param=val`; source code must assign a proxy variable (`part = cpart;`) where `cpart` is exposed in Customizer and `part` is overridden via CLI `-D` (source: [6]).

### 6. Text, Vector Imports & Heightmap Surfaces

| Module | Key Parameters | Defaults | Official Documentation Rules & Behavior |
|---|---|---|---|
| `text()` | `text` | Required | Creates 2D text geometry (requires OpenSCAD 2015.03+, source: [7]). |
| | `size` | `10` | Capital letter height in mm; sets font em-size to `100/72` times value (source: [7]). |
| | `font` | `"Liberation Sans"` | Fontconfig logical font string name (e.g. `"Liberation Sans:style=Bold"`, source: [7]). |
| | `direction` | `"ltr"` | Text flow: `"ltr"`, `"rtl"`, `"ttb"`, `"btt"` (source: [7]). |
| | `halign` / `valign` | `"left"` / `"baseline"` | Horizontal: `"left"`, `"center"`, `"right"`. Vertical: `"top"`, `"center"`, `"baseline"`, `"bottom"` (source: [7]). |
| | `spacing` | `1` | Character spacing multiplier factor (source: [7]). |
| `import()` | `file` | Required | Imports 2D vector (SVG, DXF) or 3D mesh (STL, OFF, OBJ, 3MF) files (source: [8]). |
| | `id` / `layer` | Unset | `id` selects SVG element/group ID; `layer` selects DXF layer (source: [8]). |
| | *SVG Units* | `96` DPI | Ununitized SVG coordinates resolve to CSS pixels (`96` DPI, `1px = 0.2645833`mm). |
| `surface()` | `file` | Required | Imports 3D heightmap surface from DAT text matrix or PNG image (requires version 2015.03+ for PNG, source: [8]). |
| | `center` / `invert` | `false` / `false` | `center = true` centers XY at origin; `invert = true` inverts height mapping (source: [8]). |
| | *sRGB Height Formula* | Scaled `0..100` | PNG color converted to grayscale height via linear luminance formula: `Y = 0.2126*R + 0.7152*G + 0.0722*B` (source: [8]). Alpha channel is IGNORED (source: [8]). Grayscale values scale from `0` to `100` units in Z (source: [8]). |

## conditions and caveats

1. **Implicit Projection Contradiction**: We previously assumed 3D-transformed 2D profiles would extrude along their transformed orientation. Official docs state that OpenSCAD applies an implicit `projection()` onto the X-Y plane prior to `linear_extrude` or `rotate_extrude`, ignoring all prior Z coordinates (source: [2]).
2. **`rotate_extrude` Boundary Hazards**: Crossing `x = 0` (having both `x > 0` and `x < 0`) causes OpenSCAD to issue a console warning and completely ignore the extrusion (source: [2]). Touching `x = 0` at a single point creates 0-thickness non-manifold geometry, triggering CGAL assertion failures during rendering (source: [2]). Profile touches along `x = 0` MUST be 1D line segments.
3. **Minkowski Dimension Sum Inflation**: 3D `minkowski()` sums heights and bounding box dimensions (`width_1 + 2*r`, `h1 + h2`, source: [3]). Using 3D `minkowski()` for rounded ring edges causes heavy $O(N \cdot M)$ polyhedral mesh convolutions; 2D `offset()` combined with `linear_extrude()` or `rotate_extrude()` is required to maintain compile budgets.
4. **Customizer Expression Parser Limitation**: Variables initialized with arithmetic or string expressions (e.g. `ring_radius = inner_diameter / 2;`, source: [6]) are NOT evaluated or displayed by the Customizer panel. Only pure literal assignments (`ring_radius = 9.1;`) generate GUI widgets.
5. **JSON Customizer Set `-D` Proxy Gotcha**: Passing `-p params.json -P SetName` to the CLI prevents `-D param=val` from directly overriding parameters defined in the JSON set (source: [6]). Code must expose a proxy parameter (`part = cpart;`) to enable CLI parameter overrides during batch manufacturing runs (source: [6]).
6. **Font Non-Determinism Across Platforms**: `text()` geometry depends on system-installed font files via `fontconfig` (default `"Liberation Sans"`, source: [7]). If `openscad-wasm` (browser) and native CLI workers lack identical font files or fallback definitions, generated text glyph meshes and STL byte hashes will diverge.
7. **CSG Coincident Surface Artifacts**: Coplanar faces in `union()` or `difference()` operations produce floating-point comparison failures, preview Z-fighting, non-manifold renders, or missing geometry (source: [4]). An overlap epsilon (e.g., `eps = 0.01`mm) MUST be applied to all cut boundaries and join interfaces (source: [4]).

## sources

1. OpenSCAD CheatSheet — https://openscad.org/cheatsheet/ (retrieved 2026-09-11)
2. OpenSCAD User Manual: 2D to 3D Extrusion — https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/2D_to_3D_Extrusion (retrieved 2026-09-11)
3. OpenSCAD User Manual: Transformations — https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations (retrieved 2026-09-11)
4. OpenSCAD User Manual: CSG Modelling — https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/CSG_Modelling (retrieved 2026-09-11)
5. OpenSCAD User Manual: Other Language Features — https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Other_Language_Features (retrieved 2026-09-11)
6. OpenSCAD User Manual: Customizer — https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Customizer (retrieved 2026-09-11)
7. OpenSCAD User Manual: Text — https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Text (retrieved 2026-09-11)
8. OpenSCAD User Manual: Importing Geometry — https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Importing_Geometry (retrieved 2026-09-11)
9. OpenSCAD User Manual: 2D Primitives — https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/2D_Primitives (retrieved 2026-09-11)
10. OpenSCAD User Manual: Primitive Solids — https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids (retrieved 2026-09-11)
