import React from 'react'
import {Center, Flex, Heading, Stack, Text, Box} from '@chakra-ui/react'

type Props = {}

function InvestmentSummary({}: Props) {
  return (
    <>
    <Center style={{ marginTop:"70px", fontSize:"30px"}}>
            <h1>Investment Summary</h1>
    </Center>
    <Center>
        <Flex mx={50} mt={10} mb={20} justify={"space-between"}
         width="50%"  borderRadius={10} bg={"brand.ternary"} 
         border={"solid 1px gray"} px={10} py={5}>

            <Stack width="50%">
                <Stack justify={"flex-start"}>
                    <Text color={"brand.quinary"}>Current</Text>
                    <Text fontSize={20} color={"brand.secondary"}>120000</Text>
                </Stack>
                <Stack justify={"flex-start"}>
                    <Text color={"brand.quinary"}>Invested</Text>
                    <Text fontSize={20} color={"brand.secondary"}>120000</Text>
                </Stack>
            </Stack>
            <Stack width={"50%"} textAlign={"right"}>
                <Stack>
                    <Text color={"brand.quinary"}>Total NFTs</Text>
                    <Text fontSize={20} color={"brand.secondary"}>120000</Text>
                </Stack>
                <Stack >
                    <Text color={"brand.quinary"}>Total Returns</Text>
                    <Text fontSize={20} color={"brand.secondary"}>120000</Text>
                </Stack>
            </Stack>
        </Flex>
    </Center>
    </>
  )
}

export default InvestmentSummary