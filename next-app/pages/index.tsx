import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Homepage from "@/components/Homepage/Homepage";
import Footer from "@/components/Header/Footer";
import {useAccount} from 'wagmi';
import type { GetServerSideProps, NextPage } from "next"
import { getServerSession } from "next-auth"

const inter = Inter({ subsets: ["latin"] })

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
// 	return {
// 		props: {
// 			session: await getServerSession(req, res),
// 		},
// 	}
// }

export default function Home() {
	const { address } = useAccount()

	// if(address)
	// localStorage.setItem('walletAddress', address?.toString());

	return (
		<>
			<Header />
			<Homepage />
			{/* <About/> */}
			{/* <AboutCompanies/> */}
			<Footer />
		</>
	)
}
