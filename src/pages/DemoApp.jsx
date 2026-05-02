// /demo/app — try-it-out sandbox for creators.
//
// no login, no backend. all edits live in localStorage via demoSandbox.
// this is intentionally a thin slice — it exposes the commission flow
// (terms editor + intake builder + inbox) so visitors can feel the
// loop end-to-end without going through onboarding.
//
// the same components that power the live dashboard render here, just
// with a different save handler and data source.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, ExternalLink, LayoutDashboard, Settings as SettingsIcon, Mail, Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  getSandbox,
  patchSandbox,
  clearSandbox,
  getDemoRequestsForHandle,
} from "@/lib/demoSandbox";
import CommissionTermsEditor from "@/components/commissions/CommissionTermsEditor";
import CommissionRequestsSection from "@/components/market/sections/CommissionRequestsSection";

const DEMO_HANDLE = "demo-creator";

export default function DemoApp() {
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState("overview");
  const sandbox = getSandbox();

  // re-read on every storage change so all panels stay in sync
  useEffect(() => {
    const sync = () => setTick((t) => t + 1);
    window.addEventListener("demo-sandbox-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("demo-sandbox-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const reset = () => {
    if (!confirm("clear all demo data and start fresh?")) return;
    clearSandbox();
    toast.success("demo reset");
  };

  const requestCount = getDemoRequestsForHandle(DEMO_HANDLE).length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* sidebar */}
      <aside className="w-[200px] flex-shrink-0 flex flex-col h-screen sticky top-0 bg-background border-r border-border/40 py-6">
        <div className="px-5 mb-8">
          <Link to="/" className="block">
            <p className="font-wordmark text-xl text-foreground">sculptura</p>
            <p className="text-[10px] tracking-wider text-muted-foreground/40 lowercase mt-0.5">demo sandbox</p>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          <NavItem active={tab === "overview"} onClick={() => setTab("overview")} icon={LayoutDashboard} label="overview" />
          <NavItem active={tab === "commissions"} onClick={() => setTab("commissions")} icon={Mail} label={`commissions${requestCount > 0 ? ` (${requestCount})` : ""}`} />
          <NavItem active={tab === "settings"} onClick={() => setTab("settings")} icon={SettingsIcon} label="commission settings" />
        </nav>

        <div className="px-3 mt-auto space-y-3">
          <div className="h-px bg-border/30" />
          <a
            href={`/shop/${DEMO_HANDLE}/commission`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] tracking-wide text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            preview public form
          </a>
          <button
            onClick={reset}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] tracking-wide text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            reset demo
          </button>
          <Link
            to="/store/create"
            className="block px-3 py-2 rounded-lg text-[12px] tracking-wide text-foreground bg-secondary/60 hover:bg-secondary text-center transition-all"
          >
            open a real store
          </Link>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="min-h-screen grid-bg p-10 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-wide text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            back to sculptura
          </Link>

          {tab === "overview" && (
            <Overview sandbox={sandbox} requestCount={requestCount} key={tick} />
          )}

          {tab === "commissions" && (
            <CommissionRequestsSection handle={DEMO_HANDLE} isDemo />
          )}

          {tab === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-light tracking-wide lowercase text-foreground">commission settings</h1>
                <p className="text-sm text-muted-foreground/60 tracking-wide mt-0.5">
                  edits save to your browser only. nothing leaves this device.
                </p>
              </div>
              <CommissionTermsEditor
                key={tick}
                initial={sandbox.commission}
                hasMarketAccount={false}
                onSave={async (patch) => {
                  patchSandbox("commission", patch);
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] tracking-wide lowercase transition-all ${
        active ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      {label}
    </button>
  );
}

function Overview({ sandbox, requestCount }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-light tracking-wide lowercase text-foreground">demo sandbox</h1>
        <p className="text-sm text-muted-foreground/60 tracking-wide mt-0.5">
          everything here is local. try the commission flow without an account.
        </p>
      </div>

      <div className="rounded-[18px] border border-border/50 bg-card p-5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
          <Info className="w-4 h-4 text-muted-foreground/60" />
        </div>
        <div className="space-y-1">
          <p className="text-sm tracking-wide text-foreground">how this works</p>
          <p className="text-[12px] text-muted-foreground/70 tracking-wide leading-relaxed">
            edit your commission terms under <span className="font-mono">commission settings</span>, then open the
            preview public form. anything you submit there appears in <span className="font-mono">commissions</span>.
            clearing the demo wipes it all.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Stat label="requests" value={String(requestCount)} />
        <Stat label="status" value={sandbox.commission.commission_open ? "open" : "closed"} />
        <Stat label="min budget" value={sandbox.commission.commission_min_budget ? `$${sandbox.commission.commission_min_budget}` : "—"} />
        <Stat label="intake questions" value={String((sandbox.commission.commission_intake_questions || []).length)} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-card rounded-[18px] border border-border/50 p-5 space-y-2">
      <p className="text-[10px] tracking-widest text-muted-foreground/50 uppercase">{label}</p>
      <p className="text-2xl font-light tracking-wide text-foreground">{value}</p>
    </div>
  );
}
