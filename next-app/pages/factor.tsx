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
} from "@chakra-ui/react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useAccount } from "wagmi"

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

	useEffect(() => {
		const fetchInvoices = async () => {
			const response = await fetch("api/uploaded_invoices").then((res) =>
				res.json()
			)
			setUploadedInvoices(response)
		}

		fetchInvoices()
	}, [])

	const updateDecline = async (invoice: UploadedInvoice) => {}

	const approveInvoice = async (invoice: UploadedInvoice) => {
		let approvedInvoice = invoice
		approvedInvoice.verifierAddress = address
		approvedInvoice.approved = true

		const updatedInvoice = await fetch("api/uploaded_invoices", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(approvedInvoice),
		})

		const res = await updatedInvoice.json()
		if (res.acknowledged) {
			//Here comes the blockchain functionality
			//Everything from this invoice should go to blockchain
			//That you have to handle in backend or just pop-up a form
		}
	}

	return (
		<>
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
							<Th color={"brand.quinary"}>File Name</Th>
							<Th color={"brand.quinary"}>Date (YYYY-MM-DD)</Th>
							<Th color={"brand.quinary"}>Wallet Address</Th>
							<Th color={"brand.quinary"}>File URL</Th>
							<Th color={"brand.quinary"}>Email</Th>
							<Th color={"brand.quinary"}>Verify</Th>
						</Tr>
					</Thead>
					{uploadedInvoices ? (
						uploadedInvoices.map((invoice: UploadedInvoice) => (
							<Tbody color={"brand.secondary"} key={invoice._id}>
								<Tr>
									<Td>{invoice.fileName}</Td>
									<Td>{invoice.date_added.slice(0, 10)}</Td>
									<Td fontSize={15}>
										{/* <Center bg={"brand.quinary"} fontSize={15}> */}
										{invoice.walletAddress}
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
