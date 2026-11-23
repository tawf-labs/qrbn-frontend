import { usePublicClient, useWalletClient } from "wagmi";
import { useMemo } from "react";
import { ContractService } from "@/lib/contract-service";
import { CHAIN } from "@/lib/contracts";

export function useContracts() {
	const publicClient = usePublicClient({ chainId: CHAIN.id });
	const { data: walletClient } = useWalletClient();

	return useMemo(() => {
		if (!publicClient) return null;
		return new ContractService(publicClient, walletClient);
	}, [publicClient, walletClient]);
}
