import CommonHeader from '@/components/Header/CommonHeader'
import Footer from '@/components/Header/Footer'
import NFTCard from '@/components/Invest/NFTCard'
import NFTDashbaord from '@/components/Invest/NFTDashbaord'
import {Divider, Grid, Heading, Stack} from '@chakra-ui/react'
import React from 'react'

function company() {
  return (
    <>
    <CommonHeader/>
    <NFTDashbaord/>

    
    <Stack mx={20} my={20}>
    <Divider mb={10}/>
        <Heading>Investors (50)</Heading>

    <Grid mt={20} bg={"brand.ternary"} borderRadius={"10"} p={20}templateColumns='repeat(4, 1fr)' gap={6}>
               <NFTCard/>
               <NFTCard/>
               <NFTCard/>
               <NFTCard/>
     </Grid>
     </Stack>
     <Footer/>
    
    </>
  )
}

export default company