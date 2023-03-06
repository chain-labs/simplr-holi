import React from 'react'
import {
  ARCANA_APP_ADDRESS,
  EVENT_LOGO,
  EVENT_URL,
  getNetwork,
  LOGO_URL,
  TEST_NETWORK,
  TOKEN_NAME,
} from '@/utils/constants'
import Image from 'next/image'
import TicketClaimSection from './TicketClaimSection'
import { QueryProps } from './types'
import { ProvideAuth } from '@arcana/auth-react'
import { AuthProvider } from '@arcana/auth'
import If from '@/components/If'
import TicketsSection from './TicketsSection'

const provider = new AuthProvider(`${ARCANA_APP_ADDRESS}`, {
  position: 'right',
  theme: 'light',
  alwaysVisible: true,
  network: TEST_NETWORK ? 'testnet' : 'mainnet',
  chainConfig: {
    chainId: getNetwork().chainIdHex,
    rpcUrl: '',
  },
})

const checkQuery = (query: QueryProps): boolean => {
  const { lastname, firstname, emailid, eventname, batchid } = query
  if (lastname && firstname && emailid && eventname && batchid) return true
  else return false
}

const ClaimComponent = ({ query }: { query: QueryProps }) => {
  return (
    <div
      className={`
      flex
      min-h-screen
      w-screen
      flex-col
      bg-slate-200
      `}
    >
      <ProvideAuth provider={provider}>
        <div className="flex flex-1 flex-col pb-6">
          <div className="container flex items-center justify-between bg-white py-1 px-1 shadow-md sm:px-8 sm:py-2">
            <a
              className="relative h-6 w-28 overflow-x-visible sm:h-8"
              href="https://simplrhq.com"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={LOGO_URL}
                fill
                alt="logo image"
                style={{ objectFit: 'contain' }}
              />
            </a>
            <a href={EVENT_URL} target="_blank" rel="noreferrer">
              <div className="relative h-16 w-28 overflow-x-visible sm:h-16">
                <Image
                  src={EVENT_LOGO}
                  fill
                  alt="event image"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </a>
          </div>
          <div className="container mt-4 flex flex-1 flex-col border-l-4 border-l-emerald-400 bg-white pb-12 shadow-md">
            <div className="container px-4 py-6">
              <If
                condition={checkQuery(query)}
                then={
                  <h1 className="text-center text-3xl font-bold text-black">
                    Time to seize your digital bragging rights!
                  </h1>
                }
                else={
                  <h1 className="text-center text-5xl font-bold text-black">
                    Claim {TOKEN_NAME}
                  </h1>
                }
              />
            </div>
            <If
              condition={checkQuery(query)}
              then={<TicketClaimSection query={query} />}
              else={<TicketsSection />}
            />
          </div>
        </div>
      </ProvideAuth>
    </div>
  )
}

export default ClaimComponent
