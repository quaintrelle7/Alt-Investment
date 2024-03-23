import React from 'react'
import {Button, Text, Flex, Heading, Stack, Image} from '@chakra-ui/react'

function NFTDashbaord() {
  return (

  <Flex mt="20" mx={20} justify={"space-between"}>
    <Stack width="30%" height={"30vh"} position={"relative"}>
         <Image
                objectFit='cover'
                maxW={{ base: '60%' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />
        <Button position={"absolute"} width={"60%"} bottom={"0"} colorScheme='telegram'>Buy Now</Button>
    </Stack>

    
    <Stack width="60%" height={"30vh"} position={"relative"}>
        <Flex justify={"space-between"}>
            

            <Stack>
                <Text color={"brand.quinary"}>Company</Text>
                <Heading fontSize={20}>Tesla</Heading>
            </Stack>
            <Stack>
                <Text color={"brand.quinary"}>Title</Text>
                <Heading fontSize={20}>New Factory</Heading>
            </Stack>
            <Stack>
                <Text color={"brand.quinary"}>Floor</Text>
                <Heading fontSize={20}>1 Eth</Heading>
            </Stack>
            <Stack>
                <Text color={"brand.quinary"}>Total volume</Text>
                <Heading fontSize={20}>Company</Heading>
            </Stack>

            <Stack>
                <Text color={"brand.quinary"}>Year of launch</Text>
                <Heading fontSize={20}>2024</Heading>
            </Stack>
            
        </Flex>
        <Flex>
        <Stack mt={10}>
            <Text color={"brand.quinary"}>The 2023 Tesla Model 3 is the cheapest Tesla car currently offered. The base rear-wheel drive (RWD) trim has an official starting price of $40,240. The Model 3 Long Range is a tad more expensive at $47,240. The most expensive Model 3 is the Performance model, which costs a minimum of $53,240.</Text>
            <Button position={"absolute"} bottom={"0"} >View Docs</Button>
        </Stack>
        
        </Flex>
    </Stack>
    </Flex>
  )
}

export default NFTDashbaord