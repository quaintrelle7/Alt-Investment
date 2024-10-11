import {Button, Flex, Heading, Image, Link, Show, Text} from '@chakra-ui/react'
import React, {useEffect} from 'react'
import ListNFTForm from '../ListNFT/ListNFTForm'
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import { useRouter } from 'next/router'
// import {
//   useConnectModal,
//   useAccountModal,
//   useChainModal,
// } from '@rainbow-me/rainbowkit';
import {Profile} from '../Portfolio/Profile';
import MintUSDC from '../USDC/MintUSDC';
import LoginButton from '../Privy/LoginButton';
import {usePrivy, useWallets} from '@privy-io/react-auth';
import LogoutButton from '../Privy/LogoutButton';
import {useSetActiveWallet} from '@privy-io/wagmi';
import FundWallet from '../Privy/FundWallet';
import { useFundWalletFunction } from '@/utils/fundWallet';

type Props = {}

function Header({}: Props) {

  const{address, isConnected, isDisconnected, isConnecting} = useAccount();
  const {ready, authenticated, logout, user, login} = usePrivy();
  const {wallets} = useWallets();
//   const { openConnectModal } = useConnectModal();
//   const { openAccountModal } = useAccountModal();
//   const { openChainModal } = useChainModal();
  const router = useRouter()

const handleRoute = (path: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    
    if(!isConnected){
        // openConnectModal();
        login();
        console.log("USER: ", user);
        // alert("Please connect your wallet first");
    }else{
        if(path === "portfolio")
        window.open("/portfolio", "_self");
        else if(path === "invest")
            window.open("/invest", "_self");
        
    }
  }
  useEffect(() => {
    // setActiveWallet(wallets[0])
    // console.log("wallets: ", wallets);
    console.log("user: ", user);
    console.log("isConnected: ", isConnected)
    console.log("address: ", address);
  }, [isConnected, user])

  const {setActiveWallet} = useSetActiveWallet()

  const fundWallet = useFundWalletFunction();

  const handleFund = async () => {
    try {
      await fundWallet();
      console.log('Wallet funded successfully!');
    } catch (error) {
      console.error('Failed to fund wallet:', error);
    }
  };


//To-DO Sign IN Message
  return (
		<Flex
			position={"sticky"}
			top={"0"}
			width={"100vw"}
			height={"3rem"}
			bg={"brand.primary"}
			px={10}
			py={10}
			zIndex={1}>
			<Flex width={"30%"} align={"center"} justify={"flex-start"}>
				<Link href="/" style={{ textDecoration: "none" }}>
					<h1 style={{ fontSize: "30px" }}> AltInvest</h1>
				</Link>
			</Flex>

            <Show above="sm">			
                <Flex w={"40%"} align={"center"} justify={"center"}>
    				{router.pathname !== "/" ? (
    					<Button
    						border={"none"}
    						bg={"transparent"}
    						style={{ textDecoration: "none", fontSize: 15, fontWeight: 600 }}
    						_hover={{ color: "brand.quinary", background: "transparent" }}>
    						<Link
    							style={{ textDecoration: "none", fontSize: 15, fontWeight: 600 }}
    							_hover={{ color: "brand.quinary" }}
    							href="/">
    							Home
    						</Link>
    					</Button>
    				) : (
    					<Button
    						border={"none"}
    						bg={"transparent"}
    						style={{ textDecoration: "none", fontSize: 15, fontWeight: 600 }}
    						_hover={{ color: "brand.quinary", background: "transparent" }}>
    						<Link
    							style={{ textDecoration: "none", fontSize: 15, fontWeight: 600 }}
    							_hover={{ color: "brand.quinary" }}
    							href="#About">
    							About
    						</Link>
    					</Button>
    				)}

    				<Button
    					border={"none"}
    					mx={"5"}
    					bg={"transparent"}
    					style={{ textDecoration: "none", fontSize: 15, fontWeight: 600 }}
    					_hover={{ color: "brand.quinary", background: "transparent" }}
    					onClick={handleRoute("invest")}>
    					Invest Now
    				</Button>
    				<Button
    					border={"none"}
    					bg={"transparent"}
    					style={{ textDecoration: "none", fontSize: 15, fontWeight: 600 }}
    					_hover={{ color: "brand.quinary", background: "transparent" }}
    					onClick={handleRoute("portfolio")}>
    					My Portfolio
    				</Button>
                     {/* <p>
              Connection status: {isConnecting && <span>🟡 connecting...</span>}
              {isConnected && <span>🟢 connected.</span>}
              {isDisconnected && <span> 🔴 disconnected.</span>}
            </p> */}

    				{/* <Button border={"none"} bg={"transparent"} style={{textDecoration:'none', fontSize:15, fontWeight:600}} _hover={{color:"brand.quinary", background:"transparent"}} onClick={openChainModal} >Switch Chain</Button> */}
    			</Flex>
            </Show>


			<Flex width={"40%"} mr={5} align={"center"} justify={"flex-end"}>
				{/* {isConnected && <Profile/>} */}
				{/* SIWE */}
                <Text mr={5}>{isConnected && address.slice(0, 4) + "..." + address.slice(-4)}</Text>
                {/* <FundWallet/> */}
                <Button onClick={handleFund}>Buy USDC</Button>
                <MintUSDC address={address}/>
				{/* {isConnected && address &&<ConnectButton
					accountStatus={{
						smallScreen: "avatar",
						largeScreen: "full",
					}}
				/>} */}
                {authenticated? <LogoutButton/>:<LoginButton/> }
                
                
                
			</Flex>
		</Flex>
	)
}

export default Header