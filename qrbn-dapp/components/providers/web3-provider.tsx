"use client";

import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/client-config";
import { ConnectProvider } from "@/components/providers/connect-provider";

export function WalletProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	// The landing art reads window while rendering, so pages render in the browser only (as before).
	if (!mounted) return null;

	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<ConnectProvider>{children}</ConnectProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
