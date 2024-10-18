import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
    Center,
    Flex,
} from "@chakra-ui/react"
import React from "react"

type Props = {}

const faq = [
	{
		question: "What is invoice discounting?",
		answer:
			"Invoice discounting is a type of financing that allows a business to sell unpaid invoices to a third party at a discount, and receive immediate payment for them. ",
	},
	{
		question: "What is recourse?",
		answer: "The party that is legally bound to repay the subscription amount.",
	},
	{
		question: "What is AltInvest?",
		answer:
"AltInvest is an investment platform for crypto investors. AltInvest connects Stablecoin investors with SMEs and provides fixed income opportunities through invoice discounting. Crypto investments should not always lead you to the verge of bankruptcy. We provide a fixed yield to the investors on their crypto investment. With AltInvest, you can invest in multiple invoices for the given tenure as short as 30 days.",
	},
]

const IDFAQ = (props: Props) => {
	return (
		<>
            <Flex id="FAQ" mb={10} width={{base:"500%", sm: "100%"}} justify={"center"}>
				<Center
					width={{ base: "100%", md: "60%", lg: "70%", xl: "50%" }}
					textAlign={"center"}
                    fontSize={{ base: "6xl", sm: "60px" }}
                    >
					<h1 style={{fontSize: "30px"}} color="brand.primary">FAQs</h1>
				</Center>
			</Flex>
			<Accordion id="faq" allowToggle>
				{faq.map((faq) => (
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box fontSize="xl" fontWeight="semibold" flex="1" textAlign="left">
									{faq.question}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={30}>{faq.answer}</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</>
	)
}

export default IDFAQ
