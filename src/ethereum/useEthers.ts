/* eslint-disable no-console */
import { UseEthersResult } from './types'
import { useProvider, useSigner } from 'wagmi'

const useEthers = (): UseEthersResult => {
  const provider = useProvider()
  const { data: signer } = useSigner()

  return [provider, signer]
}

export default useEthers
