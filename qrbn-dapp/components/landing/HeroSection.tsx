"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Check, FileText } from "lucide-react";
import { CONTAINER, DrawnUnderline, HeroStage, IsoGrid, Magnetic } from "@/components/motion";
import QurbanRouteArt from "./art/QurbanRouteArt";

const EASE = [0.16, 1, 0.3, 1] as const;

const trustPoints = ["Sharia-aligned", "NFT certificates"];

export default function HeroSection() {
	const reduce = useReducedMotion();

	return (
		<section className="relative w-full bg-tawf-glaze pb-12">
			<IsoGrid cy="55%" r="60%" />
			<div className={`${CONTAINER} relative`}>
				<div className="grid items-center gap-8 py-8 md:py-10 lg:min-h-[70svh] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
					<motion.div
						initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{ duration: 0.8, ease: EASE }}
						className="transform-gpu pr-2 text-center md:text-left"
					>
						<motion.p
							initial={reduce ? false : { opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
							className="mb-5 inline-flex items-center gap-2.5 text-sm font-medium text-tawf-accent"
						>
							<span className="size-[7px] rounded-full bg-tawf-accent" aria-hidden="true" />
							Preview on Arbitrum Sepolia, test USDC only
						</motion.p>

						<motion.h1
							initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
							className="m-0 font-sans text-[clamp(40px,5.2vw,68px)] font-medium leading-[1.04] tracking-[-0.035em] text-tawf-inkGreen max-md:mx-auto"
						>
							Follow your qurban
							<br />
							from payment to <DrawnUnderline>proof</DrawnUnderline>
						</motion.h1>

						<motion.p
							initial={reduce ? false : { opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
							className="mx-auto mt-5 max-w-[32em] text-[clamp(16px,1.4vw,18.5px)] leading-[1.6] text-tawf-body md:mx-0"
						>
							<strong className="font-semibold text-tawf-inkGreen">
								Choose a goat, a sheep or a share of a cow.
							</strong>{" "}
							Part of TAWF Foundation&apos;s mission for transparent Islamic finance.
						</motion.p>

						<motion.div
							initial={reduce ? false : { opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
							className="mt-8 flex flex-wrap items-center justify-center gap-3.5 md:justify-start"
						>
							<Magnetic>
								<motion.a
									href="#animals"
									whileHover={reduce ? undefined : { y: -2, scale: 1.015 }}
									whileTap={reduce ? undefined : { scale: 0.98 }}
									className="group inline-flex h-12 items-center gap-2.5 rounded-xl bg-tawf-accent px-6 text-[15px] font-medium text-white shadow-sm shadow-tawf-accent/25 transition-colors hover:bg-tawf-accentDeep focus:outline-none focus-visible:ring-2 focus-visible:ring-tawf-accent focus-visible:ring-offset-2 focus-visible:ring-offset-tawf-glaze"
								>
									<span>See the animals</span>
									<ArrowDown className="size-4" aria-hidden="true" />
								</motion.a>
							</Magnetic>

							<motion.div whileHover={reduce ? undefined : { y: -2, scale: 1.015 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
								<Link
									href="/docs"
									className="group inline-flex h-12 items-center gap-2.5 rounded-xl border border-tawf-edge bg-tawf-paper px-6 text-[15px] font-medium text-tawf-inkGreen transition-colors hover:border-tawf-inkGreen focus:outline-none focus-visible:ring-2 focus-visible:ring-tawf-accent"
								>
									<FileText className="size-4 text-tawf-body transition-colors group-hover:text-tawf-inkGreen" />
									<span>Learn More</span>
									<ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
								</Link>
							</motion.div>
						</motion.div>

						<motion.ul
							initial={reduce ? false : { opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
							className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start"
						>
							{trustPoints.map((point) => (
								<li key={point} className="flex items-center gap-2 text-sm text-tawf-body">
									<Check className="size-4 text-tawf-honey" aria-hidden="true" />
									<span>{point}</span>
								</li>
							))}
						</motion.ul>
					</motion.div>

					<motion.div
						initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{ duration: 0.95, delay: 0.2, ease: EASE }}
						className="transform-gpu mx-auto w-full max-w-[680px] lg:-mt-8"
					>
						<HeroStage>
							<QurbanRouteArt />
						</HeroStage>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
