import {Button, Flex, Heading, Image, Link} from '@chakra-ui/react'
import React from 'react'
import ListNFTForm from '../ListNFT/ListNFTForm'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import { useRouter } from 'next/router'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';

type Props = {}

function Header({}: Props) {

  const{isConnected} = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

const handleRoute = (path: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
            console.log(event)

    if(openConnectModal){
        openConnectModal();
    }else{
        if(path === "portfolio")
        window.open("/portfolio", "_self");
        else if(path === "invest")
            window.open("/invest", "_self");
        
    }
  }

  const router = useRouter()


  return (

    <Flex position={"sticky"} top={"0"} width={"100vw"} height={"3rem"} bg={"brand.primary"} px={10} py={10} zIndex={1}>
      <Flex width={"30%"} align={"center"} justify={"flex-start"} >
        <Link href='/' style={{textDecoration:'none'}} ><h1 style={{fontSize:"30px"}}> AltInvest</h1></Link>
      </Flex>
      <Flex w={"40%"} align={"center"} justify={"center"}>
        <Link visibility={router.pathname==="/"?"visible":"hidden"} style={{textDecoration:'none', fontSize:15, fontWeight:600}} _hover={{color:"brand.quinary"}}  href="#About">About</Link>
        <Button border={"none"} mx={"10"} bg={"transparent"} style={{textDecoration:'none', fontSize:15, fontWeight:600}} _hover={{color:"brand.quinary", background:"transparent"}} onClick={handleRoute("invest")} >Invest Now</Button>
        <Button border={"none"} bg={"transparent"} style={{textDecoration:'none', fontSize:15, fontWeight:600}} _hover={{color:"brand.quinary", background:"transparent"}} onClick={handleRoute("portfolio")} >My Portfolio</Button>


      </Flex>
     
      <Flex width={"30%"} mr={5} align={"center"}  justify={"flex-end"}>
        
          <ConnectButton accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }} />
      </Flex>
    </Flex>
  )
}

export default Header