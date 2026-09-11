# Candidate Research: Design Build Cast London (design-build-cast)

## finding
Design Build Cast London (DBC) passes Step 0 verification (`supports_precious_metal_lost_wax_casting: true`). Based in London's Hatton Garden jewelry district, DBC provides 3D CAD model printing and lost-wax casting in all major precious metals (Sterling Silver, Gold [9k, 14k, 18k, 22k], Platinum, Palladium, Bronze, Brass).

DBC features an automated web-based "Instant Quote" tool (`quote_method: instant_api`, `self_serve: true`) powered by a specialized 3DPrint plugin system. The tool accepts STL (binary/ascii) and OBJ files up to 40MB, automatically repairing mesh geometry, evaluating part volume, and calculating instant price estimates across precious metal choices.

## conditions and caveats
- **No Developer REST API**: Quoting tool runs in-browser via web plugin; no public headless API documented (`has_public_api: false`).
- **File Upload Limits**: Maximum file size of 40MB; files over 40MB require manual direct contact.
- **Currency & Region**: Quoted in GBP; serves UK, European, and international clients.

## sources
1. Design Build Cast Instant Quote Portal, https://designbuildcast.co.uk/instant-quote/
   Retrieved: 2026-09-11. Verified automated 3D file analysis (STL, OBJ, max 40MB), instant precious metal casting quote calculator, supported alloys, and mesh repair features.

## how this enters the engine
Recorded in `manufacturer-capabilities.json` with `supports_precious_metal_lost_wax_casting: true` and `quote_method: instant_api`. Serves as an instant-quoting UK/European precious metal casting partner in Sculptura's routing database.
