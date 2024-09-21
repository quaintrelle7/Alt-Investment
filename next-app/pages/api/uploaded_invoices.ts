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
	const { method, query} = req
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

                if(Object.keys(query).length ==0) {
    				res.status(200).json(results)
                }

                if (
									query.active !== undefined &&
									query.approved !== undefined
								) {
									const invoices = await collection
										.find({
											active: true,
											approved: false,
											chainId: query.chainId,
                                            isCompleted: false
										})
										.toArray()
									res.status(200).json(invoices)
								}

								if (query.signedBySeller !== undefined) {
									const invoices = await collection
										.find({
											active: true,
											approved: true,
											signedBySeller: true,
											chainId: query.chainId,
										})
										.toArray()
									res.status(200).json(invoices)
								}

								if (query.sellerAddress !== undefined) {
									const invoices = await collection
										.find({
											active: true,
											approved: true,
											sellerAddress: query.sellerAddress,
											chainId: query.chainId,
										})
										.toArray()
									res.status(200).json(invoices)
								}

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
				const { _id, approved, signedBySeller } = uploadedInvoice

				var result = await collection.updateOne(
					{ _id: _id },
					{ $set: { approved: approved, signedBySeller:signedBySeller } }
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
