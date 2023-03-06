/* eslint-disable no-console */
import { getChain } from '@/utils/constants_admin'
import { ethers, providers } from 'ethers'
import { useEffect, useState } from 'react'
import contracts from '../contracts.json'
import { ProviderProps } from './types'

export const getContractDetails = () => {
  const network = contracts[getChain()]
  const contractDetails =
    network[Object.keys(network)[0]].contracts.SimplrEvents

  return contractDetails.abi
}

const useCustomContract = (
  contractName: string,
  contractAddress: string,
  provider: ProviderProps,
): any => {
  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (providers.Provider.isProvider(provider) && contractAddress) {
      try {
        const abi = getContractDetails()
        setContract(new ethers.Contract(contractAddress, abi, provider))
      } catch (error) {
        setContract(undefined)
        console.log('Error at useCustomContract', error)
        return error.message
      }
    }
  }, [provider])

  return contract
}

export default useCustomContract
