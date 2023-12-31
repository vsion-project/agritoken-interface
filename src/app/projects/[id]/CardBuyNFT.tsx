'use client'
import React, { useContext, useState } from "react";
import {
  Card, Button, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Checkbox,
} from "@nextui-org/react";
import { TPropsCardBuyNFT } from "../../types";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

import { toast } from 'react-hot-toast';

import ModalConnect from '@/components/connect/_modal'

// ABI
import AbiUSDT from '@/data/ABIs/USDT.abi.json';
import AbiAgriToken from '@/data/ABIs/AgroToken.abi.json';
import { formatEther, getAddress, parseEther } from "viem";
import LinkBinance from "@/components/nft/link-binance";
import { waitForTransaction } from "wagmi/actions";
import { LoadingContext } from "@/context/use-transaccion";
import ClientOnly from "@/components/hyration/clientOnly";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import Image from "next/image";

const contractUSDT = getAddress(process.env.NEXT_PUBLIC_ADDRESS_USDT || '0');
const contractAgriToken = getAddress(process.env.NEXT_PUBLIC_ADDRESS_AGRITOKEN_C1 || '0');

export default function CardBuyNFT(props: TPropsCardBuyNFT) {
  const {
    id,
    title,
    image,
    price,
    description
  } = props;
  const [amountDeposit, setAmountDeposit] = useState("")
  const [isApprove, setIsApprove] = useState(false)
  const [isOk, setIsOk] = useState(false)

  const { address, isConnected } = useAccount()

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { setLoading } = useContext(LoadingContext)

  const markdown = `
  **Descargo de Responsabilidad - Uso de NFT en Agritoken**

  Agritoken es una plataforma que permite la inversión y transacciones relacionadas con NFTs (Tokens No Fungibles). Si decides participar en actividades que involucren NFTs en Agritoken, es importante que tengas en cuenta lo siguiente:
  
  1. **Alto Riesgo de Inversión**: Las inversiones en NFTs pueden ser altamente volátiles y pueden resultar en ganancias significativas, pero también en pérdidas sustanciales. Por favor, comprende los riesgos antes de invertir. No debes invertir dinero que sea esencial para tu sustento diario o tus gastos fundamentales.
  
  2. **Ninguna Garantía de Rendimiento**: Agritoken no puede garantizar ningún resultado o rendimiento específico en tus inversiones en NFTs. Los precios y valores de los NFTs pueden variar en cualquier momento y están sujetos a la dinámica del mercado.
  
  3. **Educación y Conocimiento**: Te instamos a educarte adecuadamente sobre NFTs y la tecnología blockchain antes de realizar inversiones. La falta de comprensión de estos activos puede aumentar tus riesgos.
  
  4. **Uso Responsable**: Solo debes utilizar fondos que estés dispuesto y puedas permitirte perder en inversiones de alto riesgo como los NFTs. No utilices dinero destinado a necesidades básicas, como alimentos, vivienda o atención médica, para invertir en NFTs.
  
  5. **Asesoramiento Financiero Independiente**: Se recomienda encarecidamente buscar el consejo de un asesor financiero independiente antes de tomar decisiones de inversión en NFTs.
  
  6. **Cumplimiento Legal**: Asegúrate de cumplir con todas las leyes y regulaciones locales, estatales y nacionales aplicables relacionadas con las inversiones en NFTs. Agritoken no se hace responsable de las acciones que incumplan la ley.
  
  Al continuar utilizando Agritoken y participar en actividades relacionadas con NFTs, aceptas estos términos y comprendes los riesgos asociados con las inversiones en NFTs. Es tu responsabilidad tomar decisiones financieras informadas y responsables.
  
  Agritoken no se hace responsable de las decisiones de inversión que tomes y no ofrece garantías sobre el rendimiento de los NFTs.
  
  Fecha de última actualización: 30 de agosto de 2023
  `;

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

  const { writeAsync: IncreaseAllowance, isSuccess: IncreaseAllowanceSuccess, status, } = useContractWrite({
    address: contractUSDT,
    abi: AbiUSDT,
    functionName: 'approve',
  })

  // Agritoken
  const { writeAsync: BuyNFT } = useContractWrite({
    address: contractAgriToken,
    abi: AbiAgriToken,
    functionName: 'buyNFT',
  })

  const { data: fee } = useContractRead({
    address: contractAgriToken,
    abi: AbiAgriToken,
    functionName: 'fee',
  })

  const { data: balanceNFT, refetch: GetBalanceNFT, } = useContractRead({
    address: contractAgriToken,
    abi: AbiAgriToken,
    functionName: 'balanceOf',
    args: [address, id],
  })

  const { data: supplayNFT, refetch: GetSupplayNFT, } = useContractRead({
    address: contractAgriToken,
    abi: AbiAgriToken,
    functionName: 'balanceOf',
    args: [contractAgriToken, id],
  })

  const { data: Price } = useContractRead({
    address: contractAgriToken,
    abi: AbiAgriToken,
    functionName: 'prices',
    args: [id],
  })

  async function handleBuyNFTClick(max: number) {
    try {

      if (!amountDeposit) {
        throw new Error('Indica la cantidad de NFT')
      }
      if (Number(amountDeposit) <= 0) {
        throw new Error('La cantidad de NFT\'s debe ser mayor que 0')
      }
      if (Number(amountDeposit) > max) {
        throw new Error(`La cantidad de NFT\'s debe ser menor o igual a ${max}`)
      }
      if (IncreaseAllowance && typeof Price == 'bigint' && typeof balanceUSDT == 'bigint') {
        if (Price * BigInt(amountDeposit) > balanceUSDT) {
          throw new Error('No tines suficiente USDT')
        }
        setLoading(true)
        const res = await IncreaseAllowance({ args: [contractAgriToken, Price * BigInt(amountDeposit)] })

        await waitForTransaction({
          hash: res.hash,
        })
        toast.success(
          <LinkBinance
            className='text-blue-900'
            textPrev='Transaction complete'
            transaction={res.hash}
          />)

        if (BuyNFT && typeof fee == 'bigint') {
          setLoading(true)
          const res = await BuyNFT({ args: [id, amountDeposit], value: fee })
          await waitForTransaction({
            hash: res.hash,
          })
          toast.success(
            <LinkBinance
              className='text-blue-900'
              textPrev='Transaction complete'
              transaction={res.hash}
            />)
          onClose()
        }
      }
    } catch (error: any) {
      toast.error(error?.shortMessage ? error.shortMessage : error?.message)
    } finally {
      GetAllowance()
      GetBalanceNFT()
      GetSupplayNFT()
      setLoading(false)
    }
  }

  return (
    <>
      <Card isFooterBlurred className="p-0" shadow="md" >
        <CardBody className="relative z-10 top-0 flex-col items-start p-0 overflow-hidden " >
          <div className="realtive z-0 w-full before:block before:pb-[100%]">
            <Image
              alt="Card example background"
              width={700}
              height={700}
              className="rounded-xl block w-full h-auto absolute top-0 bottom-0 object-cover align-center z-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={image}
              priority
            />
            <ClientOnly>

              {supplayNFT != null && (<div className="bg-black bg-opacity-90 text-white font-extrabold text-xl lg:text-2xl rounded-xl absolute z-10 top-4 left-4 p-2">
                Quedan {typeof supplayNFT == 'bigint' ? supplayNFT.toString() : '0'}
              </div>)}
              {balanceNFT != null && (<div className="bg-black bg-opacity-90 text-white font-extrabold text-2xl lg:text-3xl rounded-xl h-1/4 w-2/5 md:w-1/4 absolute z-10 bottom-4 right-4 border-[#22ff566d] border-5 flex justify-center items-center text-center">
                X {typeof balanceNFT == 'bigint' ? balanceNFT.toString() : '0'}
              </div>)}
            </ClientOnly>

          </div>
          <div className="opacity-0 hover:opacity-100 absolute w-full h-full p-6 bg-gradient-to-br from-green-900 to-[#0008] bg-opacity-80 text-center flex flex-col gap-6 justify-evenly transition duration-150 ease-out hover:ease-in">
            <h4 className="text-yellow-500 font-bold text-2xl">{title}</h4>
            <div>
              <span className="text-white font-semibold  text-xl ">{description}</span>
            </div>
            <Button onClick={onOpen} color="success" variant="solid" radius="full" size="lg" className="text-xl">
              Comprar {price} USDT
            </Button>
            <ModalConnect isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
        </CardBody>
      </Card >
      <Modal
        isOpen={isOpen && isConnected}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        size={isApprove ? "xl" : "3xl"}
        className="bg-primary"
        classNames={{ closeButton: 'text-white hover:text-danger' }}
      >
        <ModalContent className="text-xl">
          {(onClose) => (
            <>
              <ModalHeader className="font-bold text-2xl text-emerald-100 ">{title}</ModalHeader>
              <ModalBody>
                {
                  !isApprove ? (
                    <div >
                      <ReactMarkdown
                        className="bg-gray-200 text-gray-900 dark:text-gray-100 dark:bg-gray-900 p-2"
                        remarkPlugins={[remarkGfm]}
                      >
                        {markdown}
                      </ReactMarkdown>
                      <div className="flex py-2 px-1 justify-between">
                        <Checkbox
                          isSelected={isOk}
                          onChange={(ev) => setIsOk(ev.target.checked)}
                          classNames={{
                            label: "text-small text-white",
                          }}
                        >
                          Estoy de acuerdo
                        </Checkbox>
                      </div>
                      <div className="flex flex-col gap-6 justify-evenly mt-4">
                        <Button color="success" disabled={!isOk} onClick={() => setIsApprove(true)}>
                          Aceptar
                        </Button>
                        <Button color="danger" onPress={onClose}>
                          Cancelar
                        </Button>
                      </div>

                    </div>
                  )
                    : (
                      <>
                        <div className="text-gray-200">
                          <span>
                            <b>Precio NFT: </b> {typeof Price == 'bigint'
                              ? formatEther(Price)
                              : '0'} USDT
                          </span>
                          <br />
                          <span>
                            <b>Tu tienes: </b> {typeof balanceUSDT == 'bigint'
                              ? formatEther(balanceUSDT)
                              : '0'} USDT
                          </span>
                          <br />
                        </div>
                        <Input
                          size="lg"
                          type="number"
                          label="Cantidad de NFTs"
                          classNames={
                            {
                              description: 'text-gray-300',
                            }
                          }
                          min={1}
                          value={amountDeposit}
                          description={`Te costará ${typeof Price == 'bigint'
                            ? formatEther(BigInt(amountDeposit) * Price)
                            : '0'} USDT`}
                          onChange={(ev) => {
                            setAmountDeposit(ev.target.value)
                          }} />
                        <Button
                          size="lg"
                          className="uppercase"
                          color="success"
                          onClick={() => handleBuyNFTClick(typeof supplayNFT == 'bigint' ? Number(supplayNFT) : 0)}>
                          Comprar NFT
                        </Button>
                      </>
                    )
                }
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal >
    </>
  );
}
