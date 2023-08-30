'use client'

import NavbarLayout from '@/components/layout/_navbar'
import { NextUIProvider } from '@nextui-org/react'

import { WagmiConfig, createConfig, configureChains, createStorage } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

//connectors
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from 'wagmi/connectors/injected';

import { localhost, sepolia } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { Toaster } from 'react-hot-toast';
import { useEffect, useMemo, useState } from 'react'
import AgritokenLoader from '@/components/loader/agritoken'
import ImageNext from 'next/image'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi demo",
      },
    }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: 'c4f79cc821944d9680842e34466bfb',
    //     showQrModal: true
    //   },
    // }),
    new MetaMaskConnector({
      chains,
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [imgsLoaded, setImgsLoaded] = useState(false)
  const [progressValue, setProgressValue] = useState(0)


  useEffect(() => {
    const images = Array.from(document.images);

    const len = images.length;
    let counter = 0;

    if (len == 0) {
      setProgressValue(100)
      setImgsLoaded(true)
    } else {

      const loadImage = (image: HTMLImageElement) => {
        return new Promise((resolve, reject) => {
          const loadImg = new Image()
          loadImg.src = image.src
          // wait 2 seconds to simulate loading time
          loadImg.onload = () => {
            counter++;
            const currentProgress = Math.round((counter / len) * 100)
            setProgressValue(currentProgress)
            resolve(image.src)
          }

          loadImg.onerror = (err: any) => reject(err)
        })
      }

      Promise.all(images.map(image => loadImage(image)))
        .then(() => setImgsLoaded(true))
        .catch(err => console.log("Failed to load images", err))
    }

  }, [])

  return (
    <WagmiConfig config={config}>
      <NextUIProvider>
        {!imgsLoaded && (<AgritokenLoader value={progressValue} />)}
        <div className='bg-sky bg-no-repeat bg-cover bg-bottom overflow-x-hidden relative h-[120%]'>
          <div
            className='w-full bottom-0 fixed grid justify-center overflow-auto z-0'
          >
            <ImageNext
              width={2000}
              height={200}
              src="/bg-harvest.tsp.png"
              alt="barril"
            />
          </div>
          <NavbarLayout />
          <main className="flex min-h-[90vh] flex-col items-center justify-between px-12 py-16 sm:px-24 z-0">
            {children}
          </main>
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