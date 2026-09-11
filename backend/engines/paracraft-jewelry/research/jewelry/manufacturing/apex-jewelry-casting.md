# Candidate Research: Apex Jewelry Casting (apex-jewelry-casting)

## finding
Apex Jewelry Casting passes Step 0 verification (`supports_precious_metal_lost_wax_casting: true`). They are a dedicated US precious-metals jewelry casting bureau that offers end-to-end 3D resin printing, wax burnout, and lost-wax casting in 10K-21K Gold (Yellow, White, Rose), Sterling Silver, Platinum, Palladium, and Copper.

Apex features a web-based instant drag-and-drop CAD quoter on their website (`quote_method: instant_api`, `self_serve: true`). Users can drag STL or OBJ files into the browser tool, which automatically calculates part volume and alloy density to yield real-time pricing without requiring an upfront sales conversation or account creation. They also offer rapid next-day casting turnaround for orders submitted before 10:30 AM.

## conditions and caveats
- **Self-Serve Web Quoter, No Public REST API**: While the web interface provides instant programmatic pricing via browser file parsing, there is no public developer REST API or API key documentation published (`has_public_api: false`).
- **Turnaround**: Exceptional speed — next-day casting available for orders placed by 10:30 AM.
- **File Acceptance**: Accepts STL, OBJ, Rhino, and Matrix 3D files.
- **Data Security**: Files encrypted and automatically deleted after casting.

## sources
1. Apex Jewelry Casting Homepage & Instant Quoter, https://apexjewelrycasting.com
   Retrieved: 2026-09-11. Verified 3D print to lost wax casting process, precious metals available (10k-21k gold, silver, platinum, palladium), drag-and-drop real-time pricing tool, next-day turnaround, and supported file formats (STL, OBJ, 3DM).

## how this enters the engine
Recorded in `manufacturer-capabilities.json` with `supports_precious_metal_lost_wax_casting: true`, `self_serve: true`, and `quote_method: instant_api`. Serves as a high-speed US fulfillment option for automated web-assisted or browser-automation ordering.
