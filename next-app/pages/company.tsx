import IDFAQ from "@/components/FAQ/IDFAQ"
import InvoiceDetails from "@/components/Invest/InvoiceDetails"
import ProfileCard from "@/components/Invest/ProfileCard"
import {
	Divider,
	Grid,
	Heading,
	Stack,
	Center,
	Image,
	Box,
	Flex,
	Text,
} from "@chakra-ui/react"
import React from "react"

function company() {
	return (
		<>
			<InvoiceDetails />

			<Stack mx={20} my={20}>
				<Divider mb={10} />
				<Flex p={50} justifyContent={"space-around"}>
					<ProfileCard />
					<ProfileCard />
				</Flex>

				<Flex justifyContent={"space-between"} mt={10}>
					<Stack width={"50%"}>
						<Text mb={5} className="invoice-detail-text">
							FAQs
						</Text>

						<IDFAQ />
                        
					</Stack>
					<Stack width={"30%"}>
						<Text mb={2} className="invoice-detail-text">
							Platform History Record
						</Text>
						<Text mb={3} className="invoice-card-heading">
							This record is of the company on whom the recourse is.
						</Text>
						<Box>
							<Text mb={2} className="invoice-card-heading">
								Total Amount Repaid
							</Text>
							<Text className="invoice-detail-text">$100,000,200</Text>
						</Box>

						<Box>
							<Text mb={2} className="invoice-card-heading">
								On Time Payment
							</Text>
							<Text className="invoice-detail-text">100% </Text>
						</Box>
					</Stack>
				</Flex>
			</Stack>
		</>
	)
}

export default company
