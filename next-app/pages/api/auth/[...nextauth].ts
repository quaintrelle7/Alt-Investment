import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import { SiweMessage } from "siwe"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {

  console.log("req: ", req);
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
            const nextAuthUrl = process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL) : process.env.VERCEL_URL ? new URL(process.env.VERCEL_URL) : null;

					if (!nextAuthUrl) {
						return null
					}
          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          })

          if (result.success) {
            return {
              id: siwe.address,
            }
          }
          return null
        } catch (e) {
            console.log("eee: ", e);
          return null
        }
      },
    }),
  ]

//   const isDefaultSigninPage =
//     req.method === "GET" 

//   // Hide Sign-In with Ethereum from default sign page
//   if (isDefaultSigninPage) {
//     console.log("provider 1: ", providers);
//     providers.pop()
//     console.log("provider 1: ", providers);
//   }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        session.address = token.sub
        session.user.name = token.sub
        session.user.image = "https://www.fillmurray.com/128/128"
        return session
      },
    },
  })
}