import { Metadata } from "next";
import CategoryBadges from "../components/landing/CategoryBadges";
import CTASection from "../components/landing/CTASection";
import Features from "../components/landing/Features";
import Hero from "../components/landing/Hero";
import Oruga from "../components/landing/Oruga";

export const metadata: Metadata = {
  title: "Planazo - Encuentra planes y amigos con los mismos gustos",
  description: "Descubre planes de deporte, cultura y ocio organizados por amigos con tus mismos gustos.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Oruga />
      <CategoryBadges />
      <Features />
      <CTASection />
    </main>
  );
}
