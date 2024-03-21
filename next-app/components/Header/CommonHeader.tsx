import React from 'react'
import {Button, Flex, Heading, Image, Link} from '@chakra-ui/react'

function CommonHeader() {
  return (
    <>
    <Flex position={"sticky"} top={"0"} width={"100vw"} height={"3rem"} bg={"brand.primary"} px={10} py={10}>
      <Flex width={"50%"} height={"100%"} align={"center"} justify={"flex-start"}>
        <Link marginRight={10} color={"white"} href='/'> Home </Link>
        <p color={"white"}>Wallet Address</p>

      </Flex>
      <Flex width={"50%"} height={"100%"} align={"center"} justify={"flex-end"}>
          <Link color={"brand.secondary"} href='/invest'>Invest Now</Link>
          <Link  marginLeft={10} color={"brand.secondary"} href='/portfolio'>My Portfolio</Link>  
       </Flex>
    </Flex>
    </>
  )
}

export default CommonHeader