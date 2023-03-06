import { client } from '@/components/ApolloClient'
import { GET_TICKET_OWNER_ID_QUERY } from '@/graphql/query/getTicketOwnerId'
import { SERVER_URL } from '@/utils/constants_admin'
import axios from 'axios'

export const GET_TICKET_OWNER_ID = async (id: string) => {
  const { data } = await client.query({
    query: GET_TICKET_OWNER_ID_QUERY,
    variables: {
      id,
    },
  })

  return data
}
export const getTickedIdFormat = (tokenId, contractAddress) => {
  return `ticket-${contractAddress}-${tokenId}`
}

export const sendTokenIdToServer = async (data) => {
  const res = await axios
    .post(`${SERVER_URL}/verifyTicket`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response
    })
    .catch((err) => {
      return err
    })
  console.log(res)
  return res
}
