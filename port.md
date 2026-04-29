# running sculptura locally

this guide covers how to run sculptura on your local machine.

## prerequisites

- node.js 18 or higher
- npm or pnpm
- a base44 project (for the hosted backend) or a supabase project (see portsb.md)

## installation

```bash
git clone <your-repo-url>
cd sculptura
npm install
```

## environment setup

create a `.env` file in the root of the project:

```
VITE_APP_ID=your_base44_app_id
VITE_APP_TOKEN=your_base44_token
```

these values come from the base44 dashboard under project settings.

if you are migrating to supabase, see portsb.md for alternative environment variables.

## starting the development server

```bash
npm run dev
```

the app will be available at `http://localhost:5173`

## building for production

```bash
npm run build
```

the output goes to `dist/`. this is a standard vite build and can be deployed to any static hosting provider (vercel, netlify, cloudflare pages, etc.).

## deploying

the built `dist/` folder can be served by any cdn or static host.

for vercel:

```bash
npx vercel deploy --prod
```

for netlify:

```bash
npx netlify deploy --prod --dir=dist
```

note: the backend (auth, database, storage) is hosted separately. deploying the frontend does not deploy the backend. see portsb.md for how to host the backend on supabase.