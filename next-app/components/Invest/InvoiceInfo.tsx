import {Stack, Center, Heading, Link} from '@chakra-ui/react'
import React from 'react'

type Props = {}

const InvoiceInfo = (props: Props) => {
  return (
    <Link href="/company" style={{ textDecoration: 'none' }}>
    <Stack  borderRadius={"10"} px={10}  pt={10} pb={3}
    bg="linear-gradient(90deg, rgba(24,25,28,1) 0%, rgba(24,25,28,1) 100%) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)" 
    border ="3px solid transparent">

     
        <Heading textAlign={"center"} 
        color={"brand.secondary"} 
        _hover={{color:"brand.quinary"}} 
        fontWeight={"700"} 
        letterSpacing={2}
        fontSize={"18"}>
        {"Company Name"}
        </Heading>

        <Center>
            
        </Center>
    </Stack> 
    </Link>
  )
}

export default InvoiceInfo