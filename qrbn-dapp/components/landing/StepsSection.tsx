"use client";

import { Award, HeartHandshake, MousePointerClick, Scissors, Wallet } from "lucide-react";
import { CONTAINER, IsoGrid, Reveal, RevealText, StickySteps } from "@/components/motion";
import StepTimeline from "./art/StepTimeline";

const steps = [
	{
		step: "01",
		title: "Choose",
		desc: "Choose your animal with detailed information: a goat for a full sacrifice, or a 1/7 share of a cow.",
		icon: <MousePointerClick className="w-6 h-6" />,
	},
	{
		step: "02",
		title: "Pay",
		desc: "Pay for your share with support for IDRX and USDT and seamless currency conversion.",
		icon: <Wallet className="w-6 h-6" />,
	},
	{
		step: "03",
		title: "Sacrifice",
		desc: "Your selected animal is sacrificed for Eid al-Adha.",
		icon: <Scissors className="w-6 h-6" />,
	},
	{
		step: "04",
		title: "Distribution",
		desc: "Your contribution helps provide meat to families in need during Eid al-Adha.",
		icon: <HeartHandshake className="w-6 h-6" />,
	},
	{
		step: "05",
		title: "Proof",
		desc: "Receive an NFT certificate as proof, minted upon completion.",
		icon: <Award className="w-6 h-6" />,
	},
];

export default function StepsSection() {
	return (
		<section className="relative border-t border-tawf-line bg-tawf-paper py-16 md:py-24">
			<IsoGrid cy="40%" r="65%" />
			<div className={`${CONTAINER} relative`}>
				<Reveal className="mx-auto mb-10 max-w-[46em] text-center md:mb-14">
					<p className="mb-[18px] inline-flex items-center gap-2.5 text-sm font-medium text-tawf-accent">
						<span className="size-[7px] rounded-full bg-tawf-accent" aria-hidden="true" />
						How it works
					</p>
					<RevealText
						as="h2"
						text="From selection to proof"
						className="font-sans text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.06] tracking-[-0.03em] text-tawf-inkGreen"
					/>
					<p className="mx-auto mt-5 max-w-[34em] leading-[1.6] text-tawf-mutedGreen">
						Every step of your qurban, from the animal you pick to the certificate you keep.
					</p>
				</Reveal>

				<StickySteps steps={steps} fallback={<StepTimeline steps={steps} />} />
			</div>
		</section>
	);
}
