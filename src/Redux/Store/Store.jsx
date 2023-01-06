import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Slices/CounterSlice'
import boardReducer from '../Slices/BoardSlice'
import commentReducer from '../Slices/CommentSlice'
import materialReducer from '../Slices/MaterialSlice'
import commentFlagReducer from '../Slices/CommentFlag'
import commentRecommendReducer from '../Slices/CommentRecommendSlice'
import shareListReducer from '../Slices/ShareList'
import materialPopularSlice from '../Slices/MaterialPopularSlice'
import boardPopularSlice from '../Slices/BoardPopularSlice'
import infoPopularSlice from '../Slices/InfoPopularSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
    comment: commentReducer,
    material: materialReducer,
    commentFlag: commentFlagReducer,
    commentRecommend: commentRecommendReducer,
    shareList: shareListReducer,
    materialPopularSlice: materialPopularSlice,
    boardPopularSlice: boardPopularSlice,
    infoPopularSlice: infoPopularSlice
  },
})