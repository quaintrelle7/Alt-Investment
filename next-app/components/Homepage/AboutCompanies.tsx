import React from 'react'
import { Center, Flex, Heading, Stack, Image, Divider} from '@chakra-ui/react'
import {InfiniteMovingCards} from '../ui/infinite-moving-cards';

type Props = {}




function AboutCompanies({}: Props) {
  return (
    <>
    <Center px={100}>
    <Stack height={"50vh"} my={20} >
        <Heading>Invest in your favourite companies globally</Heading>
    </Stack>
    </Center>
    </>
  )
}

export default AboutCompanies
