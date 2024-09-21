import {Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, Stack, ModalFooter, Button} from '@chakra-ui/react'
import React, {useState} from 'react'
import {usdcContract} from "@/blockend/interact"
import { useToast } from '@chakra-ui/react'

type Props = {
    address: any;
}

function MintUSDC({address}: Props) {
 
   const toast = useToast()


  const handleMint = (address) => {
      try {

        let amount = 10000 * (10 ** 6);
        usdcContract.methods.mint(address, amount).send({from:address}).then((res)=>{
            console.log(res);

            if(res){
                toast({
                  title: 'Mint USDC.',
                  description: "10000 USDC minted for you.",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
            })
            }
        });
     
      } catch (error) {

      }
      

  }
  return (
    <>


            <Button mx="2" variant="solid_complete" onClick={() => handleMint(address)}>Mint USDC</Button>
    </>
  )
}

export default MintUSDC