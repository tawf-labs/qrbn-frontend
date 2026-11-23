"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wallet, ArrowRight, CheckCircle, ExternalLink, Loader2 } from "lucide-react";
import { useContracts } from "@/hooks/use-contracts";
import { useAccount } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { formatUsdc } from "@/lib/utils";
import { CHAIN, FAUCET_URL, txUrl } from "@/lib/contracts";
import { useToast } from "@/hooks/use-toast";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useConnectDialog } from "@/components/providers/connect-provider";

interface PaymentModalProps {
	amount: bigint;
	title: string;
	animalId: bigint;
	children: React.ReactNode;
}

export function PaymentModal({ amount, animalId, title, children }: PaymentModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [paymentStep, setPaymentStep] = useState<"select" | "confirm" | "processing" | "success">("select");
	const [txHash, setTxHash] = useState("");
	const [processingMessage, setProcessingMessage] = useState("");

	const { balance, displayBalance } = useTokenBalance();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const contracts = useContracts();
	const { isConnected } = useAccount();
	const { open: openConnect } = useConnectDialog();

	const fail = (title: string, description: string) => toast({ variant: "destructive", title, description });

	const onContinuePayment = () => {
		if (!isConnected) {
			setIsOpen(false);
			openConnect();
			return;
		}
		if (balance < amount) {
			fail("Not enough test USDC", `You need ${formatUsdc(amount)} on ${CHAIN.name}.`);
			return;
		}
		setPaymentStep("confirm");
	};

	const processPayment = async () => {
		if (!contracts || !isConnected) {
			fail("Wallet not connected", "Connect your wallet and try again.");
			return;
		}

		setProcessingMessage("Checking your USDC approval");
		setPaymentStep("processing");

		try {
			setTxHash(await contracts.purchaseAnimalShares(animalId, 1, amount, setProcessingMessage));
			setPaymentStep("success");
			queryClient.invalidateQueries({ queryKey: ["qurbanAnimals"] });
			queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
		} catch (error) {
			console.error("Payment error:", error);
			const message = error instanceof Error ? error.message : "";
			if (/rejected|denied/i.test(message)) fail("Payment cancelled", "You declined the request in your wallet.");
			else if (message === "Price changed") fail("Price changed", "Reload the page to see the new price.");
			else fail("Payment did not go through", "The animal may have just sold, or your wallet needs test ETH for gas.");
			setPaymentStep("select");
		}
	};

	const onOpenChange = (open: boolean) => {
		// A payment in progress must stay on screen
		if (!open && paymentStep === "processing") return;
		setIsOpen(open);
		if (!open) {
			setPaymentStep("select");
			setTxHash("");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="bg-[#0f2419] border-[#14532d] text-[#f0fdf4] max-w-md">
				<DialogHeader>
					<DialogTitle className="text-[#f0fdf4]">Complete Payment</DialogTitle>
				</DialogHeader>

				{paymentStep === "select" && (
					<div className="space-y-6">
						<div className="text-center p-4 bg-[#14532d]/30 rounded-lg">
							<div className="text-sm text-[#f0fdf4]/80 mb-1">{title}</div>
							<div className="text-2xl font-bold text-[#d1b86a] mb-1">{formatUsdc(amount)}</div>
							<div className="text-xs text-[#f0fdf4]/80">Test USDC, not real money</div>
						</div>

						<div>
							<label className="text-sm text-[#f0fdf4]/80 mb-2 block">Payment Token</label>
							<div className="bg-[#14532d] border border-[#14532d] rounded-md p-3 text-[#f0fdf4]">
								<div className="flex items-center justify-between w-full">
									<span>USDC (test)</span>
									<span className="text-[#d1b86a]">Balance: {displayBalance}</span>
								</div>
							</div>
						</div>

						<div className="space-y-2 text-xs text-[#f0fdf4]/80">
							<div className="flex items-center">
								<ArrowRight className="h-3 w-3 mr-2" />
								Paid in test USDC on {CHAIN.name}
							</div>
							<div className="flex items-center">
								<ArrowRight className="h-3 w-3 mr-2" />
								Needs a little test ETH for gas
							</div>
							<div className="flex items-center">
								<ArrowRight className="h-3 w-3 mr-2" />
								NFT certificate after the sacrifice is recorded
							</div>
						</div>

						<a href={FAUCET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-[#d1b86a] underline">
							Get test USDC from Circle <ExternalLink className="ml-1 h-3 w-3" />
						</a>

						<Button onClick={onContinuePayment} className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow">
							{isConnected ? "Continue" : "Connect wallet"}
						</Button>
					</div>
				)}

				{paymentStep === "confirm" && (
					<div className="space-y-6">
						<div className="text-center">
							<div className="text-lg font-semibold text-[#f0fdf4] mb-2">Confirm Payment</div>
							<div className="text-sm text-[#f0fdf4]/80">Please review your transaction details</div>
						</div>

						<Card className="bg-[#14532d]/30 border-[#14532d]">
							<CardContent className="p-4 space-y-3">
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/80">Type:</span>
									<span className="text-[#f0fdf4]">{title}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/80">Amount:</span>
									<span className="text-[#d1b86a]">{formatUsdc(amount)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/80">2.5% Fee (Included):</span>
									<span className="text-[#d1b86a]">{formatUsdc((amount * BigInt(250)) / BigInt(10000))}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/80">Network:</span>
									<Badge className="bg-[#14532d] text-[#d1b86a]">{CHAIN.name}</Badge>
								</div>
								<Separator className="bg-[#14532d]" />
								<div className="flex justify-between font-semibold">
									<span className="text-[#f0fdf4]">Total:</span>
									<span className="text-[#d1b86a]">{formatUsdc(amount)}</span>
								</div>
							</CardContent>
						</Card>

						<div className="flex space-x-3">
							<Button
								variant="outline"
								onClick={() => setPaymentStep("select")}
								className="flex-1 border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
							>
								Back
							</Button>
							<Button onClick={processPayment} className="flex-1 bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow">
								<Wallet className="h-4 w-4 mr-2" />
								Pay Now
							</Button>
						</div>
					</div>
				)}

				{paymentStep === "processing" && (
					<div className="space-y-6 text-center">
						<div className="flex justify-center">
							<Loader2 className="h-12 w-12 text-[#d1b86a] animate-spin" />
						</div>
						<div>
							<div className="text-lg font-semibold text-[#f0fdf4] mb-2">Processing Payment</div>
							<div className="text-sm text-[#f0fdf4]/80 mb-4">{processingMessage}</div>
						</div>
						<div className="text-xs text-[#f0fdf4]/80">This may need two confirmations: approve, then buy</div>
					</div>
				)}

				{paymentStep === "success" && (
					<div className="space-y-6 text-center">
						<div className="flex justify-center">
							<CheckCircle className="h-12 w-12 text-[#d1b86a]" />
						</div>
						<div>
							<div className="text-lg font-semibold text-[#f0fdf4] mb-2">Payment Successful!</div>
							<div className="text-sm text-[#f0fdf4]/80 mb-4">{title} is recorded on {CHAIN.name}</div>
						</div>

						<Card className="bg-[#14532d]/30 border-[#14532d]">
							<CardContent className="p-4 space-y-3">
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/80">Transaction Hash:</span>
									<div className="flex items-center">
										<span className="text-[#d1b86a] text-sm font-mono">{txHash ? txHash.slice(0, 10) : "N/A"}...</span>
										<Button
											size="sm"
											variant="ghost"
											aria-label="View transaction on Arbiscan"
											className="h-6 w-6 p-0 ml-2 text-[#d1b86a]"
											onClick={() => txHash && window.open(txUrl(txHash), "_blank", "noopener")}
										>
											<ExternalLink className="h-3 w-3" />
										</Button>
									</div>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/80">Status:</span>
									<Badge className="bg-[#14532d] text-[#d1b86a]">Confirmed</Badge>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/80">NFT Certificate:</span>
									<span className="text-[#d1b86a]">After the sacrifice</span>
								</div>
							</CardContent>
						</Card>

						<div className="text-xs text-[#f0fdf4]/80">This is a test purchase. No real animal is sacrificed.</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
