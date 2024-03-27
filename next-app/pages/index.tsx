import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Homepage from "@/components/Homepage/Homepage";
import Footer from "@/components/Header/Footer";
import AboutCompanies from "@/components/Homepage/AboutCompanies";
import About from "@/components/Homepage/About";
import {Profile} from "@/components/Portfolio/Profile";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
