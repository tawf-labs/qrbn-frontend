import { erc20Abi, type PublicClient, type WalletClient } from "viem";
import { CHAIN, CONTRACT_ADDRESSES } from "./contracts";
import { QURBAN_ABI } from "./abi/qurban";

export class ContractService {
	constructor(private publicClient: PublicClient, private walletClient?: WalletClient) {}

	async getQurbanAnimals() {
		try {
			const total = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Qurban,
				abi: QURBAN_ABI,
				functionName: "getTotalAnimalsCount",
			});

			const all = await Promise.all(
				Array.from({ length: Number(total) }, (_, id) =>
					this.publicClient.readContract({
						address: CONTRACT_ADDRESSES.Qurban,
						abi: QURBAN_ABI,
						functionName: "getAnimalById",
						args: [BigInt(id)],
					})
				)
			);

			// AnimalStatus: 0 pending, 1 available, 2 sold, 3 sacrificed
			const listed = (all as unknown as Animal[]).filter((animal) => Number(animal.status) !== 0);
			const ofType = (type: number) => listed.filter((animal) => Number(animal.animalType) === type);

			return { sheeps: ofType(0), cows: ofType(1), goats: ofType(2), camels: ofType(3) };
		} catch (error) {
			console.error("Error getting animals:", error);
			return null;
		}
	}

	async getUSDCBalance(address: `0x${string}`) {
		return this.publicClient.readContract({
			address: CONTRACT_ADDRESSES.USDC,
			abi: erc20Abi,
			functionName: "balanceOf",
			args: [address],
		});
	}

	/**
	 * Approves the exact cost if needed, buys the shares, and resolves only once the
	 * purchase is confirmed on chain.
	 */
	async purchaseAnimalShares(
		animalId: bigint,
		shares: number,
		expectedPricePerShare: bigint,
		onStep?: (message: string) => void
	) {
		const wallet = this.walletClient;
		const account = wallet?.account;
		if (!wallet || !account) throw new Error("Wallet not connected");

		if ((await wallet.getChainId()) !== CHAIN.id) {
			onStep?.(`Switch your wallet to ${CHAIN.name}`);
			try {
				await wallet.switchChain({ id: CHAIN.id });
			} catch (error) {
				// 4902: the wallet does not know this network yet
				if ((error as { code?: number }).code !== 4902) throw error;
				await wallet.addChain({ chain: CHAIN });
				await wallet.switchChain({ id: CHAIN.id });
			}
		}

		const [totalCost] = (await this.publicClient.readContract({
			address: CONTRACT_ADDRESSES.Qurban,
			abi: QURBAN_ABI,
			functionName: "calculatePurchaseCost",
			args: [animalId, shares],
		})) as [bigint, bigint, bigint];
		// Never charge more than the price the person was shown.
		if (totalCost !== expectedPricePerShare * BigInt(shares)) throw new Error("Price changed");

		const allowance = await this.publicClient.readContract({
			address: CONTRACT_ADDRESSES.USDC,
			abi: erc20Abi,
			functionName: "allowance",
			args: [account.address, CONTRACT_ADDRESSES.Qurban],
		});

		if (allowance < totalCost) {
			onStep?.("Step 1 of 2: approve USDC in your wallet");
			const approval = await wallet.writeContract({
				address: CONTRACT_ADDRESSES.USDC,
				abi: erc20Abi,
				functionName: "approve",
				args: [CONTRACT_ADDRESSES.Qurban, totalCost],
				account,
				chain: CHAIN,
			});
			await this.confirm(approval, "Approval failed");
		}

		onStep?.("Confirm the purchase in your wallet");
		const { request } = await this.publicClient.simulateContract({
			address: CONTRACT_ADDRESSES.Qurban,
			abi: QURBAN_ABI,
			functionName: "purchaseAnimalShares",
			args: [animalId, shares],
			account,
			chain: CHAIN,
		});
		const hash = await wallet.writeContract(request);
		onStep?.("Waiting for confirmation");
		await this.confirm(hash, "Purchase failed");
		return hash;
	}

	private async confirm(hash: `0x${string}`, message: string) {
		const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
		if (receipt.status !== "success") throw new Error(message);
	}
}
