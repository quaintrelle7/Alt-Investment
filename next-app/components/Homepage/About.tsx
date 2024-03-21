import { Center, Flex, Heading, Stack, Image, Divider} from '@chakra-ui/react'
import React from 'react'

type Props = {}

function About({}: Props) {
  return (
    <Stack height={"50vh"} bg={"brand.ternary"} mx={20} my={10} >
        <Flex mt={10} justify={"center"}>
            <Heading color="brand.primary">Why AltInvest</Heading>
        </Flex>

        <Flex justify={"space-between"} mt={"10"} mx="10">
        <Center>      
            <Stack  textAlign={"center"} bg={"brand.ternary"} color="brand.primary"  >
            <Center>
              <Image
                objectFit='cover'
                maxW={{ base: '50%' }}
                src='https://images.unsplash.com/photo-1451187580459-43490279c0fa??ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />  </Center>       
            <Heading fontSize={20}>Invest Globally</Heading>
                        <Divider />  

            <p>Compliance with foreign regulations often requires expertise and resources.</p>
            </Stack>
            </Center>
            
            <Center mx={10}>      
            <Stack  textAlign={"center"} bg={"brand.ternary"} color="brand.primary"  >
            <Center>
              <Image
                objectFit='cover'
                maxW={{ base: '50%' }}
                src='https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />  </Center>       
            <Heading fontSize={20}>Buy Fractions</Heading>
                        <Divider />  

            <p>Compliance with foreign regulations often requires expertise and resources.</p>
            </Stack>
            </Center>


            <Center>      
            <Stack  textAlign={"center"} bg={"brand.ternary"} color="brand.primary" >
            <Center>
              <Image
                objectFit='cover'
                maxW={{ base: '50%' }}
                src='https://images.unsplash.com/photo-1576379392292-1c898ea31764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />  </Center>     
            <Heading fontSize={20}>Provides Transparency</Heading>
                        <Divider />  

            <p>Compliance with foreign regulations often requires expertise and resources.</p>
            </Stack>
            </Center>

            
        </Flex>

    </Stack>
  )
}

export default About