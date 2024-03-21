import {Center, Image, Stack, Heading, Link} from '@chakra-ui/react'
import React from 'react'

function NFTCard() {
  return (
    <>
    <Link href="/company" style={{ textDecoration: 'none' }}>
    <Stack>
        <Center>
              <Image
                objectFit='cover'
                maxW={{ base: '50%' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />
        </Center> 
        <Heading textAlign={"center"} color={"brand.primary"} fontWeight={"600"} fontSize={"18"}>
        {"AltInvest"}
        </Heading>
    </Stack> 
    </Link>
    </>
  )
}

export default NFTCard