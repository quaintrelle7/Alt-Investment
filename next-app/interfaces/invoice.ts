interface UploadedInvoice {
	_id: string
	email: string
	walletAddress: string
	date_added: string
	fileURL: string
	fileName: string
	approved: boolean
	declineReason: string
	verifierAddress: any
	active: boolean
	archived: boolean
}
