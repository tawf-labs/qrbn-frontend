"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Wallet } from "lucide-react";
import { useConnect, type Connector } from "wagmi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CHAIN } from "@/lib/contracts";

const ConnectContext = createContext<{ open: () => void }>({ open: () => {} });

export const useConnectDialog = () => useContext(ConnectContext);

export function ConnectProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [hasInjected, setHasInjected] = useState(false);
	const { connectors, connect, isPending, error, reset } = useConnect();

	const open = () => {
		reset();
		setHasInjected("ethereum" in window);
		setIsOpen(true);
	};

	// Wallets that announce themselves appear by name; the generic entry is the fallback.
	const named = connectors.filter((c) => c.type === "injected" && c.id !== "injected");
	const options = connectors.filter((c) => c.id !== "injected" || (named.length === 0 && hasInjected));
	const label = (c: Connector) => (c.id === "injected" ? "Browser wallet" : c.name);

	const choose = (connector: Connector) => {
		// WalletConnect shows its own QR window, which must not sit under this dialog
		if (connector.type === "walletConnect") setIsOpen(false);
		connect({ connector, chainId: CHAIN.id }, { onSuccess: () => setIsOpen(false) });
	};

	return (
		<ConnectContext.Provider value={{ open }}>
			{children}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="max-w-sm rounded-2xl border-tawf-edge bg-white text-tawf-ink">
					<DialogHeader>
						<DialogTitle className="text-tawf-inkGreen">Connect your wallet</DialogTitle>
						<DialogDescription className="text-tawf-body">
							Tawf Qurban runs on {CHAIN.name}, a test network.
						</DialogDescription>
					</DialogHeader>

					{options.length > 0 ? (
						<div className="space-y-2">
							{options.map((connector) => (
								<button
									key={connector.uid}
									type="button"
									disabled={isPending}
									onClick={() => choose(connector)}
									className="flex min-h-12 w-full items-center gap-3 rounded-xl border border-tawf-edge px-4 text-left text-sm font-medium hover:border-tawf-accent disabled:opacity-60"
								>
									{connector.icon ? (
										<img src={connector.icon.trim()} alt="" className="h-6 w-6" />
									) : (
										<Wallet className="h-5 w-5 text-tawf-accent" aria-hidden="true" />
									)}
									{label(connector)}
								</button>
							))}
						</div>
					) : (
						<p className="text-sm text-tawf-body">
							No wallet found in this browser. Install one such as MetaMask, or open this page inside your wallet
							app, then try again.
						</p>
					)}

					{error && (
						<p role="alert" className="text-sm text-red-700">
							The wallet did not connect. Please try again.
						</p>
					)}
				</DialogContent>
			</Dialog>
		</ConnectContext.Provider>
	);
}
