"use client";

import { Award, Globe, HeartHandshake, Landmark, ShieldCheck, Wallet } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CONTAINER, Float, IsoGrid, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";

const features = [
	{
		icon: ShieldCheck,
		title: "On-Chain Transparency",
		description: "Every donation is tracked on the blockchain with accountability",
		label: "Security",
	},
	{
		icon: Award,
		title: "NFT Certificates",
		description: "Receive unique NFT certificates as immutable proof of your charitable contributions",
		label: "Verification",
	},
	{
		icon: Globe,
		title: "Global Access",
		description: "Open to supported wallets worldwide",
		label: "Inclusive",
	},
	{
		icon: HeartHandshake,
		title: "Sharia-aligned",
		description: "Designed to follow Sharia principles",
		label: "Trusted",
	},
	{
		icon: Landmark,
		title: "DAO Governance",
		description: "Community-driven decision making through decentralized autonomous organization",
		label: "Democratic",
	},
	{
		icon: Wallet,
		title: "Multi-Currency",
		description: "Support for IDRX and USDT with seamless currency conversion",
		label: "Flexible",
	},
];

export default function FeaturesSection() {
	const reduce = useReducedMotion();
	return (
		<section className="relative border-t border-tawf-line bg-tawf-glaze py-16 md:py-24">
			<IsoGrid cy="50%" r="60%" />
			<div className={`${CONTAINER} relative`}>
				<Reveal className="mx-auto mb-10 max-w-[46em] text-center md:mb-14">
					<p className="mb-[18px] inline-flex items-center gap-2.5 text-sm font-medium text-tawf-accent">
						<span className="size-[7px] rounded-full bg-tawf-accent" aria-hidden="true" />
						Why Choose Tawf Qurban
					</p>
					<RevealText
						as="h2"
						text="Built on Trust and Transparency"
						className="font-sans text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.06] tracking-[-0.03em] text-tawf-inkGreen"
					/>
				</Reveal>

				<Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, i) => (
						<StaggerItem
							key={feature.title}
							className="h-full"
						>
						<motion.div
							whileHover={reduce ? undefined : { y: -4 }}
							transition={{ type: "spring", stiffness: 260, damping: 22 }}
							className="h-full rounded-2xl border border-tawf-line bg-tawf-paper p-8 transition-colors hover:border-tawf-accent"
						>
							<span
								className="mb-6 flex size-14 items-center justify-center rounded-full border border-tawf-line bg-white"
								aria-hidden="true"
							>
								<Float as="span" amplitude={2.5} duration={5 + (i % 3)} delay={i * 0.4} className="flex"><feature.icon className="size-7 text-tawf-accent" /></Float>
							</span>
							<span className="text-xs font-medium uppercase tracking-widest text-tawf-honey">{feature.label}</span>
							<h3 className="mt-2 mb-3 font-sans text-xl font-medium tracking-[-0.03em] text-tawf-inkGreen">
								{feature.title}
							</h3>
							<p className="leading-[1.6] text-tawf-mutedGreen">{feature.description}</p>
						</motion.div>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
