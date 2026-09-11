# OpenSCAD Engine Landscape 2024–2026 for Sculptura Parametric Jewelry Engine

research: 2026-09-11 · source: https://github.com/CadQuery/cadquery , https://github.com/CadQuery/cadquery` , https://github.com/elalish/manifold (+19 more) · status: cited

## thesis
Sculptura relies on a dual-path compilation pipeline: in-browser rendering via `openscad-wasm` (Emscripten WebAssembly) and asynchronous backend rendering via native OpenSCAD CLI workers. Achieving byte-identical determinism and golden-file regression testing across both paths requires navigating a major shift in OpenSCAD's core architecture between 2021 and 2026: the transition from CGAL's exact Nef polyhedra to the Manifold fast mesh boolean engine. Because the current npm package `openscad-wasm@0.0.4` is built from a 2022 OpenSCAD snapshot lacking Manifold, browser and CLI compile paths currently evaluate CSG models on different geometry backends, producing different vertex topologies, face orderings, and floating-point representations.

## the landscape — releases, backends, and per-item

### 1. OpenSCAD Stable Release 2021.01
* **Version**: `2021.01` [Source [1](https://openscad.org/downloads.html)]
* **Date**: `2021-01-31` [Source [1](https://openscad.org/downloads.html), [3](https://github.com/openscad/openscad/releases)]
* **What changed**: `2021.01` remains the official tagged stable release on `openscad.org`. It relies exclusively on the CGAL (Computational Geometry Algorithms Library) Nef polyhedra kernel for 3D CSG boolean operations.
* **Why it matters for our two compile paths**: While `2021.01` is widely available in Linux distribution packages, its CGAL rendering pipeline suffers from single-threaded performance bottlenecks and high memory consumption. Complex parametric jewelry models (such as filleted bands, voronoi structures, or dense pavé gemstone settings) can take minutes or hours to compile under `2021.01`.
* **Source**: `https://openscad.org/downloads.html` [1]

### 2. OpenSCAD Development Snapshots (2022–2026)
* **Version**: Nightly Development Snapshots (e.g., `2022.02.18` [Source [7](https://github.com/openscad/openscad-wasm/releases)], `2024.11.14` [Source [2](https://openscad.org/downloads.html#snapshots)], `2026.05.31` [Source [2](https://openscad.org/downloads.html#snapshots)])
* **Date**: `2022-02-18` through `2026-05-31` [Source [2](https://openscad.org/downloads.html#snapshots), [7](https://github.com/openscad/openscad-wasm/releases)]
* **What changed**: Due to the long gap following `2021.01`, the OpenSCAD user community, production CAD pipelines, and 3D printer platforms adopted development snapshots as the de facto standard. Snapshots introduced Fast-CSG, the Manifold backend integration, 3MF export, upgraded text/font rendering, and improved multi-core scaling.
* **Why it matters for our two compile paths**: CLI worker nodes running modern snapshots execute CSG operations orders of magnitude faster than `2021.01`. However, because snapshot builds are continuously compiled from `master`, golden-file testing requires strict pinning to exact commit hashes or snapshot dates.
* **Source**: `https://openscad.org/downloads.html#snapshots` [2]

### 3. The Manifold Geometry Backend Integration
* **Version**: PR `#4480` / Issue `#4825` [Source [4](https://github.com/openscad/openscad/issues/4825)], Non-experimental status on `2024.09.28` [Source [5](https://lists.openscad.org/empathy/thread/D6KV3ZLXHLBHSITSQ5GPUZUKHURU4ABE)]
* **Date**: Merged `2023-03-03` [Source [4](https://github.com/openscad/openscad/issues/4825)], Non-experimental `2024-09-28` [Source [5](https://lists.openscad.org/empathy/thread/D6KV3ZLXHLBHSITSQ5GPUZUKHURU4ABE)]
* **What changed**: OpenSCAD integrated Emmett Lalish's C++ header-only `Manifold` mesh boolean library (`https://github.com/elalish/manifold`). Manifold replaces CGAL's exact arbitrary-precision rational arithmetic with lock-free, multi-threaded double-precision floating-point mesh booleans using exact geometric predicates and symbolic perturbations.
  * **Speed**: 10x to 1000x rendering speedup compared to CGAL (e.g., complex boolean rendering reduced from 1.3 minutes to 3.6 seconds).
  * **Memory**: Drastically reduced memory footprint and elimination of CGAL out-of-memory crashes on dense meshes.
  * **Output Format**: Guarantees 2-manifold watertight meshes upon export.
  * **Default Status**: Promoted from experimental (`--enable=manifold`) to non-experimental on `2024-09-28` [Source [5](https://lists.openscad.org/empathy/thread/D6KV3ZLXHLBHSITSQ5GPUZUKHURU4ABE)], becoming the default 3D CSG engine in 2025/2026 development builds.
* **Why it matters for our two compile paths**: Essential for CLI worker throughput. However, Manifold produces different vertex coordinates, facet triangulations, and mesh connectivity compared to CGAL.
* **Source**: `https://github.com/openscad/openscad/issues/4825` [4] & `https://lists.openscad.org/empathy/thread/D6KV3ZLXHLBHSITSQ5GPUZUKHURU4ABE` [5]

### 4. openscad-wasm (npm package version 0.0.4)
* **Version**: `0.0.4` [Source [6](https://www.npmjs.com/package/openscad-wasm)]
* **Date**: Published `2022-07-18` (last cataloged `2025-07-18`) [Source [6](https://www.npmjs.com/package/openscad-wasm)]
* **What changed**: `openscad-wasm` is an Emscripten WebAssembly port compiled from the `openscad/openscad-wasm` repository [Source [7](https://github.com/openscad/openscad-wasm/releases)]. Version `0.0.4` wraps OpenSCAD snapshot `2022.02.18` [Source [7](https://github.com/openscad/openscad-wasm/releases)].
* **Why it matters for our two compile paths**: `openscad-wasm@0.0.4` is stagnant and unmaintained. Because it predates the March 2023 Manifold merge [Source [4](https://github.com/openscad/openscad/issues/4825)], it relies entirely on the legacy CGAL backend running in a 32-bit WASM heap limit (2GB–4GB). As a result:
  1. Browser compilation of complex jewelry models is slow and memory-constrained.
  2. Browser WASM output (CGAL) and CLI worker output (Manifold) diverge structurally, making cross-path byte-level golden file validation impossible under `openscad-wasm@0.0.4`.
* **Source**: `https://www.npmjs.com/package/openscad-wasm` [6] & `https://github.com/openscad/openscad-wasm/releases` [7]

### 5. Next OpenSCAD Release Roadmap (2026.0X Release Candidate)
* **Version**: `2026.0X` Release Candidate (Issue `#6410` / "Next OpenSCAD Release" Milestone) [Source [8](https://github.com/openscad/openscad/issues/6410)]
* **Date**: Active tracking through `2025-12-26` to `2026-06-06` [Source [8](https://github.com/openscad/openscad/issues/6410)]
* **What changed**: Maintainers are finalizing the first formal stable release tag since `2021.01`. This release stabilizes Manifold as the primary CSG engine, updates Qt/QScintilla dependencies, and modernizes 3MF/STL export options.
* **Why it matters for our two compile paths**: Once `2026.0X` is tagged, Sculptura should pin both the native CLI workers and a custom WASM Emscripten build to this exact release tag to establish engine parity.
* **Source**: `https://github.com/openscad/openscad/issues/6410` [8]

### 6. SCAD-Adjacent Kernels & Alternative Engines
* **libfive**: Functional Representation (f-rep) kernel created by Matthew Keeter (`https://github.com/libfive/libfive`) [Source [9](https://github.com/libfive/libfive)]. Uses interval arithmetic and Dual Contouring to render implicit surfaces directly on CPU/GPU without boundary representation (B-Rep) or CSG mesh boolean failures. Guarantees watertight geometry at arbitrary resolution.
* **Manifold Core Library**: Standalone C++ mesh boolean library created by Emmett Lalish (`https://github.com/elalish/manifold`) [Source [10](https://github.com/elalish/manifold)]. In addition to OpenSCAD, Manifold was integrated into Blender 4.x/5.x as the fast mesh boolean core.
* **CadQuery / OpenCASCADE**: Python-based Code-CAD framework (`https://github.com/CadQuery/cadquery`) [Source [11](https://github.com/CadQuery/cadquery)] built on the OpenCASCADE Technology (OCCT) B-Rep kernel. Supports exact STEP/IGES CAD export with NURBS surfaces and analytical fillets/chamfers, ideal for industrial manufacturing.
* **Why it matters for our two compile paths**: While libfive (f-rep) and CadQuery (B-Rep) represent alternative modeling paradigms, OpenSCAD's CSG language remains Sculptura's primary model definition format.

## conditions and caveats

1. **Golden Files are Per-Engine-Version and Per-Backend**:
   * **CGAL vs. Manifold Mismatch**: CGAL constructs exact rational polyhedra and converts them to floating-point meshes upon file export. Manifold performs operations on double-precision indexed triangle meshes. The same `.scad` script compiled under CGAL vs. Manifold produces non-identical vertex floating-point values, differing face counts, and distinct triangulation topology.
   * **Multi-threaded Non-Determinism in Manifold**: Manifold parallelizes boolean operations using OpenMP or TBB. Unless deterministic post-processing or canonical vertex/triangle sorting is applied to exported STL/3MF files, multi-threaded execution across varying CPU core counts can permute face and vertex index ordering.
   * **WASM vs. Native Floating-Point Variations**: Emscripten WASM targets evaluate 32-bit/64-bit IEEE 754 math within V8/JavaScript engines, which can introduce least-significant-bit discrepancies relative to native x86_64 CLI binaries.
2. **Harness Rules for Sculptura**:
   * Never compare a WASM CGAL output against a Native Manifold output expecting byte identity.
   * Golden-file harnesses must maintain separate golden baselines for WASM (`openscad-wasm`) and Native CLI, or upgrade `openscad-wasm` to a custom WebAssembly build compiling OpenSCAD with the Manifold backend (`--enable=manifold`).

## sources
1. OpenSCAD Downloads Page (Stable Release 2021.01): `https://openscad.org/downloads.html` (Retrieved 2026-09-11)
2. OpenSCAD Development Snapshots: `https://openscad.org/downloads.html#snapshots` (Retrieved 2026-09-11)
3. OpenSCAD GitHub Releases: `https://github.com/openscad/openscad/releases` (Retrieved 2026-09-11)
4. OpenSCAD GitHub Issue #4825 (Make Manifold Integration Release Ready): `https://github.com/openscad/openscad/issues/4825` (Retrieved 2026-09-11)
5. OpenSCAD Empathy Archives (Manifold non-experimental status 2024-09-28): `https://lists.openscad.org/empathy/thread/D6KV3ZLXHLBHSITSQ5GPUZUKHURU4ABE` (Retrieved 2026-09-11)
6. npm openscad-wasm package details (v0.0.4): `https://www.npmjs.com/package/openscad-wasm` (Retrieved 2026-09-11)
7. GitHub openscad/openscad-wasm Releases (wrapping OpenSCAD snapshot 2022.02.18): `https://github.com/openscad/openscad-wasm/releases` (Retrieved 2026-09-11)
8. OpenSCAD GitHub Issue #6410 (Cut 2026.0X Release Candidate): `https://github.com/openscad/openscad/issues/6410` (Retrieved 2026-09-11)
9. libfive Solid Modeling Kernel Repository: `https://github.com/libfive/libfive` (Retrieved 2026-09-11)
10. Manifold C++ Mesh Boolean Library Repository: `https://github.com/elalish/manifold` (Retrieved 2026-09-11)
11. CadQuery Code-CAD Framework Repository: `https://github.com/CadQuery/cadquery` (Retrieved 2026-09-11)
