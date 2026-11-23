import type { Address } from "viem";
import { arbitrumSepolia } from "viem/chains";

// Lisk Sepolia was shut down, so Tawf Qurban runs on Arbitrum Sepolia.
export const CHAIN = arbitrumSepolia;
export const EXPLORER_URL = "https://sepolia.arbiscan.io";
export const FAUCET_URL = "https://faucet.circle.com";

// Source and deploy script: github.com/tawf-labs/qrbnapp (script/DeployQurban.s.sol)
export const CONTRACT_ADDRESSES = {
	Qurban: "0x8aBe3f0968e410D58dd9743b5Fc3f05F205BA227" as Address,
	QurbanNFT: "0x9721Cc827A3178e602972Df9F390d7e6a6b81C67" as Address,
	QrbnTreasury: "0x9EAD09d409520cE8594F3caFF617a08F02146Da6" as Address,
	// Circle's official test USDC (6 decimals)
	USDC: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d" as Address,
} as const;

export const txUrl = (hash: string) => `${EXPLORER_URL}/tx/${hash}`;
export const addressUrl = (address: string) => `${EXPLORER_URL}/address/${address}`;
