import React from 'react'
import { Center, Flex, Heading, Stack, Image, Divider, Box} from '@chakra-ui/react'
import {InfiniteMovingCards} from '../ui/infinite-moving-cards';

type Props = {}


 const companies = ["Polygon", "Filecoin", "Spheron", "Google", "AWS", "Hasura", "DigitalOcean", "Replit"
    ]

function AboutCompanies({}: Props) {
  return (
    <>
    <Stack mx={20} pt={20} my={20}>

    
    <Flex  justify={"center"}>
            <Center width={{base:"60%", md:"60%", lg:"70%", xl:"50%"}}fontSize={{base:"2xl", md:"3xl", lg:"5xl"}} textAlign={"center"}>
                <h1 color="brand.primary">Invest in your favourite companies globally</h1>
            </Center>
            
        </Flex>
    <Center px={100} py={50}>
        
    </Center>
    <Stack height={"50vh"}>
    <Flex justifyContent={"space-between"} className='company-cards'>
                    {
                        companies.map((item) => (
                            <Box bg="brand.ternary" borderRadius={"20em"}  p="4" my={5} mx={5} key={item}>
                                <Heading fontSize={20} fontWeight={"500"} color="brand.quinary">{item}</Heading>
                            </Box>
                        ))
                    }
    </Flex>
    </Stack>
    </Stack>
     
    
    </>
  )
}

export default AboutCompanies
