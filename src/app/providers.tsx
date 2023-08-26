'use client'

import NavbarLayout from '@/components/layout/_navbar'
import { NextUIProvider } from '@nextui-org/react'

import { WagmiConfig, createConfig, configureChains, createStorage } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { localhost, sepolia } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { Toaster } from 'react-hot-toast';
import Image from 'next/image'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  storage: createStorage({ storage: window.localStorage }),
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <NextUIProvider>
        <div className='bg-sky bg-no-repeat bg-cover bg-bottom overflow-y-hidden relative h-[120%]'>
          <div
            className='w-full bottom-0 fixed grid justify-center overflow-auto'
          >
            <Image
              width={2000}
              height={200}
              src="/bg-harvest.tsp.png"
              alt="barril"
            />
          </div>
          <NavbarLayout />
          {children}
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              className: '',
              style: {
                maxWidth: '90vw',
                padding: '16px',
              },
              duration: 5000
            }}
          />
        </div>
      </NextUIProvider>
    </WagmiConfig>
  )
}