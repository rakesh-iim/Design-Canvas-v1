import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { TEMPLATES } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/templates")({
  head: () => ({ meta: [{ title: "Template library — Verdana Studio" }] }),
  component: Templates,
});

const themes = ["All", "Minimal", "Luxury", "Tropical", "Zen", "Contemporary", "Organic", "Café-style"];
const sizes = ["All", "60–120", "120–300", "300–700", "700+"];
const tiers = ["All", "Modern", "Traditional", "Luxury"];

function Templates() {
  const [theme, setTheme] = useState("All");
  const [size, setSize] = useState("All");
  const [tier, setTier] = useState("All");

  const filtered = TEMPLATES.filter((t) =>
    (theme === "All" || t.theme === theme) &&
    (tier === "All" || t.tier === tier)
  );

  return (
    <AppShell>
      <div className="px-6 lg:px-10 py-10 max-w-[1500px] space-y-8">
        <header className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Library</p>
            <h1 className="font-display text-4xl mt-1">Templates</h1>
            <p className="text-muted-foreground mt-1 max-w-lg">Start from a curated blueprint, then make it yours in the workspace.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search templates…" className="pl-9 w-72" />
          </div>
        </header>

        <div className="space-y-3">
          <FilterRow label="Theme" options={themes} value={theme} onChange={setTheme} />
          <FilterRow label="Size (sq ft)" options={sizes} value={size} onChange={setSize} />
          <FilterRow label="Style tier" options={tiers} value={tier} onChange={setTier} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((t) => (
            <Card key={t.id} className="overflow-hidden border-border/60 group hover:shadow-[var(--shadow-float)] transition-all hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                <img src={t.thumbnail} alt={t.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <button className="absolute top-3 right-3 h-8 w-8 rounded-full glass border border-border grid place-items-center text-foreground/70 hover:text-primary">
                  <Bookmark className="h-3.5 w-3.5" />
                </button>
                <Badge variant="secondary" className="absolute top-3 left-3 rounded-full bg-background/80 text-[10px]">{t.tier}</Badge>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium leading-tight">{t.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t.theme} · {t.area}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Est.</div>
                    <div className="font-display text-lg leading-none mt-0.5">₹{(t.cost / 100000).toFixed(1)}L</div>
                  </div>
                  <Button size="sm" className="rounded-lg" asChild><Link to="/workspace"><Sparkles className="h-3 w-3" /> Use</Link></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function FilterRow({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs uppercase tracking-wider text-muted-foreground w-24">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "h-8 px-3.5 rounded-full text-xs font-medium border transition-colors",
            value === o ? "bg-foreground text-background border-foreground" : "bg-transparent border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
