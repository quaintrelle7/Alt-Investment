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
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import About from "./About"
import Lottie from "lottie-react"
import animationDataHome from "../../public/assets/js/homepage.json"
import { useAccount, useSignMessage } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import axios from "axios"
import UploadedInvoice from "@/models/UploadedInvoice"
import {factoryContract} from "@/blockend/interact"

type Props = {}

function Homepage({}: Props) {
	const { address, isConnected } = useAccount()
	const { openConnectModal } = useConnectModal()
	const [uploadClicked, setUploadClicked] = useState(false)
	const inputFile = useRef(null)
	const [file, setFile] = useState<File | undefined>()
	const [email, setEmail] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [alertStatus, setAlertStatus] = useState('')
    const [ipfsHash, setIPFSHash] = useState(null);
    const [isFileuploaded, setIsFileUploaded] = useState(false);
    const [deployedContractAddress, setDeployedContractAddress] = useState(null);

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
		if (openConnectModal) {
			openConnectModal()
		} else {
			setUploadClicked(true)
		}
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
        	const newInvoice = new UploadedInvoice({
					email: email,
                    contractAddress: deployedContractAddress,
					sellerAddress: address,
					date_added: Date.now(),
					fileURL: ipfsHash,
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

				if (result.acknowledged) {
					setAlertStatus("success")
					alert("Invoice uploaded successfully to MongoDb")
				} else {
					setAlertStatus("error")
					alert("There was an error uploading the invoice")
				}

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
        const result = await factoryContract.methods.getDeployedContracts().call();
        console.log("result: ", result);
        setDeployedContractAddress(result[result.length-1]);
        console.log("result: ", deployedContractAddress);
    }

    // getInvoices();
    // saveToMongoDB();


    useEffect(() => {
        if(deployedContractAddress){
            saveToMongoDB();
        }
    },[deployedContractAddress]);


	const handleSubmit = async (e: any) => {
		e.preventDefault()

		//await blockchain transaction - once it returns the IDof the Smart contract then proceed with the MongoDB storage

        try{
            const res = await factoryContract.methods.createID(ipfsHash).send({from: address}).then(() =>  
                {getInvoices();})
            console.log("Invoice Uploaded: ", res);
            

        } catch{

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
										{/* {isSubmitting ? (
											<Button isLoading loadingText="Submitting">
												Submit
											</Button>
										) : (
										)} */}

                                        <Button isDisabled={!isFileuploaded} type="submit">Submit</Button>


										<Button ml={4} onClick={() => setUploadClicked(false)}>
											Close
										</Button>
									</ModalFooter>
								</form>
							</Stack>
						</Center>
					</ModalBody>

					{/* {renderAlert()} */}
				</ModalContent>
			</Modal>

			<Flex padding={100} mt={{ base: "0", md: "10" }} height={"80vh"}>
				<Stack textAlign={"left"} width={"40%"}>
					<Box fontSize={{ base: "3xl", md: "60px" }}>
						<h1>Grow Your Wealth With Crypto</h1>
					</Box>
					<Text mt={10} fontSize={20}>
						We help you in generating fixed-yields on your crypto
						investment. Diversify your portfolio now with Invoice Discounting.
					</Text>

					<Flex justify={"flex-start"} mt="10">
						<Button mr={10} onClick={() => window.open("/invest", "_self")}>
							Invest Now
						</Button>
						<Button onClick={handleUploadInvoice}>Upload Invoice</Button>
						{/* <ListNFTForm/> */}
					</Flex>

					{/* <div className="w-[40rem] h-40 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
       </div> */}
				</Stack>

				<Flex justify={"center"} width={"60%"}>
					<Stack>
						<Lottie
							style={{ width: "40rem", height: "40rem" }}
							animationData={animationDataHome}></Lottie>
					</Stack>
				</Flex>
			</Flex>

			<About />
			{/* <AboutCompanies /> */}
		</>
	)
}

export default Homepage
