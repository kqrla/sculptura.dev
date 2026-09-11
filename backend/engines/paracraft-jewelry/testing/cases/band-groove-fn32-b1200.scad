// golden case: band-groove — boolean CSG: engraved channel on a band
// pinned: $fn=32 (preview tier) · budget 1200ms (difference() CSG is the cost driver) · harness v1
$fn = 32;

/* [design record] */
ring_size_mm = 20;       // inner diameter
band_width_mm = 7;
band_thickness_mm = 2.5;
engrave_depth = 0.8;     // mm — castable engraving depth (validator-enforced bound pending casting-tolerances.json)
groove_width = 1.6;

// ring_band_groove — band with an engraved channel. difference() CSG:
// the cost profile of all engraving-class features (~1s vs ~50ms solid).
module ring_band_groove(size_mm, width_mm, thickness_mm, depth_mm, groove_mm) {
  ring_r = size_mm / 2;
  mid_r = ring_r + thickness_mm / 2;
  difference() {
    translate([0, 0, -width_mm / 2])
      scale([1, 1, width_mm / thickness_mm])
        rotate_extrude(convexity = 10)
          translate([mid_r, 0, 0]) circle(d = thickness_mm);
    rotate_extrude(convexity = 4)
      translate([ring_r + thickness_mm - depth_mm, 0, 0])
        square([depth_mm + 0.4, groove_mm], center = true);
  }
}

ring_band_groove(ring_size_mm, band_width_mm, band_thickness_mm, engrave_depth, groove_width);
