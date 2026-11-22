import Link from "next/link";

const platformLinks = [
	{ href: "/waqf", label: "Waqf" },
	{ href: "/qurban", label: "Qurban" },
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dao", label: "DAO" },
];

const resourceLinks = [
	{ href: "/docs", label: "Documentation" },
	{ href: "/faq", label: "FAQ" },
	{ href: "/vendor", label: "For Vendors" },
];

export default function LandingFooter() {
	return (
		<footer className="bg-tawf-inkGreen py-16 text-white/60 border-t border-white/10" role="contentinfo">
			<div className="mx-auto max-w-7xl px-6">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-4">
					<div className="md:col-span-2">
						<span className="relative block h-14 w-44 overflow-hidden" aria-hidden="true">
							<img
								src="/images/tawflogo.png"
								alt=""
								className="absolute left-1/2 top-1/2 h-[230px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
							/>
						</span>
						<h3 className="sr-only">Tawf Qurban</h3>
						<p className="max-w-sm text-sm leading-relaxed mt-3">
							Blockchain-powered Qurban and Waqf platform by TAWF Foundation. Transparent, sustainable, and Sharia-aligned.
						</p>
					</div>

					<div>
						<h4 className="mb-6 text-xs font-medium uppercase tracking-widest text-white">Platform</h4>
						<ul className="space-y-2 text-sm">
							{platformLinks.map((link) => (
								<li key={link.href}>
									<Link href={link.href} className="inline-block py-1.5 transition-colors hover:text-tawf-accent">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="mb-6 text-xs font-medium uppercase tracking-widest text-white">Resources</h4>
						<ul className="space-y-2 text-sm">
							{resourceLinks.map((link) => (
								<li key={link.href}>
									<Link href={link.href} className="inline-block py-1.5 transition-colors hover:text-tawf-accent">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs md:flex-row">
					<p>&copy; 2026 Tawf Qurban. Built with Islamic principles at heart</p>
				</div>
			</div>
		</footer>
	);
}
