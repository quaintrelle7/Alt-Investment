import {Button} from '@chakra-ui/react';
import {usePrivy} from '@privy-io/react-auth';
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from '@/pages/_app';

export default function LogoutButton() {
  const {ready, authenticated, logout} = usePrivy();
  // Disable logout when Privy is not ready or the user is not authenticated
  const disableLogout = !ready || (ready && !authenticated);

  const handleLogOut = () => {
      logout();
      disconnect(wagmiConfig);

  }

  return (
    <Button disabled={disableLogout} onClick={handleLogOut}>
      Log out
    </Button>
  );
}