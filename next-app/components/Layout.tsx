import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import {usePrivy} from '@privy-io/react-auth';
import Header from '@/components/Header/Header'

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

  return(  <>
      <Header />
      {children}
  </>);
};

export default Layout;
