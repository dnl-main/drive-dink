import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2 font-display text-2xl tracking-wide text-primary">
          RALLY <span className="text-accent">2026</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-primary/80 md:flex">
          <a href="#divisions" className="hover:text-primary">Divisions</a>
          <a href="#pricing" className="hover:text-primary">Pricing</a>
          <a href="#prizes" className="hover:text-primary">Prizes</a>
          <a href="#faq" className="hover:text-primary">FAQ</a>
        </nav>
        <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <a href="#register">Register</a>
        </Button>
      </div>
    </header>
  );
}