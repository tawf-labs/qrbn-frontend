import HeroSection from "@/components/landing/HeroSection";
import AnimalsSection from "@/components/landing/AnimalsSection";
import StepsSection from "@/components/landing/StepsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CtaSection from "@/components/landing/CtaSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
	return (
		<div data-landing className="min-h-screen bg-tawf-stone">
			<HeroSection />
			<AnimalsSection />
			<StepsSection />
			<FeaturesSection />
			<CtaSection />
			<LandingFooter />
		</div>
	);
}
