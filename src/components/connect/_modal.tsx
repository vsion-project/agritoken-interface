import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Web3Button } from '@web3modal/react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { SiWalletconnect } from 'react-icons/si';
import { Connector, useAccount, useConnect } from 'wagmi';
import TrustWallet from '../svg/iconTrustWallet';
import Metamask from '../svg/iconMeatmask';

type TIcons = { [k: string]: React.JSX.Element };

const icons: TIcons = {
  ["MetaMask"]: (<Metamask />),
  ["WalletConnect"]: (<SiWalletconnect className='text-white bg-sky-600 rounded-full p-2 text-4xl' />),
  ["TrustWallet"]: (<TrustWallet className='fill-white bg-sky-600 rounded-full p-2 text-4xl' />),
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

  function handleConnect(conn: Connector<any, any>, onClose: () => void) {
    connect({ connector: conn })
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Connect</ModalHeader>
            <ModalBody>
              {connectors
                .map((x) => (<Button
                  color='secondary'
                  size='lg'
                  className='text-2xl font-medium flex justify-between h-16'
                  key={x.id}
                  isLoading={isLoading && x.id === pendingConnector?.id}
                  onClick={() => !x.ready ? toast.error("Instala la extension.") : handleConnect(x, onClose)}
                >
                  {typeof x?.name == 'string' && icons[x.name]}
                  {x.name}
                  {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
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