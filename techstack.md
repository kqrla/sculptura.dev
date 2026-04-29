const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

# tech stack

the technologies sculptura is built with, and why.

---

## frontend

**react 18**
chosen for its component model and the maturity of its ecosystem. the app is entirely client-rendered, which keeps infrastructure simple and avoids server complexity for a product at this scale.

**vite**
fast development builds and a clean module system. no configuration overhead.

**typescript / jsx**
the codebase uses jsx for its simplicity. type safety is enforced where it matters through naming discipline and predictable data shapes.

**tailwind css**
utility-first css keeps styling co-located with markup. the design system is defined through css variables in `index.css` and mapped through `tailwind.config.js`, so all visual tokens are centralized and consistent.

**framer motion**
used for page transitions and step animations in multi-step forms. kept minimal to avoid performance cost.

**react-router-dom**
standard client-side routing. the route structure is defined once in `App.jsx`.

**tanstack react-query**
handles all data fetching, caching, and mutation state. query keys are intentional and predictable. every mutation invalidates only the keys that need refreshing.

**three.js**
used for the 3d model viewer on artifact detail pages. loaded dynamically to avoid adding to the initial bundle.

**lucide react**
a consistent, minimal icon set. all icons in the product come from this library.

---

## backend

**base44**
a backend-as-a-service platform that provides a hosted database, authentication, file storage, and integrations. chosen for the speed of building without managing infrastructure.

tradeoff: the product is currently coupled to db. `portsb.md` documents the full migration path to supabase if that changes.

---

## fonts

**inter** - ui body text. clean and highly legible at small sizes.

**caveat** - used for the sculptura logotype. handwritten feel.

**tiempos** (self-hosted) - serif display font for headings and key labels. used to give the product a print-quality editorial tone.

---

## security model for market accounts

market accounts use a sha256 key instead of a full authentication system. the key is generated client-side using the web crypto api, shown once to the user, and stored as a hash. verification happens client-side by hashing the provided key and comparing it to the stored hash.

tradeoff: this removes the need for an email/password system but means lost keys cannot be recovered. this is an intentional constraint to keep the account system lightweight.