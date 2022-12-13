import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Slices/CounterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})