import {
	Stack,
	Image,
	Center,
	Container,
	Heading,
	Flex,
	Box,
	Text,
} from "@chakra-ui/react"
import React from "react"
import { FaApple } from "react-icons/fa"

type Props = {}

function ProfileCard({}: Props) {
	return (
		<>
			<Stack
				p={30}
				mx={10}
				bg="linear-gradient(90deg, rgba(24,25,28,1) 0%, rgba(24,25,28,1) 100%) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)"
				border="3px solid transparent"
				height={"fit-content"}
				width={"auto"}
				borderRadius={"20px"}>
				<Flex justifyContent={"space-between"}>
					<Text className="invoice-detail-text">About the Company</Text>
					<Box mt={-2} mr={-2}>
						<FaApple size={50} color="grey" />
					</Box>
				</Flex>
				<Text className="invoice-detail-heading" my={2}>
					Apple - www.apple.com
				</Text>
				<Text className="invoice-card-heading">
					Apple Inc. is an American multinational corporation and technology
					company headquartered in Cupertino, California, in Silicon Valley. It
					designs, develops, and sells consumer electronics, computer software,
					and online
				</Text>
			</Stack>
		</>
	)
}

export default ProfileCard
