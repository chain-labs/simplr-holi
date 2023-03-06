/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers'
import { useEffect } from 'react'
import { ProviderProps, SignerProps } from './types'

declare let window: any

const useListeners = (
  provider: ProviderProps,
  setProvider: (arg0: ProviderProps) => void,
  setSigner: (arg0: SignerProps) => void,
): void => {
  useEffect(() => {
    if (provider?.provider) {
      window?.ethereum?.on('accountsChanged', async (accounts) => {
        if (provider) {
          setSigner(provider?.getSigner())
        }
      })
      window?.ethereum?.on('chainChanged', async (chainId) => {
        const PROVIDER = new ethers.providers.Web3Provider(
          window.ethereum,
          'any',
        )
        setProvider(PROVIDER)
      })
    }
  }, [provider])
}

export default useListeners
