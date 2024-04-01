import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const Layout = ({ children }) => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const handleModalClose = async () => {
      await openConnectModal();
      if (!isConnected) {
        router.push('/');
      }
    };

    if (!isConnected && !modalOpened) {
      handleModalClose();
      setModalOpened(true);
    }
  }, [isConnected, openConnectModal, router, modalOpened]);

  return <>{children}</>;
};

export default Layout;
