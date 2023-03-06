import { TEST_ENV } from '@/utils/constants_admin'
import { createReducer } from '@reduxjs/toolkit'
import {
  disconnect,
  // setApolloClient
  setNetwork,
} from './actions'
import { NetworkState } from './types'

const initialState: NetworkState = {
  isOnline: false,
  isValid: true,
  chainId: null,
  name: '',
  unit: '',
  apolloClient: null,
  //   subgraphUrl: GOERLI_SUBGRAPH_ENDPOINT,
}

export const networkReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setNetwork, (state, action) => {
      const { chainId, name } = action.payload
      const newState = {
        ...state,
        chainId,
        name,
        unit: getUnit(chainId),
        isOnline: true,
        isValid: checkValidNetwork(chainId),
      }
      return newState
    })
    // .addCase(setApolloClient, (state, action) => {
    // 	const { apolloClient, subgraphUrl } = action.payload;
    // 	const newState = {
    // 		...state,
    // 		apolloClient,
    // 		subgraphUrl,
    // 	};
    // 	return newState;
    // })
    .addCase(disconnect, (state) => {
      return { ...initialState, subgraphUrl: state.subgraphUrl }
    })
})

const getUnit = (chainId: number): string => {
  switch (chainId) {
    case 1:
    case 4:
    case 5:
      return 'ETH'
    case 137:
    case 80001:
      return 'MATIC'
  }
}

const checkValidNetwork = (chainId: number): boolean => {
  if (TEST_ENV) {
    switch (chainId) {
      case 5:
      case 80001:
        return true
      default:
        return false
    }
  } else {
    switch (chainId) {
      case 1:
      case 137:
        return true
      default:
        return false
    }
  }
}
