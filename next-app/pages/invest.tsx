import Footer from '@/components/Header/Footer'
import HeroSection from '@/components/Invest/HeroSection'
import InvoiceInfo from '@/components/Invest/InvoiceInfo'
import NFTCard from '@/components/Invest/NFTCard'
import {WavyBackground} from '@/components/ui/wavy-background'
import { FaSort } from "react-icons/fa"
import { FaFilter } from "react-icons/fa"
import { factoryContract } from '@/blockend/interact'

import {
	Divider,
	Grid,
	Heading,
	Stack,
	Center,
	Flex,
	Button,
} from "@chakra-ui/react"
import React, {useEffect, useState} from "react"
import {useAccount} from 'wagmi'

function invest() {

    const [signedInvoices, setSignedInvoices] = useState([]);
	const { isConnected, chainId } = useAccount();

	useEffect(() => {
		const fetchInvoices = async () => {
			const response = await fetch(`api/uploaded_invoices?signedBySeller=true&chainId=${chainId}&isCompleted=false`).then((res) =>
				res.json()
                
			)
			setSignedInvoices(response)
            console.log(response);
		}
		fetchInvoices()
	}, [isConnected,chainId])


	return (
		<>
			<Stack mt={10} mx={20}>
				<Flex >
                   {/* <Heading>Marketplace</Heading>{" "} */}
                   {/* search bar  */}

					<Flex width={"100%"} justifyContent={"flex-start"}>
                        <Button  variant={"oauth"} width={"150px"}>
    						Sort
    						<FaSort style={{ marginLeft: "10px" }} />
    					</Button>
    					<Button variant={"oauth"} width={"150px"} ml={5}>
    						Filter
    						<FaFilter style={{ marginLeft: "10px" }} />
    					</Button>
                    </Flex>
				</Flex>

				{/* <Flex>
					<Divider></Divider>
				</Flex> */}

				<Grid
					mt={5}
					templateColumns={{
						base: "repeat(2, 1fr)",
						sm: "repeat(2, 1fr)",
						md: "repeat(4, 1fr)",
					}}
					gap={8}
					alignItems={"center"}
					py={6}>
                    {signedInvoices.map((invoice) => (
                        <InvoiceInfo
                            key={invoice.contractAddress}
                            {...invoice}
                        />
                    ))}
				</Grid>
			</Stack>

			{/* <div style={{ position: "static", bottom: "0", width: "auto" }}>
				<Footer />
			</div> */}
		</>
	)
}

export default invest