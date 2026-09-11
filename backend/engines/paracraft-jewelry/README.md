# paracraft-jewelry

sculptura's model engine. parametric jewelry geometry, ported from keeberia's paracraft cad engine.

this is the phase 1 port-over document required by [AGENTS.md](../../../AGENTS.md) section 7: what carries over unchanged, what needs domain replacement, and what does not apply. no engine code exists yet, by design — this document precedes it.

source project: [keeberia](https://github.com/kqrla/keeberia), `backend/engines/cad/` + `backend/engines/paracraft/` + `backend/daemons/autolayout/`. the full keeberia digests this document summarizes live in `research/reference/keeberia/`.

---

## 1. what carries over unchanged

the domain-generic machinery. none of it knows what a keyboard is.

### the codegen pipeline

`generateDesign(record, options?) → { scad, params, warnings, stats }` — a pure, synchronous, zero-dependency typescript function that compiles a domain record into `.scad` text. no cad runtime needed to generate; runs identically on xano, in a worker, or in the browser. same input → byte-identical output, via strict number formatting (`fmt = (n) => (Math.round(n * 100) / 100).toString()`) and deterministic record-order iteration. this is the invariant that makes parameter-hash caching possible.

### readable scad as a product feature

generated files are annotated for the openscad customizer: `/* [Tab] */` section groups, `// [min:step:max]` slider ranges, `// [id:Name, ...]` dropdowns, and a `/* [Hidden] */` tab for derived machinery. the comment above a variable is its ui label. one module per feature, source-reference comments on every placement (`// H1`, `// SW1 ...`), meaningful parameter names at the top. jewelry names, same discipline: `ring_size_us`, `band_width_mm`, `bezel_height_mm`, `prong_count`.

### three render paths from one file

1. browser preview via openscad-wasm — instant 3d, zero infra
2. worker compile via headless openscad cli — the artifact of record
3. raw `.scad` pasted into any community customizer — it just works, because the file is dependency-free

all three consume the same canonical file. this maps directly onto the agent-driven preview loop in AGENTS.md section 5: a cheap browser preview for parameter exploration, a worker compile for the artifact of record.

### validation with human words

keeberia's generator emits structured warnings/errors in human language — "the usb port would breach the case floor — raise the standoff height above 4.3mm…". errors fail the job; warnings ride along as artifacts. sculptura's castability report keeps exactly this shape: human-readable, creator-actionable, never an error code.

### testing

golden-file harness: specs in `backend/engines/paracraft-jewelry/specs/`, one spec per module (band, bezel, prong, bail, clasp...), each with a committed reference output. geometry changes prove themselves against reference artifacts before they land. `test/render.ts` runs the pipeline on reference parameter sets, invokes headless openscad, and verifies compilation succeeds.

### worker topology

xano is a state machine, never a compute host (its endpoints time out at 5–30s; an openscad compile is not a request-response operation). keeberia's proven pattern:

- `design_jobs` table: `queued → running → done | error`, with an `attempts` counter
- workers poll `POST /claim`; xano atomically flips the oldest `queued` job to `running` and increments `attempts`
- workers post results via `POST /complete`, writing `status`, `artifacts`, `error` back to the row
- the queue hides behind a two-method typescript interface (`claim`, `complete`), so the transport (xano rest today, sqs/bullmq later) is swappable without touching the engine
- retry ladder inside the worker: on failure, re-run with progressively relaxed resolution (`$fn` down, clearances up). design flaws short-circuit — retry rungs can't fix a bad design
- `friendlyError()` maps engine exceptions to human guidance

the working assumption of research.md section 6 is **confirmed** by keeberia's implementation: xano owns the data model, auth, design records, and orchestration; compilation, validation, and rendering run in external workers xano dispatches to over a queue. refinements below in section 4.

---

## 2. what needs domain replacement

the architecture ports. the vocabulary does not.

| keeberia (keyboards) | sculptura (jewelry) | note |
|---|---|---|
| pcb placement records | jewelry component layout records | stones, heads, channels in space — spherical, not planar |
| switch plate (`top_plate`) | ring shank / band | the structural chassis |
| switch cutouts (14×14mm) | stone seats / girdle seats | subtracted negative shapes, but with seat-depth and girdle semantics |
| screw bosses & standoffs | bezels & prongs | anchor geometry that locks a sub-component |
| usb-c wall slot | hallmark stamp / inner engraving zone | wall cutout |
| keycap profiles (DSA, SA, cherry) | gemstone cuts (round brilliant, oval, emerald) | dimensional data tables: pavilion angle, table width, crown height |
| row tilts | facet / pavilion / crown angles | angular transforms across regions |
| knob covers | halos, milgrain, crown rings | decorative revolved features |
| 1u pitch / 19.05mm grid | ring size systems (us/uk/eu/jp, mm inner diameter) | the domain's canonical unit grid |

the critical difference beyond vocabulary: keyboards are **planar assemblies of separate parts**; jewelry is **a single solid body with castability constraints**. keeberia's validations are print-oriented (fit clearances, stem tolerances). sculptura's are casting-oriented, and every value must arrive through the research contract with a citation — keeberia's tolerances were engineering judgment; ours cannot be. port the *shape* of validation (structured, human-readable, blocking on publish), not the numbers.

expected castability report fields, pending research to fill them: minimum wall thickness vs unsupported span, trapped volumes that cannot drain wax, unsupported floating geometry, prong/bezel thickness vs stone size, shrinkage per alloy (compensate in geometry or sizing — a research question), estimated metal mass per offered metal.

---

## 3. what does not apply

- pcb electrical architecture: netlists, traces, solder pads, fr4 stackups, mcu pinouts. jewelry is solid cast metal
- kle format and the 1u grid. our interchange format question is stone-size standards and ring-size systems, not keyboard layout editors
- mx/choc stems, switch matrices, keycap legends
- ergonomic tenting, split sectioning, print-bed partitioning
- the caps-engine's dish-sphere subtraction and stem sockets, as such — though the *technique* (sphere subtraction for curvature) reappears the moment we model comfort-fit bands and cabochon settings

---

## 4. what keeberia got wrong that sculptura must fix

keeberia is prior art, not scripture. its v1 gaps are our to-do list:

1. **stuck jobs never recover.** if a worker dies mid-job, the row sits in `running` forever. sculptura needs a xano background task (cron) sweeping `design_jobs` every few minutes: `running` older than a threshold resets to `queued`, or to `error` past `attempts >= 3`.
2. **artifacts in a json column.** fine for kilobytes of text; not fine for multi-megabyte stls and renders. workers must upload binaries to object storage and return signed urls / keys in `complete`.
3. **unauthenticated queue endpoints.** keeberia v1 relies on url obscurity. sculptura's workers must authenticate back into xano with tokens; this is a section 6 research item.
4. **no cache layer.** keeberia regenerates on demand; sculptura must cache compiled artifacts on the parameter-set hash, per AGENTS.md 4.3.

---

## 5. xano platform facts learned from keeberia (to verify against our plan)

- endpoint timeouts 5–30s per plan level — confirms the async queue pattern is mandatory, not optional
- xanoscript has no `db.update`, only `db.edit`; no preconditions inside edits
- `precondition ($job == null)` misfires on record objects — check for null after `db.get` instead, and let xano return the null body quirk (`"null"` text, http 200)
- `error_type` only accepts built-in identifiers; custom ids are parse errors
- bare `if` is invalid grammar; everything lives in `conditional { }`
- empty strings fail validation on optional inputs; pass explicit `null`
- single-record queries need `return = { type: "single" }`
- xano metadata api tokens expire after ~7 days — relevant to ci/cd plans

each of these gets a home in `backend/xano-architecture.md` once the sculptura workspace is live, per research.md section 6.

---

## 6. what happens next

per AGENTS.md section 7, phase 2 is the research spine defined in [research.md](../../../research.md). nothing in this engine gets built until the research behind it exists in writing, with sources. the deliverables of this phase 1 document are done: the port is scoped, the carries/replaces/drops lists are explicit, and the worker topology is confirmed.

the research directory below this readme follows the layout required by research.md, with keeberia's digests as the first reference artifacts.
