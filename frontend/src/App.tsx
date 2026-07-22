import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Divisions } from "@/components/Divisions";
import { Pricing } from "@/components/Pricing";
import { Prizes } from "@/components/Prizes";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Footer } from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Nav />
      <main>
        <Hero />
        <Divisions />
        <Pricing />
        <Prizes />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}