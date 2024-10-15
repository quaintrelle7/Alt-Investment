import {
	Center,
	Heading,
	Stack,
	Flex,
	Text,
	Button,
	Box,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Input,
	Alert,
	AlertIcon,
    Hide,
    useToast
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import About from "./About"
import Lottie from "lottie-react"
import animationDataHome from "../../public/assets/js/homepage.json"
import { useAccount, useSignMessage } from "wagmi"
// import { useConnectModal } from "@rainbow-me/rainbowkit"
import axios from "axios"
import UploadedInvoice from "@/models/UploadedInvoice"
import {factoryContract} from "@/blockend/interact"
import {useRouter} from "next/router"
import IDFAQ from "../FAQ/IDFAQ"
import SellerCard from "./SellerCard"

type Props = {}

function Homepage({}: Props) {
	const { address, chainId, chain} = useAccount()
	// const { openConnectModal } = useConnectModal()
	const [uploadClicked, setUploadClicked] = useState(false)
	const inputFile = useRef(null)
	const [file, setFile] = useState<File | undefined>()
	const [email, setEmail] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [alertStatus, setAlertStatus] = useState('')
    const [ipfsHash, setIPFSHash] = useState(null);
    const [isFileuploaded, setIsFileUploaded] = useState(false);
    const [deployedContractAddress, setDeployedContractAddress] = useState(null);
    const toast = useToast()
    const router = useRouter();



	const pinataConfig = {
		root: "https://api.pinata.cloud",
		headers: {
			pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
			pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
		},
	}

	const testPinataConnection = async () => {
		try {
			const url = `${pinataConfig.root}/data/testAuthentication`
			const res = await axios.get(url, { headers: pinataConfig.headers })
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		testPinataConnection()
        
	})



	const handleUploadInvoice = () => {
		// if (openConnectModal) {
		// 	openConnectModal()
		// } else {
			setUploadClicked(true)
		// }
	}

	const queryPinataFiles = async () => {
		try {
			const url = `${pinataConfig.root}/data/pinList?status=pinned`
			const response = await axios.get(url, pinataConfig)
			console.log(response.data.rows)
			//   setPinnedFiles(response.data.rows);
		} catch (error) {
			console.log(error)
		}
	}

	const uploadFile = async (
		file: File | undefined,
		email: string,
		address: `0x${string}` | undefined
	) => {
		try {
			if (file !== undefined) {
				setIsSubmitting(true)

				const formData = new FormData()
				console.log(file)
				formData.append("file", file)
				const pinataBody = {
					options: {
						cidVersion: 1,
					},
					metadata: {
						name: file.name,
						keyvalues: {
							walletAddress: address,
							email: email,
						},
						//date and emailID of the contact person
					},
				}
				formData.append("pinataOptions", JSON.stringify(pinataBody.options))
				formData.append("pinataMetadata", JSON.stringify(pinataBody.metadata))

				const url = `${pinataConfig.root}/pinning/pinFileToIPFS`
				const response = await axios({
					method: "post",
					url: url,
					data: formData,
					headers: pinataConfig.headers,
				})


                console.log("response: ", response);

                setIPFSHash(response.data.IpfsHash);
                setIsFileUploaded(true);
                console.log(ipfsHash);			

				queryPinataFiles()
			} else {
				setAlertStatus("warning")
				alert("Please select the file first")
			}
			setAlertStatus("")
		} catch (error) {
			console.log(error)
			setIsSubmitting(false)
		}
		setAlertStatus("")

		setFile(undefined)
		setEmail("")
	}

    const saveToMongoDB = async() => {
        console.log("chainId: ", chainId);
        console.log("chain: ", chain);

        	const newInvoice = new UploadedInvoice({
					email: email,
                    contractAddress: deployedContractAddress,
					sellerAddress: address,
					date_added: Date.now(),
					fileURL: ipfsHash,
                    chainId: chainId
				})

            const uploadedInvoices = await fetch("api/uploaded_invoices", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newInvoice),
			})

			const result = await uploadedInvoices.json()

			setIsSubmitting(false)
			console.log("result: ", result)
			setUploadClicked(false)

				// if (result.acknowledged) {
				// 	setAlertStatus("success")
				// 	alert("Invoice uploaded successfully to MongoDb")
				// } else {
				// 	setAlertStatus("error")
				// 	alert("There was an error uploading the invoice")
				// }

    }

	const handleChange = (e: any) => {
		setFile(e.target.files[0])
	}

    useEffect(()=>{
         if (file!=undefined) { 
            uploadFile(file, email, address);
        }
    }, [file, email])


    const getInvoices = async() => {
        const result = await factoryContract.methods.getDeployedInvoices().call();
        console.log("result: ", result);
        setDeployedContractAddress(result[result.length-1]);
        console.log("result: ", deployedContractAddress);
    }

    useEffect(() => {
        if(deployedContractAddress){
            saveToMongoDB();
        }
    },[deployedContractAddress]);


	const handleSubmit = async (e: any) => {
		e.preventDefault()

        setIsFileUploaded(false);
        
        try{
            
            await factoryContract.methods.createInvoice(ipfsHash).send({from: address}).then(() =>  
                {
                    getInvoices();
                    setUploadClicked(false);
                    toast({
                          title: 'Invoice Creation',
                          description: "Invoice is created successfully.",
                          status: 'success',
                          duration: 9000,
                          isClosable: true,
                    })

                    router.push('/portfolio');

                
                })

        } catch(error){
            console.log(error);
        }
         
	}

	const renderAlert = () => {
		switch (alertStatus != "") {
			case alertStatus === "warning":
				return (
					<Alert status="warning" color="brand.primary">
						<AlertIcon />
						Please select the file first.
					</Alert>
				)
			case alertStatus === "success":
				return (
					<Alert status="success" color="brand.primary">
						<AlertIcon />
						Invoice uploaded successfully. Fire on!
					</Alert>
				)
			case alertStatus === "error":
				return (
					<Alert status="error" color="brand.primary">
						<AlertIcon />
						There was an error uploading your invoice.
					</Alert>
				)
			default:
				return null
		}
	}

	return (
		<>
			<Modal isOpen={uploadClicked} onClose={() => setUploadClicked(false)}>
				<ModalOverlay />
				<ModalContent bg={"brand.ternary"}>
					<ModalHeader>Upload Invoice</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Center>
							<Stack>
								<form onSubmit={handleSubmit}>
									<label htmlFor="file">Invoice</label>
									<Input
										border="0px"
										type="file"
										marginBottom="15px"
										marginTop="2px"
										paddingLeft="0px"
										id="file"
										name="file"
										ref={inputFile}
										onChange={handleChange}
									/>

									<label htmlFor="email">Email</label>
									<Input
										type="email"
										marginBottom="15px"
										marginTop="2px"
										placeholder="Email"
										name="email"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>

									<ModalFooter>


                                        <Button mr={-6} isDisabled={!isFileuploaded} type="submit">Submit</Button>


										{/* <Button ml={4} onClick={() => setUploadClicked(false)}>
											Close
										</Button> */}
									</ModalFooter>
								</form>
							</Stack>
						</Center>
					</ModalBody>

					{/* {renderAlert()} */}
				</ModalContent>
			</Modal>

			<Flex padding={100}width={{base:"1000%", sm: "100%"}} mt={{ base: "0", md: "10" }} height={"80vh"}>
				<Stack textAlign={"left"} width={{base:"40%", sm: "40%"}}>
					<Box fontSize={{ base: "6xl", sm: "60px" }}>
						<h1>Invest with Invoice Discounting</h1>
					</Box>
					<Text mt={10} fontSize={{base:40, sm:20}}>
						We help you in generating fixed-yields on your
						investment. Diversify your portfolio now with Invoice Discounting.
					</Text>

					<Flex justify={"flex-start"} mt="10">
						<Button variant={"solid_complete"} mr={10} onClick={() => window.open("/invest", "_self")}>
							Invest Now
						</Button>
						{/* <ListNFTForm/> */}
					</Flex>

                    <Stack cursor="pointer" onClick={handleUploadInvoice} mt="10">
                            <h1><i>Click to sell your invoices</i></h1>
                    </Stack>

				</Stack>

                <Hide below="md">
				<Flex width={{base:"60%"}} justify="center" >
					<Stack>
						<Lottie
							style={{ width: "40rem", height: "40rem" }}
							animationData={animationDataHome}></Lottie>
					</Stack>
				</Flex>
                </Hide>
			</Flex>

			<About />
           
            <Stack mx={20} pt={10} my={5}>
                <IDFAQ/>
            </Stack>

			{/* <AboutCompanies /> */}
		</>
	)
}

export default Homepage
