# Keeberia Worker and Xano Architecture Digest

**Target Project:** Sculptura (Xano Orchestration + External OpenSCAD Compile, Validation, & Render Workers)  
**Source Repository:** Keeberia (`/app/conversations/6aa3ddf65d5b4135ae96ca6e/keeberia`)  
**Document Goal:** Comprehensive analysis of Keeberia's worker, queue, and Xano topology to inform the architecture for Sculptura.

---

## 1. Independent Worker / Daemon Structure

Keeberia implements its background processing layer as an independent, standalone TypeScript daemon.

### Entrypoint and Processing Loop
* **File Citation:** `backend/daemons/autolayout/worker.ts`
* The entrypoint function is `main()` (`worker.ts:135-156`).
* The daemon initializes a transport queue client via `xanoQueue(base)` and enters an infinite `for (;;)` polling loop unless executed in single-pass mode (`KEEBERIA_ONCE=1` or `--once`).
* **Polling Loop Flow (`worker.ts:144-155`):**
  1. `const job = await queue.claim();`
  2. If `job === null`:
     * If `once` mode is active, log and exit immediately.
     * Otherwise, sleep for 2000 ms (`await new Promise((r) => setTimeout(r, 2000));`) and poll again.
  3. If a job is returned:
     * Log receipt: `job ${job.id}: claimed (attempt ${job.attempts}, ...)`
     * Execute pure synchronous engine processing: `const result = await runJob(job);`
     * Report output back: `await queue.complete(job.id, result);`

### Pluggable Transport & Portability Contract
* **File Citations:** `backend/daemons/autolayout/worker.ts:101-106`, `backend/daemons/autolayout/README.md:21-25`
* The worker isolates the job execution engine (`runJob`) from the queue transport mechanisms through a simple TypeScript interface:
  ```typescript
  export interface Queue {
    claim(): Promise<DesignJob | null>;
    complete(jobId: number, result: JobResult): Promise<void>;
  }
  ```
* `xano-rest` is the v1 default transport (`worker.ts:108-132`). Because the queue logic is hidden behind the `Queue` interface, swapping Xano REST for AWS SQS, NATS, Redis/BullMQ, or an HTTP queue requires zero changes to the engine or run ladder (`worker.ts:4-8`).

### Configuration & Environment
* **File Citations:** `backend/daemons/autolayout/worker.ts:135-142`, `backend/daemons/autolayout/render.yaml:12-16`
* `KEEBERIA_XANO_BASE`: Sets the queue API base URL. Defaults in code to `https://xpnx-e4ie-cfuf.z7.xano.io/api:1WbTpRUh:v1`.
* `KEEBERIA_ONCE`: When set to `"1"`, instructs the process to execute cron-style (process available job or exit if empty). Empty/unset defaults to continuous polling.

### Deployment Configuration
* **File Citation:** `backend/daemons/autolayout/render.yaml`
* Deployed as a background worker on Render.com using a native service blueprint (`render.yaml:4-16`):
  ```yaml
  services:
    - type: worker
      name: keeberia-autolayout
      runtime: node
      rootDir: backend/daemons/autolayout
      buildCommand: npm install --prefix ../../engines/circuitron 2>/dev/null || true
      startCommand: npx --yes tsx worker.ts
      envVars:
        - key: KEEBERIA_XANO_BASE
          sync: false
        - key: KEEBERIA_ONCE
          value: ""
  ```
* Because the daemon is a pure Node.js process talking over standard REST endpoints, it can be relocated seamlessly from Render to dedicated high-performance bare metal or AMD cloud instances without code modifications (`README.md:25`).

---

## 2. How Workers Receive Jobs and Authenticate

### Job Ingestion Mechanics (REST Polling Queue)
* **File Citations:** `backend/daemons/autolayout/worker.ts:108-120`, `backend/xano/claim.xanoscript`
* Keeberia utilizes a **pull-based REST polling model** where workers pull work from Xano:
  1. Worker calls `POST /claim` (`worker.ts:111`).
  2. Xano endpoint `claim.xanoscript` queries the `design_jobs` table for the oldest record where `status == "queued"`, sorted by `id: "asc"` with `return = { type: "single" }` (`claim.xanoscript:8-12`).
  3. If a record is found, Xano performs an atomic state edit using `db.edit design_jobs`, setting `status = "running"` and `attempts = $job.attempts + 1` (`claim.xanoscript:14-23`).
  4. Xano returns the updated job object. If no jobs exist in `"queued"` state, Xano returns `null`.

### Queue Response Handling and Xano Null Body Quirk
* **File Citation:** `backend/daemons/autolayout/worker.ts:114-116`
* Xano has a runtime quirk where returning a `null` variable yields an HTTP 200 status with an explicit text response body of `"null"` or empty text.
* The worker handles this explicitly:
  ```typescript
  const body = await res.text();
  if (!body || body === "null") return null; // queue empty (xano quirk: null body)
  return JSON.parse(body) as DesignJob;
  ```

### Worker Authentication back into Xano
* **File Citations:** `backend/daemons/autolayout/worker.ts:108-132`, `backend/xano/README.md:3-8`
* In Keeberia v1, the daemon communicates with Xano over unauthenticated, public API group routes (`api:1WbTpRUh:v1`).
* Requests issued by `fetch()` in `worker.ts` pass no `Authorization` headers or API keys. The queue endpoints (`/claim`, `/complete`) rely on URL obscurity and network environment security rather than token-based API authentication.

---

## 3. Reporting Results, Failures, and Retry Behavior

### Reporting Results via Direct API Writes
* **File Citations:** `backend/daemons/autolayout/worker.ts:121-131`, `backend/xano/complete.xanoscript`
* Upon job completion (success or error), the worker invokes `queue.complete(jobId, result)`, issuing a direct HTTP POST to `KEEBERIA_XANO_BASE/complete`.
* Payload structure sent to Xano (`worker.ts:123-128`):
  ```json
  {
    "id": 1,
    "status": "done",
    "artifacts": {
      "kicad_pcb": "...",
      "case_scad": "...",
      "preview_svg": "...",
      "bom_csv": "..."
    },
    "error": null
  }
  ```
* Xano's `complete.xanoscript` executes `db.edit design_jobs` on `id == $input.id` to write `status`, `artifacts`, and `error` directly into the database row (`complete.xanoscript:10-18`).

### Internal Retry Ladder Pattern
* **File Citation:** `backend/daemons/autolayout/worker.ts:28-87`
* Keeberia handles job execution failures inside the worker using an explicit **Retry Ladder**:
  ```typescript
  const RETRY_LADDER = [
    { label: "default", opts: {} },
    { label: "coarse-grid", opts: { resolution: 0.6 } },
    { label: "high-congestion-budget", opts: { congestionBudget: 3 } },
    { label: "relaxed-clearance", opts: { clearance: 0.2 } },
  ] as const;
  ```
* **Execution Flow across Rungs (`worker.ts:36-83`):**
  * The worker iterates through parameter rungs, relaxing constraints (e.g., coarser routing grid, higher clearance) if the routing engine fails or emits error warnings.
  * **Short-Circuiting on Deterministic Flaws:** If the CAD/case compiler or Gerber generator emits a structural design error (e.g., missing mounting holes or unroutable pin constraints), the worker short-circuits immediately and returns a failed `JobResult` without wasting time on subsequent ladder rungs (`worker.ts:43-52`).

### Error Sanitization for End-Users
* **File Citation:** `backend/daemons/autolayout/worker.ts:89-94`
* Technical exceptions and stack traces are transformed via `friendlyError()` into human-readable messages prior to writing back to Xano:
  ```typescript
  function friendlyError(e: any): string {
    const msg = String(e?.message ?? e);
    if (msg.includes("pin budget")) return "too many components for the chosen mcu — remove a key or the oled";
    if (msg.includes("not supported")) return "one of the parts isn't available in this version yet";
    return msg;
  }
  ```

---

## 4. Asynchronous Work, Timeouts, and Lifecycle Management in Xano

### Why Heavy Computation Belongs Outside Xano
* **File Citations:** `backend/daemons/autolayout/README.md:5-10`, `backend/engines/cad/research/notes/generative-openscad.md:25-35`
* Xano API endpoints operate under strict synchronous HTTP execution timeouts (5–30 seconds depending on plan level). Complex operations like PCB trace autorouting, CAD CSG mesh boolean evaluation, and OpenSCAD 3D compilation exceed HTTP endpoint limits.
* **Architecture Pattern:** Xano **never performs computation directly in API handlers**. Xano functions strictly as an asynchronous orchestrator, database state machine, and REST interface for clients and workers.

### Asynchronous Job Lifecycle State Machine
* **File Citations:** `backend/xano/design_jobs.table.xs`, `backend/xano/generate.xanoscript`, `backend/xano/job.xanoscript`
* **State Machine Transitions:**
  ```
  [Frontend] POST /generate ──> (status: "queued")
                                    │
  [Worker] POST /claim ─────────> (status: "running", attempts + 1)
                                    │
                                    ├───> Engine Success ──> POST /complete (status: "done", artifacts: {...})
                                    └───> Engine Failure ──> POST /complete (status: "error", error: "...")
                                    │
  [Frontend] GET /job?id=N <────────┴── (Polls status until "done" or "error")
  ```

### Retry and Timeout Deficiencies in Keeberia v1
* **File Citations:** `backend/xano/claim.xanoscript`, `backend/xano/design_jobs.table.xs`
* `design_jobs` tracks an `attempts: int` counter, incremented automatically by `claim.xanoscript`.
* **Key Gap in Keeberia:** Keeberia v1 lacks an automated background sweeper/CRON job inside Xano to recover "stuck" jobs. If a worker process crashes mid-job while status is `"running"`, the job remains permanently locked in `"running"` unless manually reset.

---

## 5. Artifact Storage and Caching Strategy

### Storage Strategy
* **File Citations:** `backend/daemons/autolayout/worker.ts:50-68`, `backend/xano/design_jobs.table.xs`
* Keeberia stores all generated engineering artifacts directly as text strings inside a single **JSON column** (`json artifacts?`) in the Xano `design_jobs` database table.
* **Artifact Dictionary Structure (`worker.ts:50-68`):**
  * `kicad_pcb`: Raw string of KiCad PCB file.
  * `case_scad`: Raw string of OpenSCAD script (`.scad`).
  * `case_params`: Stringified JSON of CAD parameters.
  * `bom_csv`: CSV text for component Bill of Materials.
  * `qmk_info`: Stringified JSON for QMK matrix metadata.
  * `preview_svg`: Raw 2D board SVG markup.
  * `stats`: Stringified JSON of routing metrics.
  * Dynamic keys: `gerber_<filename>` (Gerber/drill files), `firmware_<filename>` (`keymap.c`, `rules.mk`, `vial.json`).

### File Serving & Caching
* **File Citations:** `backend/xano/job.xanoscript`, `backend/daemons/autolayout/README.md:14-16`
* No external blob storage (e.g., S3, R2) or CDN caching is used in Keeberia v1.
* When the client polls `GET /job?id=N`, Xano returns the full row payload, transferring all text file artifacts inline within the JSON HTTP response.

---

## 6. Xano Platform Limits, Timeouts, and Language Gotchas

Keeberia's documentation and implementation capture critical findings regarding Xanoscript syntax and runtime constraints.

* **File Citations:** `backend/xano/README.md:15-23`, `journal.md:44, 61, 73`

1. **Metadata API Token Expiry (`journal.md:44`)**
   * Xano metadata deployment API tokens **expire after 7 days by default**. Automated CI/CD deployment scripts attempting to update tables or endpoints via `text/x-xanoscript` will fail with `401 Unauthorized` unless tokens are routinely refreshed.
2. **Absence of `db.update` Primitive (`README.md:19`, `journal.md:73`)**
   * Xanoscript does not support a `db.update` keyword. Database edits must strictly use `db.edit` with `field_name` + `field_value` specifications.
3. **No Preconditions in `db.edit` (`README.md:19`)**
   * `db.edit` statements do not support embedded guard preconditions. Conditional checks must precede the database edit block.
4. **Precondition Object Comparison Bug (`README.md:18`, `job.xanoscript:2-3`)**
   * Xanoscript's `precondition ($job == null)` misfires on database record objects (it triggers even when the record exists in DB).
   * *Workaround:* Remove record-level preconditions. Allow `db.get` to return `null` and let Xano serialize a `null` HTTP response body.
5. **Strict `error_type` Enumeration (`README.md:17`, `journal.md:61`)**
   * The `error_type` statement in Xanoscript only accepts built-in system identifiers (e.g., `notfound`, `accessdenied`). Custom string identifiers like `invalidinput` trigger parser rejections.
6. **Strict Conditional Parser Grammar (`README.md:21`)**
   * Standalone `if (...)` statements are invalid grammar in Xanoscript. All conditional logic must be enclosed inside a `conditional { if (`$var != null`) { ... } }` wrapper block.
7. **Empty String Validation Rejections (`README.md:22`)**
   * Passing empty strings `""` for optional parameters triggers required-input validation failures. Optional inputs must be declared as nullable (`text? error`) and passed explicitly as JSON `null`.
8. **Single-Record Query Semantics (`README.md:20`, `claim.xanoscript:10`)**
   * Querying a table requires `db.query`. To return a single object rather than an array of matching rows, `return = { type: "single" }` must be explicitly specified in the query block.

---

## 7. Recommended Topology for Sculptura

### Proposed Sculptura Topology
* Backend: Xano for data owning, orchestration, and API gateway.
* Execution: External OpenSCAD compile, validation, and rendering workers dispatched over a queue.
* Reporting: Workers report results back over webhooks / HTTP callbacks.

---

### Architectural Assessment: Confirm vs. Challenge

Based on Keeberia's real-world implementation, we **confirm key parts of this architecture** while **challenging and refining three critical areas**:

```
                       SCULPTURA RECOMMENDED ARCHITECTURE
                       ════════════════──────────────────

┌────────────────┐       1. POST /generate      ┌───────────────────────────┐
│ Sculptura Web  │ ───────────────────────────> │        Xano API           │
│    Frontend    │ <─────────────────────────── │  (State Orchestrated DB)  │
└────────────────┘       4. Poll GET /job       └───────────────────────────┘
                                                      ▲               ▲
                                     2. POST /claim   │               │ 3. POST /complete
                                     (or SQS Queue)   │               │ (Signed S3 URLs)
                                                      │               │
                                           ┌──────────┴───────────────┴──────────┐
                                           │   External OpenSCAD Workers         │
                                           │   (Node/Python + OpenSCAD CLI)     │
                                           └─────────────────────────────────────┘
                                                              │
                                                     Upload   │ STL / 3MF / PNG
                                                     Blobs    ▼
                                           ┌─────────────────────────────────────┐
                                           │  S3 / Cloudflare R2 Object Storage  │
                                           └─────────────────────────────────────┘
```

#### 1. CONFIRM: Xano as Async Orchestrator & State Machine
* **Why:** Keeberia proves that Xano excels at schema management, job record tracking (`queued` → `running` → `done` | `error`), and serving structured JSON state to frontends. Keeping compilation out of Xano endpoints avoids API timeouts entirely.

#### 2. CHALLENGE: Webhook Push Dispatch vs. Worker Pull Claims
* **Challenge:** Having Xano push jobs to workers via webhooks requires Xano to manage worker node IP discovery, load balancing, worker capacity, and HTTP delivery retries.
* **Recommendation:** Retain Keeberia's **pull-based worker claim model** (`POST /claim`) or use a dedicated queue service (AWS SQS or Redis/BullMQ) with Xano webhook triggers. Workers should pull jobs when they have idle CPU/GPU threads available to run heavy OpenSCAD processes.

#### 3. CHALLENGE: Storing Binary CAD Artifacts in Xano JSON Columns
* **Challenge:** Keeberia stored lightweight PCB text files (KiCad PCB, QMK C code, SVG) in Xano JSON columns. Sculptura will produce heavy binary assets: multi-megabyte STL models, 3MF files, high-resolution PNG renders, and GLTF/GLB 3D preview meshes. Storing large binary string payloads in Xano database rows will cause DB bloat, slow down API queries, and hit payload limits.
* **Recommendation:** OpenSCAD workers should upload compiled STL, 3MF, and PNG files directly to Object Storage (AWS S3, Cloudflare R2, or Google Cloud Storage). Workers should pass **signed download URLs or S3 bucket keys** back in the `POST /complete` payload to Xano.

#### 4. ADOPT: Worker Retry Ladders and Friendly Errors
* **Recommendation:** Implement Keeberia's `RETRY_LADDER` in Sculptura's OpenSCAD workers. For complex CSG geometry, if compilation fails or times out, retry with coarser fragment resolution (`$fn=20` instead of `$fn=100`) or simplified bounding boxes. Map raw OpenSCAD syntax/CLI exceptions into user-actionable guidance via a `friendlyError` function.

#### 5. ADDITION: Automated Stale Job Recovery in Xano
* **Recommendation:** Address Keeberia's v1 limitation by creating a scheduled Xano Background Task (CRON) that queries `design_jobs` every 5 minutes for rows where `status == "running"` and `updated_at < NOW - 10 minutes`. Automatically reset these jobs to `"queued"` (or mark as `"error"` if `attempts >= 3`) to handle worker node crashes cleanly.

---
*Digest drafted for Sculptura Architecture Reference.*
