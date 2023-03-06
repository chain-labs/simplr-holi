import Wagmi from '../../components/Wagmi'
import React from 'react'
import { wrapper } from '@/redux/store'
import Navbar from '@/components/Navbar'
import AdminComp from '@/containers/admin'

const AdminPage = () => {
  return (
    <Wagmi>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-white p-5 font-bold text-black">
        <AdminComp />
      </div>
    </Wagmi>
  )
}

export default wrapper.withRedux(AdminPage)
