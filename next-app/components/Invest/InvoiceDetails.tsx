import React, {useState} from 'react'
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
import Link from 'next/link'
import {useRouter} from 'next/router';
import invoiceAbi from '@/blockend/build/invoice.json'
import web3 from "@/blockend/web3"
import {useAccount} from 'wagmi';

function InvoiceDetails(props:any) {
    
    const {invoiceInfo} = props;

    const {address} = useAccount();

    const router = useRouter();
    const { invoiceAddress } = router.query;

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			defaultValue: 0,
			min: 0,
			max: Number(invoiceInfo?.totalUnits) - Number(invoiceInfo?.purchasedUnits),
			precision: 1,
		})

	const inc = getIncrementButtonProps()
	const dec = getDecrementButtonProps()
	const input = getInputProps()

    const handleInvoicepurchase = () =>{
        
        //if(input.value)
        const invoiceContract = new web3.eth.Contract(invoiceAbi, invoiceAddress);

        invoiceContract.methods.purchaseInvoice(parseInt(input.value))
        .send({from:address,
                value: web3.utils.toWei(parseInt(input.value) * Number(invoiceInfo?.amountPerUnit)/10**9, 'gwei')
        }).then(()=>{
            window.alert("Purchased units successfully");
        })
    }

	return (
		<Flex mt="20" mx={20} justify={"space-between"}>
			<Stack width="50%" height={"35vh"} position={"relative"}>
				<Flex justify={"space-between"}>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">Invoice Amount</Text>
						<Text className="invoice-detail-text">{Number(invoiceInfo?.totalInvoiceAmount)/10**9}</Text>
					</Stack>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">XIRR</Text>
						<Text className="invoice-detail-text">{Number(invoiceInfo?.xirr)/100} %</Text>
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
						<Text className="invoice-detail-text">{invoiceInfo?.sellerName}</Text>
					</Stack>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">Buyer</Text>
						<Text className="invoice-detail-text">{invoiceInfo?.buyerName}</Text>
					</Stack>

					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">Risk</Text>
						<Text className="invoice-detail-text">Low</Text>
					</Stack>
					<Stack width={"20%"}>
						<Text className="invoice-detail-heading">View Contract</Text>
						<Text className="invoice-detail-text">{}</Text>
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
							<Link target="_blank" href={`https://ipfs.io/ipfs/${invoiceInfo?.invoiceHash}`} ><Button>View Invoice</Button></Link>
							<Link target="_blank" href={`https://ipfs.io/ipfs/${invoiceInfo?.invoiceHash}`}><Button ml={5}>View Agreement</Button></Link>
						</Flex>
					</Stack>
				</Flex>
			</Stack>

			
            
            <Stack width="30%" height={"35vh"} position={"relative"}>
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

				<Flex justifyContent={"space-between"}>
					<Text className="invoice-card-heading">Unit Value</Text>
					<Text>{Number(invoiceInfo?.amountPerUnit)/10**9}</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text className="invoice-card-heading">Invested Amount</Text>
					<Text>{input.value * Number(invoiceInfo?.amountPerUnit)/10**9}</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text className="invoice-card-heading">Repayment Date</Text>
					<Text>Septemeber 24, 2024</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text className="invoice-card-heading">Repayment Value</Text>
					<Text>{ input.value * Number(invoiceInfo?.repaymentPerUnit)/10**9 }</Text>
				</Flex>
				<Center>
					<Button
						variant={"solid_complete"}
						position={"absolute"}
						width={"50%"}
						bottom={"0"}
						colorScheme="telegram"
                        onClick={handleInvoicepurchase}
                        >
						Continue to Pay
					</Button>
				</Center>
			</Stack>
		</Flex>
	)
}

export default InvoiceDetails