import ClaimComponent from '@/containers/Claim'
import { QueryProps } from '@/containers/Claim/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ClaimPage = () => {
  const router = useRouter()
  const [query, setQuery] = useState<QueryProps>({
    firstname: '',
    lastname: '',
    eventname: '',
    batchid: '',
    emailid: '',
  })

  useEffect(() => {
    const query = router.query

    if (query) {
      setQuery({
        firstname: query.firstname as string,
        lastname: query.lastname as string,
        emailid: query.emailid as string,
        batchid: query.batchid as string,
        eventname: query.eventname as string,
      })
    }
  }, [router.query])

  return <ClaimComponent query={query} />
}

export default ClaimPage
