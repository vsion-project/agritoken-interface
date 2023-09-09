import { Providers } from "./providers";
import './globals.css'
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { LoadingProvider } from "@/context/use-transaccion";

const nunito = Nunito_Sans({ weight: ['200', '400', '500', '600', '700'], subsets: ['latin-ext'] })

export const metadata: Metadata = {
  title: 'Agritoken',
  description: 'Agritoken home',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <LoadingProvider>
          <Providers>
            {children}
          </Providers>
        </LoadingProvider>
      </body>
    </html>
  )
}
