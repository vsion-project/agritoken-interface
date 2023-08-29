'use client'
import React, { useEffect, useState } from "react";
import {
  Card, CardHeader, CardFooter, Image, Button, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure,
} from "@nextui-org/react";
import { TPropsCardBuyNFT } from "../../types";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

import { toast } from 'react-hot-toast';

// ABI
import AbiUSDT from '@/data/ABIs/USDT.abi.json';
import AbiAgriToken from '@/data/ABIs/AgroToken.abi.json';
import { formatEther, parseEther } from "viem";
import LinkBinance from "@/components/nft/link-binance";

const contractUSDT = '0x755F00949BfFf9Ae7D8EDBc2E3Cc9be2F86948e2'
const contractAgriToken = '0x203C7C84120d40b59F1a641C8Fb989889cE58f52'


export default function CardBuyNFT(props: TPropsCardBuyNFT) {
  const {
    id,
    title,
    image,
    price,
    description
  } = props;

  const [amountApprove, setAmountApprove] = useState("0")
  const [amountDeposit, setAmountDeposit] = useState("0")

  const { address } = useAccount();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // USDT
  const { data: allowance, refetch: GetAllowance } = useContractRead({
    address: contractUSDT,
    abi: AbiUSDT,
    functionName: 'allowance',
    args: [address || '', contractAgriToken],
  })


  const { data: balanceUSDT, refetch: GetBalanceUSDT } = useContractRead({
    address: contractUSDT,
    abi: AbiUSDT,
    functionName: 'balanceOf',
    args: [address],
  })

  const { writeAsync: IncreaseAllowance } = useContractWrite({
    address: contractUSDT,
    abi: AbiUSDT,
    functionName: 'increaseAllowance',
  })

  // Agritoken
  const { writeAsync: BuyNFT } = useContractWrite({
    address: contractAgriToken,
    abi: AbiAgriToken,
    functionName: 'buyNFT',
  })

  const { data: balanceNFT, refetch: GetBalanceNFT } = useContractRead({
    address: contractAgriToken,
    abi: AbiAgriToken,
    functionName: 'balanceOf',
    args: [address, id],
  })

  const { data: Price } = useContractRead({
    address: contractAgriToken,
    abi: AbiAgriToken,
    functionName: 'prices',
    args: [id],
  })

  async function handleIncreaseClick() {
    try {

      if (IncreaseAllowance) {
        const res = await IncreaseAllowance({ args: [contractAgriToken, parseEther(amountApprove)] })
        GetAllowance()
        GetBalanceUSDT()
        toast.success(
          <LinkBinance
            className='text-blue-900'
            textPrev='Transaction complete'
            transaction={res.hash}
          />)
      }

    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  async function handleBuyNFTClick() {
    try {
      if (BuyNFT) {
        const res = await BuyNFT({ args: [id, amountDeposit] })
        GetBalanceNFT()
        toast.success(
          <LinkBinance
            className='text-blue-900'
            textPrev='Transaction complete'
            transaction={res.hash}
          />)
        onClose()
      }
    } catch (error: any) {
      toast.error(error?.details)
    }
  }

  return (
    <>
      <Card isFooterBlurred className="p-0" shadow="md">
        <CardBody className="relative z-10 top-0 flex-col items-start p-0 overflow-hidden" >
          <div className="realtive z-0 w-full before:block before:pb-[100%]">
            <Image
              removeWrapper
              alt="Card example background"
              className="block w-full h-auto absolute top-0 bottom-0 object-cover align-center z-0"
              src={image}
            />
            <div className="bg-black bg-opacity-90 text-white font-extrabold text-2xl lg:text-3xl rounded-xl h-1/4 w-1/4 absolute z-10 bottom-4 right-4 border-[#22ff566d] border-5 flex justify-center items-center text-center">
              X {typeof balanceNFT == 'bigint' ? balanceNFT.toString() : '0'}
            </div>
          </div>
          <div className="opacity-0 hover:opacity-100 absolute w-full h-full p-6 bg-gradient-to-br from-green-900 to-[#0008] bg-opacity-80 text-center flex flex-col gap-6 justify-evenly transition duration-150 ease-out hover:ease-in">
            <h4 className="text-yellow-500 font-bold text-2xl">{title}</h4>
            <div>
              <span className="text-white font-semibold text-tiny">{description}</span>
            </div>
            <Button onClick={onOpen} color="success" variant="bordered" radius="full" >
              BUY {price} USDT
            </Button>
          </div>
        </CardBody>
      </Card >
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-[#39651ae5]">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <span>
                  <b>Balance:</b> {typeof balanceUSDT == 'bigint' ? formatEther(balanceUSDT) : '0'}
                </span>
                <span>
                  <b>Allownance:</b> {typeof allowance == 'bigint' ? formatEther(allowance) : '0'}
                </span>
                <span>
                  <b>Price: </b> {typeof Price == 'bigint' ? formatEther(Price) : '0'}
                </span>
                <Input
                  type="number"
                  label="USDT amount"
                  value={amountApprove}
                  onChange={(ev) => {
                    setAmountApprove(ev.target.value)
                  }} />
                <span>{amountApprove} USDT</span>
                <Button
                  color="primary"
                  onClick={handleIncreaseClick}>
                  increaseAllowance
                </Button>
                <hr />
                <Input
                  type="number"
                  label="Count NFT's"
                  min={1}
                  value={amountDeposit}
                  onChange={(ev) => {
                    setAmountDeposit(ev.target.value)
                  }} />
                <span>{amountDeposit} USDT {id}</span>
                <Button
                  color="success"
                  onClick={handleBuyNFTClick}>
                  Buy NFT
                </Button>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
