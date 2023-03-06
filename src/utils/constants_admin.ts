export const SUBGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_SUBGRAPH_ENDPOINT
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_LOCAL_URL
export const CHAIN_NETWORK = process.env.NEXT_PUBLIC_CHAIN_NETWORK
export const CONTRACT_ADDRESS = `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`

const toBoolean = (condition: string) => {
  if (condition?.toLowerCase() === 'true') {
    return true
  } else if (condition?.toLowerCase() === 'false') {
    return false
  } else {
    return false
  }
}

export const TEST_ENV = toBoolean(process.env.NEXT_PUBLIC_TEST_NETWORK)
export const getNetwork = () => {
  return TEST_ENV ? 'mumbai' : 'polygon'
}

export const NETWORK: string = getNetwork()

export const getChain = () => {
  switch (NETWORK) {
    case 'mumbai':
      return '80001'
    case 'polygon':
      return '137'
  }
}

export const CHAIN_ID: string = getChain()

export const getEtherscanUrl = () => {
  switch (getChain()) {
    case '80001':
      return `https://mumbai.polygonscan.com/address/${CONTRACT_ADDRESS}`
    case '137':
      return `https://polygonscan.com/address/${CONTRACT_ADDRESS}`
  }
}

export const SIMPLR_LOGO_URL =
  'https://ik.imagekit.io/chainlabs/Simplr_Collection_Dapp/simplr_logo_RASw5d0WR.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1676550226736'
