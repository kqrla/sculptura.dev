# features

a list of everything sculptura currently does.

---

## artifact publishing

creators upload a 3d design file (.glb or .stl) and a render image, set a name, description, category, and specs. they choose a material (silver, brass, gold) and a primary customer region. they set their own earnings per piece, and the platform calculates the final customer price automatically.

artifacts can be in draft, published, or archived states.

---

## 3d model viewer

artifact detail pages render interactive three.js viewers for .glb files. the model auto-rotates, responds to drag-to-rotate input, and falls back to a static image if no model file is present.

---

## explore page

a browsable catalog of published artifacts, filterable by category and material, with a free-text search across artifact names and creator handles.

---

## creator profiles

each creator has a profile page at `/creator/:handle` showing their bio, commission status, hourly rate, turnaround time, materials, and software. their published artifacts are listed below.

---

## shop storefronts

each creator also has a storefront at `/shop/:username`, populated from their `CreatorProfile` record. this is the public-facing store linked from artifact pages.

---

## market accounts

an alternative account system that does not require login. a creator fills in their handle, email, and profile details. a unique key is generated and shown once. they save it. from then on, they use the key to access their account dashboard.

accounts start in draft state. when the creator is ready, they submit for review. the account goes into `pending_review` and is manually reviewed before going live.

---

## account dashboard

a sidebar-based workspace for market account holders with sections for:

- overview: quick stats on artifacts, orders, and earnings
- artifacts: manage published and draft artifacts
- analytics: views and engagement data (coming soon)
- finance: earnings breakdown, pending and available balance
- settings: edit profile details using the access key for authentication

---

## onboarding flow

a multi-step form for new creators covering store identity, materials and software, commission settings, and a review screen before the profile is saved.

---

## pricing engine

all prices are calculated from a base manufacturing cost (defined per material and region in `lib/pricing.js`) plus the creator's chosen earnings. the customer always sees the full final price. there are no hidden fees on the buyer side.