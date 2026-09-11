// golden case: band-flat — the first permitted primitive (plain ring band)
// pinned: $fn=192 (export tier) · budget 1000ms · paracraft-jewelry harness v1
// house style (cubehero organizing principles): semantic module interface,
// stable params, design record at top — construction details hidden inside.
$fn = 192;

/* [design record] */
ring_size_mm = 20;       // inner diameter
band_width_mm = 7;
band_thickness_mm = 2.5;

// ring_band — flat band, elliptical cross-section. export-tier resolution — the same design record at production $fn.
// interface is semantic: tell it what you want, not how it's built.
module ring_band(size_mm, width_mm, thickness_mm) {
  ring_r = size_mm / 2;
  mid_r = ring_r + thickness_mm / 2;
  translate([0, 0, -width_mm / 2])
    scale([1, 1, width_mm / thickness_mm])
      rotate_extrude(convexity = 10)
        translate([mid_r, 0, 0]) circle(d = thickness_mm);
}

ring_band(ring_size_mm, band_width_mm, band_thickness_mm);
