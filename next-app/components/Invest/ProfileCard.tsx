import {Stack, Image, Center, Container, Heading, Flex, Box} from '@chakra-ui/react'
import React from 'react'

type Props = {}

function ProfileCard({}: Props) {
  return (<>

     <Stack p={30}
        bg="linear-gradient(90deg, rgba(24,25,28,1) 0%, rgba(24,25,28,1) 100%) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)" 
        border ="3px solid transparent"
        height={"150px"}
        width={"150px"}
        borderRadius={"50%"}
        >
        <Box objectFit='contain'
                height={"100%"}
                borderRadius={"50%"}
                width={"100%"} 
                bgImage="url('https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60')"
>        
        </Box>

              {/* <Image
                objectFit='cover'
                height={"100%"}
                width={"100%"}
                borderRadius={"50%"}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
                border ="3px solid transparent"
              /> */}
        </Stack> 
        {/* <Heading fontSize={"20"}>Wallet address</Heading> */}

  
  </>
  )
}

export default ProfileCard