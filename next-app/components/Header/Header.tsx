import {Button, Flex, Heading, Image} from '@chakra-ui/react'
import React from 'react'

type Props = {}

function Header({}: Props) {
  return (
    <Flex width={"100vw"} height={"3rem"} bg={"brand.primary"} px={10} py={10}>
      <Flex width={"50%"} height={"100%"} align={"center"} justify={"flex-start"}>
        <Heading color={"brand.secondary"}> AltInvest</Heading>
      </Flex>
      <Flex width={"50%"} height={"100%"} align={"center"} justify={"flex-end"}>
        <Button>Invest Now</Button>
        <Button marginLeft={10}>Connect Wallet</Button>
      </Flex>
    </Flex>
  )
}

export default Header