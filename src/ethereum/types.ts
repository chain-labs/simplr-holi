import { Provider, Signer } from '@wagmi/core'
import { ethers } from 'ethers'

export interface ProviderProps
  extends ethers.providers.JsonRpcProvider,
    ethers.providers.Web3Provider {}
export type SignerProps = ethers.providers.JsonRpcSigner

export interface UseListenersProps {
  provider: ProviderProps
  setProvider: (provider: ProviderProps) => void
  setSigner: (signer: SignerProps) => void
}

export type UseEthersResult = [Provider, Signer]
export type UseSignerResult = [SignerProps, (signer: SignerProps) => void]
