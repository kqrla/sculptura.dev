// golden-file harness — paracraft-jewelry
// the artifact is the file: every case is a standalone .scad that compiles
// in the browser engine, the worker cli, and any community customizer.
//
// usage:
//   node testing/harness.mjs --update   regenerate golden/manifest.json
//   node testing/harness.mjs --check    recompile all cases, verify golden hashes (exit 1 on drift)
//   node testing/harness.mjs            same as --check
//
// what it enforces:
//   1. determinism — every case compiles TWICE per run; byte-identical output or the run fails.
//      (if wasm openscad ever proves non-deterministic, this harness finds it before an order does.)
//   2. golden hashes — stl sha256 pinned in golden/manifest.json; any change to generator output
//      is a deliberate --update, never an accident.
//   3. compile budgets — per-case ms budget from performance/budget.md measurements; over-budget
//      is a warning, not a failure (machines vary), but regressions get seen.
//
// operational finding baked in: a wasm instance is created fresh per compile.
// reusing an instance across large renders ooms the heap (see performance/budget.md).

import { createOpenSCAD } from "openscad-wasm";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { createHash } from "crypto";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
const casesDir = join(here, "cases");
const goldenPath = join(here, "golden", "manifest.json");
const HARNESS_VERSION = 1;
const OPENSCAD_WASM = "0.0.4"; // pinned: golden hashes are only meaningful per engine version

const sha256 = (s) => createHash("sha256").update(s).digest("hex");
const fnFromName = (name) => parseInt((name.match(/fn(\d+)/) || [])[1] ?? "32", 10);
const msBudgetFromName = (name) => parseInt((name.match(/b(\d+)/) || [])[1] ?? "2000", 10);

async function compileScad(source) {
  const oscad = await createOpenSCAD({ print: () => {}, printErr: () => {} });
  return oscad.renderToStl(source);
}

function countTris(stl) {
  return (stl.match(/facet normal/g) || []).length;
}

async function runCase(file) {
  const source = readFileSync(join(casesDir, file), "utf8");
  const t0 = Date.now();
  const stl1 = await compileScad(source);
  const compile_ms = Date.now() - t0;

  // determinism: compile the same source again — must be byte-identical
  const stl2 = await compileScad(source);
  const deterministic = stl1 === stl2;

  return {
    id: file.replace(/\.scad$/, ""),
    fn: fnFromName(file),
    source_sha256: sha256(source),
    stl_sha256: sha256(stl1),
    stl_bytes: stl1.length,
    tris: countTris(stl1),
    compile_ms,
    ms_budget: msBudgetFromName(file),
    deterministic,
  };
}

async function main() {
  const mode = process.argv[2] || "--check";
  const files = readdirSync(casesDir).filter((f) => f.endsWith(".scad")).sort();
  console.log(`paracraft-jewelry golden harness v${HARNESS_VERSION} · ${files.length} cases · engine openscad-wasm ${OPENSCAD_WASM}\n`);

  const results = [];
  for (const f of files) {
    const r = await runCase(f);
    results.push(r);
    const det = r.deterministic ? "det✓" : "NON-DETERMINISTIC ✗";
    const budget = r.compile_ms <= r.ms_budget ? `${r.compile_ms}ms≤${r.ms_budget}` : `${r.compile_ms}ms>BUDGET ${r.ms_budget} ⚠`;
    console.log(`  ${r.id.padEnd(28)} fn${String(r.fn).padEnd(4)} ${det}  ${budget}  ${r.tris} tris  ${r.stl_sha256.slice(0, 12)}`);
  }
  console.log("");

  const nonDet = results.filter((r) => !r.deterministic);
  if (nonDet.length) {
    console.error(`FAIL: ${nonDet.length} case(s) produced different bytes on recompile:`);
    nonDet.forEach((r) => console.error(`  ${r.id}`));
    console.error("determinism is load-bearing (byte-identical output per parameter set). do not proceed.");
    process.exit(1);
  }

  if (mode === "--update") {
    const manifest = {
      harness_version: HARNESS_VERSION,
      openscad_wasm: OPENSCAD_WASM,
      updated: new Date().toISOString().slice(0, 10),
      note: "golden hashes — any change here must be a deliberate harness --update tied to a commit that explains the geometry change",
      cases: results.map(({ id, fn, source_sha256, stl_sha256, stl_bytes, tris, ms_budget }) =>
        ({ id, fn, source_sha256, stl_sha256, stl_bytes, tris, ms_budget })),
    };
    writeFileSync(goldenPath, JSON.stringify(manifest, null, 2) + "\n");
    console.log(`golden/manifest.json updated — ${results.length} cases pinned.`);
    return;
  }

  // --check
  const golden = JSON.parse(readFileSync(goldenPath, "utf8"));
  const goldenById = Object.fromEntries(golden.cases.map((c) => [c.id, c]));
  let fail = 0;

  if (golden.openscad_wasm !== OPENSCAD_WASM) {
    console.error(`WARN: golden manifest pinned to openscad-wasm ${golden.openscad_wasm}, running ${OPENSCAD_WASM} — recompile and --update if the engine was upgraded deliberately.`);
  }

  for (const r of results) {
    const g = goldenById[r.id];
    if (!g) { console.error(`FAIL: new case ${r.id} — not in golden manifest (run with --update)`); fail++; continue; }
    if (g.stl_sha256 !== r.stl_sha256) { console.error(`FAIL: ${r.id} stl hash drifted: golden ${g.stl_sha256.slice(0, 12)} vs now ${r.stl_sha256.slice(0, 12)}`); fail++; }
    if (g.source_sha256 !== r.source_sha256) { console.error(`FAIL: ${r.id} source changed without --update`); fail++; }
    if (g.tris !== r.tris) { console.error(`FAIL: ${r.id} triangle count ${g.tris} → ${r.tris}`); fail++; }
  }
  for (const id of Object.keys(goldenById)) {
    if (!results.find((r) => r.id === id)) { console.error(`FAIL: golden case ${id} missing from cases/ — was it deleted deliberately?`); fail++; }
  }

  if (fail) { console.error(`\n${fail} golden failure(s). geometry changed — either fix the regression or --update with a commit explaining why.`); process.exit(1); }
  console.log(`golden check passed — ${results.length}/${results.length} cases byte-identical to manifest.`);
}

main().catch((e) => { console.error("harness error:", e); process.exit(1); });
