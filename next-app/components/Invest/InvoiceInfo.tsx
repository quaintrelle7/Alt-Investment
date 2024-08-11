import web3 from "@/blockend/web3";
import {
	Stack,
	Center,
	Heading,
	Link,
	Text,
	Flex,
	Button,
	Container,
	Divider,
} from "@chakra-ui/react"
import React, {useEffect, useState} from "react"
import { LiaIndustrySolid } from "react-icons/lia"
import invoiceAbi from '@/blockend/build/invoice.json'

type Props = {
    seller: string;
    buyer: string;
    unitCost: string;
    repaymentPerUnit: string;
    xirr: string;
    unitsInvested: number;
    totalUnits: number;
    tenure: number;
    contractAddress: any;
}


const InvoiceInfo = (props:Props) => {

    const [invoiceDetails, setInvoiceDetails] =useState<any>(null);


    //write a function to get all of these
    useEffect(() => {
        const fetchInvoiceInfo = async () => {
          const invoiceContract = new web3.eth.Contract(invoiceAbi, props.contractAddress);
          try {
            const res = await invoiceContract.methods.getInvoiceInfo().call();
            setInvoiceDetails(res || {});  // Ensure the state is always an object
            console.log("ID: ", res);
          } catch (error) {
            console.error("Error fetching invoice info:", error);
          }
        };

    fetchInvoiceInfo();
  }, [props.contractAddress]);

    
	return (
		<Link href={`/company/${props.contractAddress}`} style={{ textDecoration: "none" }}>
			<Stack hidden={!invoiceDetails}
				borderRadius={"10"}
				px={5}
				pt={5}
				pb={5}
				bg="linear-gradient(90deg, rgba(24,25,28,1) 0%, rgba(24,25,28,1) 100%) padding-box, linear-gradient(135deg, hsla(288, 47%, 65%, 1) 35%, hsla(187, 52%, 56%, 1) 68%)"
				border="3px solid transparent">
				<Center>
					<Stack width={"100%"}>
						<Flex textAlign={"center"} justifyContent={"space-between"}>
							<Flex width={"50%"}>
								<LiaIndustrySolid
									style={{ transform: "rotateY(180deg)", marginRight: "10px" }}
									size={60}
									color="cyan"
								/>
								<Stack>
									<Text className="invoice-card-heading">Seller</Text>
									<Text>{invoiceDetails?.sellerName || "Loading ..."}</Text>
								</Stack>
							</Flex>

							<Flex>
								<Stack mr={"0"}>
									<Text className="invoice-card-heading">Buyer</Text>
									<Text>{invoiceDetails?.buyerName}</Text>
								</Stack>
								<LiaIndustrySolid size={60} />
							</Flex>
						</Flex>

						<Divider />
						<Flex textAlign={"center"} justifyContent={"space-between"}>
							<Stack>
								<Text className="invoice-card-heading">Unit Cost</Text>
								<Text>{Number(invoiceDetails?.amountPerUnit)/10**9}</Text>
							</Stack>

							<Stack>
								<Text className="invoice-card-heading">Repayment/Unit</Text>
								<Text>{Number(invoiceDetails?.repaymentPerUnit)/10**9}</Text>
							</Stack>

							<Stack>
								<Text className="invoice-card-heading">XIRR</Text>
								<Text>{Number(invoiceDetails?.xirr)/100}</Text>
							</Stack>
						</Flex>

						<Flex textAlign={"center"} justifyContent={"space-between"}>
							<Stack>
								<Text className="invoice-card-heading">Units Left</Text>
								<Text>{Number(invoiceDetails?.totalUnits) - Number(invoiceDetails?.purchasedUnits)} / {invoiceDetails?.totalUnits.toString()}</Text>
							</Stack>

							<Stack>
								<Text className="invoice-card-heading">Tenure</Text>
								<Text>{invoiceDetails?.tenure.toString()} Days</Text>
							</Stack>
						</Flex>
					</Stack>
				</Center>
			</Stack>
		</Link>
	)
}

export default InvoiceInfo
