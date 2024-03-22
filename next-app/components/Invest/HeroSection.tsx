import React from 'react'
import {WavyBackground} from '../ui/wavy-background'
import {Box} from '@chakra-ui/react'

type Props = {}

function HeroSection({}: Props) {
  return (
    <Box>
             <WavyBackground backgroundFill="#111214" className="max-w-4xl mx-auto pb-20" >
                  <p className="text-2xl md:text-4xl lg:text-6xl text-white font-bold inter-var text-center">
                    Explore and secure your stake in NFTs      </p>
                  <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
                    Leverage the power of crypto and NFTs 
                  </p>
              </WavyBackground>
        </Box>

  )
}

export default HeroSection