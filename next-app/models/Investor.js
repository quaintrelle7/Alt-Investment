import mongoose from "mongoose"
import { type } from "os"

const InvestorSchema = new mongoose.Schema({
	
    investorAddress: {
		type: String,
		required: true,
	},
    investedAmount: {
        type: Number,
        required: true,
    },
	repaymentAmount: {
		type: Number,
		required: true,
	},
})

mongoose.models = {}

var Investor = mongoose.model("Investor", InvestorSchema)

export default Investor;
