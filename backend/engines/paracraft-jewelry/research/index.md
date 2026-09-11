# research index

running table of contents for the research phase. one line per note. a note is only `accepted` when every number in it has a source.

status: `open` → `drafted` → `cited` → `accepted`

## keeberia digests (reference, phase 1)

| note | status |
|---|---|
| [reference/keeberia/00-keeberia-overview.md](reference/keeberia/00-keeberia-overview.md) — product + architecture context | drafted |
| [reference/keeberia/01-paracraft-port.md](reference/keeberia/01-paracraft-port.md) — cad engine port-over analysis | drafted |
| [reference/keeberia/02-workers-and-xano.md](reference/keeberia/02-workers-and-xano.md) — worker queue + xano patterns | drafted |

## track a: jewelry domain

### casting
| note | status |
|---|---|
| casting/process-chain.md — lost wax chain, stage by stage | open |
| casting/wall-thickness.md — minimum wall thickness per alloy vs span | open |
| casting/shrinkage-by-alloy.md — wax to metal shrinkage | open |
| casting/sprue-and-drainage.md — sprue placement, trapped volumes | open |
| casting/resin-print-constraints.md — castable resin printing | open |

### stones
| note | status |
|---|---|
| stones/size-tables.md — stone sizes to seat dimensions | open |
| stones/bezel-geometry.md | open |
| stones/prong-geometry.md | open |
| stones/byo-stone-tolerances.md | open |

### sizing
| note | status |
|---|---|
| sizing/ring-size-systems.md — us/uk/eu/jp conversions | open |
| sizing/band-width-compensation.md | open |
| sizing/non-ring-sizing.md — bracelets, earrings, bails | open |
| sizing/validation-diff.md — diff against src/lib/sizing.js | open |

### primitives
| note | status |
|---|---|
| primitives/bands.md, profiles.md, bezels.md, prongs.md, bails.md, clasps.md, posts.md, backs.md, hinges.md, shanks.md | open |
| primitives/vocabulary.md — the schema proposal | open |
| primitives/language-surface.md — creator phrasing to parameter mapping | open |

### manufacturing
| note | status |
|---|---|
| manufacturing/find-manufacturers.md — the section 3.5 research brief | accepted |
| manufacturing/sculpteo.md, shapeways.md | cited |
| manufacturing/cooksongold.md, rio-grande.md, xometry.md | drafted |
| manufacturing/apex-jewelry-casting.md, design-build-cast.md — discovered jewelry-specific bureaus | drafted |
| manufacturing/imaterialise.md — documented negative, cited | cited |
| manufacturing/stuller.md — physical-model-only b2b casting, cited | cited |
| reference/manufacturer-capabilities.json — 9 entries, schema-valid | drafted |

## track b: openscad

| note | status |
|---|---|
| libraries/study-bosl2.md, recommendation.md | open |
| patterns/csg-evaluation.md, rotate-extrude.md, profiles.md | open |
| performance/budget.md — measured numbers on real jewelry geometry | open |
| testing/determinism.md — golden files, hash caching | open |

## xano

| note | status |
|---|---|
| ../../xano-architecture.md (lands at repo root per research.md §6) — queue + worker topology, timeouts, failure/retry behavior | open |

## definition of done

see research.md section 9. nothing here is done until: `casting-tolerances.json`, `stone-seats.json`, `sizing-tables.json` exist and validate with a `source` field on every entry; the build-time check rejecting uncited constraints is written and passing; three exemplar .scad files exist at the readability standard; `openscad/performance/budget.md` has measured numbers; `vocabulary.md` + `language-surface.md` exist; `xano-architecture.md` specifies the full topology; and the gap list exists.
