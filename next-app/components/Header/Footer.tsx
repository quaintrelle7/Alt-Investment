import {Center, Flex, Icon} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { AiFillLinkedin, AiFillTwitterCircle, AiFillGithub, AiFillMediumCircle } from "react-icons/ai"
import { BsDiscord } from "react-icons/bs"

type Props = {}

function Footer({}: Props) {
  return (
    <Center >
     <Flex width={"30%"}justifyContent={"space-between"} my={10}    >

                <Link href='https://www.linkedin.com/in/sharayushendre/' target='_blank'>

                    <Icon fontSize={30} color={'brand.secondary'} borderRadius={'full'} as={AiFillLinkedin} _hover={{color: 'brand.quinary'}}/>

                </Link>

                <Link href='https://twitter.com/qua_intrelle7' target='_blank'>
                    <Icon fontSize={30} color={'brand.secondary'} borderRadius={'full'} as={AiFillTwitterCircle} _hover={{color: 'brand.quinary'}} /></Link>


                <Link href='https://github.com/quaintrelle7' target='_blank'>
                    <Icon fontSize={30} color={'brand.secondary'} borderRadius={'full'} as={AiFillGithub} _hover={{color: 'brand.quinary'}} />
                </Link>

         
                <Link href='https://discord.com/users/qua_intrelle7#9505' target='_blank'>
                    <Icon fontSize={30} color={'brand.secondary'} borderRadius={'full'} as={BsDiscord} _hover={{color: 'brand.quinary'}} /></Link>

    </Flex>
    </Center>
  )
}

export default Footer