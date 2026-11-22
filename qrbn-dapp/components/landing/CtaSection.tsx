"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";
import { CONTAINER, Magnetic, Reveal, RevealText, TurningPattern } from "@/components/motion";

export default function CtaSection() {
	const reduce = useReducedMotion();

	return (
		<section className="relative overflow-hidden border-t border-tawf-line bg-tawf-paper py-16 md:py-24">
			<TurningPattern />
			<div className={`${CONTAINER} relative z-10`}>
				<Reveal className="mx-auto max-w-[46em] text-center">
					<RevealText
						as="h2"
						text="Ready to Make a Difference?"
						className="font-sans text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.06] tracking-[-0.03em] text-tawf-inkGreen"
					/>
					<p className="mx-auto mt-5 max-w-[34em] text-[clamp(16px,1.4vw,18.5px)] leading-[1.6] text-tawf-mutedGreen">
						Support sustainable Qurban farms through blockchain-powered Waqf, and follow it from payment to proof.
					</p>

					<motion.div
						initial={reduce ? false : { opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
					>
						<Magnetic>
							<motion.div whileHover={reduce ? undefined : { y: -2, scale: 1.015 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
								<Link
									href="/qurban"
									className="group inline-flex h-12 items-center gap-2.5 rounded-xl bg-tawf-accent px-6 text-[15px] font-medium text-white shadow-sm shadow-tawf-accent/25 transition-colors hover:bg-tawf-accentDeep focus:outline-none focus-visible:ring-2 focus-visible:ring-tawf-accent focus-visible:ring-offset-2 focus-visible:ring-offset-tawf-paper"
								>
									<span>Get Started</span>
									<ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
								</Link>
							</motion.div>
						</Magnetic>

						<motion.div whileHover={reduce ? undefined : { y: -2, scale: 1.015 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
							<Link
								href="/docs"
								className="group inline-flex h-12 items-center gap-2.5 rounded-xl border border-tawf-line bg-white px-6 text-[15px] font-medium text-tawf-inkGreen transition-colors hover:border-tawf-inkGreen focus:outline-none focus-visible:ring-2 focus-visible:ring-tawf-accent"
							>
								<FileText className="size-4 text-tawf-mutedGreen transition-colors group-hover:text-tawf-inkGreen" />
								<span>Read Documentation</span>
							</Link>
						</motion.div>
					</motion.div>
				</Reveal>
			</div>
		</section>
	);
}
