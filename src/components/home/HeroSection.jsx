import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  SketchUnderline,
  SketchCircle,
  SketchArrow,
  SketchStar,
  SketchSpiral,
  SketchScribble,
  SketchSparkle,
  SketchHeart,
  HandNote,
} from "./SketchDoodles";

const previewCards = [
  { label: "ring_03",    dotColor: "#7BB2BA", bg: "rgba(193,216,223,0.35)", border: "rgba(193,216,223,0.6)", offsetY: 24  },
  { label: "pendant_01", dotColor: "#C8B3CA", bg: "rgba(200,179,202,0.22)", border: "rgba(200,179,202,0.45)", offsetY: 0  },
  { label: "cuff_07",    dotColor: "#E89B85", bg: "rgba(232,155,133,0.18)", border: "rgba(232,155,133,0.4)",  offsetY: 12 },
];

export default function HeroSection() {
  return (
    <section className="relative px-6 pt-8 pb-10 md:pt-10 md:pb-14">
      {/* loose page-margin doodles, behind the hero card */}
      <SketchSparkle className="hidden md:block absolute top-6 left-10 w-5 h-5" />
      <SketchStar className="hidden md:block absolute top-24 left-4 w-4 h-4 opacity-70" color="var(--buttercup)" />
      <SketchScribble className="hidden md:block absolute top-2 right-24 w-20 h-8 opacity-60" />
      <SketchSpiral className="hidden md:block absolute bottom-2 left-20 w-10 h-10 opacity-60" />
      <SketchHeart className="hidden md:block absolute bottom-6 right-10 w-5 h-5 opacity-70" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[28px] border border-border/50 overflow-hidden bg-[radial-gradient(ellipse_90%_100%_at_75%_-10%,hsl(195_45%_88%)_0%,hsl(210_30%_93%)_30%,hsl(38_20%_97%)_65%,hsl(38_28%_96%)_100%)] dark:bg-[radial-gradient(ellipse_90%_100%_at_75%_-10%,hsl(195_30%_22%)_0%,hsl(210_22%_16%)_35%,hsl(224_16%_12%)_70%,hsl(224_16%_10%)_100%)]"
          style={{ minHeight: 460 }}
        >
          {/* corner marks */}
          <div className="absolute top-5 left-5 w-5 h-5 border-l border-t border-foreground/12 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-5 right-5 w-5 h-5 border-r border-t border-foreground/12 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-5 h-5 border-l border-b border-foreground/12 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-5 h-5 border-r border-b border-foreground/12 rounded-br-sm pointer-events-none" />

          {/* faint ruled-paper lines for the notebook feel */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, hsl(var(--foreground)) 31px, hsl(var(--foreground)) 32px)",
            }}
            aria-hidden="true"
          />

          {/* scattered doodles inside the hero card */}
          <SketchStar
            className="hidden md:block absolute top-8 right-1/2 w-5 h-5 opacity-70 animate-pulse"
            color="var(--buttercup)"
            style={{ animationDuration: "4s" }}
          />
          <SketchSparkle className="hidden md:block absolute top-16 left-1/2 w-4 h-4" color="var(--rose)" />
          <SketchSpiral className="hidden lg:block absolute bottom-10 left-[42%] w-9 h-9 opacity-50" />
          <SketchScribble className="hidden md:block absolute bottom-16 right-[38%] w-16 h-6 opacity-50" color="var(--spanish-green)" />

          {/* content */}
          <div className="relative z-10 p-10 md:p-14 flex flex-col justify-center" style={{ minHeight: 460 }}>
            <div className="max-w-lg relative">
              {/* pill label */}
              <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-foreground/15 bg-background/40 backdrop-blur-sm mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                <span className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase font-mono">
                  cad to metal, a new way to create
                </span>
                <SketchCircle
                  className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] opacity-70 pointer-events-none"
                  color="var(--terracotta)"
                />
              </div>

              {/* headline with hand annotation */}
              <h1 className="font-serif font-light leading-[0.95] tracking-tight text-foreground mb-6 relative">
                <span className="block text-6xl md:text-7xl lg:text-[88px]">from cad</span>
                <span className="relative inline-block">
                  <span className="block text-6xl md:text-7xl lg:text-[88px] text-foreground/35 italic">to metal</span>
                  <SketchUnderline
                    className="absolute left-0 -bottom-1 w-[88%] h-3 opacity-80"
                    color="var(--horizon)"
                  />
                </span>

                {/* margin annotation pointing at "to metal" */}
                <HandNote
                  text="real, hold-in-your-hand"
                  arrow="down-left"
                  rotate={-6}
                  color="var(--terracotta)"
                  className="hidden lg:flex flex-col items-start absolute -right-4 top-1 translate-x-full"
                />
              </h1>

              {/* description */}
              <p className="text-sm md:text-[15px] text-foreground/55 font-light tracking-wide leading-relaxed mb-9 max-w-[340px]">
                publish your designs. choose materials. let your artifacts become real objects,{" "}
                <span className="relative text-foreground/80">
                  crafted, shipped, loved.
                  <SketchUnderline
                    className="absolute left-0 -bottom-1 w-full h-2 opacity-80"
                    color="var(--olive)"
                  />
                </span>
              </p>

              {/* ctas with doodle accents */}
              <div className="flex flex-wrap gap-3 relative">
                <div className="relative">
                  <Link to="/store/create">
                    <Button className="rounded-full px-6 py-5 text-sm tracking-wide gap-2 bg-foreground text-background hover:bg-foreground/90">
                      open a store
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <SketchStar
                    className="absolute -top-3 -right-3 w-4 h-4"
                    color="var(--buttercup)"
                  />
                  {/* hand note nudging users toward primary cta */}
                  <HandNote
                    text="start here"
                    arrow="up-right"
                    rotate={-8}
                    color="var(--spanish-green)"
                    className="hidden md:flex flex-col items-start absolute -bottom-14 left-2"
                  />
                </div>
                <Link to="/explore">
                  <Button variant="outline" className="rounded-full px-6 py-5 text-sm tracking-wide border-foreground/20 bg-background/20 text-foreground/60 hover:text-foreground hover:bg-background/40 backdrop-blur-sm">
                    explore artifacts
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* artifact preview cards, staggered, right side */}
          <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 items-end gap-3">
            {previewCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.5 }}
                className="relative flex flex-col items-center gap-2"
                style={{ marginBottom: card.offsetY }}
              >
                <div
                  className="relative w-[110px] h-[110px] rounded-[20px] flex items-center justify-center"
                  style={{
                    background: card.bg,
                    border: `1px solid ${card.border}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full"
                    style={{ background: card.dotColor, opacity: 0.65 }}
                  />
                  {/* a doodle on the middle (featured) preview card */}
                  {i === 1 && (
                    <SketchSparkle
                      className="absolute -top-2 -right-2 w-4 h-4"
                      color="var(--rose)"
                    />
                  )}
                </div>
                <span className="text-[10px] tracking-wider text-foreground/40 font-mono">{card.label}</span>
              </motion.div>
            ))}

            {/* hand annotation on the preview stack */}
            <HandNote
              text="yours, in metal"
              arrow="down-right"
              rotate={6}
              color="var(--lavender)"
              className="hidden lg:flex flex-col items-end absolute -top-14 -left-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
