# Candidate Research: Xometry (xometry)

## finding
Xometry fails Step 0 verification (`supports_precious_metal_lost_wax_casting: false`). While Xometry is a major global manufacturing marketplace featuring a well-documented public REST API (`has_public_api: true`, `self_serve: true`), they do NOT provide custom lost-wax casting in solid precious metals (Gold, Silver, Platinum) for jewelry patterns.

Xometry's metal offerings are focused on industrial manufacturing: Direct Metal Laser Sintering (DMLS) and Binder Jetting in Stainless Steel, Titanium, Aluminum, Inconel, Copper, Tool Steel, and Cobalt-Chrome, alongside industrial investment casting for base metals (aluminum, steel, iron, bronze). Precious metals on Xometry appear solely as thin electroplating finishes (gold or silver plating over base metal substrates).

## conditions and caveats
- **Step 0 Failure**: Cannot be used for Sculptura's primary process (castable resin print -> precious metal lost wax casting).
- **Public API Features**: Xometry possesses a fully automated REST API for CAD processing, instant quoting, and order placement (`https://developer.xometry.com`).
- **Surface Plating Only**: Offers gold/silver electroplating (conforming to MIL-G-45204 / AMS QQ-S-365D), but not solid precious metal castings.

## sources
1. Xometry Custom 3D Printing Service Capabilities & Materials, https://www.xometry.com/capabilities/3d-printing-service/
   Retrieved: 2026-09-11. Verified 3D printing technologies (DMLS, SLA, SLS, Binder Jetting) and materials (stainless steel, titanium, copper, plastics); confirmed absence of solid gold, silver, or platinum casting.
2. Xometry Electroplating Services, https://www.xometry.com/capabilities/electroplating-services
   Retrieved: 2026-09-11. Verified gold and silver options are limited to thin electroplated coatings over base metal parts.
3. Xometry Developer Portal / API Documentation, https://www.xometry.com/api-docs/
   Retrieved: 2026-09-11. Verified live public REST API capabilities for instant quoting and order integration.

## how this enters the engine
Recorded in `manufacturer-capabilities.json` with `supports_precious_metal_lost_wax_casting: false` and `has_public_api: true`. Disqualified from Sculptura precious-metal casting routing, preventing redundant re-evaluation.
