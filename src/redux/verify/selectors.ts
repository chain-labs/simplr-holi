import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '../store'

export const selectVerify = (state: AppState) => state.verify

export const verifySelector = createSelector(selectVerify, (state) => state)
