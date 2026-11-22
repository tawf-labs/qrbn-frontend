"use client";

import { Award, HeartHandshake, ShieldCheck, Wallet } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CONTAINER, Float, IsoGrid, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";

const features = [
	{
		icon: ShieldCheck,
		title: "On-chain transparency",
		description: "Each qurban is recorded on the blockchain",
		label: "Security",
	},
	{
		icon: Award,
		title: "NFT certificates",
		description: "A unique certificate as proof of your qurban",
		label: "Verification",
	},
	{
		icon: HeartHandshake,
		title: "Sharia-aligned",
		description: "Designed to follow Sharia principles",
		label: "Trusted",
	},
	{
		icon: Wallet,
		title: "Two currencies",
		description: "Prices in IDRX and USDT",
		label: "Flexible",
	},
];

export default function FeaturesSection() {
	const reduce = useReducedMotion();
	return (
		<section className="relative bg-tawf-inkGreen py-16 md:py-24">
			<IsoGrid className="opacity-10" cy="50%" r="60%" />
			<div className={`${CONTAINER} relative`}>
				<Reveal className="mx-auto mb-10 max-w-[46em] text-center md:mb-14">
					<p className="mb-[18px] inline-flex items-center gap-2.5 text-sm font-medium text-tawf-butter">
						<span className="size-[7px] rounded-full bg-tawf-butter" aria-hidden="true" />
						Why Tawf Qurban
					</p>
					<RevealText
						as="h2"
						text="Built on trust and transparency"
						className="font-sans text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.06] tracking-[-0.03em] text-white"
					/>
				</Reveal>

				<Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{features.map((feature, i) => (
						<StaggerItem
							key={feature.title}
							className="h-full"
						>
						<motion.div
							whileHover={reduce ? undefined : { y: -4 }}
							transition={{ type: "spring", stiffness: 260, damping: 22 }}
							className="h-full rounded-2xl border border-transparent bg-tawf-paper p-7 transition-colors hover:border-tawf-accent"
						>
							<span
								className="mb-6 flex size-14 items-center justify-center rounded-full border border-tawf-edge bg-white"
								aria-hidden="true"
							>
								<Float as="span" amplitude={2.5} duration={5 + (i % 3)} delay={i * 0.4} className="flex"><feature.icon className="size-7 text-tawf-accent" /></Float>
							</span>
							<span className="text-xs font-medium uppercase tracking-widest text-tawf-honey">{feature.label}</span>
							<h3 className="mt-2 mb-3 font-sans text-xl font-medium tracking-[-0.03em] text-tawf-inkGreen">
								{feature.title}
							</h3>
							<p className="leading-[1.6] text-tawf-body">{feature.description}</p>
						</motion.div>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
