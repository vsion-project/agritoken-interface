import CardBuyNFT from './CardBuyNFT'
import { TPropsCardBuyNFT, } from './types'

const deposits: TPropsCardBuyNFT[] = [
  {
    id: '1',
    title: 'NFT 1 HA',
    image: '/token/post_corn_1.png',
    description: 'Equivale una hectarea de de maiz ',
    price: 2000
  },
  {
    id: '2',
    title: 'NFT 1/2 HA',
    image: '/token/post_corn_1_2.png',
    description: 'Equivale una hectarea de de maiz ',
    price: 1000
  },
  {
    id: '3',
    title: 'NFT 1/4 HA',
    image: '/token/post_corn_1_4.png',
    description: 'Equivale una hectarea de de maiz ',
    price: 500
  },
]
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-12 py-16 sm:px-24">
      <div className='w-full grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  '>
        {deposits.map((dep, idx) => (<CardBuyNFT key={idx} {...dep} />))}
      </div>
    </main>
  )
}
