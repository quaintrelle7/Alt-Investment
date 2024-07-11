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
import React from "react"

type Props = {}

const ClientDashboard = (props: Props) => {
	return (
		<>
			<Center style={{ marginTop: "70px", fontSize: "30px" }}>
				<h1>Invoices</h1>
			</Center>
			<Center p={20} mx={20} my={10} bg={"brand.ternary"}>
				<Table textAlign={"center"}>
					<Thead>
						<Tr>
							<Th color={"brand.quinary"}>Transaction ID</Th>
							<Th color={"brand.quinary"}>Due Date</Th>
							<Th color={"brand.quinary"}>Invested Amount/Invoice Amount</Th>
							<Th color={"brand.quinary"}>Total Units</Th>
							<Th color={"brand.quinary"}>Sign Agreement</Th>
							<Th color={"brand.quinary"}>Pay Invoice</Th>
						</Tr>
					</Thead>
					<Tbody color={"brand.secondary"}>
						<Tr>
							<Td>123434444</Td>
							<Td>12/12/2024</Td>
							<Td>100000/130000</Td>
							<Td>25</Td>
							<Td>
								<Button variant={"signUp"}>Sign Agreement</Button>
							</Td>
							<Td>
								<Button variant={"pay"}>Pay Invoice</Button>
							</Td>
						</Tr>
						<Tr>
							<Td>123434444</Td>
							<Td>12/12/2024</Td>
							<Td>100000/130000</Td>
							<Td>25</Td>
							<Td>
								<Button variant={"signUp"}>Sign Agreement</Button>
							</Td>
							<Td>
								<Button variant={"pay"}>Pay Invoice</Button>
							</Td>
						</Tr>
						<Tr>
							<Td>123434444</Td>
							<Td>12/12/2024</Td>
							<Td>100000/130000</Td>
							<Td>25</Td>
							<Td>
								<Button variant={"signUp"}>Sign Agreement</Button>
							</Td>
							<Td>
								<Button variant={"pay"}>Pay Invoice</Button>
							</Td>
						</Tr>
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
