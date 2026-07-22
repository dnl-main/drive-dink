import { Link, useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Home } from "lucide-react";
import type { Registration } from "@/lib/schema";
import { DIVISIONS, CATEGORIES } from "@/lib/schema";

export default function Confirmation() {
  const location = useLocation();
  const state = location.state as { reg: Registration; receipt: string } | null;
  if (!state) return <Navigate to="/" replace />;
  const { reg, receipt } = state;
  const division = DIVISIONS.find((d) => d.id === reg.division)!;
  const category = CATEGORIES.find((c) => c.id === reg.category);

  return (
    <div className="min-h-screen bg-background px-4 py-12 font-sans text-foreground">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
          <CheckCircle2 className="mx-auto h-16 w-16 text-accent-foreground" />
          <h1 className="mt-4 font-display text-4xl text-primary md:text-6xl">You're in!</h1>
          <p className="mt-2 text-muted-foreground">
            Registration <span className="font-mono font-semibold text-primary">{reg.id}</span> confirmed.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            A copy of your receipt has been sent to{" "}
            <span className="font-semibold text-primary">{reg.player1.email}</span>.
          </p>

          <div className="mt-8 grid gap-2 rounded-2xl bg-secondary/50 p-5 text-left text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Division</span><span className="font-semibold text-primary">{division.label}</span></div>
            {category && (
              <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="font-semibold text-primary">{category.label}</span></div>
            )}
            <div className="flex justify-between"><span className="text-muted-foreground">Player 1</span><span className="font-semibold text-primary">{reg.player1.fullName}</span></div>
            {reg.player2 && (
              <div className="flex justify-between"><span className="text-muted-foreground">Player 2</span><span className="font-semibold text-primary">{reg.player2.fullName}</span></div>
            )}
            <div className="flex justify-between"><span className="text-muted-foreground">Amount paid</span><span className="font-semibold text-primary">₱{reg.fee.toLocaleString("en-PH")}.00</span></div>
          </div>

          <div className="mt-8">
            <img src={receipt} alt="Registration receipt" className="mx-auto w-full max-w-sm rounded-xl border border-border shadow-sm" />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={receipt} download={`${reg.id}-receipt.png`}>
                <Download className="mr-2 h-4 w-4" /> Download receipt
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/"><Home className="mr-2 h-4 w-4" /> Back to home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}