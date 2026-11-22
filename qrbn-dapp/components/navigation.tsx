"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, X, DollarSign, User, Wallet, Copy, Check, LogOut } from "lucide-react";
import { CHAIN } from "@/lib/contracts";
import { useConnectDialog } from "@/components/providers/connect-provider";
import { useAccount, useDisconnect } from "wagmi";
import { useTokenBalance } from "@/hooks/use-token-balance";

export function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const { address, isConnected, chain } = useAccount();
	const { disconnect } = useDisconnect();
	const { open } = useConnectDialog();
	const { displayBalance } = useTokenBalance();

	const copyAddress = async () => {
		if (address) {
			await navigator.clipboard.writeText(address);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	const connectWallet = () => {
		setIsOpen(false);
		open();
	};

	const navLinks = [
		{ href: "/#animals", label: "Animals" },
		{ href: "/qurban", label: "Browse" },
		{ href: "/docs", label: "Docs" },
		{ href: "/faq", label: "FAQ" },
	];


	const linkClass =
		"text-sm font-medium tracking-tight text-tawf-ink/85 hover:text-tawf-accent transition-colors";

	return (
		<nav className="border-b border-tawf-edge bg-tawf-stone/90 backdrop-blur-md sticky top-0 z-50" role="navigation" aria-label="Main navigation">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					<Link href="/" className="flex items-center gap-3" aria-label="Tawf Qurban home">
						<span className="relative block h-11 w-32 overflow-hidden" aria-hidden="true">
							<img
								src="/images/tawfmark.png"
								alt=""
								className="absolute left-1/2 top-1/2 h-[170px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 invert"
							/>
						</span>
						<span className="text-lg font-medium tracking-[-0.03em] text-tawf-inkGreen">Qurban</span>
					</Link>

					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link key={link.href} href={link.href} className={linkClass}>
								{link.label}
							</Link>
						))}

						{/* Wallet Connection and User Profile */}
						{!isConnected ? (
							<Button
								onClick={connectWallet}
								className="h-10 rounded-xl bg-tawf-accent px-5 text-white hover:bg-tawf-accentDeep"
							>
								<Wallet className="h-4 w-4 mr-2" />
								<span className="text-sm font-medium">Connect</span>
							</Button>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="relative h-11 w-11 rounded-full border border-tawf-green/20 hover:border-tawf-gold transition-colors">
										<Avatar className="h-9 w-9">
											<AvatarFallback className="bg-tawf-green/10 text-tawf-green">
												<User className="h-5 w-5" />
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-80 bg-white border-tawf-green/10 text-tawf-ink shadow-lg" align="end">
									<DropdownMenuLabel className="text-tawf-green font-heading">Wallet Information</DropdownMenuLabel>
									<DropdownMenuSeparator className="bg-tawf-green/10" />

									{/* Wallet Address */}
									<DropdownMenuItem
										className="flex items-center justify-between hover:bg-tawf-sand cursor-pointer"
										onClick={copyAddress}
									>
										<div className="flex items-center space-x-2">
											<Wallet className="h-4 w-4 text-tawf-green" />
											<span className="text-sm">{formatAddress(address!)}</span>
										</div>
										{copied ? <Check className="h-4 w-4 text-tawf-green" /> : <Copy className="h-4 w-4 text-tawf-body" />}
									</DropdownMenuItem>

									{/* Chain Information */}
									<DropdownMenuItem className="flex items-center justify-between hover:bg-tawf-sand">
										<div className="flex items-center space-x-2">
											<div className="w-2 h-2 rounded-full bg-tawf-green"></div>
											<span className="text-sm">Network</span>
										</div>
										<Badge className="bg-tawf-green/10 text-tawf-green border-0">{chain?.name ?? `Switch to ${CHAIN.name}`}</Badge>
									</DropdownMenuItem>

									{/* Wallet Balance */}
									<DropdownMenuItem className="flex items-center justify-between hover:bg-tawf-sand">
										<div className="flex items-center space-x-2">
											<DollarSign className="h-4 w-4 text-tawf-gold" />
											<span className="text-sm">Balance</span>
										</div>
										<span className="text-tawf-green font-semibold">{displayBalance} USDC</span>
									</DropdownMenuItem>

									<DropdownMenuSeparator className="bg-tawf-green/10" />

									{/* Disconnect */}
									<DropdownMenuItem
										className="flex items-center space-x-2 hover:bg-red-50 text-red-500 cursor-pointer"
										onClick={() => disconnect()}
									>
										<LogOut className="h-4 w-4" />
										<span>Disconnect Wallet</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>

					<div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsOpen(!isOpen)}
							aria-label={isOpen ? "Close menu" : "Open menu"}
							aria-expanded={isOpen}
							className="text-tawf-ink hover:bg-tawf-green/10 min-h-11 min-w-11"
						>
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>
				</div>

				{isOpen && (
					<div className="md:hidden py-6 space-y-4 border-t border-tawf-green/10">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="block min-h-11 py-3 text-sm font-medium tracking-tight text-tawf-ink/85 hover:text-tawf-accent transition-colors"
								onClick={() => setIsOpen(false)}
							>
								{link.label}
							</Link>
						))}

						{/* Mobile Wallet Section */}
						{!isConnected ? (
							<div className="pt-2">
								<Button
									onClick={connectWallet}
									className="w-full min-h-11 rounded-xl bg-tawf-accent px-5 text-white hover:bg-tawf-accentDeep"
								>
									<Wallet className="h-4 w-4 mr-2" />
									<span className="text-sm font-medium">Connect</span>
								</Button>
							</div>
						) : (
							<div className="pt-4 space-y-4 border-t border-tawf-green/10">
								{/* Mobile Wallet Info */}
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-sm text-tawf-body">Wallet Address</span>
										<div className="flex items-center space-x-2">
											<span className="text-sm text-tawf-ink">{formatAddress(address!)}</span>
											<Button
												size="sm"
												variant="ghost"
												onClick={copyAddress}
												className="h-8 w-8 p-0 text-tawf-ink hover:text-tawf-green"
											>
												{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
											</Button>
										</div>
									</div>

									<div className="flex items-center justify-between">
										<span className="text-sm text-tawf-body">Network</span>
										<Badge className="bg-tawf-green/10 text-tawf-green border-0">{chain?.name ?? `Switch to ${CHAIN.name}`}</Badge>
									</div>

									<div className="flex items-center justify-between">
										<span className="text-sm text-tawf-body">Balance</span>
										<span className="text-sm text-tawf-green font-semibold">{displayBalance} USDC</span>
									</div>
								</div>

								{/* Mobile Disconnect */}
								<Button
									variant="outline"
									onClick={() => disconnect()}
									className="w-full border-red-200 text-red-500 hover:bg-red-50 bg-transparent rounded-full"
								>
									<LogOut className="h-4 w-4 mr-2" />
									Disconnect Wallet
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</nav>
	);
}
