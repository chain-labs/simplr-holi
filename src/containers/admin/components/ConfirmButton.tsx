import If from '@/components/If'
import { getContractDetails } from '@/ethereum/useCustomContract'
import {
  addKey,
  batchSelector,
  incrementBatchId,
  removeBatch,
} from '@/redux/batch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { userSelector } from '@/redux/user'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useProvider, useSigner } from 'wagmi'
import {
  getHashes,
  getMerkleTreeRoot,
  GET_ALLOWED_MINTERS,
  sendDataToIPFS,
  sendDataToServer,
} from '../utils'
import toast from 'react-hot-toast'
import ConnectWallet from '@/components/Navbar/ConnectWallet'
import { CONTRACT_ADDRESS } from '@/utils/constants_admin'
import { EVENT_NAME } from '@/utils/constants'

const ConfirmButton = () => {
  const provider = useProvider()
  const [contract, setContract] = useState<ethers.Contract>()
  const [loading, setLoading] = useState<boolean>(false)
  const user = useAppSelector(userSelector)
  const id = CONTRACT_ADDRESS
  const contractName = 'Event'
  const { data: signer } = useSigner()
  const userInputHashes = []
  const batch = useAppSelector(batchSelector)
  const dispatch = useAppDispatch()
  const [allowed, setAllowed] = useState<boolean>(false)
  const [mailSent, setMailSent] = useState<number>(0)
  const MAX_SIZE_USERS_ALLOWED = 25

  useEffect(() => {
    if (id && provider && contractName) {
      const abi = getContractDetails()
      const contract = new ethers.Contract(id, abi, signer)
      setContract(contract)
    }
  }, [id, provider, contractName, signer])

  useEffect(() => {
    if (user.exists) {
      GET_ALLOWED_MINTERS().then((data) => {
        data.minters.map((minter) => {
          if (minter.address.address === user.address.toLowerCase()) {
            setAllowed(true)
          }
        })
      })
    }
  }, [user])

  const addExcelInputData = async () => {
    setLoading(true)
    const num = batch.batchId
    handleHashes(num)
  }

  const handleHashes = async (nextBatchId) => {
    console.log(nextBatchId)

    await batch?.inputParams?.map(async (data) => {
      const dataExample = {
        firstname: data.firstName,
        lastname: data.lastName,
        emailid: data.email,
        batchid: nextBatchId.toString(),
        eventname: 'Vivacity 2023',
      }
      getHashes(dataExample).then((res) => userInputHashes.push(res))
    })
    const cid = await sendDataToIPFS(userInputHashes)
    const merkleRoot = await getMerkleTreeRoot(userInputHashes)
    await addBatchToContract(merkleRoot, cid, nextBatchId)
  }

  //The function addSubBatch takes a specified length of subArray of whole batch and nectBatchId and add it to server
  // subBatch here is subarray of a batch having length <= MAX_SIZE_USERS_ALLOWED
  const addSubBatch = async (subBatch, nextBatchId) => {
    const serverData = {
      inputParams: subBatch,
      batchId: nextBatchId.toString(),
      eventName: EVENT_NAME,
      contractAddress: CONTRACT_ADDRESS,
      addBatchTimestamp: Date.now(),
    }
    console.log(serverData)
    const response = await sendDataToServer(serverData)
    if (response.status == 200) {
      return 200
    } else {
      return 201
    }
  }

  const addBatchToContract = async (root, cid, nextBatchId) => {
    console.log('Inputs:', 'merkleRoot:', root, 'cid:', cid)
    contract
      ?.connect(signer)
      ?.addBatch(root, cid, { value: 0 })
      .then(async (res) => {
        console.log(res)
        dispatch(incrementBatchId())
        setLoading(false)
        setTimeout(removeCurrentBatch, 3000)
        setLoading(true)
        const totalUser = batch.inputParams.length
        if (totalUser > MAX_SIZE_USERS_ALLOWED) {
          let subBatch
          let subBatchStatus
          const noOfSubBatches = Math.floor(totalUser / MAX_SIZE_USERS_ALLOWED)
          for (let i = 0; i <= noOfSubBatches; i++) {
            if (
              i === noOfSubBatches &&
              totalUser % MAX_SIZE_USERS_ALLOWED !== 0
            ) {
              subBatch = batch.inputParams.slice(
                i * MAX_SIZE_USERS_ALLOWED,
                totalUser,
              )
              subBatchStatus = await addSubBatch(subBatch, nextBatchId)
              if (subBatchStatus === 201) {
                break
              }
              setMailSent(totalUser)
            } else if (i !== noOfSubBatches) {
              subBatch = batch.inputParams.slice(
                i * MAX_SIZE_USERS_ALLOWED,
                (i + 1) * MAX_SIZE_USERS_ALLOWED,
              )
              subBatchStatus = await addSubBatch(subBatch, nextBatchId)
              if (subBatchStatus === 201) {
                break
              }
              setMailSent((i + 1) * MAX_SIZE_USERS_ALLOWED)
            } else {
              break
            }
            setLoading(false)
          }
          if (subBatchStatus === 200) {
            toast(`🎉 Succesfully added batch #${nextBatchId}`)
          } else {
            toast(`❌ Something went wrong! Please Try Again`)
          }
        } else {
          const serverData = {
            inputParams: batch.inputParams,
            batchId: nextBatchId.toString(),
            eventName: EVENT_NAME,
            contractAddress: CONTRACT_ADDRESS,
            addBatchTimestamp: Date.now(),
          }
          const response = await sendDataToServer(serverData)
          if (response.status !== 200) {
            toast(`❌ Something went wrong! Please Try Again`)
          } else {
            toast(`🎉 Succesfully added batch #${nextBatchId}`)
          }
        }
      })
      .catch((err) => {
        toast(`❌ Something went wrong! Please Try Again`)
        setLoading(false)
      })
  }

  const removeCurrentBatch = () => {
    dispatch(addKey())
    dispatch(removeBatch())
  }

  return (
    <div>
      <If
        condition={user.exists && batch.inputParams.length !== 0}
        then={
          <div>
            <button
              type="button"
              onClick={
                !loading && user.exists ? () => addExcelInputData() : () => ''
              }
              disabled={!allowed || loading}
              className={`disabled:hover:empty: mr-2 rounded-lg bg-violet-700 px-5 py-3 text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 disabled:cursor-not-allowed`}
            >
              {loading
                ? `Loading ${mailSent}/${batch.inputParams.length} mails sent`
                : `Add Data to Batch #${batch.batchId}`}
            </button>
          </div>
        }
      />
      <If condition={!user.exists} then={<ConnectWallet />} />
    </div>
  )
}

export default ConfirmButton
