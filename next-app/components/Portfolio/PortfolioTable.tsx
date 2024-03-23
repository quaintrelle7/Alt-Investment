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
    <Center style={{ marginTop:"70px", fontSize:"30px"}}>
            <h1>Current Holdings</h1>
    </Center>    <Center p={20} mx={20} my={10} bg={"brand.ternary"}>
         <Table textAlign={"center"}>
        <Thead>
          <Tr>
            <Th color={"brand.quinary"}>Company</Th>
            <Th color={"brand.quinary"}>Current</Th>
            <Th color={"brand.quinary"}>Invested</Th>
            <Th color={"brand.quinary"}>Total NFTs</Th>
          </Tr>
        </Thead>
        <Tbody color={"brand.secondary"} >
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