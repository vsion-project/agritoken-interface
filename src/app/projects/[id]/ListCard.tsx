'use client'
import CardBuyNFT from './CardBuyNFT';
import { TPropsCardBuyNFT } from '@/app/types';
import { Avatar, Button, Progress, Tooltip } from '@nextui-org/react';
import React from 'react';
import { BiAlarm } from 'react-icons/bi';
import { TbPigMoney } from 'react-icons/tb';
import { LiaFileContractSolid } from 'react-icons/lia';
import { PiPlantFill } from 'react-icons/pi';
import { GiPlantWatering, GiCorn, GiCoins } from 'react-icons/gi';

const deposits: TPropsCardBuyNFT[] = [
  {
    id: '3',
    title: 'NFT 1/4 HA',
    image: '/token/post_corn_1_4.png',
    description: 'Equivale un cuarto de hectarea de cultivo de maiz ',
    price: 500
  },
  {
    id: '2',
    title: 'NFT 1/2 HA',
    image: '/token/post_corn_1_2.png',
    description: 'Equivale media hectarea de cultivo de maiz ',
    price: 1000
  },

  {
    id: '1',
    title: 'NFT 1 HA',
    image: '/token/post_corn_1.png',
    description: 'Equivale una hectarea de cultivo de maiz ',
    price: 2000
  },
]

const step = 1

const timeAvatar = [
  { icon: (<LiaFileContractSolid />), description: "Crear contrato" },
  { icon: (<TbPigMoney />), description: "Recaudacion" },
  { icon: (<PiPlantFill />), description: "Inicio" },
  { icon: (<GiPlantWatering />), description: "Proceso" },
  { icon: (<GiCorn />), description: "Cosecha" },
  { icon: (<GiCoins />), description: "Recompenza" },
]


const CardList = ({ id }: { id: string }) => {
  return (
    <>
      <div className='w-full flex flex-col items-center gap-2  mb-4 py-4 bg-gray-950/50 rounded-lg'>
        <div className='w-[95%] flex relative my-4 sm:mb-16'>
          <div className='w-full flex justify-center items-center h-8 '>
            <Progress
              color='warning'
              aria-label="Loading..."
              className="max-w-full"
              value={Math.trunc(step / (timeAvatar.length - 1) * 100)}
            />
          </div>
          <div className='w-full flex justify-between absolute'>
            {timeAvatar.map(({ icon, description }, idx) =>
            (<Tooltip key={idx} content={description} className="capitalize">
              <Avatar
                isBordered
                color={idx <= step ? "warning" : "default"}
                radius="sm"
                size='md'
                fallback={<span className='text-3xl'>{icon}</span>} />
            </Tooltip>
            ))}
          </div>
        </div>
      </div>
      {id == '1'
        ? (
          <div className='w-full grid grid-flow-row gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 '>
            {deposits.map((dep, idx) => (<CardBuyNFT key={idx} {...dep} />))}
          </div>)
        : (
          <h3>
            No existe este projecto
          </h3>
        )
      }
    </>
  );
};

export default CardList;