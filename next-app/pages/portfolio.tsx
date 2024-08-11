import Footer from '@/components/Header/Footer'
import InvestmentSummary from '@/components/Portfolio/InvestmentSummary'
import PortfolioTable from '@/components/Portfolio/PortfolioTable'
import React from 'react'
import UserDashboard from '@/components/Portfolio/UserDashboard'
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Box,
	Stack,
	Heading,
	Center,
} from "@chakra-ui/react"
import InvestmentHistory from "@/components/Portfolio/InvestmentHistory"
import Header from "@/components/Header/Header"
import ClientDashboard from "@/components/Portfolio/ClientDashboard"
import {useAccount} from 'wagmi'

function portfolio() {

    const {address} = useAccount();
	return (
		<>
			<Header />
			{/* <UserDashboard /> */}

			<Center mt={10}>
				<Heading>My Portfolio</Heading>
			</Center>

			<Stack mt={20} style={{ marginRight: "2.5rem" }}>
				<Tabs variant="soft-rounded" ml={10}>
					<TabList>
						<Tab
							bg={"brand.ternary"}
							_selected={{ bg: "brand.quinary", color: "brand.primary" }}>
							Invoices
						</Tab>
						<Tab
							bg={"brand.ternary"}
							ml="5"
							_selected={{ bg: "brand.quinary", color: "brand.primary" }}>
							Holdings
						</Tab>
						<Tab
							bg={"brand.ternary"}
							ml="5"
							_selected={{ bg: "brand.quinary", color: "brand.primary" }}>
							Summary
						</Tab>
					</TabList>
					<TabPanels bg="brand.ternary" mt="10">
						//check if walletAddress is seller then only show this tab
						<TabPanel>
							<ClientDashboard address= {address}/>
						</TabPanel>
						<TabPanel>
							<PortfolioTable />
						</TabPanel>
						<TabPanel>
							<InvestmentSummary />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Stack>
			<div style={{ bottom: "0", width: "auto" }}>
				<Footer />
			</div>
		</>
	)
}

export default portfolio