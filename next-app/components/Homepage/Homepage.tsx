import {Center, Heading, Stack, Flex, Text, Button, Box, Image} from '@chakra-ui/react'
import React from 'react'
import About from './About'
import Footer from '../Header/Footer'
import AboutCompanies from './AboutCompanies'
import ListNFTForm from '../ListNFT/ListNFTForm'
import Lottie from 'lottie-react'
import animationDataHome from '../../public/assets/js/homepage.json'
import { useAccount, useSignMessage } from "wagmi";


type Props = {}

function Homepage({}: Props) {

 const { address, isConnected } = useAccount();

  return (
    <>
    
    <Flex padding={100} mt={{base:"0", md:"10"}} height={"80vh"}>
         <Stack textAlign={"left"} width={"40%"} >
         
         <Box fontSize={{base:"3xl", md:"60px"}}>
            <h1>Grow Your Wealth With Crypto</h1>
         </Box>
         <Text mt={10} fontSize={20}>We believe in the potential of transformative investments. Our cutting-edge crypto platform revolutionizes how you invest in companies using cryptocurrency.</Text>

         <Flex justify={"flex-start"} mt="10">
                 <Button mr={10} onClick={() => window.open("/invest", "_self")}>Invest Now</Button>
                 <ListNFTForm/>
         </Flex>


        
        {/* <div className="w-[40rem] h-40 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" /> 
       </div> */}
                
        </Stack>

    
        <Flex justify={"center"} width={"60%"}>
            <Stack>
           <Lottie style={{width:"40rem", height:"40rem"}} animationData={animationDataHome}
                ></Lottie>
          </Stack>
        </Flex>

        

    </Flex>
     
     <About/>
     <AboutCompanies/>
</>

  )
}

export default Homepage