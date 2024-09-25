import {
	Button,
	Center,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
    useToast,
} from "@chakra-ui/react"
import React, {useEffect, useState} from "react"
import invoiceAbi from '@/blockend/build/invoice.json'
import web3 from "@/blockend/web3";
import Link from "next/link";
import {useAccount} from "wagmi";

type Props = {
}

const ClientDashboard = (sellerAddress:any) => {
    const [invoices, setInvoices] = useState([]);

    const address = sellerAddress['address'];

    const {chainId} = useAccount();
    
    const toast = useToast()

    //get the agreements for the address == deployed.contract. seller
    //How will you find that - think
    //In activeInvoices check if anyseller has this or seller's -> invoice
    //Do this in MongoDB => seller - invoice - active - signed
    //This is while apporiving invoice
    //Keep this track - same for investors -> when the invoice is paid.
    //Keep track of fees for factor

    useEffect(() => {
		const fetchInvoices = async () => {
			const response = await fetch(`api/uploaded_invoices?sellerAddress=${address}&chainId=${chainId}`).then((res) =>
				res.json()
			)
			setInvoices(response)
		}

		fetchInvoices()
	}, [])


    const handleSignAgreement =async(invoice) => {

        	const invoiceContract = new web3.eth.Contract(invoiceAbi, invoice.contractAddress);

            await invoiceContract.methods.signAgreement().send({from:address}).then((res)=>{
                if(res){
                    updateToMongoDB(invoice, 'signedBySeller');
                     toast({
                      title: 'Sign Agreement',
                      description: "Agrement signed successfully.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                })
           
                }
            }
            )

    }

    const updateToMongoDB = async(invoice: UploadedInvoice, fieldToUpdate) =>{
        let approvedInvoice = invoice
        // let invoiceId = invoice._id;
        
		approvedInvoice[fieldToUpdate] = true

		const updatedInvoice = await fetch(`api/uploaded_invoices`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(approvedInvoice),
		})

        const result = await updatedInvoice.json();

        if (result.acknowledged) {
					alert("Invoice updated successfully to MongoDb")
				} else {
					alert("There was an error updating the invoice")
	    }

    }

    const payInvoice = (invoice) => {
        const invoiceContract = new web3.eth.Contract(invoiceAbi, invoice.contractAddress);

        invoiceContract.methods.payInvoice().send({from:address}).then(()=>{
            updateToMongoDB(invoice, 'isCompleted');
            alert("Invoice paid successfully!");
        })
    }

    const claimPayment = (invoice) =>{
        const invoiceContract = new web3.eth.Contract(invoiceAbi, invoice.contractAddress);
            
             invoiceContract.methods.claimInvoiceAmount().send({from:address}).then(()=>{
                 toast({
                  title: 'Invoice amount claim',
                  description: "Amount is successfully credited to your account.",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
            })
    }


	return (
		<>
			<Center style={{ marginTop: "70px", fontSize: "30px" }}>
				<h1>Invoices</h1>
			</Center>
			<Center p={20} mx={20} my={10} bg={"brand.ternary"}>
				<Table textAlign={"center"} fontSize={15}>
					<Thead>
						<Tr>
							<Th color={"brand.quinary"}>Contract Address</Th>
							<Th color={"brand.quinary"}>Invoice Date</Th>
							<Th color={"brand.quinary"}>View Invoice</Th>
							<Th color={"brand.quinary"}>Sign Agreement</Th>
                            <Th color={"brand.quinary"}>Withdraw Amount</Th>
							<Th color={"brand.quinary"}>Pay Invoice</Th>
						</Tr>
					</Thead>
					<Tbody color={"brand.secondary"}>
                    {invoices.map((invoice:UploadedInvoice)=>(
                        <Tr>
							<Td>{invoice.contractAddress}</Td>
							<Td>{invoice.date_added.slice(0,10)}</Td>
							<Td color="brand.senary"><Link  target="_blank" href={`https://ipfs.io/ipfs/${invoice?.fileURL}`} >Click to View</Link></Td>
							<Td>
								<Button isDisabled={invoice.signedBySeller} variant={"signUp"} onClick={()=>{handleSignAgreement(invoice)}}>Sign Agreement</Button>
							</Td>
                            <Td>
								<Button isDisabled={invoice.isCompleted} onClick={()=>claimPayment(invoice)} variant={"oauth"}>Withdraw Amount</Button>
							</Td>
							<Td>
								<Button onClick={()=>payInvoice(invoice)} variant={"pay"}>Pay Invoice</Button>
							</Td>
						</Tr>

                    ))}		
					</Tbody>
				</Table>
			</Center>
			{/* Due Date show here Agreement Uploaded Date Approval Date Decline */}
			{/* Date Decline Reason */}
			{/* <Button variant={"signUp"}>Sign Agreement</Button>
			<Button variant={"pay"}>Pay Invoice</Button> */}
		</>
	)
}

export default ClientDashboard
