import CommonHeader from '@/components/Header/CommonHeader'
import Footer from '@/components/Header/Footer'
import NFTCard from '@/components/Invest/NFTCard'
import {Divider, Grid, GridItem, Heading, Stack} from '@chakra-ui/react'
import React from 'react'

function invest() {
  return (
    <>
    <CommonHeader/>
    <Stack mx={20} my={20}>
        <Heading>Click on following NFTs to invest now</Heading>
        <Divider/>
        <Grid mt={20} bg={"brand.ternary"} borderRadius={"10"} p={20}templateColumns='repeat(4, 1fr)' gap={6}>
               <NFTCard/>
               <NFTCard/>
               <NFTCard/>
               <NFTCard/>
        </Grid>
        <Grid mt={20} bg={"brand.ternary"} borderRadius={"10"} p={20}templateColumns='repeat(4, 1fr)' gap={6}>
               <NFTCard/>
               <NFTCard/>
               <NFTCard/>
               <NFTCard/>
        </Grid>
        <Grid mt={20} bg={"brand.ternary"} borderRadius={"10"} p={20}templateColumns='repeat(4, 1fr)' gap={6}>
               <NFTCard/>
               <NFTCard/>
               <NFTCard/>
               <NFTCard/>
        </Grid>
        </Stack>
    <div style={{position:"static", bottom:"0", width:"100%"}}>
        <Footer/>
    </div>
    </>
  )
}

export default invest