import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import ProductShowcase from "./components/ProductShowcase";
import NutritionPillars from "./components/NutritionPillars";
import OnboardingRoadmap from "./components/OnboardingRoadmap";
import StatsGrid from "./components/StatsGrid";
import CarbonSection from "./components/CarbonSection";
import ProductsSection from "./components/ProductsSection";
import TrialsSection from "./components/TrialsSection";
import CommunitySection from "./components/CommunitySection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProblemSection />
        <ProductShowcase />
        <NutritionPillars />
        <OnboardingRoadmap />
        <StatsGrid />
        <CarbonSection />
        <ProductsSection />
        <TrialsSection />
        <CommunitySection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
