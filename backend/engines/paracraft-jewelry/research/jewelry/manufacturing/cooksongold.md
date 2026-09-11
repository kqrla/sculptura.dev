# Candidate Research: Cooksongold (cooksongold)

## finding
Cooksongold passes Step 0 verification (`supports_precious_metal_lost_wax_casting: true`). Owned by the Heimerle + Meule Group, Cooksongold is the UK's leading precious metals supplier and casting bureau. They offer 3D printing of wax/resin patterns followed by lost-wax casting in a wide array of precious metals: Sterling Silver, Fine Silver, Gold (9K, 14K, 18K, 22K in Yellow, White, Rose), Platinum, and Palladium.

Cooksongold provides an online customer casting portal (`self_serve: true`) where designers upload 3D CAD models, select alloy specifications, and receive automated pricing calculated against daily metal fix prices. However, they do NOT offer a public developer REST API (`has_public_api: false`).

## conditions and caveats
- **No Public API**: Ordering is self-serve via their web portal, but lacks a headless developer REST API.
- **Direct Metal 3D Printing Option**: In addition to traditional lost-wax casting, Cooksongold offers Direct Metal Laser Sintering (DMLS) in Gold and Platinum through their specialized MSP equipment.
- **Currency**: Primary currency is GBP (UK based), serving Europe and international clients.

## sources
1. Cooksongold Precious Metal Casting - How It Works, https://www.cooksongold.com/precious-metal-casting/how-it-works
   Retrieved: 2026-09-11. Verified 3D wax printing and lost-wax precious metal casting services, online CAD file upload portal, precious metal alloys offered, and daily metal fix pricing structure.

## how this enters the engine
Recorded in `manufacturer-capabilities.json` with `supports_precious_metal_lost_wax_casting: true` and `self_serve: true`. Positioned in ParaCraft as a primary European/UK casting partner for self-serve online order submission.
