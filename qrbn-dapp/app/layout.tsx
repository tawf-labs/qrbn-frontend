import type React from "react";
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { WalletProvider } from "@/components/providers/web3-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-cormorant",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Tawf Qurban | Goats, sheep and cows",
	description: "Choose a goat, a sheep or a share of a cow, and follow your qurban from payment to proof. A preview on Arbitrum Sepolia with test USDC.",
	icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
			<body className="font-sans antialiased">
				<WalletProvider>
						<div className="min-h-screen bg-tawf-sand text-tawf-ink">
							<Navigation />
							<main>{children}</main>
						</div>
						<Toaster />
				</WalletProvider>
			</body>
		</html>
	);
}
