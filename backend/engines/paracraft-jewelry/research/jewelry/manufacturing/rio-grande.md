# Candidate Research: Rio Grande (rio-grande)

## finding
Rio Grande passes Step 0 verification (`supports_precious_metal_lost_wax_casting: true`). They are a leading US jewelry supply house and custom casting bureau offering 3D-printed castable resin/wax patterns to lost-wax casting in precious metals (Sterling Silver, Fine Silver, 10K/14K/18K/22K Gold in Yellow/White/Rose, Platinum, Palladium, Bronze, and Brass). They accept user-uploaded 3D CAD models in STL, 3DM (Rhino/Matrix), and OBJ formats.

However, Rio Grande does NOT offer a public REST API or developer portal (`has_public_api: false`, `self_serve: false`). Ordering requires creating a customer account on riogrande.com and submitting a custom casting request form for manual design review and custom quotation.

## conditions and caveats
- **No API Automation**: Quoting and order placement cannot be automated via REST API or direct webhook endpoints.
- **Manual Account & Quoting**: Requires manual upload via user account portal; pricing depends on daily precious metal market fixes and part complexity.
- **Turnaround Time**: Initial design review and quote precede production. Reorders typically ship within 2 weeks.
- **Stone Setting**: Offers stone setting, finishing, hallmarking/trademarking, and custom assembly services in-house.

## sources
1. Rio Grande Custom Jewelry Manufacturing Landing Page, https://www.riogrande.com/custom-casting-services
   Retrieved: 2026-09-11. Verified custom lost-wax casting services, precious metal alloy list (gold, silver, platinum, palladium), CAD file acceptance (STL, 3DM, OBJ), turnaround expectations (~2 weeks), and manual request form workflow.
2. Rio Grande Custom Casting CAD File Requirements, https://www.riogrande.com/knowledge-hub/videos/custom-casting-file-requirements
   Retrieved: 2026-09-11. Verified design review workflow, shrinkage allowances, and master model options.

## how this enters the engine
Recorded in `manufacturer-capabilities.json` with `supports_precious_metal_lost_wax_casting: true` and `has_public_api: false`. In the ParaCraft routing engine, Rio Grande is classified as a manual/fallback fulfillment partner or partner for batch ordering rather than an instant automated API route.
