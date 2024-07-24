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

type Invoice = {
    seller: string;
    buyer: string;
    unitCost: string;
    repaymentPerUnit: string;
    xirr: string;
    unitsInvested: number;
    totalUnits: number;
    tenure: number;
}
const invoices : Invoice[] = [
    {
        seller: "Apple",
        buyer: "Imagine Store",
        unitCost: "$100",
        repaymentPerUnit: "$110",
        xirr:"14%",
        unitsInvested:700,
        totalUnits: 1000,
        tenure:60
    },
    {
        seller: "Reliance",
        buyer: "Sangeeta Mobiles",
        unitCost: "$100",
        repaymentPerUnit: "$109",
        xirr:"14.9%",
        unitsInvested:300,
        totalUnits: 1000,
        tenure:60
    },
    {
        seller: "Medicare",
        buyer: "Netmeds",
        unitCost: "$100",
        repaymentPerUnit: "$110",
        xirr:"14%",
        unitsInvested:900,
        totalUnits: 1000,
        tenure:30
    },
    {
        seller: "Jio",
        buyer: "Sangeetha Mobiles",
        unitCost: "$100",
        repaymentPerUnit: "$109",
        xirr:"14.9%",
        unitsInvested:300,
        totalUnits: 1000,
        tenure:60
    },
    {
        seller: "Apple",
        buyer: "Imagine Store",
        unitCost: "$100",
        repaymentPerUnit: "$110",
        xirr:"14%",
        unitsInvested:700,
        totalUnits: 1000,
        tenure:60
    },
    {
        seller: "Reliance",
        buyer: "Sangeeta Mobiles",
        unitCost: "$100",
        repaymentPerUnit: "$109",
        xirr:"14.9%",
        unitsInvested:300,
        totalUnits: 1000,
        tenure:60
    },
    {
        seller: "Medicare",
        buyer: "Netmeds",
        unitCost: "$100",
        repaymentPerUnit: "$110",
        xirr:"14%",
        unitsInvested:900,
        totalUnits: 1000,
        tenure:30
    },
    {
        seller: "Jio",
        buyer: "Sangeetha Mobiles",
        unitCost: "$100",
        repaymentPerUnit: "$109",
        xirr:"14.9%",
        unitsInvested:300,
        totalUnits: 1000,
        tenure:60
    },
    {
        seller: "MedPlus",
        buyer: "Patanjali",
        unitCost: "$100",
        repaymentPerUnit: "$110",
        xirr:"14%",
        unitsInvested:900,
        totalUnits: 1000,
        tenure:30
    }
]
function invest() {
	return (
		<>
			<Stack>
				<Header />
				{/* <HeroSection/> */}
				<Center mt={10}>
					<Heading>Invoice Discounting Marketplace</Heading>{" "}
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
                    {invoices.map((invoice) => (
                        <InvoiceInfo
                            key={invoice.seller}
                            {...invoice}
                        />
                    ))}
				</Grid>
			</Stack>

			<div style={{ position: "static", bottom: "0", width: "auto" }}>
				<Footer />
			</div>
		</>
	)
}

export default invest