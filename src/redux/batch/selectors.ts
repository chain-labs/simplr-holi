import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '../store'

export const selectBatch = (state: AppState) => state.batch

export const batchSelector = createSelector(selectBatch, (state) => state)
