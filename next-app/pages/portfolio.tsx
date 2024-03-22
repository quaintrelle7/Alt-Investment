import CommonHeader from '@/components/Header/CommonHeader'
import Footer from '@/components/Header/Footer'
import PortfolioTable from '@/components/Portfolio/PortfolioTable'
import {Center, Flex, Heading, Stack, Text} from '@chakra-ui/react'
import React from 'react'

function portfolio() {
  return (
    <>
    <CommonHeader/>
        
        <h1 style={{textAlign:"center", marginTop:"70px", fontSize:"40px"}}>Investment Summary</h1>
    <Center>
    <Flex mx={50} mt={10} mb={20} justify={"space-between"} width="50%"  borderRadius={10} bg={"brand.primary"} border={"solid 1px gray"} px={10} py={5}>
        <Stack width="50%">
            <Stack justify={"flex-start"}>
                <Text color={"brand.senary"}>Current</Text>
                <Text fontSize={20} color={"brand.secondary"}>120000</Text>
            </Stack>
            <Stack justify={"flex-start"}>
                <Text color={"brand.senary"}>Invested</Text>
                <Text fontSize={20} color={"brand.secondary"}>120000</Text>
            </Stack>
        </Stack>
        <Stack width={"50%"} textAlign={"right"}>
            <Stack>
                <Text color={"brand.senary"}>Total NFTs</Text>
                <Text fontSize={20} color={"brand.secondary"}>120000</Text>
            </Stack>
            <Stack >
                <Text color={"brand.senary"}>Total Returns</Text>
                <Text fontSize={20} color={"brand.secondary"}>120000</Text>
            </Stack>
        </Stack>
    </Flex>
    </Center>
    <PortfolioTable/>
    <div style={{ bottom:"0", width:"100%"}}>
        <Footer/>
    </div>
    </>
  )
}

export default portfolio