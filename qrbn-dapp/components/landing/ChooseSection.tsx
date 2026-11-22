"use client";

import Link from "next/link";
import { Award, ArrowRight, Check, HeartHandshake } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CONTAINER, Float, IsoGrid, Magnetic, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import WaqfVignette from "./art/WaqfVignette";
import QurbanVignette from "./art/QurbanVignette";

const paths = [
	{
		href: "/waqf",
		icon: HeartHandshake,
		title: "Waqf",
		description:
			"Support livestock farms through Islamic endowment (waqf), recorded on the blockchain. Create lasting impact.",
		points: ["Support verified farms", "Sustainable impact", "NFT certificates"],
		cta: "Explore Waqf",
		Art: WaqfVignette,
	},
	{
		href: "/qurban",
		icon: Award,
		title: "Qurban",
		description:
			"Take part in Qurban and follow your share. Choose between goat (full) or cow (1/7 share) and receive NFT proof.",
		points: ["Goat or Cow shares", "Real-time tracking", "NFT certificate"],
		cta: "Explore Qurban",
		Art: QurbanVignette,
	},
];

export default function ChooseSection() {
	const reduce = useReducedMotion();
	return (
		<section className="relative border-t border-tawf-line bg-tawf-stone py-16 md:py-24">
			<IsoGrid className="opacity-70" cy="55%" r="60%" />
			<div className={`${CONTAINER} relative`}>
				<Reveal className="mx-auto mb-10 max-w-[46em] text-center md:mb-14">
					<p className="mb-[18px] inline-flex items-center gap-2.5 text-sm font-medium text-tawf-accent">
						<span className="size-[7px] rounded-full bg-tawf-accent" aria-hidden="true" />
						Choose Your Path
					</p>
					<RevealText
						as="h2"
						text="How Would You Like to Contribute?"
						className="font-sans text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.06] tracking-[-0.03em] text-tawf-inkGreen"
					/>
				</Reveal>

				<Stagger className="grid gap-6 md:grid-cols-2 md:gap-8">
					{paths.map((option) => (
						<StaggerItem
							key={option.title}
							as="article"
							className="h-full"
						>
						<motion.div
							whileHover={reduce ? undefined : { y: -4 }}
							transition={{ type: "spring", stiffness: 260, damping: 22 }}
							className="flex h-full flex-col rounded-2xl border border-tawf-line bg-tawf-paper p-6 transition-colors hover:border-tawf-accent md:p-8"
						>
							<div className="mb-4 flex h-44 items-center justify-center" aria-hidden="true">
								<option.Art className="w-full max-w-[240px]" />
							</div>
							<div className="mb-5 flex items-center gap-4">
								<span
									className="flex size-14 shrink-0 items-center justify-center rounded-full border border-tawf-line bg-white"
									aria-hidden="true"
								>
									<Float as="span" amplitude={2.5} duration={5.5} className="flex"><option.icon className="size-6 text-tawf-accent" /></Float>
								</span>
								<h3 className="font-sans text-2xl font-medium tracking-[-0.03em] text-tawf-inkGreen">{option.title}</h3>
							</div>
							<p className="leading-[1.6] text-tawf-mutedGreen">{option.description}</p>
							<ul className="mt-5 space-y-3">
								{option.points.map((point) => (
									<li key={point} className="flex items-center gap-3 text-tawf-inkGreen">
										<Check className="size-5 shrink-0 text-tawf-honey" aria-hidden="true" />
										<span>{point}</span>
									</li>
								))}
							</ul>
							<div className="mt-auto pt-8">
								<Magnetic strength={6}>
									<Link
										href={option.href}
										className="group inline-flex h-12 items-center gap-2 text-sm font-medium text-tawf-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-tawf-accent"
									>
										{option.cta}
										<ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
									</Link>
								</Magnetic>
							</div>
						</motion.div>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
