# Contract integration

Tawf Qurban runs on **Arbitrum Sepolia** (chain 421614). Lisk Sepolia was shut down.
Contracts and deploy script: `tawf-labs/qrbnapp`, `script/DeployQurban.s.sol`.
Addresses live in `lib/contracts.ts`. Payments use Circle's test USDC
(`0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`, 6 decimals).

- `lib/client-config.ts`: wagmi config (browser wallets, plus WalletConnect when
  `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is set)
- `lib/contract-service.ts`: reads the animals, approves the exact cost, buys, and waits for confirmation
- `components/payment-modal.tsx`: the payment window
