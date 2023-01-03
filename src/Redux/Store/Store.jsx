import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Slices/CounterSlice'
import boardReducer from '../Slices/BoardSlice'
import commentReducer from '../Slices/CommentSlice'
import materialReducer from '../Slices/MaterialSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
    comment: commentReducer,
    material: materialReducer,
  },
})