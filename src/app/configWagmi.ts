
import { createConfig, configureChains } from 'wagmi'


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'

import {
  // localhost,
  // sepolia,
  bscTestnet,
  bsc
} from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const isProduction = process.env.NODE_ENV == "production"

const chains = isProduction ? [bsc] : [bscTestnet]


export const projectId = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID || ''

const { publicClient } = configureChains<any>(chains, [w3mProvider({ projectId })])
// export const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient
// })

function getTrustWalletFromWindow() {

  const isTrustWallet = (ethereum: any) => {
    // Identify if Trust Wallet injected provider is present.
    const trustWallet = !!ethereum.isTrust;

    return trustWallet;
  };

  const injectedProviderExist =
    typeof window !== "undefined" && typeof (window as any).ethereum !== "undefined";

  if (!injectedProviderExist) {
    return null;
  }
  const eth = (window as any).ethereum

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
    w3mConnectors({
      chains,
      projectId
    })[0]
  ],
  publicClient,
})

export const ethereumClient = new EthereumClient(wagmiConfig, chains)