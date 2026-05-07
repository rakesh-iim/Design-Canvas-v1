import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Plus, Trash2, FileText, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/quotation")({
  head: () => ({ meta: [{ title: "Quotation — Verdana Studio" }] }),
  component: Quotation,
});

type Line = { id: string; category: string; item: string; qty: number; rate: number };
const initial: Line[] = [
  { id: "1", category: "Materials", item: "IPE Wood Decking (per sq ft)", qty: 120, rate: 380 },
  { id: "2", category: "Materials", item: "Teak Pergola 8×8", qty: 1, rate: 78000 },
  { id: "3", category: "Materials", item: "Modular Green Wall (panel)", qty: 4, rate: 18500 },
  { id: "4", category: "Materials", item: "Areca Palm (tall)", qty: 6, rate: 1200 },
  { id: "5", category: "Materials", item: "Festoon String 20m", qty: 2, rate: 2400 },
  { id: "6", category: "Labor", item: "Skilled installation (3 days × 4 crew)", qty: 12, rate: 2200 },
  { id: "7", category: "Labor", item: "Designer site supervision", qty: 1, rate: 18000 },
  { id: "8", category: "Transportation", item: "Material delivery & lift", qty: 1, rate: 14500 },
  { id: "9", category: "Installation", item: "Pergola assembly & fixing", qty: 1, rate: 22000 },
  { id: "10", category: "Maintenance", item: "Quarterly upkeep (year 1)", qty: 4, rate: 8500 },
];

function Quotation() {
  const [lines, setLines] = useState<Line[]>(initial);
  const grouped = useMemo(() => {
    const g: Record<string, Line[]> = {};
    lines.forEach((l) => { (g[l.category] ||= []).push(l); });
    return g;
  }, [lines]);
  const totals = useMemo(() => {
    const t: Record<string, number> = {};
    Object.entries(grouped).forEach(([c, ls]) => { t[c] = ls.reduce((s, l) => s + l.qty * l.rate, 0); });
    return t;
  }, [grouped]);
  const subtotal = Object.values(totals).reduce((a, b) => a + b, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const update = (id: string, patch: Partial<Line>) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const remove = (id: string) => setLines((ls) => ls.filter((l) => l.id !== id));

  return (
    <AppShell>
      <div className="px-6 lg:px-10 py-10 max-w-[1400px]">
        <Link to="/workspace" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> Back to workspace
        </Link>
        <div className="mt-4 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Quotation · Q-2410-128</p>
            <h1 className="font-display text-4xl mt-1">Skyline Balcony Retreat</h1>
            <p className="text-muted-foreground mt-1">Mehta Residence · Mumbai · 120 sq ft</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl"><FileText className="h-4 w-4" /> Preview</Button>
            <Button className="rounded-xl"><Download className="h-4 w-4" /> Download PDF</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(grouped).map(([category, items]) => (
              <Card key={category} className="border-border/60 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/40">
                  <h3 className="font-medium">{category}</h3>
                  <span className="text-sm text-muted-foreground">₹{totals[category].toLocaleString()}</span>
                </div>
                <div className="divide-y divide-border">
                  {items.map((l) => (
                    <div key={l.id} className="grid grid-cols-12 gap-3 px-5 py-3 items-center text-sm">
                      <div className="col-span-6">{l.item}</div>
                      <Input
                        type="number"
                        value={l.qty}
                        onChange={(e) => update(l.id, { qty: Number(e.target.value) || 0 })}
                        className="col-span-2 h-9 text-center"
                      />
                      <Input
                        type="number"
                        value={l.rate}
                        onChange={(e) => update(l.id, { rate: Number(e.target.value) || 0 })}
                        className="col-span-2 h-9 text-right"
                      />
                      <div className="col-span-1 text-right font-medium">₹{(l.qty * l.rate).toLocaleString()}</div>
                      <button onClick={() => remove(l.id)} className="col-span-1 text-muted-foreground hover:text-destructive justify-self-end">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full px-5 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 flex items-center gap-1 border-t border-border">
                  <Plus className="h-3 w-3" /> Add line item
                </button>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="p-6 border-border/60 sticky top-6">
              <h3 className="font-display text-xl mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                {Object.entries(totals).map(([c, v]) => (
                  <div key={c} className="flex justify-between">
                    <span className="text-muted-foreground">{c}</span>
                    <span>₹{v.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-baseline">
                  <span className="font-medium">Total</span>
                  <span className="font-display text-2xl">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <Button className="w-full rounded-xl mt-5">Send to client</Button>
              <p className="text-[10px] text-muted-foreground text-center mt-3">Real-time pricing · valid 30 days</p>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
