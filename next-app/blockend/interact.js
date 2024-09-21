
import { ethers } from 'ethers';
import factoryAbi from './build/invoice-factory.json';
import invoiceAbi from './build/invoice.json';
import usdcAbi from './build/usdc-coin.json';
import {} from 'dotenv/config' ;
import web3 from "./web3";


// Contract address of the InvoiceFactory contract

// Setup provider (you can use Infura, Alchemy, or any other provider)
// const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/09b5a24c345742ea95c3cf2636900c17');

// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page

// if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
// {
//     // we are in the browser and metamask is running
// const provider = new ethers.providers.Web3Provider(window.ethereum)

// // MetaMask requires requesting permission to connect users accounts
// await provider.send("eth_requestAccounts", []);
// const signer = provider.getSigner();

// }
// else
// {
//     // we are on the server *OR* the user is not running metamask
//     // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
// const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/09b5a24c345742ea95c3cf2636900c17');
// const signer = provider.getSigner();

//     // web3 = new Web3(provider);
// }



// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const usdcAddress = '0xf9fA7f55a571B847e29Af95eE2FA4145ED1EF62B';
export const usdcContract = new web3.eth.Contract(usdcAbi, usdcAddress);




// const signer = provider.getSigner();
// Create an instance of the factory contract

const factoryAddress = '0x357F8Ffc31631664641136B33DDe937cAc319faE';
export const factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress);




//Polygon ZkEVM

//usdcAddress = 0x698e9d8C3Dc156bBB4bE95e8300b3C30212845E0
//InvoiceFactoryAddress = 0xd02Ca68F3DDF77AaBc5871Cb7c7F9f26a41cA761