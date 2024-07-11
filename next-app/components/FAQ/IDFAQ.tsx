import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
} from "@chakra-ui/react"
import React from "react"

type Props = {}

const faq = [
	{
		question: "What is invoice discounting?",
		answer:
			"What Is Invoice Discounting? The Number 1 Financing SolutionInvoice discounting is a type of financing that allows a business to sell unpaid invoices to a third party at a discount, and receive immediate payment for them. ",
	},
	{
		question: "What is recourse?",
		answer: "The party that is legally bound to repay the subscription amount.",
	},
	{
		question: "What is AltInvest?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eniad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat",
	},
]

const IDFAQ = (props: Props) => {
	return (
		<>
			<Accordion allowToggle>
				{faq.map((faq) => (
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									{faq.question}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</>
	)
}

export default IDFAQ
