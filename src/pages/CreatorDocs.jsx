import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Compass,
  Ruler,
  Wand2,
  Megaphone,
  Tags,
  Camera,
  Package,
  Scale,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SiteFooter from "../components/home/SiteFooter";

const sections = [
  {
    icon: Compass,
    title: "getting started",
    items: [
      "what sculptura is, who it's for, and how the pilot works",
      "a tour of your dashboard and the lifecycle of an artifact",
      "checklist for opening a store that feels finished on day one",
    ],
  },
  {
    icon: Ruler,
    title: "designing for cast metal",
    items: [
      "minimum wall thickness, undercut limits, and tolerances supported by our pilot manufacturer",
      "what the lost-wax pipeline can and cannot reproduce in fine detail",
      "sprue and venting considerations you can plan for in your model",
      "size systems we support today (rings, bracelets, free-size pieces) and what's coming next",
    ],
  },
  {
    icon: Wand2,
    title: "tips, tricks, and base templates",
    items: [
      "starter cad files for rings, pendants, brooches, and earrings",
      "patterns that print and cast cleanly, patterns that fight you",
      "finishing notes: polished, brushed, oxidised, and what each one costs in time",
    ],
  },
  {
    icon: Camera,
    title: "photography and presentation",
    items: [
      "lighting setups that work with a phone and one window",
      "how to render cad mockups that don't look like cad mockups",
      "writing artifact descriptions that tell a story without overselling",
    ],
  },
  {
    icon: Tags,
    title: "pricing your work",
    items: [
      "how material cost, surcharges, and your margin stack up",
      "pricing by weight vs. pricing by design effort",
      "when to use size surcharges and how to think about ring upsizing",
      "discounting strategy and when coupons help (or hurt)",
    ],
  },
  {
    icon: Megaphone,
    title: "marketing your shop",
    items: [
      "naming and positioning that actually distinguishes you from other creators",
      "how to use the tip jar, newsletter, and waitlist features built into your store",
      "off-platform: instagram, pinterest, and craft fairs",
      "collaborations, drops, and limited series",
    ],
  },
  {
    icon: Package,
    title: "fulfillment and made-to-order",
    items: [
      "what happens between a confirmed order and a finished piece",
      "lead times: what to promise, what to under-promise",
      "handling commissions, custom sizing, and revision requests",
    ],
  },
  {
    icon: MessageCircle,
    title: "talking to collectors",
    items: [
      "responding to enquiries, especially around custom work",
      "setting expectations on timeline and finish",
      "handling refunds, remakes, and edge cases gracefully",
    ],
  },
  {
    icon: TrendingUp,
    title: "growing over time",
    items: [
      "reading your analytics: views, conversion, repeat buyers",
      "building a body of work vs. one-off experiments",
      "creator tiers, seo weighting, and how rank works on sculptura",
    ],
  },
  {
    icon: Scale,
    title: "policy, ip, and trust",
    items: [
      "what you can and can't publish",
      "originality, references, and protecting your designs",
      "platform fees, payouts, and how disputes are handled",
    ],
  },
];

export default function CreatorDocs() {
  return (
    <div>
      <div className="px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 tracking-wide transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            back
          </Link>

          <div className="mb-10">
            <p className="text-[10px] tracking-widest font-mono uppercase mb-3 text-muted-foreground/50">
              coming soon
            </p>
            <h1 className="font-serif text-2xl md:text-4xl font-light tracking-tight lowercase text-foreground mb-3">
              creator docs
            </h1>
            <p className="text-sm text-muted-foreground tracking-wide font-light leading-relaxed max-w-2xl">
              a full handbook for designers building a shop on sculptura. the docs are being written as we run the pilot, so the structure below is what to expect when it goes live. nothing here is locked in yet, and we will keep adding to it as creators tell us what they need.
            </p>
          </div>

          <div className="bg-card rounded-[20px] border border-border/50 shadow-paper px-7 py-6 mb-10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-light tracking-tight lowercase text-foreground mb-2">
                why this exists
              </h2>
              <p className="text-sm text-muted-foreground font-light tracking-wide leading-relaxed">
                most creators we have spoken to are excellent designers and reluctant marketers. the goal of these docs is to take everything we learn from running the platform - what casts well, what sells well, what listings convert, what photos work - and put it in one place so you do not have to figure it out alone.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="bg-card rounded-[20px] border border-border/50 shadow-paper px-6 py-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h3 className="font-serif text-base font-light tracking-tight lowercase text-foreground">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 pl-1">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-muted-foreground font-light tracking-wide leading-relaxed flex gap-2"
                      >
                        <span className="text-muted-foreground/40 mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="bg-card rounded-[20px] border border-border/50 shadow-paper px-7 py-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-light tracking-tight lowercase text-foreground mb-2">
                in the meantime
              </h2>
              <p className="text-sm text-muted-foreground font-light tracking-wide leading-relaxed mb-3">
                if you are designing a piece right now and want to know whether it will cast cleanly, send it over and we will review it manually. the same goes for pricing, photography, or anything else where you would normally check a docs page.
              </p>
              <a
                href="mailto:hello@sculptura.shop"
                className="inline-flex items-center gap-2 text-xs tracking-wider text-foreground border border-border/60 px-4 py-2 rounded-full hover:bg-secondary transition-colors"
              >
                send a note
              </a>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
