import CardBuyNFT from './CardBuyNFT';
import { TPropsCardBuyNFT } from '@/app/types';
import React from 'react';

const deposits: TPropsCardBuyNFT[] = [
  {
    id: '3',
    title: 'NFT 1/4 HA',
    image: '/token/post_corn_1_4.png',
    description: 'Equivale una hectarea de de maiz ',
    price: 500
  },
  {
    id: '2',
    title: 'NFT 1/2 HA',
    image: '/token/post_corn_1_2.png',
    description: 'Equivale una hectarea de de maiz ',
    price: 1000
  },

  {
    id: '1',
    title: 'NFT 1 HA',
    image: '/token/post_corn_1.png',
    description: 'Equivale una hectarea de de maiz ',
    price: 2000
  },
]


const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      {id == '1'
        ? (
          <div className='w-full grid grid-flow-row gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  '>
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

export default page;