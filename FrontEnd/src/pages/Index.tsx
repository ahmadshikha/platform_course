import { Header } from "@/components/Header";
import { CategoryNavigation } from "../components/CategoryNavigation";
import { HeroBanner } from "@/components/HeroBanner";
import { ProgramGrid } from "@/components/ProgramGrid";
import { NewsSection } from "@/components/NewsSection";
import { LocationsSection } from "@/components/LocationsSection";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNavigation />
      <HeroBanner />
      <ProgramGrid />
      <NewsSection />
      <MapSection />
      {/* // <LocationsSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
