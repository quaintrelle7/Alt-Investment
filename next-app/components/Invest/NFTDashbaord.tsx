import React from 'react'
import {
	Button,
	Text,
	Flex,
	Heading,
	Stack,
	Image,
	Input,
	useNumberInput,
	HStack,
	Center,
} from "@chakra-ui/react"

function HookUsage() {
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			defaultValue: 0,
			min: 0,
			max: 10,
			precision: 1,
		})

	const inc = getIncrementButtonProps()
	const dec = getDecrementButtonProps()
	const input = getInputProps()

	return (
		<>
			<Center mb={5}>
				<Stack>
					<Text className="invoice-card-heading" mb={1} textAlign={"center"}>
						No. of Units
					</Text>
					<HStack>
						<Button
							{...inc}
							background={"brand.quinary"}
							color={"white"}
							border={"1px solid black"}
							fontWeight={"extrabold"}>
							+
						</Button>
						<Input {...input} />
						<Button
							{...dec}
							background={"brand.quinary"}
							color={"white"}
							border={"1px solid black"}
							fontWeight={"extrabold"}>
							-
						</Button>
					</HStack>
				</Stack>
			</Center>
		</>
	)
}

function NFTDashbaord() {
	return (
		<Flex mt="20" mx={20} justify={"space-between"}>
			<Stack width="50%" height={"35vh"} position={"relative"}>
				<Flex justify={"space-between"}>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">Invoice Amount</Text>
						<Text className="invoice-detail-text">$100</Text>
					</Stack>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">XIRR</Text>
						<Text className="invoice-detail-text">17%</Text>
					</Stack>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">Recourse On</Text>
						<Text className="invoice-detail-text">Seller</Text>
					</Stack>

					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">Due Date</Text>
						<Text className="invoice-detail-text">Dec 24, 2024</Text>
					</Stack>
				</Flex>
				<Flex mt={10} justify={"space-between"}>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">Seller</Text>
						<Text className="invoice-detail-text">Apple</Text>
					</Stack>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">Buyer</Text>
						<Text className="invoice-detail-text">Imagine Store</Text>
					</Stack>

					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">Risk</Text>
						<Text className="invoice-detail-text">Low</Text>
					</Stack>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">View Contract</Text>
						<Text className="invoice-detail-text">Link</Text>
					</Stack>
				</Flex>
				<Flex>
					<Stack mt={10}>
						{/* <Text className="invoice-detail-heading">
							The 2023 Tesla Model 3 is the cheapest Tesla car currently
							offered. The base rear-wheel drive (RWD) trim has an official
							starting price of $40,240. The Model 3 Long Range is a tad more
							expensive at $47,240. The most expensive Model 3 is the
							Performance model, which costs a minimum of $53,240.
						</Text> */}
						<Flex position={"absolute"} bottom={"0"}>
							<Button>View Invoice</Button>
							<Button ml={5}>View Agreement</Button>
						</Flex>
					</Stack>
				</Flex>
			</Stack>

			<Stack width="30%" height={"35vh"} position={"relative"}>
				<HookUsage />

				<Flex justifyContent={"space-between"}>
					<Text className="invoice-card-heading">Unit Value</Text>
					<Text>$10</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text className="invoice-card-heading">Invested Amount</Text>
					<Text>Units * Unit_Value</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text className="invoice-card-heading">Repayment Date</Text>
					<Text>Today + 60 days</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text className="invoice-card-heading">Repayment Value</Text>
					<Text>Units*Repayment_Unit</Text>
				</Flex>
				<Center>
					<Button
						variant={"solid_complete"}
						position={"absolute"}
						width={"50%"}
						bottom={"0"}
						colorScheme="telegram">
						Continue to Pay
					</Button>
				</Center>
			</Stack>
		</Flex>
	)
}

export default NFTDashbaord