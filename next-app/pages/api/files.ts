import { NextResponse, NextRequest } from "next/server";

export const config = {
	api: {
		bodyParser: false,
	},
}
export default async function handler(req: NextRequest, res:NextResponse) {
    console.log("req" , req)
    if (req.method === "POST") {
			try {
				const options = {
					method: "POST",
					headers: {
						accept: "application/json",
						"content-type": "application/json",
						authorization: `Bearer ${process.env.PINATA_JWT}`,
					},
					body: JSON.stringify(keyRestrictions),
				}

				const jwtRepsonse = await fetch(
					"https://api.pinata.cloud/users/generateApiKey",
					options
				)
				const json = await jwtRepsonse.json()
				const { JWT } = json
				res.send(JWT)
			} catch (e) {
				console.log(e)
				res.status(500).send("Server Error")
			}
		}

}