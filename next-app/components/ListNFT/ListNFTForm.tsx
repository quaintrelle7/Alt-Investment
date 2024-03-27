import {useDisclosure, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Container, Textarea} from '@chakra-ui/react'
import React, {useState} from 'react'

function ListNFTForm() {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const [formData, setFormData] = useState({
		name: "",
		username: "",
		age: "",
		address: "",
		aadhar: "",
		pan: "",
		email: "",
		password: "",
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleFileUpload = () => {
		// if (selectedFile) {
		// 	console.log("Uploading file:", selectedFile);
		// } else {
		// 	console.log("No file selected");
		// }
	};

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target && event.target.files ? event.target.files[0] : null;
		// let fileHash = await sendFileToIPFS(file);
		// console.log(fileHash);
		// setHash(fileHash);
	};

	const handleRegistration = async (e: React.FormEvent) => {
		e.preventDefault();
		// const filedata = new FormData();
		// filedata.set("file", selectedFile);
		// const data = {
		// 	name: e.target.name.value,
		// 	username: e.target.username.value.toLowerCase(),
		// 	age: e.target.age.value,
		// 	address: e.target.address.value,
		// 	aadhar: e.target.aadhar.value,
		// 	pan: e.target.pan.value,
		// 	aadharHash: hash,
		// 	email: e.target.email.value,
		// 	password: e.target.password.value,
		// };
		// console.log(data);
		// const result = await axios.post("/api/registerUser", data, {
		// 	headers: { "Content-Type": "application/json" },
		// });
		// console.log(result.data);
		// setHash("");
		// onClose();
	};


  return (
    <>
      <Button onClick={onOpen}>List NFT</Button>
     
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg= "brand.ternary" color={"brand.secondary"}>
          <ModalHeader>List Company NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <form style={{}} onSubmit={handleRegistration}>
							<label htmlFor="company">Company</label>
							<Input
								marginBottom="15px"
								marginTop="2px"
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								required
							/>

							<label htmlFor="title">Title</label>
							<Input
								marginBottom="15px"
								marginTop="2px"
								type="text"
								name="username"
								value={formData.username}
								onChange={handleInputChange}
								required
							/>
							<label htmlFor="floorPrice">Floor Price</label>
							<Input
								marginBottom="15px"
								marginTop="2px"
								type="number"
								name="age"
								value={formData.age}
								onChange={handleInputChange}
								required
							/>

							<label htmlFor="description">Description</label>
							<Textarea
								marginBottom="15px"
								marginTop="2px"
								name="address"
								value={formData.address}
                                onChange={()=>{}}
							/>
							<label htmlFor="aadhar">Aadhar</label>
							<Input
								marginBottom="15px"
								marginTop="2px"
								type="text"
								name="aadhar"
								value={formData.aadhar}
								onChange={handleInputChange}
							/>
							
							<label>Upload Legal Docs</label>
							<Input
								marginBottom="15px"
								marginTop="2px"
								type="file"
								padding="1"
								onChange={handleFileChange}
							/>
							<button onClick={handleFileUpload} />
                            	<label>Upload Image</label>
							<Input
								marginBottom="15px"
								marginTop="2px"
								type="file"
								padding="1"
								onChange={handleFileChange}
							/>
							<button onClick={handleFileUpload} />

							<label htmlFor="walletAddress">WalletAddress</label>
							<Input
								marginBottom="15px"
								marginTop="2px"
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
							/>

                           <ModalFooter>
                            <Button colorScheme='blue' mr={3}>
                              Submit
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                          </ModalFooter>
                            </form>
          </ModalBody>
        </ModalContent>

          
      </Modal>
    </>
  )
}

export default ListNFTForm


