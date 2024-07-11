import Footer from '@/components/Header/Footer'
import Header from '@/components/Header/Header'
import HeroSection from '@/components/Invest/HeroSection'
import InvoiceInfo from '@/components/Invest/InvoiceInfo'
import NFTCard from '@/components/Invest/NFTCard'
import {WavyBackground} from '@/components/ui/wavy-background'
import { FaSort } from "react-icons/fa"
import { FaFilter } from "react-icons/fa"

import {
	Divider,
	Grid,
	Heading,
	Stack,
	Center,
	Flex,
	Button,
} from "@chakra-ui/react"
import React from "react"
import IDFAQ from "@/components/FAQ/IDFAQ"

function invest() {
	return (
		<>
			<Stack>
				<Header />
				{/* <HeroSection/> */}
				<Center mt={10}>
					<Heading>Invoice Discounting MarketPlace</Heading>{" "}
				</Center>

				<Flex mt={20} p={6}>
					<Button width={"150px"}>
						Sort
						<FaSort style={{ marginLeft: "10px" }} />
					</Button>
					<Button width={"150px"} ml={10}>
						Filter
						<FaFilter style={{ marginLeft: "10px" }} />
					</Button>
				</Flex>

				<Flex px="6">
					<Divider></Divider>
				</Flex>

				{/* <Center fontSize={{base:"2xl", md:"50px"}} textAlign={"center"}>
                <h1 color="brand.primary">Welcome to Innovative Investment Platform</h1>
            </Center> */}

				<Grid
					mt={5}
					templateColumns={{
						base: "repeat(2, 1fr)",
						sm: "repeat(2, 1fr)",
						md: "repeat(4, 1fr)",
					}}
					gap={8}
					alignItems={"center"}
					p={6}>
					<InvoiceInfo />
					<InvoiceInfo />
					<InvoiceInfo />
					<InvoiceInfo />
					<InvoiceInfo />
					<InvoiceInfo />
					<InvoiceInfo />
					<InvoiceInfo />
				</Grid>
			</Stack>

			<div style={{ position: "static", bottom: "0", width: "auto" }}>
				<Footer />
			</div>
		</>
	)
}

export default invest