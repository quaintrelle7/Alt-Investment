import React from 'react'
import {Button, Flex, Heading, Image, Link} from '@chakra-ui/react'

function CommonHeader() {
  return (
    <>
    <Flex position={"sticky"} top={"0"} width={"100vw"} height={"3rem"} bg={"brand.primary"} px={10} py={10}>
      <Flex width={"30%"} align={"center"} justify={"flex-start"} >
        <Link href="/" style={{textDecoration:"none"}}><h1 style={{fontSize:"30px"}}> AltInvest</h1></Link>
      </Flex>
      <Flex w={"40%"} align={"center"} justify={"center"}>
        <Link style={{textDecoration:'none', fontSize:15, fontWeight:600}} _hover={{color:"brand.quinary"}}  href="/">Home</Link>
        <Link  mx="10" style={{textDecoration:'none', fontSize:15, fontWeight:600}} _hover={{color:"brand.quinary"}}  href="/portfolio">My Portfolio</Link>
        <Link  style={{textDecoration:'none', fontSize:15, fontWeight:600}} _hover={{color:"brand.quinary"}}  href="/invest">Invest Now</Link>

      </Flex>
      <Flex width={"30%"}  align={"center"} justify={"flex-end"}>
        {/* <ListNFTForm/>
        <Button marginLeft={10} onClick={() => window.open("/invest", "_self")}>Invest Now</Button> */}
        <Button marginLeft={10}>Connect Wallet</Button>
      </Flex>
    </Flex>
    </>
  )
}

export default CommonHeader