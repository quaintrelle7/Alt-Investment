import React from 'react'
import {Button, Text, Flex, Heading, Stack, Image} from '@chakra-ui/react'

function NFTDashbaord() {
  return (
		<Flex mt="20" mx={20} justify={"space-between"}>
			<Stack width="30%" height={"30vh"} position={"relative"}>
				<Image
					objectFit="cover"
					maxW={{ base: "60%" }}
					src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
					alt="Caffe Latte"
				/>
				<Button
					position={"absolute"}
					width={"60%"}
					bottom={"0"}
					colorScheme="telegram">
					Invest Now
				</Button>
			</Stack>

			<Stack width="60%" height={"30vh"} position={"relative"}>
				<Flex justify={"space-between"}>
					<Stack>
						<Text color={"brand.quinary"}>Seller</Text>
						<Heading fontSize={20}>Apple</Heading>
					</Stack>
					<Stack>
						<Text color={"brand.quinary"}>Payer</Text>
						<Heading fontSize={20}>Imagine Store</Heading>
					</Stack>
					<Stack>
						<Text color={"brand.quinary"}>Invoice Amount</Text>
						<Heading fontSize={20}>$100</Heading>
					</Stack>
					<Stack>
						<Text color={"brand.quinary"}>Due Date</Text>
						<Heading fontSize={20}>Dec 24, 2024</Heading>
					</Stack>
				</Flex>
				<Flex mt={10} justify={"space-between"}>
					<Stack>
						<Text color={"brand.quinary"}>Discounted Amount</Text>
						<Heading fontSize={20}>$80</Heading>
					</Stack>
					<Stack>
						<Text color={"brand.quinary"}>Rate of Return</Text>
						<Heading fontSize={20}>17%</Heading>
					</Stack>
					<Stack>
						<Text color={"brand.quinary"}>Risk</Text>
						<Heading fontSize={20}>Low</Heading>
					</Stack>
					<Stack>
						<Text color={"brand.quinary"}>View on Blockchain</Text>
						<Heading fontSize={20}>Link</Heading>
					</Stack>
				</Flex>
				<Flex>
					<Stack mt={10}>
						{/* <Text color={"brand.quinary"}>
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
		</Flex>
	)
}

export default NFTDashbaord