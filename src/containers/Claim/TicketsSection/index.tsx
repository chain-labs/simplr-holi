import If from '@/components/If'
import { useAuth } from '@arcana/auth-react'
import { ArrowCycle, GoogleFill } from 'akar-icons'
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import LoggedIn from './LoggedIn'

const TicketsSection = () => {
  const auth = useAuth()
  const [loggingIn, setLoggingIn] = useState(false)
  const [initial, setInitial] = useState(true)

  const handleConnect = async (e) => {
    e.preventDefault()
    setInitial(false)
    setLoggingIn(true)
    await auth.loginWithSocial('google')
  }

  useEffect(() => {
    if (!auth.loading) {
      auth.logout()
    }
  }, [auth.loading])
  if (auth.loading) {
    return (
      <div className="mt-48 flex h-full w-full items-center justify-center ">
        <div className="h-16 w-16">
          <Spinner />
        </div>
      </div>
    )
  }

  if (auth.isLoggedIn) {
    return <LoggedIn />
  } else
    return (
      <div className="flex h-3/4 flex-1 flex-col items-center justify-center">
        <div className="mb-6 text-xl font-semibold text-black">
          Login to continue
        </div>
        <button
          className="flex items-center gap-x-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white disabled:bg-gray-500"
          onClick={handleConnect}
          disabled={loggingIn}
        >
          <If
            condition={!loggingIn}
            then={
              <React.Fragment>
                <GoogleFill />
                Login with Google
              </React.Fragment>
            }
            else={
              <React.Fragment>
                <div className="animate-spin-slow">
                  <ArrowCycle strokeWidth={2} size={18} />
                </div>
                Signing In
              </React.Fragment>
            }
          />
        </button>
      </div>
    )
}

export default TicketsSection
