import { Button } from "@/components/ui/button";
import { PaddlesGraphic } from "./PaddlesGraphic";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 text-center md:pt-24 md:pb-32">
        <div className="mx-auto mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
          <span className="h-px w-10 bg-accent" />
          This September
          <span className="h-px w-10 bg-accent" />
        </div>
        <h1 className="font-display text-6xl leading-[0.9] text-primary md:text-[9rem]">
          Rally<br />Together
          <span className="block text-accent">2026</span>
        </h1>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-lg font-semibold uppercase tracking-[0.25em] text-primary md:text-2xl">
          <span className="h-px w-8 bg-accent" />
          Drive &amp; Dink
          <span className="h-px w-8 bg-accent" />
        </div>
        <PaddlesGraphic className="mx-auto mt-8 h-48 w-auto md:h-60" />
        <p className="mx-auto mt-4 max-w-xl text-base text-primary/70">
          The pickleball tournament of the year. Four divisions, cash prizes, a
          tournament t-shirt for every player, and the best rallies you'll play
          all season.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#register">Register Your Pair</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
            <a href="#divisions">See Divisions</a>
          </Button>
        </div>
      </div>
    </section>
  );
}