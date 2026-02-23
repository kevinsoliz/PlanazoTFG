import CategoryBadges from "./components/landing/CategoryBadges";
import CTASection from "./components/landing/CTASection";
import Features from "./components/landing/Features";
import Hero from "./components/landing/Hero";
import Oruga from "./components/landing/Oruga";

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
