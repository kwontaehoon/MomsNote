import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Slices/CounterSlice'
import boardReducer from '../Slices/BoardSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
  },
})