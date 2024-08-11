import Header from "@/components/Header/Header"
import {
	Center,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Button,
	Text,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
} from "@chakra-ui/react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import invoiceAbi from '@/blockend/build/invoice.json'
import web3 from "@/blockend/web3";

type Props = {}

//server side vs client side data fetch: https://stackoverflow.com/questions/77380376/how-can-i-fetch-data-and-display-it-in-nextjs-13-or-above

// async function GetUploadedInvoices() {
// 	let { data } = await axios.get("/api/uploaded_invoices")

// 	console.log(data)
// 	return data
// }




export default function ({}: Props) {
	const [uploadedInvoices, setUploadedInvoices] = useState([])
	const { address, isConnected } = useAccount()
	const [approveForm, setApproveForm] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
    const [invoiceAddresses, setInvoiceAddresses] = useState([])
    const [invoice, setInvoice] = useState<UploadedInvoice>();

    // const getInvoices = async() => {
    //     const result = await factoryContract.methods.getDeployedContracts().call();
    //     setInvoiceAddresses(result);
    // }

    // getInvoices();

	const [formData, setFormData] = useState({
		totalInvoiceAmount: 0,
        amountPerUnit:0,
        repaymentPerUnit:0,
        totalUnits:0,
        tenure:0,
		agreementHash: "",
        fees:0,
        seller: "",
        buyer: "",
        xirr:0
	})

	useEffect(() => {
		const fetchInvoices = async () => {
			const response = await fetch("api/uploaded_invoices?active=true&approved=false").then((res) =>
				res.json()
			)
			setUploadedInvoices(response)
		}

		fetchInvoices()
	}, [])

	const updateDecline = async (invoice: UploadedInvoice) => {}

    var varToSaveToMongoDb = null;
	const approveInvoice = async (invoice: UploadedInvoice) => {
        setApproveForm(true)
        setInvoice(invoice);
        
    


		
		// const res = await updatedInvoice.json()
		// if (res.acknowledged) {
		//Here comes the blockchain functionality
		//Everything from this invoice should go to blockchain
		//That you have to handle in backend or just pop-up a form
		//Pop - Up a form to add amount, discountedAmount, due date, fees, agreement url
		//ROI?.
		// }


	}

    
    const saveToMongoDB = async(invoice: UploadedInvoice) =>{
        let approvedInvoice = invoice
        
		approvedInvoice.approved = true;
        approvedInvoice.signedBySeller = false;

		const updatedInvoice = await fetch("api/uploaded_invoices", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(approvedInvoice),
		})

        const result = await updatedInvoice.json();

        if (result.acknowledged) {
					alert("Invoice uploaded successfully to MongoDb")
				} else {
					alert("There was an error uploading the invoice")
	    }

    }

    // useEffect(() => {
    //     if(varToSaveToMongoDb){
    //         saveToMongoDB(invoice);
    //     }
    // },[varToSaveToMongoDb]);



	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}))
	}

	const submitApproval = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true)

		const invoiceContract = new web3.eth.Contract(invoiceAbi, invoice.contractAddress)

        console.log(invoice.contractAddress);
        console.log(invoiceContract);

        const res = await invoiceContract.methods.approveInvoice(
            formData.totalInvoiceAmount,
            formData.amountPerUnit,
            formData.repaymentPerUnit,
            formData.totalUnits,
            formData.tenure,
            formData.agreementHash,
            formData.fees,
            formData.seller,
            formData.buyer,
            formData.xirr
            ).send({from: address})        
            .then(() => {
                
                saveToMongoDB(invoice);

                setIsSubmitting(false)
		        setApproveForm(false)
            });

                    console.log("Invoice Approved: ", res);


		

		//notification success or error!
	}

	return (
		<>
			<Modal isOpen={approveForm} onClose={() => setApproveForm(false)}>
				<ModalOverlay />
				<ModalContent bg={"brand.ternary"}>
					<ModalHeader>Approve Invoice</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Center>
							<Stack>
								<form onSubmit={submitApproval}>
									
                                    <label htmlFor="totalInvoiceAmount">Invoice Amount</label>
									<Input
										required
										type="number"
										marginBottom="20px"
										marginTop="2px"
										name="totalInvoiceAmount"
										placeholder="Amount in Eth"
										value={formData.totalInvoiceAmount}
										onChange={handleInputChange}
									/>

									<label htmlFor="amountPerUnit">Unit Cost</label>
									<Input
										type="number"
										marginBottom="20px"
										marginTop="2px"
										placeholder="Amount per unit"
										name="amountPerUnit"
										value={formData.amountPerUnit}
										onChange={handleInputChange}
										required
									/>

                                    <label htmlFor="repaymentPerUnit">Repayment per Unit</label>
									<Input
										type="number"
										marginBottom="20px"
										marginTop="2px"
										placeholder="Repayment per Unit"
										name="repaymentPerUnit"
										value={formData.repaymentPerUnit}
										onChange={handleInputChange}
										required
									/>

                                    <label htmlFor="totalUnits">Total Units</label>
									<Input
										type="number"
										marginBottom="20px"
										marginTop="2px"
										placeholder="Total Units"
										name="totalUnits"
										value={formData.totalUnits}
										onChange={handleInputChange}
										required
									/>


									<label htmlFor="fees">Factor Fees</label>
									<Input
										type="number"
										marginBottom="20px"
										marginTop="2px"
										placeholder="Fees Amount"
										name="fees"
										value={formData.fees}
										onChange={handleInputChange}
										required
									/>

									<label htmlFor="agreementHash">Agreement Hash</label>
									<Input
										type="text"
										marginBottom="25px"
										marginTop="2px"
										placeholder="Agreement Hash"
										name="agreementHash"
										value={formData.agreementHash}
										onChange={handleInputChange}
										required={true}
									/>

                                    <label htmlFor="tenure">Tenure</label>
									<Input
										type="number"
										marginBottom="20px"
										marginTop="2px"
										placeholder="Tenure in days"
										name="tenure"
										value={formData.tenure}
										onChange={handleInputChange}
										required
									/>

                                    <label htmlFor="seller">Seller Name</label>
									<Input
										type="text"
										marginBottom="20px"
										marginTop="2px"
										placeholder="Seller Name"
										name="seller"
										value={formData.seller}
										onChange={handleInputChange}
										required
									/>

                                    <label htmlFor="buyer">Buyer Name</label>
									<Input
										type="text"
										marginBottom="20px"
										marginTop="2px"
										placeholder="Buyer Name"
										name="buyer"
										value={formData.buyer}
										onChange={handleInputChange}
										required
									/>

                                    <label htmlFor="xirr">XIRR * 100</label>
									<Input
										type="number"
										marginBottom="20px"
										marginTop="2px"
										placeholder="XIRR"
										name="xirr"
										value={formData.xirr}
										onChange={handleInputChange}
										required
									/>



									<ModalFooter>
										{isSubmitting ? (
											<Button isLoading loadingText="Submitting">
												Submit
											</Button>
										) : (
											<Button type="submit">Submit</Button>
										)}

										<Button ml={4} onClick={() => setApproveForm(false)}>
											Close
										</Button>
									</ModalFooter>
								</form>
							</Stack>
						</Center>
					</ModalBody>

					{/* {renderAlert()} */}
				</ModalContent>
			</Modal>
			<Header />
			<Center>
				<Heading fontSize={25} mt={"40px"}>
					Uploaded Invoices
				</Heading>
			</Center>
			<Center p={20}>
				<Table textAlign={"center"}>
					<Thead>
						<Tr>
							<Th color={"brand.quinary"} width={"100px"}>Contract Address</Th>
							<Th color={"brand.quinary"}>Date (YYYY-MM-DD)</Th>
							<Th color={"brand.quinary"}>Seller Address</Th>
							<Th color={"brand.quinary"}>File URL</Th>
							<Th color={"brand.quinary"}>Email</Th>
							<Th color={"brand.quinary"}>Verify</Th>
						</Tr>
					</Thead>
					{uploadedInvoices ? (
						uploadedInvoices.map((invoice: UploadedInvoice) => (

							<Tbody color={"brand.secondary"} key={invoice._id}>
								<Tr>
									<Td maxWidth={"200px"}><Text textOverflow={"ellipsis"}>{invoice.contractAddress}</Text></Td>
									<Td>{invoice.date_added.slice(0, 10)}</Td>
									<Td fontSize={15}>
										{/* <Center bg={"brand.quinary"} fontSize={15}> */}
										{invoice.sellerAddress}
										{/* </Center> */}
									</Td>
									<Td>
										<Link
											target="_blank"
											href={`https://ipfs.io/ipfs/${invoice.fileURL}`}
											style={{
												textDecoration: "1px solid blue",
												color: "blue",
											}}>
											Click here
										</Link>
									</Td>
									<Td>{invoice.email}</Td>
									<Td>
										{!invoice.approved ? (
											<Button
												variant="accept"
												onClick={() => {
													approveInvoice(invoice)
												}}>
												Approve
											</Button>
										) : (
											<></>
										)}
										<Button
											variant="reject"
											onClick={() => {
												updateDecline(invoice)
											}}>
											Decline
										</Button>
									</Td>
								</Tr>
							</Tbody>
						))
					) : (
						<Text color={"white"}>Loading...</Text>
					)}
				</Table>
			</Center>
		</>
	)
}
