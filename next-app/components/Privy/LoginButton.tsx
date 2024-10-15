import {Button} from '@chakra-ui/react';
import {usePrivy} from '@privy-io/react-auth';

export default function LoginButton() {
  const {ready, authenticated, login} = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <Button variant="solid_complete" disabled={disableLogin} onClick={login}>
      Log in
    </Button>
  );
}