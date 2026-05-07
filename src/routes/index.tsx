import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verdana — AI Balcony, Terrace & Garden Design Studio" },
      { name: "description", content: "Verdana is the AI-powered design platform for balconies, terraces and gardens. Sign in to your studio." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("designer@verdana.studio");
  const [password, setPassword] = useState("••••••••");
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="Modern terrace garden"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-foreground/70 via-foreground/30 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-background">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-background/15 backdrop-blur grid place-items-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-2xl">Verdana</span>
          </div>
          <div className="max-w-md space-y-4 animate-slide-up">
            <h1 className="font-display text-5xl leading-[1.05]">
              Design living spaces that breathe.
            </h1>
            <p className="text-background/80 text-lg">
              The AI studio for balconies, terraces, gardens & landscapes — built for design teams who care about the small things.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="flex lg:hidden items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground grid place-items-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-2xl">Verdana</span>
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-3xl">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Sign in to your studio workspace.</p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</button>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full h-11 rounded-xl">
              Enter studio <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
          <div className="text-center text-xs text-muted-foreground">
            New to Verdana?{" "}
            <Link to="/dashboard" className="text-foreground underline-offset-4 hover:underline">
              Request access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
