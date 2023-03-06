import { createReducer } from '@reduxjs/toolkit'

import { setStep } from './actions'

export type verifyState = {
  step: number
}

const initialState: verifyState = {
  step: 0,
}

export const verifyReducer = createReducer(initialState, (builder) => {
  builder.addCase(setStep, (state, action) => {
    state.step = action.payload
  })
})
