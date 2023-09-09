'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, useDisclosure } from '@nextui-org/react';
import React, { useEffect } from 'react';
import ModalConnect from './_modal'
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import ClientOnly from '../hyration/clientOnly';
import { LiaArrowDownSolid } from 'react-icons/lia';
import { BiSolidArrowToBottom, BiSolidDownArrow } from 'react-icons/bi';

const ConnectButton = () => {

  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { chain } = useNetwork();

  const { chains, switchNetwork } =
    useSwitchNetwork();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  useEffect(() => {
    if (isConnected && switchNetwork && chain?.unsupported) {
      switchNetwork(chains[0].id)
    }
  }, [isConnected, chain?.unsupported, chain, switchNetwork, chains])

  return (
    <ClientOnly>
      {isConnected
        ? chain?.unsupported
          ? (<Button
            color="primary"
            onClick={() => Array.isArray(chain) && switchNetwork?.(chains[0].id)}>
            Network unsupported {Array.isArray(chain) ? chain?.[0] : ''}
          </Button>)
          : (<div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color='primary'
                  variant='solid'
                >
                  {address?.slice(0, 6)}...{address?.slice(address.length - 6)}
                  <BiSolidDownArrow />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Action event example"
              >
                <DropdownItem
                  key="delete"
                  onClick={() => disconnect()}
                  className="text-danger" color="danger">
                  Desconectar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </div>)
        : (<Button color="primary" className='font-bold' onClick={() => onOpen()}>{isLoading ? "Conectando" : "Conectar Wallet"}</Button>)
      }
      <ModalConnect isOpen={isOpen} onOpenChange={onOpenChange} />
    </ClientOnly>
  );
};

export default ConnectButton;