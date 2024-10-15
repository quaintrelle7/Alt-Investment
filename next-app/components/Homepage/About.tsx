import { Center, Flex, Heading, Stack, Image, Divider, Box, Show} from '@chakra-ui/react'
import React from 'react'
import Lottie from 'lottie-react';
import animationDataGlobe from '../../public/assets/js/globe.json'
import animationDataCrypto from '../../public/assets/js/crypto.json'
import animationDataChains from '../../public/assets/js/multiple-chain.json'




type Props = {}

function About({}: Props) {
    //  const defaultOptions = {
    //   loop: true,
    //   autoplay: true,
    //   animationData: animationData,
    //   rendererSettings: {
    //     preserveAspectRatio: "xMidYMid slice"
    //   }
    // };
  return (
		<Stack id="About" mx={20} pt={10} my={5}>
			<Flex width={{base:"500%", sm: "100%"}} justify={"center"}>
				<Center
					width={{ base: "100%", md: "60%", lg: "70%", xl: "50%" }}
					textAlign={"center"}
                    fontSize={{ base: "6xl", sm: "60px" }}
                    >
					<h1 style={{fontSize: "30px"}} color="brand.primary">Why AltInvest?</h1>
				</Center>
			</Flex>

            <Show above="md">
    			<Flex justify={"space-between"} my={"10"} mx="15">

    				<Center
    					bg={"brand.ternary"}
    					color="brand.secondary"
    					height={{ md: "50vh" }}>
    					<Stack textAlign={"center"} p={10}>
    						<Center>
    							{/* <a href="https://www.flaticon.com/free-animated-icons/connect" title="connect animated icons"></a> */}
    							<Lottie
    								style={{ width: "16rem", height: "16rem" }}
    								animationData={animationDataGlobe}></Lottie>
    						</Center>
    						<Heading fontSize={20}>Invest Globally</Heading>
    						<Divider />

    						<p>
    							Unlock global investment opportunities, tapping into diverse
    							markets.
    						</p>
    					</Stack>
    				</Center>

    				<Center
    					mx={10}
    					bg={"brand.ternary"}
    					color="brand.secondary"
    					height={{ md: "50vh" }}>
    					<Stack textAlign={"center"} p={10}>
    						<Center>
    							<Lottie
    								style={{ width: "15rem", height: "15rem" }}
    								animationData={animationDataCrypto}></Lottie>
    						</Center>
    						<Heading fontSize={20} mt={5}>
    							Buy Fractions
    						</Heading>
    						<Divider />

    						<p>
    							Diversify with fractional share ownership, enabling flexible
    							investing.
    						</p>
    					</Stack>
    				</Center>

    				<Center
    					bg={"brand.ternary"}
    					color="brand.secondary"
    					height={{ md: "50vh" }}>
    					<Stack textAlign={"center"} p={10}>
    						<Center>
    							<Lottie
    								style={{ width: "15rem", height: "15rem" }}
    								animationData={animationDataChains}></Lottie>
    						</Center>
    						<Heading fontSize={20} mt={5}>
    							Multi-Chain Operability
    						</Heading>
    						<Divider />

    						<p>
    							Streamline transactions across networks with multi-chain
    							integration.
    						</p>
    					</Stack>
    				</Center>

    			</Flex>
            </Show>

            <Show below="md">
    			<Stack  my={"10"} px="100">

    				<Center
    					bg={"brand.ternary"}
    					color="brand.secondary"
                        px="450"
    					height={{ md: "50vh" }}
                        >
    					<Stack textAlign={"center"} p={10}>
    						<Center>
    							{/* <a href="https://www.flaticon.com/free-animated-icons/connect" title="connect animated icons"></a> */}
    							<Lottie
    								style={{ width: "20rem", height: "20rem" }}
    								animationData={animationDataGlobe}></Lottie>
    						</Center>
    						
                            <div style={{width:"500px"}}>
                            <Heading fontSize={50}>Invest Globally</Heading>
                            </div>
    						<Divider />

                            <div style={{width:"500px"}}>
    						<p style={{fontSize:"40px"}}>
    							Unlock global investment opportunities, tapping into diverse
    							markets.
    						</p>
                            </div>
    					</Stack>
    				</Center>

    				<Center
    					px="450"
                        my="20"
    					bg={"brand.ternary"}
    					color="brand.secondary"
    					height={{ md: "50vh" }}>
    					<Stack textAlign={"center"} p={10}>
    						<Center>
    							<Lottie
    								style={{ width: "20rem", height: "20rem" }}
    								animationData={animationDataCrypto}></Lottie>
    						</Center>

                                                     <div style={{width:"500px"}}>

    						<Heading fontSize={50} mt={5}>
    							Buy Fractions
    						</Heading>
    						<Divider />

    						<p style={{fontSize:"40px"}}>
    							Diversify with fractional share ownership, enabling flexible
    							investing.
    						</p>
                            </div>
    					</Stack>
    				</Center>

    				<Center
                        px="450"
    					bg={"brand.ternary"}
    					color="brand.secondary"
    					height={{ md: "50vh" }}>
    					<Stack textAlign={"center"} p={10}>
    						<Center>
    							<Lottie
    								style={{ width: "20rem", height: "20rem" }}
    								animationData={animationDataChains}></Lottie>
    						</Center>
                         
                         <div style={{width:"500px"}}>

    						<Heading fontSize={50} mt={5}>
    							Multi-Chain Operability
    						</Heading>
    						<Divider />

    						<p style={{fontSize:"40px"}}>
    							Streamline transactions across networks with multi-chain
    							integration.
    						</p>
                            </div>
    					</Stack>
    				</Center>

    			</Stack>
            </Show>
		</Stack>
	)
}

export default About