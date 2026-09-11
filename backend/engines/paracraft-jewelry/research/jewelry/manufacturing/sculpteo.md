# Sculpteo Manufacturer Capabilities & Verification

## finding
Sculpteo is a primary manufacturing candidate for Sculptura's parametric jewelry venture, passing the Step-0 Gate (`supports_precious_metal_lost_wax_casting: true`).
- **Process Fit:** Sculpteo offers lost-wax casting for precious metals (specifically Sterling Silver 925, Brass, and Bronze). The workflow prints a 3D pattern in castable resin/wax (25 µm layer thickness), creates a plaster investment mold around it, melts out the wax, and casts the molten metal. Finishing options include raw and mirror polish, plus plating (white rhodium, gold, pink gold, black rhodium) on brass.
- **Dimensional Specs:**
  - Minimum wall thickness: 0.8 mm (1.0 mm for stemmed elements).
  - Minimum part size: 2.4 x 2.4 x 0.8 mm.
  - Maximum part size: 125 x 125 x 100 mm.
  - Typical turnaround: 15 to 21 business days for Sterling Silver casting.
- **API Status:** Sculpteo operates a REST API v2 (`https://www.sculpteo.com/en/api/v2/`) providing programmatic file upload, instant quoting, configuration, and order placement.
- **Corporate Continuity:** Sculpteo was acquired by BASF 3D Printing Solutions (Forward AM) in 2019 and merged into 3D Prod Group in May 2026. Operates under ISO 9001 certification with manufacturing facilities in Europe.

## conditions and caveats
1. **API Onboarding & Order Gating:** While file upload and quote APIs are available, automated order placement requires manual setup. Specifically, the invoice payment method on the order endpoint must be explicitly enabled by Sculpteo account managers for your API credentials.
2. **Stone Setting & BYO Stones:** Sculpteo does NOT offer stone setting services (`stone_setting_service: false`) or accept customer-supplied stones (`byo_stone_supported: false`). Jewelry designs needing stone settings require post-casting setting by a bench jeweler.
3. **Shrinkage Allowance:** Silver casting experiences up to 2% average shrinkage for raw parts and up to 3% average shrinkage for polished parts. Parametric CAD generators in the engine must apply appropriate scale compensations prior to STL/STEP export.

## sources
1. **Sculpteo Sterling Silver Material Guide**
   - URL: https://www.sculpteo.com/en/materials/metal-casting-material/silver-material/
   - Date Retrieved: 2026-09-11
   - What Was Taken: Sterling Silver composition (92.5% silver, 7.5% metal alloy), lost-wax casting process using 3D printed wax models, min wall thickness (0.8 mm), min size (2.4x2.4x0.8 mm), max size (125x125x100 mm), layer resolution (25 µm), 15-21 business days turnaround, 50 MB max file size limit.
2. **Sculpteo API Services Documentation**
   - URL: https://www.sculpteo.com/en/services/api-services/
   - Date Retrieved: 2026-09-11
   - What Was Taken: Overview of API v2 endpoints (upload, configuration, quoting, order, tracking), API authentication model (API keys), and manual onboarding requirements.
3. **Sculpteo Brass Material Guide**
   - URL: https://www.sculpteo.com/en/materials/metal-casting-material/brass-material/
   - Date Retrieved: 2026-09-11
   - What Was Taken: Brass lost-wax casting details and finishing options (mirror polish, white rhodium, gold, pink gold, black rhodium plating).

## how this enters the engine
- Maps to `reference/manufacturer-capabilities.json` under `id: "sculpteo"`.
- `review_status: "cited"` based on full source verification.
- Can be utilized in engine routing for automated instant quotes via API v2 (`/en/api/v2/`), with order submission gated on manual account setup for invoice billing.
