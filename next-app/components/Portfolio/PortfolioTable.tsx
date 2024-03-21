import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Heading
} from '@chakra-ui/react'

function PortfolioTable() {
  return (
    <>
     <Heading fontSize={25} textAlign={"center"}>Current Holding</Heading>
    <Center p={20} mx={20} my={10} bg={"brand.ternary"}>
         <Table textAlign={"center"}>
        <Thead>
          <Tr>
            <Th>Company</Th>
            <Th>Current</Th>
            <Th>Invested</Th>
            <Th>Total NFTs</Th>
          </Tr>
        </Thead>
        <Tbody color={"brand.primary"} >
          <Tr>
            <Td>Tesla</Td>
            <Td>130000</Td>
            <Td >100000</Td>
            <Td >25</Td>
          </Tr>
          <Tr>
            <Td>Tesla</Td>
            <Td>130000</Td>
            <Td >100000</Td>
            <Td >25</Td>   </Tr>
          <Tr>
            <Td>Tesla</Td>
            <Td>130000</Td>
            <Td >100000</Td>
            <Td >25</Td>    </Tr>
        </Tbody>
        
          
         </Table>
    </Center>
    </>
  )
}

export default PortfolioTable