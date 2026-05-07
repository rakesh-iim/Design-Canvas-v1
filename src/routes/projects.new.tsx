import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { STYLES } from "@/lib/mock-data";
import { ArrowLeft, ArrowRight, Check, Upload, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/new")({
  head: () => ({ meta: [{ title: "New project — Verdana Studio" }] }),
  component: NewProject,
});

const STEPS = ["Project", "Inspiration", "Style", "Budget", "Generate"];

function NewProject() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const next = () => (step < 4 ? setStep(step + 1) : navigate({ to: "/workspace" }));
  const back = () => (step > 0 ? setStep(step - 1) : navigate({ to: "/dashboard" }));

  return (
    <AppShell>
      <div className="px-6 lg:px-12 py-10 max-w-5xl mx-auto">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Back to dashboard
        </Link>

        <div className="mt-6 mb-10 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={cn(
                "h-8 w-8 rounded-full grid place-items-center text-xs font-medium shrink-0",
                i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <div className="flex-1">
                <div className={cn("text-xs font-medium", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</div>
                <div className={cn("h-0.5 mt-1 rounded-full", i < step ? "bg-primary" : "bg-muted")} />
              </div>
            </div>
          ))}
        </div>

        <Card className="p-8 lg:p-10 border-border/60 animate-fade-in">
          {step === 0 && <StepProject />}
          {step === 1 && <StepUpload />}
          {step === 2 && <StepStyle />}
          {step === 3 && <StepBudget />}
          {step === 4 && <StepGenerate />}

          <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
            <Button variant="ghost" onClick={back}><ArrowLeft className="h-4 w-4" /> Back</Button>
            <Button onClick={next} className="rounded-xl">
              {step === 4 ? "Open workspace" : "Continue"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function StepHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl">{title}</h1>
      <p className="text-muted-foreground mt-2">{sub}</p>
    </div>
  );
}

function StepProject() {
  return (
    <div>
      <StepHeader title="Tell us about the project" sub="The basics — we'll use this to set up the workspace." />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Project name"><Input placeholder="e.g. Skyline Balcony Retreat" defaultValue="Skyline Balcony Retreat" /></Field>
        <Field label="Client name"><Input placeholder="Mehta Residence" /></Field>
        <Field label="Space type">
          <div className="grid grid-cols-4 gap-2">
            {["Balcony", "Terrace", "Garden", "Landscape"].map((t, i) => (
              <button key={t} className={cn("h-10 rounded-lg border text-sm transition-colors", i === 0 ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-foreground/40")}>{t}</button>
            ))}
          </div>
        </Field>
        <Field label="City"><Input placeholder="Mumbai" /></Field>
        <Field label="Length (ft)"><Input placeholder="12" /></Field>
        <Field label="Width (ft)"><Input placeholder="10" /></Field>
      </div>
    </div>
  );
}

function StepUpload() {
  return (
    <div>
      <StepHeader title="Upload site & inspiration" sub="Site photos help our AI understand context. Inspiration references help us match your vision." />
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: ImageIcon, label: "Site photos", hint: "JPG · up to 10" },
          { icon: Video, label: "Walkthrough video", hint: "MP4 · optional" },
          { icon: Upload, label: "Inspiration", hint: "Pinterest, refs" },
        ].map((u) => (
          <div key={u.label} className="aspect-[4/5] rounded-2xl border-2 border-dashed border-border hover:border-primary/60 hover:bg-accent/20 transition-colors grid place-items-center cursor-pointer">
            <div className="text-center px-4">
              <u.icon className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="font-medium mt-3">{u.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{u.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepStyle() {
  const [picked, setPicked] = useState("Minimal");
  return (
    <div>
      <StepHeader title="Pick a design language" sub="You can refine or mix styles inside the workspace." />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STYLES.map((s) => (
          <button
            key={s}
            onClick={() => setPicked(s)}
            className={cn(
              "aspect-[4/5] rounded-2xl overflow-hidden relative border-2 transition-all text-left",
              picked === s ? "border-primary shadow-[var(--shadow-float)]" : "border-transparent hover:border-border"
            )}
          >
            <div className={cn("absolute inset-0", styleBg(s))} />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent text-background">
              <p className="font-display text-lg">{s}</p>
            </div>
            {picked === s && (
              <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center">
                <Check className="h-3 w-3" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function styleBg(style: string) {
  const map: Record<string, string> = {
    Minimal: "bg-gradient-to-br from-stone-200 to-stone-400",
    Luxury: "bg-gradient-to-br from-amber-200 to-amber-700",
    Tropical: "bg-gradient-to-br from-emerald-300 to-teal-700",
    Zen: "bg-gradient-to-br from-slate-300 to-slate-600",
    Modern: "bg-gradient-to-br from-neutral-300 to-neutral-700",
    Organic: "bg-gradient-to-br from-lime-300 to-emerald-700",
    "Café-style": "bg-gradient-to-br from-orange-300 to-amber-800",
    Contemporary: "bg-gradient-to-br from-zinc-300 to-zinc-700",
  };
  return map[style] ?? "bg-muted";
}

function StepBudget() {
  return (
    <div>
      <StepHeader title="Budget & preferences" sub="We'll optimise material suggestions accordingly." />
      <div className="space-y-6">
        <Field label="Budget range">
          <div className="grid grid-cols-4 gap-2">
            {["< ₹1L", "₹1–5L", "₹5–15L", "₹15L+"].map((b, i) => (
              <button key={b} className={cn("h-11 rounded-lg border text-sm", i === 1 ? "border-primary bg-primary/10" : "border-border hover:border-foreground/40")}>{b}</button>
            ))}
          </div>
        </Field>
        <Field label="Material preference">
          <div className="flex flex-wrap gap-2">
            {["Teak", "Bamboo", "Steel", "Concrete", "Stone", "Composite"].map((m) => (
              <button key={m} className="px-4 h-9 rounded-full border border-border text-sm hover:border-foreground/40">{m}</button>
            ))}
          </div>
        </Field>
        <Field label="Maintenance level">
          <div className="grid grid-cols-3 gap-2">
            {["Low", "Moderate", "High"].map((m, i) => (
              <button key={m} className={cn("h-11 rounded-lg border text-sm", i === 0 ? "border-primary bg-primary/10" : "border-border")}>{m}</button>
            ))}
          </div>
        </Field>
        <Field label="Notes for AI"><Textarea placeholder="South-facing, harsh afternoon sun, pet-friendly…" rows={3} /></Field>
      </div>
    </div>
  );
}

function StepGenerate() {
  return (
    <div className="text-center py-8">
      <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground animate-fade-in">
        <Check className="h-7 w-7" />
      </div>
      <h1 className="font-display text-3xl mt-6">Your studio is ready</h1>
      <p className="text-muted-foreground mt-2 max-w-md mx-auto">We've prepared a workspace with curated assets, AI suggestions, and a starting layout based on your brief.</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
