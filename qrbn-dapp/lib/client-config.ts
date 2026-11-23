import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { CHAIN } from "./contracts";

// Without a WalletConnect project ID, only browser wallets are offered.
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const wagmiConfig = createConfig({
	chains: [CHAIN],
	connectors: [
		injected(),
		...(projectId && typeof window !== "undefined" ? [walletConnect({ projectId, showQrModal: true })] : []),
	],
	transports: { [CHAIN.id]: http() },
	ssr: true,
});
