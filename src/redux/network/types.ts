import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export interface NetworkState {
  isOnline?: boolean
  isValid?: boolean
  chainId?: number
  name?: string
  unit?: string
  apolloClient?: ApolloClient<NormalizedCacheObject>
  subgraphUrl?: string
}
