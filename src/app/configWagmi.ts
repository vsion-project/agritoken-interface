
import { createConfig, configureChains } from 'wagmi'


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'

import {
  // localhost,
  // sepolia,
  bscTestnet
} from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const chains = [
  bscTestnet
]

export const projectId = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID || ''

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
// export const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient
// })

function getTrustWalletFromWindow() {
  const eth = (window as any).ethereum

  const isTrustWallet = (ethereum: any) => {
    // Identify if Trust Wallet injected provider is present.
    const trustWallet = !!ethereum.isTrust;

    return trustWallet;
  };

  const injectedProviderExist =
    typeof window !== "undefined" && typeof eth !== "undefined";

  if (!injectedProviderExist) {
    return null;
  }

  if (isTrustWallet(eth)) {
    return eth;
  }

  if (eth?.providers) {
    return eth.providers.find(isTrustWallet) ?? null;
  }

  return (window as any)["trustwallet"] ?? null;
}

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new InjectedConnector({
      chains,
      options: {
        getProvider: () =>
          getTrustWalletFromWindow(),
        name: 'TrustWallet',
      }
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
      },
    }),
  ],
  publicClient,
})

export const ethereumClient = new EthereumClient(wagmiConfig, chains)