'use client'

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/chakra/theme";
// import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {  http } from "wagmi"
import { sepolia, liskSepolia, mainnet, optimismSepolia, polygonMumbai, shardeumSphinx, polygonAmoy, polygonZkEvmTestnet, polygonZkEvmCardona } from "wagmi/chains"
// import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
// import { getDefaultConfig } from "@rainbow-me/rainbowkit"
// import {
// 	RainbowKitSiweNextAuthProvider,
// 	GetSiweMessageOptions,
// } from "@rainbow-me/rainbowkit-siwe-next-auth"
import { optimism, } from "wagmi/chains"
import { Chain } from "@rainbow-me/rainbowkit"
import Layout from "@/components/Layout"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import {PrivyProvider} from '@privy-io/react-auth';
import {WagmiProvider, createConfig} from '@privy-io/wagmi';



// const chains: readonly [Chain, ...Chain[]] = [
// 	{
// 		...mainnet,
// 		iconBackground: "#000",
// 		iconUrl: "https://example.com/icons/ethereum.png",
// 	},
// 	{
// 		...optimism,
// 		iconBackground: "#ff0000",
// 		iconUrl: "https://example.com/icons/optimism.png",
// 	},
// ]


//To-Do Add URL for Shardeum Sphinx




// const config = getDefaultConfig({
// 	appName: "AltInvest",
// 	projectId: "7564d8ad0218271d25696e1c5fc7b379", //https://cloud.walletconnect.com/
// 	chains: [sepolia, optimismSepolia, liskSepolia, mainnet, polygonMumbai, optimism, polygonAmoy, polygonZkEvmCardona],
// 	transports: {
// 		[mainnet.id]: http(),
// 		[polygonMumbai.id]: http(),
// 		[shardeumSphinx.id]: http(),
//         [optimismSepolia.id]: http(),
//         [liskSepolia.id]: http(),
//         [polygonAmoy.id]: http(),
//         [polygonZkEvmTestnet.id]: http(),
//         [polygonZkEvmCardona.id]: http(),
// 	},
    
// })

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, optimismSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimismSepolia.id]: http(),
  },
});

const queryClient = new QueryClient()

// const getSiweMessageOptions: GetSiweMessageOptions = () => ({
// 	statement: "Sign in to my AltInvest app",
// })

export default function App({ Component, pageProps }: AppProps) {
	return (
          <PrivyProvider
      appId="cm1rexb1c05h3vmgk8fa2pl8c"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        //   showWalletLoginFirst: true, 

        },
        
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
            noPromptOnSignature: false,
        },
      }}
    >
    <QueryClientProvider client={queryClient}>

		<WagmiProvider config={wagmiConfig}>
			{/* <SessionProvider refetchInterval={0} session={pageProps.session}> */}
					{/* <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>  */}
					{/* <RainbowKitProvider */}
						{/* coolMode
						theme={darkTheme({
							accentColor:
								"linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)",
							// accentColor: "linear-gradient(black, black) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)",
							accentColorForeground: "black",
							borderRadius: "large",
						})}> */}
		            <ChakraProvider theme={theme}>
                        <Layout>
								<Component {...pageProps} />
						</Layout>
                    </ChakraProvider>

					{/* </RainbowKitProvider> */}
					{/* </RainbowKitSiweNextAuthProvider> */}
			{/* </SessionProvider> */}
		</WagmiProvider>
     </QueryClientProvider>

            </PrivyProvider>

	)
}
