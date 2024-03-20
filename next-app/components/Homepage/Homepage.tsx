import {Center, Heading, Stack} from '@chakra-ui/react'
import React from 'react'
import About from './About'
import Footer from '../Header/Footer'

type Props = {}

function Homepage({}: Props) {
  return (
    <>

    <Center padding={100}>
         <Stack textAlign={"center"}>
                <Heading fontSize={50} textShadow={  "rgb(7, 7, 7) 1px 0 10px"}
                color={"brand.secondary"}>AltInvest</Heading>
                   <Heading mt={10}>Invest in Real Companies using Crypto</Heading>
                
        </Stack>
    </Center>

    <About/>
    <Footer/>

</>

  )
}

export default Homepage