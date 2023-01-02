import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Slices/CounterSlice'
import boardReducer from '../Slices/BoardSlice'
import commentReducer from '../Slices/CommentSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
    comment: commentReducer,
  },
})