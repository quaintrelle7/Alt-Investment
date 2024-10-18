import {Flex, Stack, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, Box, StepTitle, StepDescription, StepSeparator, useSteps, Center} from '@chakra-ui/react'
import React from 'react'

type Props = {}

const sellerJourney = [
  { title: 'Submit Invoice', description: 'List invoices via a simple form' },
  { title: 'Verification', description: 'We quickly verify invoices for security' },
  { title: 'Get Funded', description: 'Receive immediate cash flow' },
]

const investorJourney = [
  { title: 'Browse Invoices', description: 'Explore trusted invoices with details' },
  { title: 'Invest', description: 'Select and transact securely' },
  { title: 'Earn Returns', description: 'Watch your investment grow' },
]

function UserJourney({}: Props) {

    const { activeStep } = useSteps({
    index: 1,
    count: sellerJourney.length,
  })

  return (
    <Flex justifyContent={"space-between"} mx={20} pt={10} my={5}>
        <Stack width={"100%"}>
            <Flex width={{base:"500%", sm: "100%"}} justify={"center"}>
    				<Center
    					width={{ base: "100%", md: "60%", lg: "70%", xl: "50%" }}
    					textAlign={"center"}
                        fontSize={{ base: "6xl", sm: "60px" }}
                        >
    					<h1 style={{fontSize: "30px"}} color="brand.primary">Know Your Journey</h1>
    				</Center>
    		</Flex>
            <Flex  my={"10"}>
                <Stack width={"50%"} align={"center"}>
                    <h1 style={{textAlign :"left"}}>For Investors: Fixed yields on investment</h1>
                        <Stepper index={activeStep} orientation='vertical' height='400px' gap='0'>
                              {investorJourney.map((step, index) => (
                                <Step key={index}>
                                  <StepIndicator>
                                    <StepStatus
                                      complete={<StepIcon />}
                                      incomplete={<StepNumber />}
                                      active={<StepNumber />}
                                    />
                                  </StepIndicator>

                                  <Box flexShrink='0'>
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                  </Box>

                                  <StepSeparator />
                                </Step>
                                  ))}
                        </Stepper>  
                </Stack>

                <Stack align={"center"} width={"50%"}>
                <h1>For Sellers: Your Path to Cash Flow</h1>
                    <Stepper index={activeStep} orientation='vertical' height='400px' gap='0'>
                          {sellerJourney.map((step, index) => (
                            <Step key={index}>
                              <StepIndicator>
                                <StepStatus
                                  complete={<StepIcon />}
                                  incomplete={<StepNumber />}
                                  active={<StepNumber />}
                                />
                              </StepIndicator>

                              <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                              </Box>

                              <StepSeparator />
                            </Step>
                              ))}
                    </Stepper>    
                </Stack>
            </Flex>
        </Stack>
    
    </Flex>
  )
}

export default UserJourney
