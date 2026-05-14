import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  SketchUnderline,
  SketchCircle,
  SketchStar,
  SketchSpiral,
  SketchScribble,
  SketchSparkle,
  SketchHeart,
  HandNote,
} from "./SketchDoodles";

// paint-chip style swatches, doubling as a quiet feature list
const materialSwatches = [
  { name: "sterling silver", hex: "#C9CCD1", note: "925" },
  { name: "yellow brass", hex: "#C9A24A", note: "cuc-zn" },
  { name: "rose bronze", hex: "#C97A5C", note: "cu-sn" },
  { name: "14k gold", hex: "#E6C56A", note: "au" },
];

// contact-sheet polaroids of recent artifacts
const polaroids = [
  { label: "ring_03 / silver",   tone: "#C1D8DF", dot: "#7BB2BA", rotate: -6, top: 0   },
  { label: "pendant_01 / brass", tone: "#F0D58F", dot: "#E1CA7A", rotate: 4,  top: 24  },
  { label: "cuff_07 / bronze",   tone: "#F8D0D0", dot: "#E89B85", rotate: -3, top: 8   },
  { label: "signet_02 / gold",   tone: "#C8B3CA", dot: "#A386A9", rotate: 7,  top: 32  },
];

export default function HeroSection() {
  return (
    <section className="relative px-6 pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden">
      {/* soft dotted notebook texture, page-level not card-level */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground) / 0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      {/* page-margin doodles scattered around the hero */}
      <SketchSparkle className="hidden md:block absolute top-8 left-[8%] w-5 h-5" />
      <SketchStar    className="hidden md:block absolute top-24 left-[3%] w-4 h-4 opacity-70" color="var(--buttercup)" />
      <SketchScribble className="hidden md:block absolute top-6 right-[28%] w-24 h-8 opacity-60" color="var(--neptune)" />
      <SketchSpiral  className="hidden md:block absolute bottom-12 left-[14%] w-12 h-12 opacity-50" />
      <SketchHeart   className="hidden md:block absolute bottom-20 right-[6%] w-5 h-5 opacity-70" />
      <SketchStar    className="hidden md:block absolute bottom-6 left-[42%] w-3 h-3 opacity-60" color="var(--rose)" />

      {/* corner registration marks, like a print proof */}
      <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-foreground/15 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-foreground/15 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-foreground/15 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-foreground/15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* top row: eyebrow stamp + tiny meta */}
        <div className="flex items-start justify-between gap-6 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative inline-flex items-center gap-2 px-3.5 py-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            <span className="text-[10px] tracking-[0.22em] uppercase font-mono text-foreground/65">
              issue 01 / cad to metal
            </span>
            <SketchCircle
              className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] opacity-80 pointer-events-none"
              color="var(--terracotta)"
            />
          </motion.div>

          <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
            <span>est. studio sculptura</span>
            <span>made-to-order, made-to-last</span>
          </div>
        </div>

        {/* main editorial headline, asymmetric and mixed-style */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif font-light leading-[0.92] tracking-tight text-foreground"
          >
            <span className="block text-5xl md:text-7xl lg:text-[112px] -ml-1">
              <span className="italic text-foreground/40">from </span>
              <span className="relative inline-block">
                cad
                <SketchUnderline
                  className="absolute left-0 -bottom-1 w-full h-3 opacity-80"
                  color="var(--horizon)"
                />
              </span>
            </span>

            <span className="block text-5xl md:text-7xl lg:text-[112px] mt-1 md:mt-3">
              <span className="font-hand text-foreground/70 mr-3 md:mr-5" style={{ fontSize: "0.7em" }}>
                straight to
              </span>
              <span className="relative inline-block">
                <span className="italic">metal,</span>
              </span>
            </span>

            <span className="block text-5xl md:text-7xl lg:text-[112px] mt-1 md:mt-3 text-foreground/30">
              <span className="italic">in your hands.</span>
            </span>
          </motion.h1>

          {/* hand annotation pinned to the headline */}
          <HandNote
            text="not a render. a real object."
            arrow="down-left"
            rotate={-6}
            color="var(--terracotta)"
            className="hidden lg:flex flex-col items-start absolute -right-2 top-2"
          />
        </div>

        {/* lower row: lede + materials + ctas + polaroids */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* left column: lede + ctas */}
          <div className="lg:col-span-6 relative">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base md:text-lg text-foreground/65 font-light tracking-wide leading-relaxed max-w-[460px]"
            >
              publish your designs. pick the metal. we cast, finish, and ship the object to the buyer.{" "}
              <span className="relative text-foreground">
                you keep the craft, we handle the foundry.
                <SketchUnderline
                  className="absolute left-0 -bottom-1 w-full h-2 opacity-80"
                  color="var(--olive)"
                />
              </span>
            </motion.p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="relative">
                <Link to="/store/create">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-foreground text-background text-sm tracking-wider lowercase"
                  >
                    open a store
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>
                </Link>
                <SketchStar className="absolute -top-3 -right-3 w-5 h-5" color="var(--buttercup)" />
                <HandNote
                  text="start here"
                  arrow="up-right"
                  rotate={-8}
                  color="var(--spanish-green)"
                  className="hidden md:flex flex-col items-start absolute -bottom-16 left-2"
                />
              </div>

              <Link
                to="/explore"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full border border-foreground/20 text-sm tracking-wider lowercase text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                explore artifacts
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* tiny meta strip below ctas */}
            <div className="mt-14 pt-6 border-t border-dashed border-foreground/15 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/45">
              <span>no inventory</span>
              <span>no factory</span>
              <span>worldwide shipping</span>
              <span>you set the earnings</span>
            </div>
          </div>

          {/* right column: materials swatches + polaroid contact sheet */}
          <div className="lg:col-span-6 relative">

            {/* materials paint-chip card */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="relative inline-block"
            >
              <div className="flex items-end gap-0">
                {materialSwatches.map((m, i) => (
                  <div key={m.name} className="flex flex-col" style={{ marginTop: i % 2 === 0 ? 0 : 8 }}>
                    <div
                      className="w-[70px] md:w-[84px] h-[88px] md:h-[104px] border border-foreground/10"
                      style={{ background: m.hex }}
                    />
                    <div className="px-2 py-2 border-x border-b border-foreground/10 bg-background/60 backdrop-blur-sm">
                      <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-foreground/40">{m.note}</div>
                      <div className="text-[10px] tracking-wide text-foreground/70 lowercase mt-0.5 leading-tight">{m.name}</div>
                    </div>
                  </div>
                ))}
              </div>
              <HandNote
                text="you pick the metal"
                arrow="up-left"
                rotate={5}
                color="var(--horizon)"
                className="hidden md:flex flex-col items-start absolute -bottom-14 -right-4"
              />
            </motion.div>

            {/* polaroid contact sheet of recent artifacts */}
            <div className="mt-20 md:mt-24 relative flex flex-wrap gap-4 md:gap-5">
              {polaroids.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 16, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: p.rotate }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                  className="bg-card border border-foreground/10 shadow-paper p-2 pb-4"
                  style={{ marginTop: p.top }}
                >
                  <div
                    className="w-[100px] md:w-[120px] h-[100px] md:h-[120px] flex items-center justify-center"
                    style={{ background: p.tone + "80" }}
                  >
                    <div
                      className="w-9 h-9 rounded-full"
                      style={{ background: p.dot, opacity: 0.7 }}
                    />
                  </div>
                  <div className="mt-2 px-1 font-hand text-sm text-foreground/70 leading-none">
                    {p.label}
                  </div>
                </motion.div>
              ))}

              <SketchSparkle className="absolute -top-4 left-1/3 w-5 h-5" color="var(--rose)" />
            </div>
          </div>
        </div>

        {/* marquee-style ticker of categories at the bottom */}
        <div className="mt-16 md:mt-20 pt-6 border-t border-foreground/10 overflow-hidden">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-serif italic text-foreground/35 text-xl md:text-3xl tracking-tight">
            <span>rings</span>
            <span className="text-foreground/15">·</span>
            <span>pendants</span>
            <span className="text-foreground/15">·</span>
            <span className="text-terracotta/70">cuffs</span>
            <span className="text-foreground/15">·</span>
            <span>signets</span>
            <span className="text-foreground/15">·</span>
            <span>chains</span>
            <span className="text-foreground/15">·</span>
            <span className="text-horizon/70">earrings</span>
            <span className="text-foreground/15">·</span>
            <span>brooches</span>
            <span className="text-foreground/15">·</span>
            <span>sculpture</span>
          </div>
        </div>

      </div>
    </section>
  );
}
