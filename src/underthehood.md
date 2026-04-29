const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

# under the hood

how sculptura is structured internally, and why.

---

## architecture overview

sculptura is a single-page react application backed by base44's platform-as-a-service. the frontend is built with vite and deployed as a static bundle. all backend logic (database, auth, file storage) runs on base44's hosted infrastructure.

the codebase is organized by feature domain, not by file type. components that belong to a specific part of the product live together, not in a global flat folder.

```
pages/          top-level route components
components/
  artifacts/    cards, grids, tags for artifacts
  creator/      creator profile sidebar
  dashboard/    workspace-specific components
  home/         landing page sections
  layout/       app shell (header, layout wrapper)
  market/       market account dashboard components
  viewer/       three.js 3d model viewer
lib/            shared utilities, auth context, pricing logic
entities/       json schemas that define database shape
```

---

## data flow

1. the user loads the app. `AuthContext` checks whether a token exists and whether the user is registered.
2. on authenticated routes, components query entity data using react-query and the base44 sdk.
3. mutations (create, update, delete) go through react-query's `useMutation`, which invalidates relevant query keys on success.
4. file uploads are sent directly to base44's storage via `Core.UploadFile`, which returns a public url stored as a string on the entity.

---

## key abstractions

**entities** are json schemas that define the shape of persisted data. they are defined in `entities/*.json` and accessed via `db.entities.EntityName.*`.

**pricing logic** is centralized in `lib/pricing.js`. manufacturing costs, regional multipliers, and final price calculations all live there. components consume this — they do not recalculate prices themselves.

**market account auth** uses a sha256 key instead of a login system. when a market account is created, a random key is generated, shown once, and its hash is stored. to edit their account, the owner provides the key. the frontend hashes it client-side and compares it against the stored hash.

**review flow** is a manual process. when a creator hits "publish account", their account status moves from `draft` to `pending_review`. an admin reviews it and moves it to `active` or `rejected`. this prevents spam and ensures quality.

---

## why things are organized this way

the dashboard uses a fixed left sidebar layout because market account creators need persistent navigation context. they move between artifacts, analytics, and finance frequently.

the sha256 key system avoids requiring a full auth system for market accounts, which lowers friction for creators who just want to ship. the tradeoff is that if they lose their key, they lose access.

pricing is not user-configurable per region by default. regional costs are defined in `lib/pricing.js` because the manufacturing partner sets those rates. creators only control their own earnings markup.