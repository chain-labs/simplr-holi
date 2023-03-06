import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { batchReducer } from './batch'
import { verifyReducer } from './verify'
import { networkReducer } from './network'
import { userReducer } from './user/reducers'

const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      batch: batchReducer,
      verify: verifyReducer,
      network: networkReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>

export type AppState = ReturnType<AppStore['getState']>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper<AppStore>(makeStore)
