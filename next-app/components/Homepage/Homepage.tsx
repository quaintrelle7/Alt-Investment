import {Center, Heading, Stack} from '@chakra-ui/react'
import React from 'react'
import About from './About'
import Footer from '../Header/Footer'
import AboutCompanies from './AboutCompanies'

type Props = {}

function Homepage({}: Props) {
  return (
    <>
    
    <Center padding={100} mt="10vh">
         <Stack textAlign={"center"}>
         
                <Heading fontSize={50} textShadow={  "rgb(7, 7, 7) 1px 0 10px"}
                color={"brand.secondary"}>AltInvest</Heading>
                   <Heading mt={10}>Invest in Real Companies using Crypto</Heading>
        
        <div className="w-[40rem] h-40 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" /> 
       </div>
                
        </Stack>
        
    </Center>
     
     <About/>
     <AboutCompanies/>
</>

  )
}

export default Homepage