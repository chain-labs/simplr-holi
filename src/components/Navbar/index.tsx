import { SIMPLR_LOGO_URL } from '@/utils/constants_admin'
import React from 'react'
import ConnectWallet from './ConnectWallet'

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 z-20 w-full border-gray-200 bg-white px-8 py-4 shadow-md  sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <a href="https://simplrhq.com" target="_blank" rel="noreferrer">
              <img
                src={SIMPLR_LOGO_URL}
                className="mr-3 h-6 sm:h-9"
                alt="Simplr Logo"
              ></img>
            </a>
          </div>
          <div className="flex md:order-2">
            <ConnectWallet />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
