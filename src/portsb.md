const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

# migrating sculptura to supabase

this guide maps every backend dependency in sculptura to its supabase equivalent.

---

## current backend dependencies

sculptura currently uses base44 as its backend platform. here is what base44 provides and how each maps to supabase.

---

## 1. authentication

**current (base44)**
- token-based auth managed by the platform
- `db.auth.me()` returns the current user
- `db.auth.redirectToLogin()` handles the login flow
- `db.auth.logout()` clears the session

**supabase equivalent**
- use supabase auth with email/password or magic link
- replace `db.auth.me()` with `supabase.auth.getUser()`
- replace login redirect with `supabase.auth.signInWithOtp({ email })` or your chosen provider
- replace logout with `supabase.auth.signOut()`

**migration steps**
1. enable email auth in supabase dashboard under authentication > providers
2. update `lib/AuthContext.jsx` to use supabase auth hooks
3. replace all `db.auth.*` calls with `supabase.auth.*` equivalents
4. handle session persistence via `supabase.auth.onAuthStateChange()`

---

## 2. database

**current (base44)**
- entity-based orm with methods like `.list()`, `.filter()`, `.create()`, `.update()`, `.delete()`
- entities: `Artifact`, `CreatorProfile`, `MarketAccount`

**supabase equivalent**
- supabase postgres with row-level security (rls)
- use `supabase.from('table').select()`, `.insert()`, `.update()`, `.delete()`

**required schema**

```sql
-- artifacts
create table artifacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by text,
  name text not null,
  description text,
  image_url text,
  model_url text,
  materials text[],
  prices jsonb,
  manufacturing_costs jsonb,
  creator_earnings jsonb,
  region text check (region in ('europe', 'north_america', 'asia', 'global')),
  specs text,
  creator_handle text,
  creator_name text,
  is_featured boolean default false,
  status text check (status in ('draft', 'published', 'archived')) default 'published',
  made_to_order boolean default true,
  category text check (category in ('jewelry', 'sculpture', 'functional', 'wearable', 'decorative', 'experimental'))
);

-- creator profiles
create table creator_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  user_email text not null,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  materials text[],
  tools text[],
  commission_open boolean default false,
  hourly_rate numeric,
  turnaround_time text,
  rush_available boolean default false
);

-- market accounts (keyless auth)
create table market_accounts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  handle text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  email text not null,
  access_key_hash text not null,
  status text check (status in ('draft', 'pending_review', 'active', 'rejected')) default 'draft',
  review_notes text,
  materials text[],
  tools text[],
  commission_open boolean default false,
  hourly_rate numeric,
  turnaround_time text,
  rush_available boolean default false,
  total_revenue numeric default 0,
  total_orders integer default 0
);
```

**migration steps**
1. run the schema above in the supabase sql editor
2. replace all `db.entities.Artifact.*` calls with `supabase.from('artifacts').*`
3. replace all `db.entities.CreatorProfile.*` calls with `supabase.from('creator_profiles').*`
4. replace all `db.entities.MarketAccount.*` calls with `supabase.from('market_accounts').*`
5. note: supabase returns `{ data, error }` objects, not raw arrays. adjust response handling accordingly.

---

## 3. file storage

**current (base44)**
- `db.integrations.Core.UploadFile({ file })` returns `{ file_url }`

**supabase equivalent**
- use supabase storage buckets
- create buckets: `artifacts`, `avatars`

```js
const { data, error } = await supabase.storage
  .from('artifacts')
  .upload(`models/${filename}`, file)

const { data: publicUrl } = supabase.storage
  .from('artifacts')
  .getPublicUrl(`models/${filename}`)
```

**migration steps**
1. create storage buckets in supabase dashboard
2. set bucket policies to allow public read
3. replace all `UploadFile` calls with the supabase storage upload pattern above

---

## 4. ai / llm features

**current (base44)**
- `db.integrations.Core.InvokeLLM({ prompt, response_json_schema })`

**supabase equivalent**
- supabase edge functions calling openai or another llm provider directly
- create a function at `supabase/functions/invoke-llm/index.ts`

```ts
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') })

Deno.serve(async (req) => {
  const { prompt } = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  })
  return new Response(JSON.stringify({ result: response.choices[0].message.content }))
})
```

---

## 5. row-level security

enable rls on all tables. example for artifacts:

```sql
alter table artifacts enable row level security;

-- public can read published artifacts
create policy "read published artifacts" on artifacts
  for select using (status = 'published');

-- authenticated users can write their own
create policy "creators manage own artifacts" on artifacts
  for all using (auth.jwt() ->> 'email' = created_by);
```

---

## limitations and differences

- base44 handles session tokens automatically. supabase requires you to manage `supabase.auth.getSession()` on app load.
- base44 entity methods like `.filter({ field: value })` are convenience wrappers. supabase uses `.eq('field', value)` chain syntax.
- the `access_key_hash` system for market accounts has no direct supabase equivalent. you would verify the key in an edge function and return a short-lived jwt.
- base44 real-time subscriptions map to supabase realtime channels: `supabase.channel('table').on('postgres_changes', ...)`.