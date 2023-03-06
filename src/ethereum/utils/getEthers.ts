/* eslint-disable no-console */
// use this file to connect with metamask or with some JSON RPC
import { ethers } from 'ethers'

// To expose ethereum to the window object
declare let window: any

export interface IEthers {
  provider: ethers.providers.Provider | ethers.providers.JsonRpcProvider
  ethers: any
}

const getEthers = (): Promise<IEthers> =>
  new Promise((resolve, reject) => {
    try {
      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          'any',
        )
        window.ethereum.enable()
        resolve({ provider, ethers })
      } catch (error) {
        const provider = ethers.getDefaultProvider('rinkeby')
        console.log('No web3 instance injected, using rinkeby web3.')
        resolve({ provider, ethers })
      }
    } catch (error) {
      alert(error.message)
      reject(error.message)
    }
  })

export default getEthers
