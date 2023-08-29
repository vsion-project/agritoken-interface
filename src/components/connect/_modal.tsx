import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { useAccount, useConnect } from 'wagmi';

interface TPropsModalConnect {
  onOpenChange: () => void,
  isOpen: boolean
}

const _modal = (props: TPropsModalConnect) => {
  const { onOpenChange, isOpen } = props
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">aa</ModalHeader>
            <ModalBody>
              {connectors
                .filter((x) => x.ready && x.id !== connector?.id)
                .map((x) => (
                  <button key={x.id} onClick={() => connect({ connector: x })}>
                    {x.name}
                    {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
                  </button>
                ))}

            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default _modal;