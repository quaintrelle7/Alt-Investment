import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import {usePrivy} from '@privy-io/react-auth';

const Layout = ({ children }) => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const {ready, authenticated, login} = usePrivy();

//   const { openConnectModal } = useConnectModal();
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const handleModalClose = async () => {
       login();
    //   if (!isConnected) {
    //     router.push('/');
    //   }
    };

    if (!isConnected && !modalOpened) {
      handleModalClose();
      setModalOpened(true);
    }
  }, [isConnected, router, modalOpened]);

  return <>{children}</>;
};

export default Layout;
