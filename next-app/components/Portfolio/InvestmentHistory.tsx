import {Center, Heading, Stack} from '@chakra-ui/react'
import React from 'react'

type Props = {}

function InvestmentHistory({}: Props) {
  return (
    <>
    <Center minH={"50vh"}>
    <Stack>
    <Heading> Invest to create the history! 😜</Heading>
    <h1>PS. Bring some crypto</h1>
    </Stack>
    </Center>
    </>
  )
}

export default InvestmentHistory