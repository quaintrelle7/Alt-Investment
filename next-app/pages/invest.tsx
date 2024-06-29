import Footer from '@/components/Header/Footer'
import Header from '@/components/Header/Header'
import HeroSection from '@/components/Invest/HeroSection'
import InvoiceInfo from '@/components/Invest/InvoiceInfo'
import NFTCard from '@/components/Invest/NFTCard'
import {WavyBackground} from '@/components/ui/wavy-background'
import {Box, Divider, Grid, GridItem, Heading, Stack, Center} from '@chakra-ui/react'
import React from 'react'

function invest() {
  return (
    <>
    <Stack>
        <Header/>
        {/* <HeroSection/> */}
        <Center> <Heading>Invoice Marketplace</Heading> </Center>

        {/* <Center fontSize={{base:"2xl", md:"50px"}} textAlign={"center"}>
                <h1 color="brand.primary">Welcome to Innovative Investment Platform</h1>
            </Center> */}

        <Grid mt={40} templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",    
          }}
          gap={8}
          alignItems={"center"}
          p={6}>
              <InvoiceInfo/>
              <InvoiceInfo/>
              <InvoiceInfo/>
              <InvoiceInfo/>
              <InvoiceInfo/>
              <InvoiceInfo/>
              <InvoiceInfo/>
              <InvoiceInfo/>
              
        </Grid>
        
        </Stack>
    <div style={{position:"static", bottom:"0", width:"auto"}}>
        <Footer/>
    </div>
    </>
  )
}

export default invest