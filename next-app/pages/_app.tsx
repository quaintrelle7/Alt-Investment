import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/chakra/theme";
import '@rainbow-me/rainbowkit/styles.css'
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 import { WagmiProvider, http } from 'wagmi'
 import { mainnet, polygonMumbai, shardeumSphinx } from 'wagmi/chains'
  import { RainbowKitProvider, darkTheme} from '@rainbow-me/rainbowkit'
 import { getDefaultConfig } from '@rainbow-me/rainbowkit'

import {  optimism } from 'wagmi/chains';
import { Chain } from '@rainbow-me/rainbowkit';
import Layout from '@/components/Layout'

const chains: readonly [Chain, ...Chain[]] = [
  {
    ...mainnet,
    iconBackground: '#000',
    iconUrl: 'https://example.com/icons/ethereum.png',
  },
  {
    ...optimism,
    iconBackground: '#ff0000',
    iconUrl: 'https://example.com/icons/optimism.png',
  },
];


//To-Do Add URL for Shardeum Sphinx

 const config = getDefaultConfig({
   appName: 'RainbowKit demo',
   projectId: '7564d8ad0218271d25696e1c5fc7b379',
   chains: [mainnet, polygonMumbai, optimism, shardeumSphinx],
   transports: {
     [mainnet.id]: http(),
     [polygonMumbai.id]: http(),
     [shardeumSphinx.id]: http()
   },
 })

  const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {


  return (
        <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}>
        <RainbowKitProvider  
         coolMode
        theme={darkTheme({
        accentColor: 'linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)',
        // accentColor: "linear-gradient(black, black) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)",
        accentColorForeground: 'black',
        borderRadius: 'large',
      })}
      >
      <Layout>  
        <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
          </Layout>
        </RainbowKitProvider>
       </QueryClientProvider>
            </WagmiProvider>
        


  );
}
