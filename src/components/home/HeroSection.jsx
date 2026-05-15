// hero section.
//
// design intent:
//   - no big background card or gradient slab anymore. the section sits flush
//     on the page with only a faint grid overlay for an analog drafting feel.
//   - left column carries the pill, serif headline, sublabel, and the two
//     primary CTAs. inspired by the reference image but kept lowercase per the
//     project writing rules.
//   - right column has three polaroid-style cards. each polaroid renders a
//     procedurally generated pixel gradient swirl on a tiny canvas, then
//     scales it up with crisp pixel edges. cards are draggable via
//     framer-motion so the user can shuffle them around.

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

// deterministic pseudo-random so each card is stable across renders but every
// card differs from its neighbours.
function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// draws a low-res swirl gradient onto a 36x36 canvas. scaled up by CSS
// with image-rendering: pixelated so every pixel reads as a chunky tile.
function PixelSwirl({ seed, palette }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = 36;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const rand = mulberry32(seed);

    // pick a swirl center and rotation strength per card
    const cx = size / 2 + (rand() - 0.5) * 6;
    const cy = size / 2 + (rand() - 0.5) * 6;
    const swirlStrength = 2 + rand() * 3;
    const noiseAmount = 0.18;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) + (dist / size) * swirlStrength;
        // map angle + dist into a 0..1 ramp so colours sweep around the swirl
        let t = (Math.sin(angle * 2) * 0.5 + 0.5) * 0.6 + (1 - dist / (size * 0.7)) * 0.4;
        t += (rand() - 0.5) * noiseAmount;
        t = Math.max(0, Math.min(1, t));

        // pick colour stops from the palette
        const stops = palette;
        const scaled = t * (stops.length - 1);
        const idx = Math.floor(scaled);
        const frac = scaled - idx;
        const a = stops[idx];
        const b = stops[Math.min(stops.length - 1, idx + 1)];
        const r = Math.round(a[0] + (b[0] - a[0]) * frac);
        const g = Math.round(a[1] + (b[1] - a[1]) * frac);
        const bl = Math.round(a[2] + (b[2] - a[2]) * frac);
        ctx.fillStyle = `rgb(${r},${g},${bl})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [seed, palette]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}

const polaroids = [
  {
    label: "ring_03",
    seed: 91823,
    palette: [
      [232, 226, 214],
      [193, 216, 223],
      [123, 178, 186],
      [60, 98, 112],
    ],
    rotate: -7,
    offset: { x: -20, y: 0 },
  },
  {
    label: "pendant_01",
    seed: 47210,
    palette: [
      [248, 230, 232],
      [228, 188, 196],
      [200, 130, 158],
      [88, 50, 78],
    ],
    rotate: 4,
    offset: { x: 30, y: 40 },
  },
  {
    label: "cuff_07",
    seed: 30571,
    palette: [
      [251, 233, 215],
      [240, 188, 138],
      [200, 110, 70],
      [80, 38, 30],
    ],
    rotate: -2,
    offset: { x: 80, y: 10 },
  },
];

function Polaroid({ data, dragArea, baseZ, onPickUp }) {
  const [z, setZ] = useState(baseZ);

  return (
    <motion.div
      drag
      dragConstraints={dragArea}
      dragElastic={0.18}
      dragMomentum={false}
      onDragStart={() => {
        const next = onPickUp();
        setZ(next);
      }}
      whileDrag={{ scale: 1.04, rotate: data.rotate * 0.3 }}
      initial={{ opacity: 0, y: 20, rotate: data.rotate }}
      animate={{ opacity: 1, y: 0, rotate: data.rotate }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{
        left: `calc(50% + ${data.offset.x}px)`,
        top: `calc(50% + ${data.offset.y}px)`,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: z,
        // realistic stacked paper shadow: tight ambient + soft cast
        filter:
          "drop-shadow(0 1px 1px rgba(40,30,20,0.18)) drop-shadow(0 14px 22px rgba(40,30,20,0.18))",
      }}
    >
      <div className="bg-[#fdfaf3] dark:bg-[#f1ece0] p-3 pb-10 rounded-[3px] w-[180px]">
        <div className="w-[156px] h-[156px] overflow-hidden bg-foreground/5">
          <PixelSwirl seed={data.seed} palette={data.palette} />
        </div>
        <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#3a2f25]/60 lowercase">
            {data.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const dragAreaRef = useRef(null);
  const topZRef = useRef(polaroids.length);

  // bring the picked-up polaroid to the front of the stack
  const bringToFront = () => {
    topZRef.current += 1;
    return topZRef.current;
  };

  return (
    <section
      className="relative px-6 pt-10 pb-16 md:pt-14 md:pb-20 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center min-h-[520px]">
        {/* left: pill, headline, sub, ctas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-foreground/15 bg-background/60 backdrop-blur-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
            <span className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase font-mono">
              cad to metal, a new way to create
            </span>
          </div>

          <h1 className="font-serif font-light leading-[0.95] tracking-tight text-foreground mb-6">
            <span className="block text-6xl md:text-7xl lg:text-[88px]">from cad</span>
            <span className="block text-6xl md:text-7xl lg:text-[88px] text-foreground/35 italic">
              to metal
            </span>
          </h1>

          <p className="text-sm md:text-[15px] text-foreground/55 font-light tracking-wide leading-relaxed mb-9 max-w-[380px]">
            publish your designs. choose materials. let your artifacts become real
            objects, <span className="text-foreground/80">crafted, shipped, loved.</span>
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/store/create">
              <Button className="rounded-full px-6 py-5 text-sm tracking-wide gap-2 bg-foreground text-background hover:bg-foreground/90">
                open a store
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button
                variant="outline"
                className="rounded-full px-6 py-5 text-sm tracking-wide border-foreground/20 bg-background/40 text-foreground/70 hover:text-foreground hover:bg-background/60 backdrop-blur-sm"
              >
                explore artifacts
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* right: draggable polaroid stack */}
        <div
          ref={dragAreaRef}
          className="relative h-[460px] hidden md:block"
        >
          {polaroids.map((p, i) => (
            <Polaroid
              key={p.label}
              data={p}
              dragArea={dragAreaRef}
              baseZ={i + 1}
              onPickUp={bringToFront}
            />
          ))}
          <p className="absolute bottom-2 right-2 font-mono text-[10px] tracking-[0.16em] text-foreground/35 lowercase">
            drag to rearrange
          </p>
        </div>
      </div>
    </section>
  );
}
