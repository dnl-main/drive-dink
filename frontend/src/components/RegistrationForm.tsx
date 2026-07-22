import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { User, Users, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DIVISIONS,
  SHIRT_SIZES,
  CATEGORIES,
  SLOTS_LEFT,
  registrationSchema,
  type RegistrationInput,
  type DivisionId,
} from "@/lib/schema";
import { generateReceipt, saveRegistration } from "@/lib/registration";

const DIVISION_META: Record<DivisionId, { icon: typeof User; blurb: string }> = {
  novice: { icon: User, blurb: "Solo entry · open to all first-timers" },
  mixed: { icon: Users, blurb: "1 man + 1 woman per pair" },
  womens: { icon: UserRound, blurb: "2 women per pair" },
  mens: { icon: Users, blurb: "2 men per pair" },
};

function divisionSlotsLeft(divisionId: DivisionId) {
  const cats = SLOTS_LEFT[divisionId];
  return cats.novice + cats.intermediate + cats.advanced;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-primary/70">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function PlayerFields({ prefix, register, errors }: { prefix: "player1" | "player2"; register: any; errors: any }) {
  const err = errors?.[prefix] ?? {};
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Full name" error={err.fullName?.message}>
        <Input {...register(`${prefix}.fullName`)} placeholder="Juan Dela Cruz" />
      </Field>
      <Field label="Email" error={err.email?.message}>
        <Input type="email" {...register(`${prefix}.email`)} placeholder="juan@example.com" />
      </Field>
      <Field label="Mobile" error={err.phone?.message}>
        <Input {...register(`${prefix}.phone`)} placeholder="09XXXXXXXXX" inputMode="tel" />
      </Field>
      <Field label="T-shirt size" error={err.shirtSize?.message}>
        <select
          {...register(`${prefix}.shirtSize`)}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
          defaultValue=""
        >
          <option value="" disabled>Select size</option>
          {SHIRT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
    </div>
  );
}

export function RegistrationForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      division: undefined as any,
      category: undefined as any,
      agree: undefined as any,
    },
  });

  const division = watch("division");
  const category = watch("category");
  const agree = watch("agree");
  const isSolo = useMemo(() => DIVISIONS.find((d) => d.id === division)?.solo, [division]);
  const fee = 2500;
  const selectedDivision = DIVISIONS.find((d) => d.id === division);

  const onSubmit = async (data: RegistrationInput) => {
    const payload = { ...data };
    if (isSolo) payload.player2 = undefined;
    const reg = saveRegistration(payload);
    const receipt = generateReceipt(reg);
    toast.success("Registration confirmed!");
    navigate("/confirmation", { state: { reg, receipt } });
  };

  return (
    <section id="register" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-foreground/70">Sign up</p>
          <h2 className="mt-2 font-display text-4xl text-primary md:text-6xl">Reserve your slot</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Pick a division, choose your skill category, then pay via GCash to lock it in.
          </p>
        </div>

        {/* Division cards */}
        <div className="mt-10">
          <div className="flex items-end justify-between">
            <Label className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              1. Pick your division
            </Label>
            {errors.division && (
              <p className="text-xs text-destructive">Please choose a division</p>
            )}
          </div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DIVISIONS.map((d) => {
              const meta = DIVISION_META[d.id];
              const Icon = meta.icon;
              const total = divisionSlotsLeft(d.id);
              const soldOut = total === 0;
              const low = total > 0 && total <= 4;
              const active = division === d.id;
              return (
                <button
                  type="button"
                  key={d.id}
                  disabled={soldOut}
                  onClick={() => {
                    setValue("division", d.id as any, { shouldValidate: true });
                    // reset category so user must reconfirm availability for the new division
                    setValue("category", undefined as any, { shouldValidate: false });
                  }}
                  className={cn(
                    "group relative rounded-2xl border bg-card p-5 text-left shadow-sm transition",
                    "hover:-translate-y-0.5 hover:shadow-md",
                    active
                      ? "border-primary ring-2 ring-primary/60 bg-accent/10"
                      : "border-border",
                    soldOut && "opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-sm",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent">
                      <Icon className="h-5 w-5 text-primary" strokeWidth={2.5} />
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                        soldOut
                          ? "bg-destructive/10 text-destructive"
                          : low
                            ? "bg-orange-100 text-orange-700"
                            : "bg-primary/10 text-primary/70",
                      )}
                    >
                      {soldOut ? "Full" : low ? `${total} left` : `${total} slots`}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl leading-tight text-primary">
                    {d.label}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{meta.blurb}</p>
                  <p className="mt-3 text-xs font-semibold text-primary">
                    ₱{d.fee.toLocaleString("en-PH")} {d.solo ? "/ player" : "/ pair"}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {!selectedDivision ? (
          <p className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
            Select a division above to continue.
          </p>
        ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
          {/* Category */}
          <div>
            <div className="flex items-end justify-between">
              <Label className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                2. Skill category · {selectedDivision.label}
              </Label>
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category.message as string}</p>
              )}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {CATEGORIES.map((c) => {
                const left = SLOTS_LEFT[selectedDivision.id][c.id];
                const soldOut = left === 0;
                const low = left > 0 && left <= 2;
                const active = category === c.id;
                return (
                  <button
                    type="button"
                    key={c.id}
                    disabled={soldOut}
                    onClick={() => setValue("category", c.id as any, { shouldValidate: true })}
                    className={cn(
                      "rounded-xl border bg-background p-4 text-left transition",
                      active
                        ? "border-primary ring-2 ring-primary/60 bg-accent/10"
                        : "border-border hover:border-primary/50",
                      soldOut && "opacity-60 cursor-not-allowed hover:border-border",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg text-primary">{c.label}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                          soldOut
                            ? "bg-destructive/10 text-destructive"
                            : low
                              ? "bg-orange-100 text-orange-700"
                              : "bg-primary/10 text-primary/70",
                        )}
                      >
                        {soldOut ? "Full" : `${left} left`}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Player 1 */}
          <div>
            <h3 className="font-display text-2xl text-primary">Player 1</h3>
            <div className="mt-4">
              <PlayerFields prefix="player1" register={register} errors={errors} />
            </div>
          </div>

          {/* Player 2 */}
          {!isSolo && (
            <div>
              <h3 className="font-display text-2xl text-primary">Player 2 (partner)</h3>
              <div className="mt-4">
                <PlayerFields prefix="player2" register={register} errors={errors} />
              </div>
            </div>
          )}

          {/* Emergency */}
          <div>
            <h3 className="font-display text-2xl text-primary">Emergency contact <span className="text-sm font-normal text-muted-foreground">(optional)</span></h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Contact name">
                <Input {...register("emergencyName")} placeholder="Maria Dela Cruz" />
              </Field>
              <Field label="Contact mobile">
                <Input {...register("emergencyPhone")} placeholder="09XXXXXXXXX" inputMode="tel" />
              </Field>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border-2 border-dashed border-accent bg-accent/10 p-5">
            <h3 className="font-display text-2xl text-primary">Payment · GCash</h3>
            <p className="mt-1 text-sm text-primary/80">
              Send <span className="font-semibold">₱{fee.toLocaleString("en-PH")}.00</span> to
              <span className="mx-1 font-mono font-semibold">0917-000-2026</span>
              (Rally Together). Then enter your GCash reference number below.
            </p>
            <div className="mt-4">
              <Field label="GCash reference number" error={errors.gcashReference?.message}>
                <Input {...register("gcashReference")} placeholder="e.g. 1234567890123" />
              </Field>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="agree"
              checked={!!agree}
              onCheckedChange={(v) => setValue("agree", v === true ? true : (undefined as any), { shouldValidate: true })}
            />
            <Label htmlFor="agree" className="text-sm font-normal leading-relaxed text-primary/80">
              I confirm all information is accurate and agree to the tournament rules and refund policy.
            </Label>
          </div>
          {errors.agree && <p className="-mt-6 text-xs text-destructive">{errors.agree.message as string}</p>}

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {isSubmitting ? "Submitting…" : `Complete Registration · ₱${fee.toLocaleString("en-PH")}`}
          </Button>
        </form>
        )}
      </div>
    </section>
  );
}