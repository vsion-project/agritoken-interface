'use client'
import React, { useContext, useEffect, useState } from "react";
import {
  Card, CardHeader, CardFooter, Image, Button, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Checkbox,
} from "@nextui-org/react";
import { TPropsCardBuyNFT } from "../../types";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

import { toast } from 'react-hot-toast';

// ABI
import AbiUSDT from '@/data/ABIs/USDT.abi.json';
import AbiAgriToken from '@/data/ABIs/AgroToken.abi.json';
import { formatEther, parseEther } from "viem";
import LinkBinance from "@/components/nft/link-binance";
import { BiSolidDownArrow } from "react-icons/bi";
import { waitForTransaction } from "wagmi/actions";
import LoaderTx from "@/components/loader/loaderTx";
import { LoadingContext } from "@/context/use-transaccion";
import ClientOnly from "@/components/hyration/clientOnly";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";

const contractUSDT = '0x755F00949BfFf9Ae7D8EDBc2E3Cc9be2F86948e2'
const contractAgriToken = '0xeAa857D5Fc73bC0270E20703506A904EF3c497Fd'


export default function CardBuyNFT(props: TPropsCardBuyNFT) {
  const {
    id,
    title,
    image,
    price,
    description
  } = props;

  const [amountApprove, setAmountApprove] = useState("")
  const [amountDeposit, setAmountDeposit] = useState("")
  const [isApprove, setIsApprove] = useState(false)
  const [isOk, setIsOk] = useState(false)

  const [isAddAllow, setIsAddAllow] = useState(false)

  const { address } = useAccount();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { setLoading, isLoading } = useContext(LoadingContext)

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
    functionName: 'increaseAllowance',
  })

  // Agritoken
  const { writeAsync: BuyNFT } = useContractWrite({
    address: contractAgriToken,
    abi: AbiAgriToken,
    functionName: 'buyNFT',
  })

  const { data: balanceNFT, refetch: GetBalanceNFT, } = useContractRead({
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
        setLoading(true)
        const res = await IncreaseAllowance({ args: [contractAgriToken, parseEther(amountApprove)] })

        await waitForTransaction({
          hash: res.hash,
        })
        toast.success(
          <LinkBinance
            className='text-blue-900'
            textPrev='Transaction complete'
            transaction={res.hash}
          />)
      }

    } catch (error: any) {
      toast.error(error?.shortMessage)
    } finally {
      setAmountApprove('')
      GetAllowance()
      GetBalanceUSDT()
      setLoading(false)
    }
  }

  async function handleBuyNFTClick() {
    try {
      if (BuyNFT) {
        setLoading(true)
        const res = await BuyNFT({ args: [id, amountDeposit] })
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
    } catch (error: any) {
      toast.error(error?.shortMessage)
    } finally {
      GetAllowance()
      GetBalanceNFT()
      setAmountApprove('')
      setLoading(false)
    }
  }

  function handleAceptContract() {
  }

  useEffect(() => {
    setIsAddAllow(typeof allowance == 'bigint' && allowance == BigInt(0))
  }, [allowance])

  return (
    <>
      <Card isFooterBlurred className="p-0" shadow="md" >
        <CardBody className="relative z-10 top-0 flex-col items-start p-0 overflow-hidden " >
          <div className="realtive z-0 w-full before:block before:pb-[100%]">
            <Image
              removeWrapper
              alt="Card example background"
              className="block w-full h-auto absolute top-0 bottom-0 object-cover align-center z-0"
              src={image}
            />
            <ClientOnly>

              {balanceNFT != null && (<div className="bg-black bg-opacity-90 text-white font-extrabold text-2xl lg:text-3xl rounded-xl h-1/4 w-1/4 absolute z-10 bottom-4 right-4 border-[#22ff566d] border-5 flex justify-center items-center text-center">
                X {typeof balanceNFT == 'bigint' ? balanceNFT.toString() : '0'}
              </div>)}
            </ClientOnly>

          </div>
          <div className="opacity-0 hover:opacity-100 absolute w-full h-full p-6 bg-gradient-to-br from-green-900 to-[#0008] bg-opacity-80 text-center flex flex-col gap-6 justify-evenly transition duration-150 ease-out hover:ease-in">
            <h4 className="text-yellow-500 font-bold text-2xl">{title}</h4>
            <div>
              <span className="text-white font-semibold  text-xl ">{description}</span>
            </div>
            <Button onClick={onOpen} color="success" variant="bordered" radius="full" size="lg" className="text-xl">
              BUY {price} USDT
            </Button>
          </div>
        </CardBody>
      </Card >
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        size={isApprove ? "xl" : "3xl"}
        className="bg-[#0d3616]"
      >
        <ModalContent className="text-xl">
          {(onClose) => (
            <>
              <ModalHeader className="font-bold text-2xl text-slate-400 ">{title}</ModalHeader>
              <ModalBody>
                {
                  !isApprove ? (
                    <div >
                      <ReactMarkdown
                        className="bg-gray-300 p-2"
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
                      <div className="flex justify-evenly mt-4">
                        <Button color="danger" variant="flat" onPress={onClose}>
                          Cancelar
                        </Button>
                        <Button color="primary" disabled={!isOk} onClick={() => setIsApprove(true)}>
                          Aceptar
                        </Button>
                      </div>

                    </div>
                  )
                    : (
                      <>
                        <div className="text-gray-200">
                          <span>
                            <b>Precio NFT: </b> {typeof Price == 'bigint' ? formatEther(Price) : '0'} USDT
                          </span>
                          <br />
                          <span>
                            <b>Balance:</b> {typeof balanceUSDT == 'bigint' ? formatEther(balanceUSDT) : '0'} USDT
                          </span>
                          <br />
                          <span>
                            <b>Permitido:</b> {typeof allowance == 'bigint' ? formatEther(allowance) : '0'} USDT
                          </span>
                        </div>
                        <div>
                          <Button
                            onClick={() => setIsAddAllow(!isAddAllow)}
                            size="sm">Añadir <BiSolidDownArrow /> </Button>
                        </div>
                        {
                          isAddAllow && (<div className="grid gap-4" >
                            <Input
                              size="lg"
                              type="number"
                              label="USDT amount"
                              value={amountApprove}
                              onChange={(ev) => {
                                setAmountApprove(ev.target.value)
                              }} />
                            <Button
                              size="lg"
                              color="primary"
                              className="uppercase"
                              onClick={handleIncreaseClick}>
                              Incrementar USDT permitido
                            </Button>
                            <hr />

                          </div>
                          )
                        }
                        <Input
                          size="lg"
                          type="number"
                          label="Count NFT's"
                          min={1}
                          value={amountDeposit}
                          description={`${typeof amountDeposit == 'bigint' ? amountDeposit * price : '0'} USDT`}
                          onChange={(ev) => {
                            setAmountDeposit(ev.target.value)
                          }} />
                        <Button
                          size="lg"
                          className="uppercase"
                          color="success"
                          onClick={handleBuyNFTClick}>
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
