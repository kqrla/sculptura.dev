# determinism + golden files — harness shipped and green

research: 2026-09-11 · implementation: `testing/harness.mjs` + `testing/cases/` + `testing/golden/manifest.json` · status: accepted (running, measured)

## thesis — verified, not assumed

openscad-wasm 0.0.4 is **byte-deterministic**: every golden case compiles twice per harness run and produces identical bytes, and hashes reproduce across separate process invocations. this was the load-bearing assumption of the whole architecture (byte-identical output per parameter set → parameter-hash caching, golden regression testing, manufacture-from-hash) and it now has a machine-enforced proof instead of a hope.

## what the harness enforces

1. **determinism** — each case compiles twice per run; any byte difference is a hard fail with a "do not proceed" message. this catches nondeterministic geometry *before* it reaches an order.
2. **golden hashes** — stl sha256 + source sha256 + tri count pinned in `golden/manifest.json`. geometry changes are a deliberate `--update` tied to an explaining commit, never an accident. missing/new/deleted cases all fail.
3. **compile budgets** — per-case ms budgets encoded in the filename (`b250` = 250ms), from the measured numbers in performance/budget.md. over-budget is a warning (machines vary), but a regression is visible.
4. **engine pinning** — the manifest records the openscad-wasm version; running a different engine version warns, because goldens are only meaningful per engine build.

## current goldens (2026-09-11, openscad-wasm 0.0.4)

| case | fn | tris | compile | note |
|---|---|---|---|---|
| band-flat-fn32-b250 | 32 | 2,048 | ~40ms | first permitted primitive |
| band-flat-fn192-b1000 | 192 | 73,728 | ~410ms | same design record at export tier — the $fn split demonstrated |
| band-comfort-fn32-b250 | 32 | 2,304 | ~140ms | offset-profile construction |
| band-groove-fn32-b1200 | 32 | 2,160 | ~870ms | difference() CSG — engraving-class cost driver |

tri counts scale exactly as $fn² predicts (fn192 = 36× fn32 on the flat band) — a free sanity check on every run.

## case files are the generator's house style

the cases are written as the generator should emit: semantic module interfaces (`ring_band(size_mm, width_mm, thickness_mm)` — params express intent, not construction), stable module boundaries so implementation can change without cascading, and a `[design record]` block at the top naming every parameter in mm. principles from cubehero's openscad-organization guide (retrieved 2026-09-11). the emitted file is readable by a power creator who opens the collapsed code view — the artifact is the file, so it must read like one.

## conditions and caveats

- determinism is verified for openscad-wasm 0.0.4 single-threaded. the worker cli path (native openscad) needs its own golden pass before exports ship — same harness, different engine pin entry.
- goldens are per-engine-version. upgrading openscad-wasm invalidates the manifest deliberately (warning + --update), which is the correct failure mode.
- the harness pins behavior of *geometry*, not *performance*: compile ms varies per machine; only the ms budget warning guards against pathological regressions.
- `band-groove`'s engrave_depth 0.8mm is a design record value, not a castability bound — the validator (casting-tolerances.json, cited sources pending) is the arbiter and is not wired yet.

## sources

1. own measurements — harness runs in-sandbox 2026-09-11, output in this note's table, reproducible via `node testing/harness.mjs`
2. cubehero.com/2013/12/18/organizing-your-openscad-code-part-i/ (retrieved 2026-09-11) — module organization principles adopted as the emitted-scad house style
