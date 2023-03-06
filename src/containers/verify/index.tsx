import React, { useEffect, useState } from 'react'
import QrScan from './components/QrScan'
import Login from './components/Login'
import { useAppSelector } from '@/redux/hooks'
import { verifySelector } from '@/redux/verify'
import If from '@/components/If'
import { Toaster } from 'react-hot-toast'

const VerifyComp = () => {
  const verify = useAppSelector(verifySelector)

  return (
    <div>
      <Toaster position="top-center" />

      <If condition={verify.step === 1} then={<QrScan />} else={<Login />} />
    </div>
  )
}

export default VerifyComp
