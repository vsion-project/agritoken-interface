import { Button, Modal, useDisclosure } from '@nextui-org/react';
import React, { useEffect } from 'react';
import ModalConnect from './_modal'
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const ConnectButton = () => {

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { chain } = useNetwork();

  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  useEffect(() => {
    if (isConnected && switchNetwork && chain?.unsupported) {
      switchNetwork(chains[0].id)
    }
  }, [isConnected, chain?.unsupported, chain, switchNetwork, chains])

  return (
    <>
      {isConnected
        ? chain?.unsupported
          ? (<Button
            color="primary"
            onClick={() => Array.isArray(chain) && switchNetwork?.(chains[0].id)}>
            Network unsupported{Array.isArray(chain) ? chain?.[0] : 'jj'}
          </Button>)
          : (<div>
            <Button
              onClick={() => disconnect()}
              color='primary'
              variant='bordered'
            >
              Connected to {address?.slice(0, 6)}...{address?.slice(address.length - 6)}
            </Button>
          </div>)
        : (<Button color="primary" onClick={() => onOpen()}>Connect Wallet</Button>)
      }
      <ModalConnect isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default ConnectButton;