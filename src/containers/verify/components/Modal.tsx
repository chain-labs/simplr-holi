import If from '@/components/If'
import { TriangleAlertFill, CircleCheckFill } from 'akar-icons'
import React, { Fragment, useEffect } from 'react'
import Portal from './Portal'

interface props {
  onCancel: () => void
  errorPresent: boolean
  error: string
  message: string
  setStartScan: (any) => void
}

const Modal = ({
  onCancel,
  errorPresent,
  error,
  message,
  setStartScan,
}: props) => {
  const handleScan = () => {
    setStartScan(true)
    onCancel()
  }
  return (
    <Fragment>
      <div onClick={onCancel} className="fixed inset-0 bg-black opacity-50" />
      <Portal className="modal-portal">
        <div className="relative mx-5 px-4 md:flex md:items-center md:justify-center">
          <div className="inset-0 z-10 bg-black opacity-25" />
          <div className="md:max-sm: fixed inset-x-0 bottom-0 z-50 mb-4 rounded-lg bg-white p-4  md:mx-auto md:max-w-md">
            <div className="flex-row items-center justify-center">
              <div className="flex items-center justify-center ">
                <If
                  condition={errorPresent}
                  then={
                    <TriangleAlertFill strokeWidth={2} size={36} color="red" />
                  }
                  else={
                    <CircleCheckFill strokeWidth={2} size={36} color="green" />
                  }
                />
              </div>
              <div className="mt-4 text-center md:mt-0 md:text-left">
                <p className="mt-2 text-center font-bold text-gray-700">
                  {errorPresent ? 'Invalid' : 'Valid'}
                </p>
                <p className="mt-1 text-center text-sm text-gray-700">
                  {' '}
                  {errorPresent ? error : message}
                </p>
              </div>
            </div>
            <div className="mt-4 text-center md:flex md:justify-end md:text-right">
              <If
                condition={errorPresent}
                then={
                  <div>
                    <button
                      onClick={handleScan}
                      className="mt-2 flex w-full items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
                    >
                      Scan Again
                    </button>
                    <button
                      className="mt-2 flex w-full items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
                      onClick={onCancel}
                    >
                      Close
                    </button>
                  </div>
                }
                else={
                  <button
                    className="mt-2 flex w-full items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
                    onClick={onCancel}
                  >
                    Close
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </Portal>
    </Fragment>
  )
}

export default Modal
