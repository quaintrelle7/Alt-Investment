import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Homepage from "@/components/Homepage/Homepage";
import Footer from "@/components/Header/Footer";
import {useAccount} from 'wagmi';


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const {address} = useAccount();

    if(address)
    localStorage.setItem('walletAddress', address?.toString());
    

  return (
    <>
    <Header/>
    <Homepage/>
    {/* <About/> */}
    {/* <AboutCompanies/> */}
    <Footer/>

    </>
  );
}
