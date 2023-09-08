import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Connector, useAccount, useConnect } from 'wagmi';

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
                .map((x) => !x.ready
                  ? (<Button
                    color='warning'
                    size='lg'
                    className='text-2xl font-medium'
                    key={x.id}
                    onClick={() => toast.error("Instala la extension.")}
                  >{x.name}</Button>)
                  : (<Button
                    color='warning'
                    size='lg'
                    className='text-2xl font-medium'
                    key={x.id}
                    isLoading={isLoading && x.id === pendingConnector?.id}
                    onClick={() => handleConnect(x, onClose)}
                  >
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