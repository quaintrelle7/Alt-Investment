import {Button, Flex, Heading, Image, Link} from '@chakra-ui/react'
import React from 'react'
import ListNFTForm from '../ListNFT/ListNFTForm'

type Props = {}

function Header({}: Props) {
  return (
    <Flex position={"sticky"} top={"0"} width={"100vw"} height={"3rem"} bg={"brand.primary"} px={10} py={10}>
      <Flex width={"30%"} align={"center"} justify={"flex-start"}>
        <Heading color={"brand.secondary"}> AltInvest</Heading>
      </Flex>
      <Flex w={"40%"} align={"center"} justify={"center"}>
        <Link style={{textDecoration:'none', fontSize:15, fontWeight:600}} _hover={{color:"brand.quinary"}}  href="#About">About</Link>
        <Link  mx="10" style={{textDecoration:'none', fontSize:15, fontWeight:600}} _hover={{color:"brand.quinary"}}  href="/invest">Invest Now</Link>

      </Flex>
      <Flex width={"30%"}  align={"center"} justify={"flex-end"}>
        {/* <ListNFTForm/>
        <Button marginLeft={10} onClick={() => window.open("/invest", "_self")}>Invest Now</Button> */}
        <Button marginLeft={10}>Connect Wallet</Button>
      </Flex>
    </Flex>
  )
}

export default Header