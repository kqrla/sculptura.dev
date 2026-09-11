# design agent — tensormux glm-4.7-flash integration

the design agent is the only sanctioned inference surface in sculptura (AGENTS.md section 6): it turns a creator's plain-language description into a **candidate parameter set** that the creator then reviews. it never originates a constraint value, never touches geometry directly, and never decides castability or price.

provider: tensormux.com v1 api, model `glm-4-7-flash`. verified live 2026-09-11.

---

## 1. why this model, why this path

- cheap, fast, disposable: the design agent runs on every creator conversation turn, so the inference cost must be negligible per call
- thinking is on by default and returns in a separate `reasoning` field, so the model's deliberation is inspectable in logs without polluting the artifact
- the **only artifact that moves downstream is `content`**, parsed as a candidate parameter set json. `reasoning` is logged, never stored on the design record, never fed back into the engine

## 2. the call (from xano)

xano calls tensormux over its external api request feature. this is a short-lived http call (seconds), so it is safe inside a xano endpoint, unlike openscad compiles.

```text
POST https://api.tensormux.com/v1/chat/completions
Authorization: Bearer <TENSORMUX_API_KEY>      // xano environment variable, never in the repo
Content-Type: application/json

{
  "model": "glm-4-7-flash",
  "messages": [
    { "role": "system", "content": "<system prompt — see section 3>" },
    { "role": "user",   "content": "<creator's plain-language description + current parameter state>" }
  ],
  "max_tokens": 4096
}
```

response shape (OpenAI-compatible):

```json
{
  "choices": [{
    "message": {
      "content":   "<candidate parameter set json — the artifact>",
      "reasoning": "<thinking — logged only>"
    }
  }],
  "usage": { "prompt_tokens": 10, "completion_tokens": 137, "total_tokens": 147 }
}
```

## 3. the system prompt contract

the system prompt is versioned in the repo and deployed to xano, not improvised per endpoint:

- you propose parameters from the current vocabulary only (bands, profiles, bezels, prongs, bails, clasps, posts, backs — per `research/jewelry/primitives/vocabulary.md` once accepted)
- you may only propose values **within the cited bounds** of `reference/casting-tolerances.json`, `reference/stone-seats.json`, and `reference/sizing-tables.json`, passed to you as context
- if the creator asks for something outside those bounds, say so in the `notes` field and propose the nearest in-bounds alternative — do not silently clamp, do not invent a number
- output strict json in `content`: `{ "type": "ring", "parameters": {...}, "notes": "..." }`, nothing else. no prose outside the json
- you do not compute price, mass, or castability. you do not describe manufacturing outcomes. you propose; the engine compiles; the validator decides

## 4. the guardrail chain (why inference can't poison the engine)

the design agent's output is untrusted input to a deterministic system, and it is treated that way:

1. `content` is parsed as json; parse failure → candidate rejected, creator asked to rephrase
2. every proposed parameter is checked against the vocabulary schema; unknown parameters dropped with a note
3. every value is range-checked against the cited research tables; out-of-bounds values are **rejected, not clamped** (clamping would let a model guess masquerade as a proposal)
4. only then does the candidate parameter set reach the creator for review, and only after creator acceptance does it enter the pipeline: parameters → scad generation → compile → validation

step 3 is the load-bearing one: even if the model hallucinates a wall thickness, the number dies at the boundary because the bounds themselves are cited. inference proposes within a fenced yard; the fence is research.

## 5. xano wiring notes

- `TENSORMUX_API_KEY` lives in xano's environment variables, sourced from secrets — never in repo, never in the system prompt
- the design conversation state (messages, the candidate sets proposed and accepted) lives in xano tables, keyed to the design record; `reasoning` is written to a debug log table with a short retention, not to the record
- usage accounting: log `usage` per call so per-design-conversation inference cost is visible in the creator dashboard analytics (this feeds adaptionlabs instrumentation too)
- failure mode: if tensormux is unreachable or errors, the creator flow degrades to manual parameter entry — the agent is an accelerator, never a dependency

## 6. what this intentionally does not define

- the parameter vocabulary itself — that arrives from research phase 3.4, with citations
- the bounds context format — mirrors whatever `casting-tolerances.json` / `stone-seats.json` / `sizing-tables.json` land as, per their schemas
- multi-turn memory of the creator's intent — v1 is per-request stateless; the conversation history is passed in by xano
