import CommonHeader from '@/components/Header/CommonHeader'
import Footer from '@/components/Header/Footer'
import PortfolioTable from '@/components/Portfolio/PortfolioTable'
import {Center, Flex, Heading, Stack, Text} from '@chakra-ui/react'
import React from 'react'

function portfolio() {
  return (
    <>
    <CommonHeader/>
        
        <Heading textAlign={"center"} mt="20" color={"brand.secondary"}>Investment Summary</Heading>
    <Center>
    <Flex mx={50} mt={10} mb={20} justify={"space-between"} width="50%"  borderRadius={10} bg={"brand.primary"} border={"solid 1px gray"} px={10} py={5}>
        <Stack width="50%">
            <Stack justify={"flex-start"}>
                <Text color={"brand.ternary"}>Current</Text>
                <Text fontSize={20} color={"brand.secondary"}>120000</Text>
            </Stack>
            <Stack justify={"flex-start"}>
                <Text color={"brand.ternary"}>Invested</Text>
                <Text fontSize={20} color={"brand.secondary"}>120000</Text>
            </Stack>
        </Stack>
        <Stack width={"50%"} textAlign={"right"}>
            <Stack>
                <Text color={"brand.ternary"}>Total NFTs</Text>
                <Text fontSize={20} color={"brand.secondary"}>120000</Text>
            </Stack>
            <Stack >
                <Text color={"brand.ternary"}>Total Returns</Text>
                <Text fontSize={20} color={"brand.secondary"}>120000</Text>
            </Stack>
        </Stack>
    </Flex>
    </Center>
    <PortfolioTable/>
    <div style={{position:"sticky", bottom:"0", width:"100%"}}>
        <Footer/>
    </div>
    </>
  )
}

export default portfolio