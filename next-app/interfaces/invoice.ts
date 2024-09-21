interface UploadedInvoice {
	_id: string
	email: string
	contractAddress: string
	sellerAddress: string
	date_added: string
	fileURL: string
	approved: boolean
	declineReason: string
	active: boolean
	archived: boolean
	signedBySeller: boolean
	chainId: string
}
