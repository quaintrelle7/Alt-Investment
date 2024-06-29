import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/utils/db"
import UploadedInvoice from "@/models/UploadedInvoice"

// interface UploadedInvoice {
//     email: string,
//     walletAddress: string,
//     date:Date,
//     fileURL
// }
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req
	const connection = await connectToDatabase()
	var collection

	if (connection) {
		const { database } = connection
		collection = database.collection(
			process.env.MONGODB_UPLOADED_INVOICES_COLLECTION
		)
	} else {
		res.status(500).json({ error: "Database connection failed" })
	}

	switch (method) {
		case "GET":
			try {
				const results = await collection.find({}).limit(10).toArray()
				res.status(200).json(results)
			} catch (error) {
				console.error(error)
				res.status(500).json({ error: "Internal Server Error" })
			}
			break
		case "POST":
			try {
				const uploadedInvoice = new UploadedInvoice(req.body)
				const result = await collection.insertOne(uploadedInvoice)
				res.status(201).json(result)
			} catch (error) {
				console.error(error)
				res.status(500).json({ error: "Internal Server Error" })
			}
			break
		case "PUT":
			try {
				const uploadedInvoice = new UploadedInvoice(req.body)
				const { _id, approved, verifierAddress } = uploadedInvoice

				const result = await collection.updateOne(
					{ _id: _id },
					{ $set: { approved: approved, verifierAddress: verifierAddress } }
				)
				res.status(201).json(result)
			} catch (error) {
				console.error(error)
				res.status(500).json({ error: "Internal Server Error" })
			}
		default:
			res.setHeader("Allow", ["GET"])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
