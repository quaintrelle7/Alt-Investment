import {Flex, Image, Input, Center, Stack, Box} from '@chakra-ui/react'
import React, {useState} from 'react'

type Props = {}

function UserDashboard({}: Props) {

  const [profilePic, setProfilePic] = useState<string>();
  const handleChange = (e:any) =>{
    setProfilePic(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <>
    <Flex bg={"brand.ternary"} color="brand.secondary" height={{ base:"40vh"}}>
        <Stack width={"100%"}>
        <Center fontSize={{base:"2xl", md:"5xl"}} mt="20" p={35}><h1>This is your space, feel free to ruin it!</h1></Center>
        <Stack fontSize={{base:"xl", md:"xl"}} ml={10} height={"7rem"} mt={0}>
            <Image src="assets/add-user.gif" borderRadius={"full"} objectFit='cover'
         maxW={{ base: '8em' }} maxH={{ base: '90em' }}/>
            
            <Box fontSize={{base:"xl", md:"xl"}} fontWeight={"bold"}> Wallet Address</Box>
        </Stack>
        </Stack>
    </Flex>
    </>
  )
}

export default UserDashboard