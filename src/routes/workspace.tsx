import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ASSETS, ASSET_CATEGORIES, type AssetCategory } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  Save, Undo2, Redo2, Download, Eye, FileText, Box, Square, Sparkles,
  Search, Layers, ChevronUp, MousePointer2, Hand, Move3d, Grid3x3,
  Send, Lightbulb, X,
} from "lucide-react";

export const Route = createFileRoute("/workspace")({
  head: () => ({ meta: [{ title: "Designer workspace — Verdana Studio" }] }),
  component: Workspace,
});

type PlacedAsset = { id: string; name: string; x: number; y: number; w: number; h: number; rot: number; color: string; emoji: string };

function Workspace() {
  const [category, setCategory] = useState<AssetCategory>("Plants");
  const [view, setView] = useState<"2D" | "3D">("2D");
  const [aiOpen, setAiOpen] = useState(true);
  const [placed, setPlaced] = useState<PlacedAsset[]>([
    { id: "a1", name: "Areca Palm", x: 14, y: 18, w: 12, h: 12, rot: 0, color: "oklch(0.6 0.13 145)", emoji: "🌿" },
    { id: "a2", name: "Teak Bench", x: 38, y: 56, w: 28, h: 10, rot: 0, color: "oklch(0.45 0.06 60)", emoji: "🪑" },
    { id: "a3", name: "Bistro Table", x: 70, y: 32, w: 14, h: 14, rot: 0, color: "oklch(0.5 0.04 80)", emoji: "🍽️" },
    { id: "a4", name: "Festoon String", x: 50, y: 8, w: 60, h: 4, rot: 0, color: "oklch(0.85 0.1 90)", emoji: "✨" },
    { id: "a5", name: "Monstera", x: 82, y: 70, w: 12, h: 12, rot: 0, color: "oklch(0.55 0.13 145)", emoji: "🪴" },
  ]);
  const [selected, setSelected] = useState<string | null>("a2");
  const sel = placed.find((p) => p.id === selected) ?? null;

  const updateSel = (patch: Partial<PlacedAsset>) =>
    setPlaced((p) => p.map((a) => (a.id === selected ? { ...a, ...patch } : a)));

  const addAsset = (name: string, emoji: string) => {
    const id = "n" + Date.now();
    setPlaced((p) => [...p, { id, name, x: 50, y: 50, w: 12, h: 12, rot: 0, color: "oklch(0.55 0.1 145)", emoji }]);
    setSelected(id);
  };

  return (
    <AppShell>
      <div className="flex flex-col h-screen">
        {/* Top toolbar */}
        <div className="h-14 border-b border-border bg-background flex items-center px-4 gap-2 shrink-0">
          <Link to="/dashboard" className="text-sm font-medium hover:opacity-70">Skyline Balcony Retreat</Link>
          <span className="text-xs text-muted-foreground">· Mehta Residence · Auto-saved 12s ago</span>
          <div className="flex-1" />
          <ToolBtn icon={Undo2} />
          <ToolBtn icon={Redo2} />
          <Divider />
          <div className="flex bg-muted/60 rounded-lg p-0.5">
            <button onClick={() => setView("2D")} className={cn("px-3 h-8 text-xs rounded-md flex items-center gap-1", view === "2D" && "bg-background shadow-sm")}>
              <Square className="h-3 w-3" /> 2D
            </button>
            <button onClick={() => setView("3D")} className={cn("px-3 h-8 text-xs rounded-md flex items-center gap-1", view === "3D" && "bg-background shadow-sm")}>
              <Box className="h-3 w-3" /> 3D
            </button>
          </div>
          <Divider />
          <Button variant="ghost" size="sm" onClick={() => setAiOpen(!aiOpen)}><Sparkles className="h-4 w-4" /> AI</Button>
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /> Render</Button>
          <Button variant="ghost" size="sm" asChild><Link to="/quotation"><FileText className="h-4 w-4" /> Quote</Link></Button>
          <Button variant="ghost" size="sm"><Download className="h-4 w-4" /> Export</Button>
          <Button size="sm" className="rounded-lg"><Save className="h-4 w-4" /> Save</Button>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Left panel - assets */}
          <div className="w-64 border-r border-border bg-sidebar flex flex-col shrink-0">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search assets" className="pl-8 h-9 text-sm bg-background" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-0.5">
                {ASSET_CATEGORIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setCategory(c.name)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                      category === c.name ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    <span className="text-base">{c.icon}</span> {c.name}
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-border">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{category}</p>
                <div className="grid grid-cols-2 gap-2">
                  {ASSETS[category].map((a) => {
                    const emoji = ASSET_CATEGORIES.find((c) => c.name === category)?.icon ?? "✦";
                    return (
                      <button
                        key={a.id}
                        onClick={() => addAsset(a.name, emoji)}
                        className="aspect-square rounded-xl bg-background border border-border hover:border-primary hover:shadow-[var(--shadow-elegant)] transition-all p-2 flex flex-col items-center justify-center gap-1 text-center group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">{emoji}</span>
                        <span className="text-[10px] font-medium leading-tight">{a.name}</span>
                        <span className="text-[9px] text-muted-foreground">₹{a.price.toLocaleString()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 min-w-0 flex flex-col bg-canvas relative">
            <div className="flex-1 relative overflow-hidden canvas-grid" onClick={() => setSelected(null)}>
              {/* Floating tool palette */}
              <div className="absolute left-4 top-4 z-10 flex flex-col gap-1 bg-card border border-border rounded-xl p-1 shadow-[var(--shadow-elegant)]">
                {[MousePointer2, Hand, Move3d, Grid3x3].map((Icon, i) => (
                  <button key={i} className={cn("h-9 w-9 rounded-lg grid place-items-center", i === 0 ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}>
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
              <div className="absolute right-4 top-4 z-10 px-3 h-9 rounded-xl glass border border-border flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">12'×10'</span>
                <span className="h-3 w-px bg-border" />
                <span>{view} view</span>
                <span className="h-3 w-px bg-border" />
                <span className="text-muted-foreground">Zoom</span>
                <span>100%</span>
              </div>

              {/* Floor plan / canvas content */}
              <div className="absolute inset-12 rounded-2xl bg-card/40 border border-border shadow-inner">
                {placed.map((a) => (
                  <button
                    key={a.id}
                    onClick={(e) => { e.stopPropagation(); setSelected(a.id); }}
                    className={cn(
                      "absolute rounded-xl flex items-center justify-center text-2xl transition-all",
                      selected === a.id ? "ring-2 ring-primary ring-offset-2 ring-offset-canvas shadow-[var(--shadow-float)]" : "hover:ring-1 hover:ring-foreground/30"
                    )}
                    style={{
                      left: `${a.x}%`,
                      top: `${a.y}%`,
                      width: `${a.w}%`,
                      height: `${a.h}%`,
                      transform: `translate(-50%, -50%) rotate(${a.rot}deg)`,
                      background: `color-mix(in oklab, ${a.color} 25%, transparent)`,
                      borderColor: a.color,
                      borderWidth: 1,
                      borderStyle: "solid",
                    }}
                    title={a.name}
                  >
                    <span style={{ transform: `rotate(${-a.rot}deg)` }}>{a.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom timeline */}
            <div className="h-32 border-t border-border bg-background shrink-0 flex">
              <div className="w-48 border-r border-border p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Layers className="h-3 w-3" /> Layers</div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="px-2 py-1 rounded bg-muted/60">Base · Floor</div>
                  <div className="px-2 py-1 rounded">Furniture</div>
                  <div className="px-2 py-1 rounded">Plants</div>
                  <div className="px-2 py-1 rounded">Lighting</div>
                </div>
              </div>
              <div className="flex-1 p-3 overflow-x-auto">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
                  <span>Project timeline</span>
                  <ChevronUp className="h-3 w-3" />
                </div>
                <div className="flex gap-1 items-end h-14">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className={cn("w-3 rounded-sm", i === 24 ? "bg-primary" : "bg-muted")} style={{ height: `${20 + ((i * 17) % 80)}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>Brief</span><span>Concept</span><span>Render</span><span>Quote</span><span>Approval</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-72 border-l border-border bg-sidebar shrink-0 flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Properties</div>
              <div className="font-display text-lg mt-1">{sel?.name ?? "Nothing selected"}</div>
            </div>
            {sel && (
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                <PropRow label="Position">
                  <div className="grid grid-cols-2 gap-2">
                    <NumInput label="X" value={Math.round(sel.x)} onChange={(v) => updateSel({ x: v })} />
                    <NumInput label="Y" value={Math.round(sel.y)} onChange={(v) => updateSel({ y: v })} />
                  </div>
                </PropRow>
                <PropRow label="Size">
                  <div className="grid grid-cols-2 gap-2">
                    <NumInput label="W" value={Math.round(sel.w)} onChange={(v) => updateSel({ w: v })} />
                    <NumInput label="H" value={Math.round(sel.h)} onChange={(v) => updateSel({ h: v })} />
                  </div>
                </PropRow>
                <PropRow label={`Rotation · ${sel.rot}°`}>
                  <Slider value={[sel.rot]} min={0} max={360} step={1} onValueChange={([v]) => updateSel({ rot: v })} />
                </PropRow>
                <PropRow label="Material">
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {["Teak", "Bamboo", "Steel", "Stone", "Concrete", "Rattan"].map((m, i) => (
                      <button key={m} className={cn("h-8 rounded-md border", i === 0 ? "border-primary bg-primary/10" : "border-border")}>{m}</button>
                    ))}
                  </div>
                </PropRow>
                <PropRow label="Color">
                  <div className="flex gap-2">
                    {["oklch(0.45 0.06 60)","oklch(0.6 0.13 145)","oklch(0.5 0.04 80)","oklch(0.85 0.1 90)","oklch(0.3 0.02 150)"].map((c) => (
                      <button key={c} onClick={() => updateSel({ color: c })} className="h-7 w-7 rounded-full border-2 border-background ring-1 ring-border" style={{ background: c }} />
                    ))}
                  </div>
                </PropRow>
                <PropRow label="Quantity">
                  <Input type="number" defaultValue={1} className="h-8" />
                </PropRow>
                <PropRow label="Notes">
                  <textarea className="w-full text-xs rounded-md border border-border bg-background p-2 resize-none" rows={3} placeholder="Match client's existing teak finish…" />
                </PropRow>
                <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300">
                  <Lightbulb className="h-3.5 w-3.5" /> Collision-aware: 1.2 ft from railing.
                </div>
              </div>
            )}
          </div>

          {/* AI panel */}
          {aiOpen && (
            <div className="w-80 border-l border-border bg-background shrink-0 flex flex-col">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Verdana AI</div>
                    <div className="text-[10px] text-muted-foreground">Design copilot</div>
                  </div>
                </div>
                <button onClick={() => setAiOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
                <AiBubble role="ai">
                  Based on your south-facing balcony, I'd cluster sun-loving plants on the west edge and shift seating into shaded zones.
                </AiBubble>
                <div className="space-y-1.5">
                  {["Suggested plant pairings", "Optimise for afternoon sun", "Reduce budget by 12%", "Auto-arrange seating"].map((s) => (
                    <button key={s} className="w-full text-left text-xs px-3 py-2 rounded-lg border border-border hover:border-primary hover:bg-accent/30 transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
                <AiBubble role="user">Make the lounge area feel more intimate.</AiBubble>
                <AiBubble role="ai">
                  Try a 6×8 ft pergola overhead, festoon lights at 7 ft, and a low Kelim rug grounded by two lounge chairs angled inward at 30°. Want me to drop those in?
                </AiBubble>
              </div>
              <div className="p-3 border-t border-border">
                <div className="relative">
                  <Input placeholder="Ask Verdana AI…" className="pr-9 h-10" />
                  <Button size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-md"><Send className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function ToolBtn({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return <Button variant="ghost" size="icon" className="h-8 w-8"><Icon className="h-4 w-4" /></Button>;
}
function Divider() { return <div className="h-5 w-px bg-border mx-1" />; }
function PropRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{label}</div>
      {children}
    </div>
  );
}
function NumInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">{label}</span>
      <Input value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} className="h-8 pl-6 text-xs" />
    </div>
  );
}
function AiBubble({ role, children }: { role: "ai" | "user"; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-2xl px-3 py-2 max-w-[90%] text-sm leading-relaxed", role === "ai" ? "bg-muted/60" : "bg-primary text-primary-foreground ml-auto")}>
      {children}
    </div>
  );
}
