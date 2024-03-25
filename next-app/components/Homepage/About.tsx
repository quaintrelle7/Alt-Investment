import { Center, Flex, Heading, Stack, Image, Divider, Box} from '@chakra-ui/react'
import React from 'react'
import Lottie from 'lottie-react';
import animationDataGlobe from '../../public/assets/js/globe.json'
import animationDataCrypto from '../../public/assets/js/crypto.json'
import animationDataChains from '../../public/assets/js/multiple-chain.json'




type Props = {}

function About({}: Props) {
    //  const defaultOptions = {
    //   loop: true,
    //   autoplay: true,
    //   animationData: animationData,
    //   rendererSettings: {
    //     preserveAspectRatio: "xMidYMid slice"
    //   }
    // };
  return (
    <Stack id='About'  mx={20} pt={20} >
    
        <Flex  justify={"center"}>
            <Center width={{base:"60%", md:"40%"}}fontSize={{base:"2xl", md:"50px"}} textAlign={"center"}>
                <h1 color="brand.primary">Welcome to Innovative Investment Platform</h1>
            </Center>
            
        </Flex>

     <Flex justify={"space-between"} my={"10"} mx="15" >

        <Center bg={"brand.ternary"} color="brand.secondary" height={{ md:"50vh"}}> 

            <Stack textAlign={"center"} p={10}  >
            <Center>
            {/* <a href="https://www.flaticon.com/free-animated-icons/connect" title="connect animated icons"></a> */}
                <Lottie style={{width:"16rem", height:"16rem"}} animationData={animationDataGlobe}
                ></Lottie>
              </Center>       
                <Heading fontSize={20}>Invest Globally</Heading>
                <Divider />  

            <p>Compliance with foreign regulations often requires expertise and resources.</p>
            </Stack>
        </Center>
            
        <Center mx={10} bg={"brand.ternary"} color="brand.secondary" height={{ md:"50vh"}}> 



            <Stack textAlign={"center"} p={10}  >
            <Center>
                 <Lottie style={{width:"15rem", height:"15rem"}} animationData={animationDataCrypto}
                ></Lottie>
              
              </Center>       
            <Heading fontSize={20} mt={5}>Buy Fractions</Heading>
                        <Divider />  

            <p>Compliance with foreign regulations often requires expertise and resources.</p>
            </Stack>
        </Center>

        <Center bg={"brand.ternary"} color="brand.secondary" height={{ md:"50vh"}}> 
                <Stack textAlign={"center"} p={10}  >
            <Center>
              <Lottie style={{width:"15rem", height:"15rem"}} animationData={animationDataChains}
                ></Lottie>
              
              </Center>       
            <Heading fontSize={20} mt={5}>Buy Fractions</Heading>
                        <Divider />  

            <p>Compliance with foreign regulations often requires expertise and resources.</p>
            </Stack>
       </Center>

        

     </Flex>

    </Stack>
  )
}

export default About