# Shapeways Manufacturer Capabilities & Verification

## finding
Shapeways passes the Step-0 Gate (`supports_precious_metal_lost_wax_casting: true`). Despite undergoing major corporate restructuring following a Chapter 7 bankruptcy filing in July 2024, the company was acquired and relaunched by original founders and European management under Manuevo BV / WVS International Inc (completed late 2024). Operations continue from its primary production facility in Eindhoven, Netherlands.
- **Process Fit:** Shapeways provides lost-wax casting in precious metals including Sterling Silver (Silver 930 / Sterling Silver 925), Gold (14k, 18k), Platinum 950 (95% Platinum / 5% Ruthenium), Tin Bronze, and Brass Copper Alloy. The process prints high-resolution wax patterns, casts in investment plaster, and pours the selected alloy.
- **Dimensional Specs:**
  - Minimum wall thickness (Silver): 0.6 mm for natural finish, 0.8 mm for polished/antique finish (1.0 mm for unsupported wires).
  - Minimum bounding box: 2.4 x 2.4 x 0.6 mm.
  - Maximum bounding box: 89 x 89 x 100 mm.
  - Typical turnaround: ~15 business days.
- **API Status:** The Shapeways Developer Portal (`developers.shapeways.com`) remains active, exposing a self-serve OAuth2 REST API (`api.shapeways.com/v1`). Endpoints cover file upload (`POST /models/v1`), materials catalog (`GET /materials/v1`), model quoting (`GET /models/{modelId}/v1`), and order placement (`POST /orders/v1`).

## conditions and caveats
1. **Restructuring & Continuity Risk:** Shapeways filed Chapter 7 bankruptcy in July 2024 and ceased US factory operations. The European subsidiary (Shapeways BV) was preserved, acquired by Manuevo BV, and subsequently re-acquired WVS International Inc along with the Shapeways trademark and domain in Dec 2024. Production is centralized in Eindhoven. While API endpoints are intact, API account re-authentication and partner re-establishment may be required post-relaunch.
2. **Consumer Marketplace Discontinued:** The consumer seller marketplace and storefronts were eliminated during restructuring; Shapeways operates purely as a B2B digital manufacturing bureau and API partner.
3. **No Stone Setting / BYO Stones:** Shapeways does not offer stone setting or accept customer stones (`stone_setting_service: false`, `byo_stone_supported: false`).

## sources
1. **Shapeways Silver 930 Material Page**
   - URL: https://www.shapeways.com/materials/silver-930
   - Date Retrieved: 2026-09-11
   - What Was Taken: Sterling Silver 930 material specifications, lost-wax casting technology, min wall thickness (0.6 mm natural, 0.8 mm polished), min bounding box (2.4 x 2.4 x 0.6 mm), max bounding box (89 x 89 x 100 mm).
2. **Shapeways Lost Wax Casting Overview**
   - URL: https://www.shapeways.com/3d-print-material-technology/lost-wax-casting
   - Date Retrieved: 2026-09-11
   - What Was Taken: Confirmation of precious metals offered via lost-wax casting: Silver, Gold, Platinum 950, Tin Bronze, and Brass Copper Alloy.
3. **Shapeways Developers Portal Quick Start**
   - URL: https://developers.shapeways.com/quick-start
   - Date Retrieved: 2026-09-11
   - What Was Taken: OAuth2 API authentication flow, REST endpoints (`/models/v1`, `/materials/v1`, `/orders/v1`), payload schemas, and self-serve integration model.
4. **Shapeways FAQ & Post-Bankruptcy Restructuring**
   - URL: https://support.shapeways.com/hc/en-nl/articles/17209325443484-Shapeways-FAQ
   - Date Retrieved: 2026-09-11
   - What Was Taken: Timeline of July 2024 Chapter 7 bankruptcy, buyout of Dutch subsidiary assets by Manuevo BV, and late 2024 acquisition of brand and US IP by WVS International Inc under original founding team leadership.

## how this enters the engine
- Maps to `reference/manufacturer-capabilities.json` under `id: "shapeways"`.
- `status: "operational_recently_restructured"`.
- `review_status: "cited"`.
- Available in the engine routing config for instant programmatic quoting via OAuth2 REST API (`api.shapeways.com`).
