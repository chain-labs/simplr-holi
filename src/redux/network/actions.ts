import { createAction } from '@reduxjs/toolkit'

export const setNetwork = createAction<{ chainId: number; name: string }>(
  'network/SET_NETWORK',
)

// export const setApolloClient = createAction<{ apolloClient: ApolloClient<NormalizedCacheObject>; subgraphUrl: string }>(
// 	'network/SET_APOLLO_CLIENT'
// );

export const disconnect = createAction('network/DISCONNECT')
