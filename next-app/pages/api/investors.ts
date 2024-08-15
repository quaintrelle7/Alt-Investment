import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/utils/db"
import Investor from "@/models/Investor"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method, query} = req;
	const connection = await connectToDatabase();
	var collection;

	if (connection) {
		const { database } = connection
		collection = database.collection(
			process.env.MONGODB_INVESTORS_COLLECTION
		)
	} else {
		res.status(500).json({ error: "Database connection failed" })
	}

	switch (method) {
		case "GET":
			try {
                
                if(query.investorAddress!== undefined
                     ) {
                    const investorsData = await collection
                    .find({
                    investorAddress:query.investorAddress,
                    })
                    .toArray();
                    res.status(200).json(investorsData);
                }

			} catch (error) {
				console.error(error)
				res.status(500).json({ error: "Internal Server Error" })
			}
			break
		case "POST":
			try {
				const investorData = new Investor(req.body);
				const result = await collection.insertOne(investorData)
				res.status(201).json(result)
			} catch (error) {
				console.error(error)
				res.status(500).json({ error: "Internal Server Error" })
			}
			break
		case "POST":
			try {
				const investor = new Investor(req.body)
				const { _id, investedAmount, repaymentAmount } = investor

				var result = await collection.updateOne(
					{ _id: _id },
					{ $set: { investedAmount: investedAmount, repaymentAmount:repaymentAmount } }
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
