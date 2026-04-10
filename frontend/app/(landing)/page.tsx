import { Metadata } from "next";
import CategoryBadges from "../components/landing/CategoryBadges";
import CTASection from "../components/landing/CTASection";
import Features from "../components/landing/Features";
import Hero from "../components/landing/Hero";
import Oruga from "../components/landing/Oruga";

export const metadata: Metadata = {
  description: "Descubre planes de deporte, cultura y ocio organizados por personas con tus mismos intereses."
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Oruga/>
      <CategoryBadges/>
      <Features/>
      <CTASection/>
    </main>
  );
}
