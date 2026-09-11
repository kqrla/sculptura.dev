# stuller

## finding

stuller does real precious-metal lost-wax casting — "we use our high quality gold and platinum casting grain to cast your waxes" — but the service takes **physical wax or resin models shipped to them**, via a submission form. the services page describes the flow as "simply fill out a submission form and ship your model to us for production." no retrieved page mentions accepting uploaded 3d/cad/stl files for casting. the service set is aimed at "jewelry business professionals" and an account application is required. no public api is mentioned anywhere.

step 0 verdict: **precious-metal lost-wax casting confirmed (gold, platinum, plus most qualities on their grain page); digital file intake not found.** for a pipeline that exports mesh files, stuller as-documented is a physical-model-only bureau — a negative finding for the digital flow, recorded rather than dropped.

## conditions and caveats

- "most metal qualities listed on the grain page" is their own wording; the grain page itself wasn't retrieved, so the full alloy list needs one more pass before this entry can go beyond drafted/cited for materials
- casting output options: "clip & ship (raw castings)" or "machine tumbled (semi-finish)"
- b2b orientation: stuller accounts are for jewelry business professionals; consumer-creator orders would ride on sculptura's own business account, which is a routing consideration, not a blocker
- whether stuller's separate cad/design arm (gemvision) accepts digital files for print+cast is unverified and worth one follow-up pass

## sources

1. stuller services page (https://www.stuller.com/services, retrieved 2026-09-11 via browserbase) — "need to have a wax or resin model cast? simply fill out a submission form and ship your model to us for production"; service aimed at jewelry business professionals; account application required; no api or digital-file mention
2. stuller custom wax casting page (https://www.stuller.com/custom-wax-casting, retrieved 2026-09-11 via tavily extraction) — "we use our high quality gold and platinum casting grain to cast your waxes. stuller can cast your custom wax in most metal qualities listed on the grain page"; clip & ship or machine tumbled outputs; consultation, wax evaluation, and estimates precede casting

## how this enters the engine

stuller enters `manufacturer-capabilities.json` with `supports_precious_metal_lost_wax_casting: true` but `self_serve: false`, `has_public_api: false`, and physical-model intake only — usable only as a manual/b2b fallback route, never a pipeline adapter. the adapter pattern means if stuller ever opens digital intake, it's one new adapter file; nothing else changes.
