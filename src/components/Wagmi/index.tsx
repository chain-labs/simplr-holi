import React from 'react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { useAppSelector } from 'src/redux/hooks'
import { userSelector } from 'src/redux/user'

export const ALCHEMY_API = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

interface props {
  children?: React.ReactNode
}

const Wagmi = ({ children }: props) => {
  const user = useAppSelector(userSelector)
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygonMumbai, chain.polygon, chain.goerli],
    [alchemyProvider({ apiKey: ALCHEMY_API, priority: 0 })],
  )

  const { connectors } = getDefaultWallets({
    appName: 'Simplr Events',
    chains,
  })

  const wagmiClient = createClient({
    autoConnect: user.exists ? true : false,
    connectors,
    provider,
  })
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Wagmi
