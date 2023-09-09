import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Web3Button, useWeb3Modal } from '@web3modal/react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { SiWalletconnect } from 'react-icons/si';
import { Connector, useAccount, useConnect } from 'wagmi';
import TrustWallet from '../svg/iconTrustWallet';
import Metamask from '../svg/iconMeatmask';
type TIcons = { [k: string]: React.JSX.Element };

const icons: TIcons = {
  ["MetaMask"]: (<Metamask />),
  ["WalletConnect"]: (<SiWalletconnect className="text-5xl" />),
  ["TrustWallet"]: (<TrustWallet className='fill-white' />),
}

interface TPropsModalConnect {
  onOpenChange: () => void,
  isOpen: boolean
}

const _modal = (props: TPropsModalConnect) => {
  const { onOpenChange, isOpen } = props
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { open } = useWeb3Modal()

  function handleConnect(conn: Connector<any, any>, onClose: () => void) {
    connect({ connector: conn })
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              {connectors
                .map((x) => (<Button
                  color='secondary'
                  size='lg'
                  className='relative text-2xl font-semibold flex h-16'
                  key={x.id}
                  isLoading={isLoading && x.id === pendingConnector?.id}
                  onClick={() =>
                    !x.ready
                      ? toast.error("Instala la extension.")
                      : x.name == 'WalletConnect' ? open()
                        : handleConnect(x, onClose)}
                >
                  <div
                    className='bg-emerald-600 z-20 absolute top-0 left-0 h-full w-20 px-4 py-2 hover:w-full duration-1000 ease-in-out'
                  >
                    <div className='w-12'>
                      {typeof x?.name == 'string' && icons[x.name]}
                    </div>
                  </div>
                  <div className='w-12'>
                  </div>
                  <div className='z-30'>
                    {x.name}
                    {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
                  </div>
                </Button>))}
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal >
  );
};

export default _modal;