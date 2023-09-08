
import { createConfig, configureChains } from 'wagmi'


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'

import {
  // localhost,
  // sepolia,
  bscTestnet
} from 'wagmi/chains'

const chains = [
  bscTestnet
]

export const projectId = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID || ''

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})

// export const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({
//       chains,
//     }),
//   ],
//   publicClient,
//   webSocketPublicClient
// })

export const ethereumClient = new EthereumClient(wagmiConfig, chains)