import {
	Stack,
	Center,
	Heading,
	Link,
	Text,
	Flex,
	Button,
	Container,
} from "@chakra-ui/react"
import React from "react"

type Props = {}

const InvoiceInfo = (props: Props) => {
	return (
		<Link href="/company" style={{ textDecoration: "none" }}>
			<Stack
				borderRadius={"10"}
				px={5}
				pt={5}
				pb={5}
				bg="linear-gradient(90deg, rgba(24,25,28,1) 0%, rgba(24,25,28,1) 100%) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)"
				border="3px solid transparent">
				{/* <Heading
					textAlign={"center"}
					color={"brand.secondary"}
					_hover={{ color: "brand.quinary" }}
					fontWeight={"700"}
					letterSpacing={2}
					fontSize={"18"}>
					Company Name
				</Heading> */}

				<Center>
					<Stack width={"100%"}>
						<Flex textAlign={"center"} justifyContent={"space-between"}>
							<Stack>
								<Text fontWeight={200}>Invoice Amount</Text>
								<Text>$100</Text>
							</Stack>

							<Stack>
								<Text fontWeight={200}>ROI</Text>
								<Text>17%</Text>
							</Stack>

							<Stack>
								<Text fontWeight={200}>Discounted Amount</Text>
								<Text>$80</Text>
							</Stack>
						</Flex>

						<Center mt="3">
							<Link
								color={"brand.quinary"}
								fontWeight={"700"}
								_hover={{ color: "brand.senary" }}
								href="/company">
								Invest Now
							</Link>
						</Center>
					</Stack>
				</Center>
			</Stack>
		</Link>
	)
}

export default InvoiceInfo
