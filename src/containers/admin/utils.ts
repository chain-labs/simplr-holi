import { ethers } from 'ethers'
import { QueryProps } from './types'
import axios from 'axios'
import { GET_CURRENT_BATCH_ID_QUERY } from '@/graphql/query/getCurrentBatchId'
import { client } from '@/components/ApolloClient'
import MerkleTree from 'merkletreejs'
import { keccak256 } from 'ethers/lib/utils'
import { GET_ALLOWED_MINTERS_QUERY } from '@/graphql/query/getAllowedMinters'
import { SERVER_URL } from '@/utils/constants_admin'

const PINATA_KEY_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET
const PINATA_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_URL = 'https://api.pinata.cloud/'

export const getHashes = async (query: QueryProps) => {
  console.log(query.batchid)
  const { firstname, lastname, batchid, eventname, emailid } = query
  const concatenatedString = `${emailid}-${lastname}-${firstname}-${batchid}-${eventname}`
  const hash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(concatenatedString),
  )
  return hash
}

export const GET_CURRENT_BATCH_ID = async () => {
  const { data } = await client.query({
    query: GET_CURRENT_BATCH_ID_QUERY,
  })

  return data
}
export const GET_ALLOWED_MINTERS = async () => {
  const { data } = await client.query({
    query: GET_ALLOWED_MINTERS_QUERY,
  })
  return data
}

export const sendDataToIPFS = async (hashedData) => {
  const data = JSON.stringify(hashedData)
  console.log(data)

  const cid = await axios
    .post(`${PINATA_URL}pinning/pinJSONToIPFS`, data, {
      headers: {
        pinata_api_key: PINATA_KEY,
        pinata_secret_api_key: PINATA_KEY_SECRET,
      },
    })
    .then(function (response) {
      console.log('Hash:', response.data.IpfsHash)
      return response.data.IpfsHash
    })
    .catch(function (error) {
      console.log(error)
    })
  return cid
}

export const getMerkleTreeRoot = async (hashes) => {
  const leafs = hashes.map((entry) => ethers.utils.keccak256(entry))
  const tree = await new MerkleTree(leafs, keccak256, { sortPairs: true })
  const MerkleRoot = '0x' + tree.getRoot().toString('hex')
  return MerkleRoot
}

export const sendDataToServer = async (data) => {
  const res = await axios
    .post(`${SERVER_URL}/addBatch`, data, {
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
