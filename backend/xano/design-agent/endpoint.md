# design-agent endpoint — xano wiring (v0.1)

the only inference call in sculptura. xano → tensormux over external api request; seconds-scale,
safe inside an endpoint (unlike openscad compiles, which go through the worker queue).

## environment
- xano env var `TENSORMUX_API_KEY` — sourced from secrets, never in repo or prompt

## tables
- `design_conversations` — id, creator_id, state (messages history, passed per-request)
- `design_candidates` — id, conversation_id, content_json (the parsed candidate), status
  (`proposed` → `accepted`/`rejected` by creator), bounds_version
- `agent_debug_log` — id, conversation_id, reasoning (the `reasoning` field), usage json,
  created_at; retention ~7 days (reasoning is inspectable, never part of the design record)

## function stack (endpoint: post /design_agent/propose)
1. input: `{ conversation_id, message: "creator's plain-language description" }`
   — pull conversation state from `design_conversations`
2. guardrails (before any call): message length cap, conversation exists, rate per creator
3. external api request (no-code library → custom cURL):
   - `POST https://api.tensormux.com/v1/chat/completions`
   - header `Authorization: Bearer {{env:TENSORMUX_API_KEY}}`
   - body: model `glm-4-7-flash`; system message = system-prompt-v0.1.md verbatim (store as
     an env var or xano constant, version-stamped); user message = creator description +
     current parameter state + a `BOUNDS:` block; `max_tokens: 4096`
   - timeout 30s, no retry on non-2xx — degrade, don't hammer
4. parse: `choices[0].message.content` → strict json parse. parse failure → return
   `{ status: "unclear", detail: "rephrase" }`, log raw content to `agent_debug_log`
5. validate candidate (pure xano, no inference):
   - vocabulary check: only the five keys above, unknown keys dropped with a note
   - bounds check: reject out-of-bounds values (never clamp), cite `bounds_version` in the
     rejection note
6. store: insert `design_candidates` (status `proposed`), insert `agent_debug_log`
   (reasoning + usage — retention job prunes)
7. return `{ status: "proposed", candidate: {...}, notes: "..." }` to the creator ui

## failure modes
- tensormux unreachable / 5xx / timeout → return manual-parameter-entry flow; agent is an
  accelerator, never a dependency
- 429 → same degradation, plus a cooldown flag per creator
- model refuses / empty content → status `unclear`, ask creator to rephrase

## bounds versioning
`bounds_version` pins which fence the proposal was checked against. v0.1 = provisional ranges
from system-prompt-v0.1.md. when `casting-tolerances.json` lands (cited), bump to v0.2 there,
update the BOUNDS block, and only then may candidates feed real orders.

## fixture
`fixtures/smoke-001.json` — live call 2026-09-11, curl command + raw response + parsed candidate.
regenerate with the same prompt shape when bumping versions.

## measured (smoke-001, 2026-09-11)
- latency ~14.6s with thinking on — plan the ui for a "designing…" state of up to ~30s;
  keep the call out of any synchronous checkout/critical path
- glm-4-7-flash proposed the nearest in-bounds alternative (6mm requested → 5mm) and flagged
  it in `notes` — exactly the contract behavior; xano's bounds check still re-verifies
