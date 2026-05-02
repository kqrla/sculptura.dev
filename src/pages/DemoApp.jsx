// /demo/app — try-it-out sandbox for creators.
//
// no login, no backend. all edits live in localStorage via demoSandbox.
// this intentionally reuses the real MarketDashboard shell (same sidebar,
// same section layout) so the demo mirrors the live creator experience
// instead of being a parallel ui. only the data source changes:
//
//   - overview, commissions, settings → driven by sandbox / local state
//   - sections that require a live backend (artifacts, orders, analytics,
//     finance, insights, collections, my store) show a small "demo
//     limited" notice rather than hitting the database
//
// commission settings live inside the dashboard (settings tab → commissions),
// matching how a real creator manages them. no separate page.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, RotateCcw, Info, Lock } from "lucide-react";
import { toast } from "sonner";
import MarketSidebar from "@/components/market/MarketSidebar";
import CommissionTermsEditor from "@/components/commissions/CommissionTermsEditor";
import CommissionRequestsSection from "@/components/market/sections/CommissionRequestsSection";
import {
  getSandbox,
  patchSandbox,
  clearSandbox,
  getDemoRequestsForHandle,
} from "@/lib/demoSandbox";

const DEMO_HANDLE = "demo-creator";

// build a synthetic MarketAccount from the sandbox so MarketSidebar
// (which expects an `account` object) can render without a db row.
function buildDemoAccount(sandbox) {
  return {
    id: "demo-account",
    handle: DEMO_HANDLE,
    display_name: sandbox.store.display_name,
    bio: sandbox.store.bio,
    accent_color: sandbox.store.accent_color,
    status: "demo",
    ...sandbox.commission,
  };
}

export default function DemoApp() {
  const [tick, setTick] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");

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

  const sandbox = getSandbox();
  const account = buildDemoAccount(sandbox);
  const requestCount = getDemoRequestsForHandle(DEMO_HANDLE).length;

  const reset = () => {
    if (!confirm("clear all demo data and start fresh?")) return;
    clearSandbox();
    toast.success("demo reset");
  };

  // sidebar's "settings" item links to /store/settings via href. we
  // intercept that in the demo by substituting a sandbox-aware sidebar
  // section instead. to keep the sidebar internal-button behavior, we
  // pass a wrapper that overrides activeSection routing.
  const handleSectionChange = (path) => setActiveSection(path);

  return (
    <div className="flex min-h-screen bg-background">
      <DemoSidebar
        account={account}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onReset={reset}
      />

      <main className="flex-1 min-w-0">
        <div className="min-h-screen grid-bg p-10 max-w-4xl">
          <DemoBanner />
          <SectionRouter
            key={tick}
            section={activeSection}
            sandbox={sandbox}
            requestCount={requestCount}
          />
        </div>
      </main>
    </div>
  );
}

// thin wrapper around MarketSidebar that swaps the brand subtitle and
// the external links (my store, settings) for sandbox-internal sections,
// plus a reset / preview / open-real-store footer.
function DemoSidebar({ account, activeSection, onSectionChange, onReset }) {
  const navItems = [
    { path: "overview", label: "overview" },
    { path: "artifacts", label: "artifacts" },
    { path: "collections", label: "collections" },
    { path: "orders", label: "orders" },
    { path: "commissions", label: "commissions" },
    { path: "insights", label: "insights" },
    { path: "mystore", label: "my store" },
    { path: "analytics", label: "analytics" },
    { path: "finance", label: "finance" },
    { path: "settings", label: "settings" },
  ];

  return (
    <aside className="w-[180px] flex-shrink-0 flex flex-col h-screen sticky top-0 bg-background border-r border-border/40 py-6">
      <div className="px-5 mb-8">
        <Link to="/" className="block">
          <p className="font-wordmark text-xl text-foreground">sculptura</p>
          <p className="text-[10px] tracking-wider text-muted-foreground/40 lowercase mt-0.5">demo sandbox</p>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ path, label }) => {
          const isActive = activeSection === path;
          return (
            <button
              key={path}
              onClick={() => onSectionChange(path)}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-[13px] tracking-wide lowercase transition-all ${
                isActive
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 space-y-2 mt-auto">
        <div className="h-px bg-border/30 my-2" />
        {account && (
          <div className="px-3 py-2">
            <p className="text-[13px] font-medium tracking-wide text-foreground lowercase">{account.display_name}</p>
            <p className="text-[11px] text-muted-foreground/50 tracking-wide">@{account.handle}</p>
          </div>
        )}
        <a
          href={`/shop/${account.handle}/commission`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] tracking-wide text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          preview public form
        </a>
        <button
          onClick={onReset}
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
  );
}

function DemoBanner() {
  return (
    <div className="mb-6 rounded-[14px] border border-border/50 bg-card px-4 py-3 flex items-start gap-3">
      <Info className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
      <p className="text-[12px] text-muted-foreground/80 tracking-wide leading-relaxed">
        you're in the demo dashboard. edits save to your browser only. the commission
        flow is fully wired — open <span className="font-mono">settings → commissions</span>,
        then <span className="font-mono">preview public form</span> to send yourself a request.
      </p>
    </div>
  );
}

function SectionRouter({ section, sandbox, requestCount }) {
  if (section === "overview") {
    return <Overview sandbox={sandbox} requestCount={requestCount} />;
  }

  if (section === "commissions") {
    return <CommissionRequestsSection handle={DEMO_HANDLE} isDemo />;
  }

  if (section === "settings") {
    return (
      <div className="space-y-7">
        <div>
          <h1 className="text-xl font-light tracking-wide lowercase text-foreground">settings</h1>
          <p className="text-sm text-muted-foreground/60 tracking-wide mt-0.5">
            commission terms, intake questions, and policies
          </p>
        </div>
        <CommissionTermsEditor
          initial={sandbox.commission}
          hasMarketAccount={false}
          onSave={async (patch) => {
            patchSandbox("commission", patch);
          }}
        />
      </div>
    );
  }

  return <DemoLimited section={section} />;
}

function DemoLimited({ section }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-light tracking-wide lowercase text-foreground">{section}</h1>
        <p className="text-sm text-muted-foreground/60 tracking-wide mt-0.5">
          available in a real store
        </p>
      </div>
      <div className="bg-card rounded-[18px] border border-border/50 p-10 text-center">
        <Lock className="w-6 h-6 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-sm tracking-wide text-muted-foreground/80">
          this section needs a real store to be useful
        </p>
        <p className="text-[12px] text-muted-foreground/50 tracking-wide mt-1 max-w-md mx-auto">
          the demo focuses on the commission flow. open a real store to manage
          artifacts, orders, finance, and analytics with persistent data.
        </p>
        <Link
          to="/store/create"
          className="inline-block mt-5 px-4 py-2 rounded-full text-[12px] tracking-wide text-foreground bg-secondary hover:bg-secondary/70 transition-all"
        >
          open a real store
        </Link>
      </div>
    </div>
  );
}

function Overview({ sandbox, requestCount }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-light tracking-wide lowercase text-foreground">overview</h1>
        <p className="text-sm text-muted-foreground/60 tracking-wide mt-0.5">
          your demo workspace at a glance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Stat label="requests" value={String(requestCount)} />
        <Stat label="commissions" value={sandbox.commission.commission_open ? "open" : "closed"} />
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
