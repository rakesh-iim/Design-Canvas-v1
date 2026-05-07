import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PROJECTS, TEAM_ACTIVITY, TEMPLATES } from "@/lib/mock-data";
import { Plus, TrendingUp, Sparkles, Clock, Search, ArrowUpRight, Users, Layers3 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Verdana Studio" }] }),
  component: Dashboard,
});

const stats = [
  { label: "Active projects", value: "24", change: "+12%", icon: Layers3 },
  { label: "Renders this week", value: "187", change: "+38%", icon: Sparkles },
  { label: "Quotations sent", value: "₹48.2L", change: "+9%", icon: TrendingUp },
  { label: "Team members", value: "12", change: "+2", icon: Users },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center gap-4 h-16 px-6 lg:px-10">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects, clients, plants…" className="pl-9 bg-muted/40 border-transparent" />
          </div>
          <Button asChild className="rounded-xl">
            <Link to="/projects/new"><Plus className="h-4 w-4" /> New project</Link>
          </Button>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 space-y-10 max-w-[1500px]">
        <header className="flex flex-wrap items-end justify-between gap-4 animate-fade-in">
          <div>
            <p className="text-sm text-muted-foreground">Thursday, 7 May</p>
            <h1 className="font-display text-4xl mt-1">Good morning, Aanya.</h1>
            <p className="text-muted-foreground mt-1">3 reviews pending · 2 client previews scheduled today.</p>
          </div>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="p-5 border-border/60">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="font-display text-3xl mt-2">{s.value}</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-accent/60 grid place-items-center">
                  <s.icon className="h-4 w-4 text-accent-foreground" />
                </div>
              </div>
              <p className="text-xs text-primary mt-3 font-medium">{s.change} vs last week</p>
            </Card>
          ))}
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Recent projects</h2>
              <Button variant="ghost" size="sm" asChild><Link to="/templates">View all <ArrowUpRight className="h-3 w-3 ml-1" /></Link></Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {PROJECTS.slice(0, 4).map((p) => (
                <Link key={p.id} to="/workspace" className="group">
                  <Card className="overflow-hidden border-border/60 hover:shadow-[var(--shadow-float)] transition-all hover:-translate-y-0.5">
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img src={p.thumbnail} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium leading-tight">{p.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{p.client} · {p.city}</p>
                        </div>
                        <Badge variant="secondary" className="rounded-full text-[10px]">{p.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                        <span>{p.type} · {p.area}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.updatedAt}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-5 border-border/60">
              <h3 className="font-display text-lg mb-4">Team activity</h3>
              <ul className="space-y-4">
                {TEAM_ACTIVITY.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-accent/60 grid place-items-center text-xs font-medium">
                      {a.who.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <p className="leading-snug">
                        <span className="font-medium">{a.who}</span>{" "}
                        <span className="text-muted-foreground">{a.action}</span>{" "}
                        <span className="font-medium">{a.what}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.when} ago</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5 border-border/60 bg-gradient-to-br from-accent/40 to-transparent">
              <h3 className="font-display text-lg">Saved templates</h3>
              <p className="text-sm text-muted-foreground mt-1">Quick-start blueprints curated by your team.</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {TEMPLATES.slice(0, 4).map((t) => (
                  <div key={t.id} className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img src={t.thumbnail} alt={t.name} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 rounded-lg" asChild>
                <Link to="/templates">Browse library</Link>
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
