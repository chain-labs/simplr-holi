import React, { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { toast } from 'react-hot-toast'
import { setStep } from '@/redux/verify'
import { STATIC_PASSWORD } from '@/utils/constants'
import { STEPS } from '../constants'
import { ethers } from 'ethers'
import { EyeOpen, EyeSlashed } from 'akar-icons'

const Login = () => {
  const [passwordType, setPasswordType] = useState('password')

  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(password))
    const passwordHash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(STATIC_PASSWORD),
    )
    if (hash === passwordHash) {
      console.log({ loginMessage: 'Hash is valid' })
      toast('login Successfull')
      changeStep()
    } else {
      toast('Invalid Password')
      setPassword('')
    }
  }

  const changeStep = () => {
    dispatch(setStep(STEPS.QRSCAN))
  }

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    }
    setPasswordType('password')
  }
  return (
    <div className="w-screen p-10">
      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 "
        >
          Enter Password
        </label>
        <div className="relative">
          <input
            type={passwordType}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            required
          ></input>
          <button
            className="absolute top-0 right-0 rounded-r-lg border border-gray-300  p-1.5 text-sm font-medium text-white"
            onClick={togglePassword}
          >
            {passwordType === 'password' ? (
              <EyeSlashed strokeWidth={2} size={28} color="gray" />
            ) : (
              <EyeOpen strokeWidth={2} size={28} color="gray" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        onClick={handleLogin}
        className="w-full rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 "
      >
        Submit
      </button>
    </div>
  )
}

export default Login
