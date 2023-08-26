'use client'
import React, { useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from 'wagmi'

import {
  Card, CardHeader, CardBody, CardFooter, Divider, Link, Image,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input
} from "@nextui-org/react";
import { TPropsCardDeposit } from "./types";

//Wagmi
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

// ABI
import AbiUSDT from '@/data/ABIs/USDT.abi.json';
import AbiTrader from '@/data/ABIs/Trade_V1.abi.json';
import { parseEther } from "viem";

const contractUSDT = '0xfd186d28c03A2847eaA9365847547466166D706b'
const contractTrader = '0x8F58ed4a2f317037fC1C671255F99fA69F797167'

export default function CardDeposit(props: TPropsCardDeposit) {
  const {
    title,
    duration,
    APR,
    reward
  } = props;

  const [amountApprove, setAmountApprove] = useState("0")
  const [amountDeposit, setAmountDeposit] = useState("0")


  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { address } = useAccount();

  const { data, write } = useContractWrite({
    address: contractUSDT,
    abi: AbiUSDT,
    functionName: 'increaseAllowance',
  })

  const { write: Deposit, error } = useContractWrite({
    address: contractTrader,
    abi: AbiTrader,
    functionName: 'deposit',
  })

  const { data: allowance } = useContractRead({
    address: contractUSDT,
    abi: AbiUSDT,
    functionName: 'allowance',
    args: [address, contractTrader]
  })

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/35082874?v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{title}</p>
            <p className="text-small text-default-500">need whitelist</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Duration: {duration}</p>
          <p>APR: {APR}</p>
          <p>Reward: {reward}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button onPress={onOpen} color="primary">Open Modal</Button>
        </CardFooter>
      </Card>
      <Modal onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>
                  <b>Allownance: {allowance?.toString()}</b>
                </p>
                <Input
                  type="number"
                  label="USDT amount"
                  value={amountApprove}
                  onChange={(ev) => {
                    setAmountApprove(ev.target.value)
                  }} />
                <span>{amountApprove} USDT</span>
                <Button onClick={() => write && write({ args: [contractTrader, parseEther(amountApprove)] })}>
                  increaseAllowance
                </Button>
                <Input
                  type="number"
                  label="USDT deposit"
                  value={amountDeposit}
                  onChange={(ev) => {
                    setAmountDeposit(ev.target.value)
                  }} />
                <span>{amountDeposit} USDT</span>
                <Button
                  onClick={() =>
                    Deposit && Deposit({ args: [parseEther(amountDeposit)] })}>
                  Deposit
                </Button>
                {error?.message}

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
