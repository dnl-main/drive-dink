import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Circle, Mail } from "lucide-react";

const faqs = [
  { q: "When is the tournament?", a: "September 2026. Exact dates and venue will be sent to registered players via email." },
  { q: "Can I register as a solo player?", a: "Only the Non-Gender Novice division accepts solo entries. All other divisions require a partner." },
  { q: "How do I pay?", a: "Payment is via GCash. Send ₱2,500 to the number shown in the registration form and enter your GCash reference number." },
  { q: "What if my partner cancels?", a: "Contact us within 7 days of registration to swap a partner or request a refund." },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div id="faq" className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-center font-display text-4xl md:text-5xl">Frequently asked</h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`} className="border-primary-foreground/20">
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-primary-foreground/80">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm md:flex-row">
          <div className="font-display text-xl tracking-wide">
            RALLY <span className="text-accent">2026</span>
          </div>
          <div className="flex items-center gap-4 text-primary-foreground/80">
            <a href="mailto:rallytogether2026@example.com" className="flex items-center gap-1 hover:text-accent">
              <Mail className="h-4 w-4" /> Email
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-accent"><Circle className="h-4 w-4" /> Instagram</a>
            <a href="#" className="flex items-center gap-1 hover:text-accent"><Circle className="h-4 w-4" /> Facebook</a>
          </div>
          <div className="text-primary-foreground/60">© 2026 Rally Together</div>
        </div>
      </div>
    </footer>
  );
}