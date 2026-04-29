// /about page. lightweight placeholder built with the same visual language
// as faq so it slots into the marketing surface without retheming work.
// real copy will be dropped in later by the user.

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SiteFooter from "../components/home/SiteFooter";

export default function About() {
  return (
    <div>
      <div className="px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 tracking-wide transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            back
          </Link>

          <div className="mb-10">
            <h1 className="font-serif text-2xl md:text-4xl font-light tracking-tight lowercase text-foreground mb-2">
              about sculptura
            </h1>
            <p className="text-sm text-muted-foreground tracking-wide font-light">
              a marketplace for cad-designed metal artifacts
            </p>
          </div>

          <div className="bg-card rounded-[20px] border border-border/50 shadow-paper px-7 py-8 space-y-5">
            <p className="text-sm text-muted-foreground font-light leading-relaxed tracking-wide">
              sculptura connects independent cad designers with people who want to
              own their work as physical metal pieces. designers publish their
              artifacts. buyers order them. we route production to trusted
              manufacturing partners and ship the finished piece worldwide.
            </p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed tracking-wide">
              full story coming soon.
            </p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
