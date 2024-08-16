import {
	Button,
	Center,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react"
import React, {useEffect, useState} from "react"
import invoiceAbi from '@/blockend/build/invoice.json'
import web3 from "@/blockend/web3";
import Link from "next/link";

type Props = {
}

const ClientDashboard = (sellerAddress:any) => {
    const [invoices, setInvoices] = useState([]);

    const address = sellerAddress['address'];
    //get the agreements for the address == deployed.contract. seller
    //How will you find that - think
    //In activeInvoices check if anyseller has this or seller's -> invoice
    //Do this in MongoDB => seller - invoice - active - signed
    //This is while apporiving invoice
    //Keep this track - same for investors -> when the invoice is paid.
    //Keep track of fees for factor

    useEffect(() => {
		const fetchInvoices = async () => {
			const response = await fetch(`api/uploaded_invoices?sellerAddress=${address}`).then((res) =>
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
                    updateToMongoDB(invoice);
                }
            }
            )

    }

    const updateToMongoDB = async(invoice: UploadedInvoice) =>{
        let approvedInvoice = invoice
        
		approvedInvoice.signedBySeller = true

		const updatedInvoice = await fetch("api/uploaded_invoices", {
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


	return (
		<>
			<Center style={{ marginTop: "70px", fontSize: "30px" }}>
				<h1>Invoices</h1>
			</Center>
			<Center p={20} mx={20} my={10} bg={"brand.ternary"}>
				<Table textAlign={"center"}>
					<Thead>
						<Tr>
							<Th color={"brand.quinary"}>Contract Address</Th>
							<Th color={"brand.quinary"}>Invoice Date</Th>
							<Th color={"brand.quinary"}>View Invoice</Th>
							<Th color={"brand.quinary"}>Sign Agreement</Th>
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
								<Button variant={"signUp"} onClick={()=>{handleSignAgreement(invoice)}}>Sign Agreement</Button>
							</Td>
							<Td>
								<Button variant={"pay"}>Pay Invoice</Button>
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
