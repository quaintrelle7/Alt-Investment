import mongoose from "mongoose"
import { type } from "os"

// export interface UploadedInvoices extends mongoose.Document {
// 	email: string
// 	walletAddress: string
// 	date_added: Date
// 	fileURL: string
// }

const InvoiceSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
    contractAddress: {
        type: String,
        required: true,
    },
	sellerAddress: {
		type: String,
		required: true,
	},
	date_added: {
		type: Date,
		default: Date.now,
	},
	fileURL: {
		type: String,
		required: true,
	},
	active: {
		type: Boolean,
		default: true,
	},
	archived: {
		type: Boolean,
		default: false,
	},
	approved: {
		type: Boolean,
		default: false,
	},
	factorAddress: {
		type: String,
		default: "",
	},
	declineReason: {
		type: String,
		default: "",
	},
	verificationDate: {
		type: Date,
	},

	//Make a different database for approved invoices - With everything that an investor needs to know, like due date, amount, risk, company, rate of discount
})

mongoose.models = {}

var UploadedInvoice = mongoose.model("UploadInvoice", InvoiceSchema)

export default UploadedInvoice
