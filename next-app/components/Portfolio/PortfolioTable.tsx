import React, {useEffect, useState} from 'react'
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
  Heading,
  Text,
  Button,
  Link
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { factoryContract } from '@/blockend/interact'
import {useAccount} from 'wagmi';
import invoiceAbi from '@/blockend/build/invoice.json'
import web3 from '@/blockend/web3';



function PortfolioTable() {

  const toast = useToast()

  const withdrawPayment = async(invoiceAddress) => {
        const invoiceContract = new web3.eth.Contract(invoiceAbi, invoiceAddress);
            await invoiceContract.methods.claimRepayment().send({from:address}).then(()=>{
                 toast({
                  title: 'Repayment claimed.',
                  description: "Amount is successfully credited to your account.",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
            })
        })
  }

  const {address, isConnected} = useAccount();

  const [invoices, setInvoices] = useState([]);



useEffect(() => {
    const fetchInvoices = async () => {

        
        const result = await factoryContract.methods.getInvestorInvoices(address).call();
       
        let uniqueAddresses = Array.from(new Set(result));
        
        const invoicePromises = uniqueAddresses.map(invoiceAddress => {
            const invoiceContract = new web3.eth.Contract(invoiceAbi, invoiceAddress);
            return Promise.all([
                invoiceContract.methods.getInvestorInfo(address).call(),
                invoiceContract.methods.isCompleted().call()
            ]).then(([res, isCompleted]) => ({
                invoiceAddress,
                res,
                isCompleted
            }));
        });

        const invoices = await Promise.all(invoicePromises);
        setInvoices(invoices);
    }
    if(isConnected)
        fetchInvoices()

}, [isConnected, address])


  return (
		<>
			<Center style={{ marginTop: "70px", fontSize: "30px" }}>
				<h1>Current Holdings</h1>
			</Center>
			<Center p={20} mx={20} my={10} bg={"brand.ternary"}>

				<Table textAlign={"center"}>
					<Thead>
						<Tr>
							<Th color={"brand.quinary"}>Contract</Th>
							<Th color={"brand.quinary"}>Invested</Th>
							<Th color={"brand.quinary"}>Repayment Amount</Th>
							<Th color={"brand.quinary"}>Total Units</Th>
                            <Th color={"brand.quinary"}>Withdraw</Th>

						</Tr>
					</Thead>
					<Tbody color={"brand.secondary"}>
                        {invoices.map((invoice) => (
                          <Tr>
							<Td><Link color={"brand.senary"} href={`/company/${invoice?.invoiceAddress}`}>View Invoice Details</Link></Td>
							<Td>{Number(invoice?.res?.investedAmount)/10**6} USDC</Td>
							<Td>{Number(invoice?.res?.repaymentAmount)/10**6} USDC</Td>
							<Td>{Number(invoice?.res?.totalUnits)}</Td>
							<Td>{invoice?.res?.hasClaimed ? "Already Claimed": 
                                <Button isDisabled= {!invoice?.isCompleted} onClick={()=>withdrawPayment(invoice?.invoiceAddress)}>Withdraw Payment</Button>
                             }                            
                            </Td>
						</Tr>
                        ))}
					</Tbody>
				</Table>
			</Center>
		</>
	)
}

export default PortfolioTable