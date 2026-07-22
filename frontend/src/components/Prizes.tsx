import { Medal } from "lucide-react";

const prizes = [
  { label: "Gold", amount: "₱7,000", tint: "bg-[#e5b93b]" },
  { label: "Silver", amount: "₱5,000", tint: "bg-[#b8bcc4]" },
  { label: "Bronze", amount: "₱3,000", tint: "bg-[#c27a4d]" },
];

export function Prizes() {
  return (
    <section id="prizes" className="border-y border-border/60 bg-secondary/40 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-foreground/70">Cash prizes</p>
          <h2 className="mt-2 font-display text-4xl text-primary md:text-6xl">Play for the pot</h2>
          <p className="mt-3 text-sm text-muted-foreground">Awarded per division</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {prizes.map((p) => (
            <div key={p.label} className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${p.tint}`}>
                <Medal className="h-8 w-8 text-primary" strokeWidth={2.5} />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary/60">{p.label} Winners</div>
              <div className="mt-1 font-display text-5xl text-primary">{p.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}