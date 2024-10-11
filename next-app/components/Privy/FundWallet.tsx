import {Button} from '@chakra-ui/react';
import {usePrivy} from '@privy-io/react-auth';
import axios from 'axios';
import React from 'react'

type Props = {}

function FundWallet({}: Props) {

    const {user, getAccessToken} = usePrivy();

const handleFundWallet = async() =>{
    const onrampUrl = await fundWallet();
    window.open(onrampUrl, '_blank');
}

const fundWallet = async () => {
    const walletAddress = user?.wallet?.address; // Get user's wallet address
    if (!walletAddress) return; // If user does not have a wallet, no-op
    const emailAddress = user?.email?.address; // Get user's email address
    const currentUrl = window.location.href; // Get URL of current page
    const authToken = await getAccessToken(); // Get Privy auth token

    // Send request to server with these details
    // Feel free to swap out `axios` for `fetch` or your preferred HTTP library
    try {
      const onrampResponse = await axios.post(
        // Replace this with the API route you implement in step (2)
        "/api/onramp",
        // Add any additional on-ramp configurations you'd like, such as network, asset, amount, etc.
        {
          address: user!.wallet!.address,
          email: user?.email?.address,
          redirectUrl: currentUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return onrampResponse.data.url as string;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
  return (
    <Button onClick={handleFundWallet}>Fund Wallet</Button>
  )
}

export default FundWallet