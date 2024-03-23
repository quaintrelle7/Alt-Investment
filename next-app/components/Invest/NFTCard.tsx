import {Center, Image, Stack, Heading, Link} from '@chakra-ui/react'
import React from 'react'

function NFTCard() {
  return (
    <>
    <Link href="/company" style={{ textDecoration: 'none' }}>
    <Stack  borderRadius={"10"} px={10}  pt={10} pb={3}
    bg="linear-gradient(90deg, rgba(24,25,28,1) 0%, rgba(24,25,28,1) 100%) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)" 
    border ="3px solid transparent">

        <Center>
              <Image
                objectFit='cover'
                maxW={{ base: '100%' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />
        </Center> 
        <Heading textAlign={"center"} 
        color={"brand.secondary"} 
        _hover={{color:"brand.quinary"}} 
        fontWeight={"700"} 
        letterSpacing={2}
        fontSize={"18"}>
        {"AltInvest"}
        </Heading>
    </Stack> 
    </Link>
    </>
  )
}

export default NFTCard