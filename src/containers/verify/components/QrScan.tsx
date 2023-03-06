import If from '@/components/If'
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import Animation from './Animation'
import Modal from './Modal'
import {
  getTickedIdFormat,
  GET_TICKET_OWNER_ID,
  sendTokenIdToServer,
} from '../utils'
import { ethers } from 'ethers'
import { ERRORS } from '../constants'

const QrScan = () => {
  const [mode, setMode] = useState('environment')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)
  const [errorOccured, setErrorOcurred] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  //This functions gets the data scanned from QR code and pass to check validity of owner
  //If owner is valid data is sent to server and token's validity is checked
  const handleQrCodeData = async (result) => {
    const qrCodeData = JSON.parse(result)
    const signerAddress = ethers.utils.verifyMessage(
      qrCodeData.message,
      qrCodeData.signature,
    )
    console.log({ signerAddressOfQrCodeData: signerAddress })
    const isOwner = await checkIfSignerAddressIsOwnerOfTokenId(
      qrCodeData.tokenId,
      qrCodeData.contractAddress.toLowerCase(),
      signerAddress,
    )
    if (isOwner) {
      const body = {
        accountAddress: signerAddress,
        tokenId: qrCodeData.tokenId,
        contractAddress: qrCodeData.contractAddress,
        redeemedTimestamp: Date.now(),
      }

      //sending data to server
      const serverResponse = await sendTokenIdToServer(body)
      console.log(serverResponse)
      if (serverResponse) {
        handleCloseScan()
        setErrorOcurred(!serverResponse.data.success)
        setSuccessMessage(serverResponse.data.data.message)
        setShowModal(true)
      } else {
        const dataNotSent = true
        setErrorOcurred(dataNotSent)
        setError(ERRORS.unknownError)
      }
    } else {
      const ownerNotValid = true
      setErrorOcurred(ownerNotValid)
      setError(ERRORS.OwnerNotValid)
      setShowModal(true)
    }
    setLoadingScan(false)
  }

  //pass tokenId,contractAddress and signerAddress to check if owner is valid
  //This function fetches owner id from subgraph and check owner's validity
  const checkIfSignerAddressIsOwnerOfTokenId = async (
    tokenId,
    contractAddress,
    signerAddress,
  ) => {
    const id = await getTickedIdFormat(tokenId, contractAddress)
    const data = await GET_TICKET_OWNER_ID(id)
    return data.ticket.holder.address.id === signerAddress.toLowerCase()
  }

  //This function closes the camera
  const handleCloseScan = async () => {
    setStartScan(false)
    try {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => {
            track.stop()
          })
        })
        .catch((err) => {
          console.log('getUserMedia() error', error)
        })
    } catch (e) {
      console.log(e)
    }
  }

  //Close the modal
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <div className="w-screen bg-white ">
        <div className="flex-row items-center justify-center">
          <div className="flex-row items-center justify-center"></div>
        </div>
        <If
          condition={startScan}
          then={
            <div className="w-full">
              <QrReader
                constraints={{ facingMode: mode }}
                scanDelay={2000}
                onResult={(result, error) => {
                  if (result) {
                    handleQrCodeData(result)
                  }
                  if (error) {
                    console.info(error)
                  }
                }}
              />
            </div>
          }
        />
      </div>
      <div className="w-screen flex-row items-center justify-center p-10">
        {loadingScan && <p>Loading</p>}
        <button
          onClick={() => {
            setStartScan(true)
          }}
          className="flex w-full items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
        >
          {startScan ? <Animation /> : ''}
          {startScan ? 'Scanning' : 'Start Scan'}
        </button>{' '}
        <If
          condition={startScan}
          then={
            <button
              onClick={() => {
                handleCloseScan()
              }}
              className="mt-5 flex w-full items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
            >
              Stop Scan
            </button>
          }
        />
        {showModal && (
          <Modal
            onCancel={handleCloseModal}
            errorPresent={errorOccured}
            error={error}
            message={successMessage}
            setStartScan={setStartScan}
          />
        )}
      </div>
    </div>
  )
}

export default QrScan
