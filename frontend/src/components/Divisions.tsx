import { User, Users, UserRound } from "lucide-react";

const items = [
  { icon: User, title: "Non-Gender Novice", note: "Solo entry · Open to all", pill: "New players" },
  { icon: Users, title: "Mixed Doubles", note: "1 man + 1 woman per pair", pill: "Doubles" },
  { icon: UserRound, title: "Women's Doubles", note: "2 women per pair", pill: "Doubles" },
  { icon: Users, title: "Men's Doubles", note: "2 men per pair", pill: "Doubles" },
];

export function Divisions() {
  return (
    <section id="divisions" className="border-y border-border/60 bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-foreground/70">
            Four divisions
          </p>
          <h2 className="mt-2 font-display text-4xl text-primary md:text-6xl">Pick your court</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, note, pill }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Icon className="h-8 w-8 text-primary" strokeWidth={2.5} />
              </div>
              <div className="mt-4 inline-block rounded-full bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary/70">
                {pill}
              </div>
              <h3 className="mt-3 font-display text-2xl text-primary">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}