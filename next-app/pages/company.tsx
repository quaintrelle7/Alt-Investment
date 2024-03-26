import Footer from '@/components/Header/Footer'
import Header from '@/components/Header/Header'
import NFTCard from '@/components/Invest/NFTCard'
import NFTDashbaord from '@/components/Invest/NFTDashbaord'
import ProfileCard from '@/components/Invest/ProfileCard'
import {Divider, Grid, Heading, Stack, Center, Image, Box} from '@chakra-ui/react'
import React from 'react'

function company() {
  return (
    <>
    <Header/>
    <NFTDashbaord/>

    
    <Stack mx={20} my={20}>
    <Divider mb={10}/>
        <Heading>Investors (50)</Heading>

    <Grid mt={20} bg={"brand.ternary"} borderRadius={"10"}  templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(5, 1fr)",    
          }}
          gap={8}
          alignItems={"center"}
          p={20}>    
        <ProfileCard/>
        <ProfileCard/>
        <ProfileCard/>
        <ProfileCard/>
        <ProfileCard/>
        <ProfileCard/>

     </Grid>
     </Stack>
     <Footer/>
    
    </>
  )
}

export default company