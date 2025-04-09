
import { Shell } from "@/components/Shell";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TokenSection } from "@/components/home/TokenSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { MarketAnalyticsSection } from "@/components/home/MarketAnalyticsSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";

const Index = () => {
  return (
    <Shell hideHeader={true}>
      <HeroSection />
      <FeaturesSection />
      <TokenSection />
      <FeaturedProperties />
      <MarketAnalyticsSection />
      <CallToActionSection />
    </Shell>
  );
};

export default Index;
