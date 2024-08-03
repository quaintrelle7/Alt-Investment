import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
} else {
     const provider = new Web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/09b5a24c345742ea95c3cf2636900c17'  );
    web3 = new Web3(provider);
}

console.log('web3: ', web3)

export default web3;