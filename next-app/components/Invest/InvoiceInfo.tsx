import {
	Stack,
	Center,
	Heading,
	Link,
	Text,
	Flex,
	Button,
	Container,
	Divider,
} from "@chakra-ui/react"
import React from "react"
import { LiaIndustrySolid } from "react-icons/lia"

type Props = {
    seller: string;
    buyer: string;
    unitCost: string;
    repaymentPerUnit: string;
    xirr: string;
    unitsInvested: number;
    totalUnits: number;
    tenure: number;
}

const InvoiceInfo = (props:Props) => {
	return (
		<Link href="/company" style={{ textDecoration: "none" }}>
			<Stack
				borderRadius={"10"}
				px={5}
				pt={5}
				pb={5}
				bg="linear-gradient(90deg, rgba(24,25,28,1) 0%, rgba(24,25,28,1) 100%) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)"
				border="3px solid transparent">
				<Center>
					<Stack width={"100%"}>
						<Flex textAlign={"center"} justifyContent={"space-between"}>
							<Flex width={"50%"}>
								<LiaIndustrySolid
									style={{ transform: "rotateY(180deg)", marginRight: "10px" }}
									size={60}
									color="cyan"
								/>
								<Stack>
									<Text className="invoice-card-heading">Seller</Text>
									<Text>{props.seller}</Text>
								</Stack>
							</Flex>

							<Flex>
								<Stack mr={"0"}>
									<Text className="invoice-card-heading">Buyer</Text>
									<Text>{props.buyer}</Text>
								</Stack>
								<LiaIndustrySolid size={60} />
							</Flex>
						</Flex>

						<Divider />
						<Flex textAlign={"center"} justifyContent={"space-between"}>
							<Stack>
								<Text className="invoice-card-heading">Unit Cost</Text>
								<Text>{props.unitCost}</Text>
							</Stack>

							<Stack>
								<Text className="invoice-card-heading">Repayment/Unit</Text>
								<Text>{props.repaymentPerUnit}</Text>
							</Stack>

							<Stack>
								<Text className="invoice-card-heading">XIRR</Text>
								<Text>{props.xirr}</Text>
							</Stack>
						</Flex>

						<Flex textAlign={"center"} justifyContent={"space-between"}>
							<Stack>
								<Text className="invoice-card-heading">Units Left</Text>
								<Text>{props.totalUnits - props.unitsInvested} / {props.totalUnits}</Text>
							</Stack>

							<Stack>
								<Text className="invoice-card-heading">Tenure</Text>
								<Text>{props.tenure} Days</Text>
							</Stack>
						</Flex>
					</Stack>
				</Center>
			</Stack>
		</Link>
	)
}

export default InvoiceInfo
