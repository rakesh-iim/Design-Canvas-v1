import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  LayoutTemplate,
  Wand2,
  Receipt,
  Presentation,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects/new", label: "New Project", icon: FolderKanban },
  { to: "/workspace", label: "Designer", icon: Wand2 },
  { to: "/templates", label: "Templates", icon: LayoutTemplate },
  { to: "/quotation", label: "Quotation", icon: Receipt },
  { to: "/presentation", label: "Present", icon: Presentation },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <Link to="/dashboard" className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="font-display text-lg leading-none">Verdana</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Garden Studio</div>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {items.map((it) => {
            const active = path.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/60">
            <Settings className="h-4 w-4" /> Settings
          </Link>
          <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-sidebar-accent/40">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-semibold">AS</div>
              <div className="text-xs leading-tight">
                <div className="font-medium">Aanya S.</div>
                <div className="text-muted-foreground">Lead designer</div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
