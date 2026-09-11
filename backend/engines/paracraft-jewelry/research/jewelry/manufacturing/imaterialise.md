# imaterialise

## finding

i.materialise (2026 state) is a general additive-manufacturing platform (Materialise OnSite) that lists lost-wax casting among its technologies — but the platform's own materials page names **wax** for that process and nowhere names gold, silver, or platinum. the jewelry page offers a general "jewelry" entry point but routes anything involving metal 3d printing or specialist requirements to their sales and engineering team ("request a quote"), not to the online platform. their historic public api (i.materialise.com/api) returns 404 — it is gone.

step 0 verdict: **no evidence of self-serve precious-metal lost-wax casting.** they are exactly the case the brief warns about: a general am bureau with a jewelry landing page.

## conditions and caveats

- OnSite does have an instant web quote and model upload for its platform materials — but those materials are the industrial/design set, not precious alloys
- it remains conceivable that precious-metal casting exists behind the manual sales/engineering channel; no retrieved page states it. if that matters, it needs a sales conversation and a dated note, not an assumption
- historical state (they once offered gold/silver jewelry printing and a public api) does not count as current capability

## sources

1. i.materialise jewelry page (https://i.materialise.com/en/jewelry, retrieved 2026-09-11 via browserbase) — lost-wax casting listed as a technology; metal 3d printing "industrial-grade" via engineering team; jewelry requests routed to sales; model upload + instant quote exist on OnSite
2. i.materialise OnSite materials page (https://i.materialise.com/en/onsite/materials, retrieved 2026-09-11 via browserbase) — 45+ materials; wax listed for lost-wax casting; gold/silver/platinum do not appear
3. i.materialise api page (https://i.materialise.com/api/, retrieved 2026-09-11 via browserbase) — 404 not found; public api no longer exists at that location

## how this enters the engine

documented negative. `supports_precious_metal_lost_wax_casting: false` with sources, so nobody re-researches it in six months. if sculptura ever wants the manual channel investigated, the follow-up is a dated note from a materialise sales conversation, per the source rules.
