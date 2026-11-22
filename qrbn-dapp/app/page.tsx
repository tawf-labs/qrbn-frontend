import HeroSection from "@/components/landing/HeroSection";
import ChooseSection from "@/components/landing/ChooseSection";
import StepsSection from "@/components/landing/StepsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CtaSection from "@/components/landing/CtaSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
	return (
		<div data-landing className="min-h-screen bg-tawf-stone">
			<HeroSection />
			<ChooseSection />
			<StepsSection />
			<FeaturesSection />
			<CtaSection />
			<LandingFooter />
		</div>
	);
}
