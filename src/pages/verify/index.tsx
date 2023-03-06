import Navbar from '@/components/Navbar'
import Wagmi from '@/components/Wagmi'
import VerifyComp from '@/containers/verify'
import { wrapper } from '@/redux/store'
import React from 'react'

const VerifyPage = () => {
  return (
    <Wagmi>
      <div className="flex min-h-screen items-center  bg-white  font-bold text-black">
        <Navbar />
        <div className="w-100 bg-white">
          <VerifyComp />
        </div>
      </div>
    </Wagmi>
  )
}

export default wrapper.withRedux(VerifyPage)
