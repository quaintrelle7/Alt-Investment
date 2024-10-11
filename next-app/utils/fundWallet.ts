import { useFundWallet } from "@privy-io/react-auth"
import { Chain, optimism } from "viem/chains"
import { useAccount } from "wagmi"

export function useFundWalletFunction() {
	const { fundWallet } = useFundWallet() // Hooks must be inside a function/component
	const { address, isConnected, chain } = useAccount() // Also called correctly inside a function

	// Returning the async function to be used when called
	const fund = async () => {
		console.log("chain: ", chain)
		if (!isConnected || !address) {
			throw new Error("Wallet not connected")
		}

		await fundWallet(address, {
			chain: chain,
			asset: "USDC",
			amount: "500",
		})
	}

	return fund
}
