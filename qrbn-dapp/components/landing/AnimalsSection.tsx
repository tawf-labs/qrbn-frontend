"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CONTAINER, IsoGrid, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import PastureArt, { type AnimalKind } from "./art/PastureArt";

const animals: { kind: AnimalKind; title: string; who: string; description: string; points: string[]; cta: string }[] = [
	{
		kind: "goat",
		title: "Goat",
		who: "For one person",
		description: "A full sacrifice in one name.",
		points: ["One goat, one person", "NFT certificate as proof"],
		cta: "View goats",
	},
	{
		kind: "sheep",
		title: "Sheep",
		who: "For one person",
		description: "A full sacrifice in one name.",
		points: ["One sheep, one person", "NFT certificate as proof"],
		cta: "View sheep",
	},
	{
		kind: "cow",
		title: "Cow",
		who: "For up to seven people",
		description: "Shared in seven equal parts. Take one share, or more.",
		points: ["Each share is 1/7 of the cow", "NFT certificate as proof"],
		cta: "View cows",
	},
];

export default function AnimalsSection() {
	const reduce = useReducedMotion();
	return (
		<section id="animals" className="relative scroll-mt-20 border-t border-tawf-edge bg-tawf-paper py-16 md:py-24">
			<IsoGrid className="opacity-70" cy="55%" r="60%" />
			<div className={`${CONTAINER} relative`}>
				<Reveal className="mx-auto mb-10 max-w-[46em] text-center md:mb-14">
					<p className="mb-[18px] inline-flex items-center gap-2.5 text-sm font-medium text-tawf-accent">
						<span className="size-[7px] rounded-full bg-tawf-accent" aria-hidden="true" />
						Choose your animal
					</p>
					<RevealText
						as="h2"
						text="Goat, sheep or cow"
						className="font-sans text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.06] tracking-[-0.03em] text-tawf-inkGreen"
					/>
				</Reveal>

				<Stagger className="grid gap-6 md:grid-cols-3">
					{animals.map((animal, i) => (
						<StaggerItem key={animal.title} as="article" className="h-full">
							<motion.div
								whileHover={reduce ? undefined : { y: -4 }}
								transition={{ type: "spring", stiffness: 260, damping: 22 }}
								className="flex h-full flex-col overflow-hidden rounded-2xl border border-tawf-edge bg-white transition-colors hover:border-tawf-accent"
							>
								<div className="flex items-center justify-center bg-tawf-glaze px-6 pb-4 pt-8" aria-hidden="true">
									<PastureArt kind={animal.kind} shares={animal.kind === "cow"} delay={i * 1.1} className="max-w-[300px]" />
								</div>
								<div className="flex flex-1 flex-col p-6 md:p-8">
									<p className="text-sm font-medium text-tawf-honey">{animal.who}</p>
									<h3 className="mt-1 font-sans text-2xl font-medium tracking-[-0.03em] text-tawf-inkGreen">{animal.title}</h3>
									<p className="mt-3 leading-[1.6] text-tawf-body">{animal.description}</p>
									<ul className="mt-5 space-y-3">
										{animal.points.map((point) => (
											<li key={point} className="flex items-start gap-3 text-tawf-inkGreen">
												<Check className="mt-0.5 size-5 shrink-0 text-tawf-honey" aria-hidden="true" />
												<span>{point}</span>
											</li>
										))}
									</ul>
									<div className="mt-auto pt-6">
										<Link
											href="/qurban"
											className="group inline-flex h-12 items-center gap-2 text-sm font-medium text-tawf-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-tawf-accent"
										>
											{animal.cta}
											<ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
										</Link>
									</div>
								</div>
							</motion.div>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
