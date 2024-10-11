import { NextApiRequest, NextApiResponse } from "next"
import crypto from "crypto"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address, email, redirectUrl } = req.body

	const onrampUrl = new URL(
		`https://buy-sandbox.moonpay.com?apiKey=${process.env.MOONPAY_PUBLIC_KEY}`
	)
	onrampUrl.searchParams.set("walletAddress", address)
	onrampUrl.searchParams.set("redirectURL", redirectUrl)
	onrampUrl.searchParams.set("email", email)
	onrampUrl.searchParams.set("currencyCode", "usdc")
	const urlSignature = crypto
		.createHmac("sha256", process.env.MOONPAY_SECRET_KEY)
		.update(onrampUrl.search)
		.digest("base64")

	// Set signature as URL query parameter
	onrampUrl.searchParams.set("signature", urlSignature)
	return res.status(200).json({ url: onrampUrl.toString() })
}
