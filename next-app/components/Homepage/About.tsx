import {Card, Center, Container, Flex, Heading, Stack, Image} from '@chakra-ui/react'
import React from 'react'

type Props = {}

function About({}: Props) {
  return (
    <Stack height={"50vh"} bg={"brand.ternary"} mx={20} my={10} >
        <Flex mt={10} justify={"center"}>
            <Heading color="brand.primary">Why AltInvest</Heading>
        </Flex>

        <Flex justify={"space-around"} mt={"10"} mx="10">
            <Center>      
            <Stack bg={"brand.ternary"} color="brand.primary">
              <Image
                objectFit='cover'
                maxW={{ base: '50%', sm: '100px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />            
            <Heading fontSize={20}>Seamless Cross Border Investment</Heading>
            <p></p>



            </Stack>
            </Center>

            <Stack bg={"brand.ternary"} color="brand.primary">
            <Image
                objectFit='cover'
                maxW={{ base: '50%', sm: '100px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />            
            <Heading fontSize={20}>Seamless Cross Border Investment</Heading>
            <p></p>

            </Stack>

            <Stack bg={"brand.ternary"} color="brand.primary">
            <Image
                objectFit='cover'
                maxW={{ base: '50%', sm: '100px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />            
            <Heading fontSize={20}>Seamless Cross Border Investment</Heading>
            <p></p>

            </Stack>
        </Flex>

    </Stack>
  )
}

export default About