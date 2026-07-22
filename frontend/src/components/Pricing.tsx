import { Shirt, Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-foreground/70">Registration fee</p>
          <h2 className="mt-2 font-display text-4xl text-primary md:text-6xl">One flat rate</h2>
        </div>
        <div className="mt-10 grid gap-6 rounded-3xl border-2 border-primary bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <div className="font-display text-6xl text-primary md:text-8xl">
              ₱2,500
            </div>
            <div className="text-sm font-semibold uppercase tracking-widest text-primary/60">
              per pair (doubles) · per player (novice)
            </div>
            <div className="mt-6 flex items-center gap-3 text-primary">
              <Shirt className="h-6 w-6 text-accent-foreground" />
              <span className="font-semibold">Includes tournament t-shirt</span>
            </div>
          </div>
          <ul className="space-y-3 text-primary">
            {["Official tournament t-shirt (XS–XXL)", "Player wristband & ID", "Match play in your chosen division", "Access to all tournament amenities", "Eligibility for cash prizes"].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground" strokeWidth={3} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}