'use client'

import NavbarLayout from '@/components/layout/_navbar'
import { NextUIProvider } from '@nextui-org/react'

import { WagmiConfig } from 'wagmi'
import { configWagmi } from './configWagmi';

import { Suspense, useContext } from 'react'
import ImageNext from 'next/image'

import sky from '@/../public/bg-sky.png'
import { LoadingContext } from '@/context/use-transaccion'
import { Toaster } from 'react-hot-toast';

import LoaderTx from '@/components/loader/loaderTx'


export function Providers({ children }: { children: React.ReactNode }) {
  const { isLoading } = useContext(LoadingContext)

  return (
    <WagmiConfig config={configWagmi}>
      <NextUIProvider>
        <div className='overflow-x-hidden relative h-[120%]'>
          <Suspense fallback={<></>}>

            <ImageNext
              alt="sky background"
              src={sky}
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              priority
              fetchPriority='high'
              style={{
                objectFit: 'cover',
              }}
            />
            <div
              className='w-full bottom-0 fixed grid justify-center overflow-auto z-0'
            >
              <ImageNext
                width={3840}
                height={75}
                src="/bg-harvest.tsp.png"
                alt="harvest"
                fetchPriority='high'
                priority
                sizes="(min-width: 2120px) 2000px, calc(94.44vw + 17px)"

              />
            </div>
          </Suspense>
          <NavbarLayout />
          {isLoading && <LoaderTx />}
          <main className="min-h-[90vh] px-6 py-12 sm:px-24 z-0">
            {children}
          </main>

          <Suspense fallback={<></>}>
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
          </Suspense>

        </div>

      </NextUIProvider>
    </WagmiConfig>
  )
}