// golden case: band-comfort — rounded inner edge via offset profile
// pinned: $fn=32 (preview tier) · budget 250ms · paracraft-jewelry harness v1
$fn = 32;

/* [design record] */
ring_size_mm = 20;       // inner diameter
band_width_mm = 7;
band_thickness_mm = 2.5;
inner_round_mm = 1.2;    // comfort-fit inner edge rounding

// ring_band_comfort — rounded-rect profile, constant thickness, soft inner edge.
module ring_band_comfort(size_mm, width_mm, thickness_mm, inner_round_mm) {
  ring_r = size_mm / 2;
  module band_profile() {
    translate([ring_r, 0])
      offset(r = inner_round_mm) offset(delta = -inner_round_mm)
        square([thickness_mm, width_mm - 2 * inner_round_mm]);
  }
  translate([0, 0, -width_mm / 2])
    rotate_extrude(convexity = 10)
      translate([0, width_mm / 2 - inner_round_mm]) band_profile();
}

ring_band_comfort(ring_size_mm, band_width_mm, band_thickness_mm, inner_round_mm);
