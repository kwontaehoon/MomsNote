import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Slices/CounterSlice'
import boardReducer from '../Slices/BoardSlice'
import commentReducer from '../Slices/CommentSlice'
import materialReducer from '../Slices/MaterialSlice'
import commentFlagReducer from '../Slices/CommentFlag'
import commentRecommendReducer from '../Slices/CommentRecommendSlice'
import shareListReducer from '../Slices/ShareListSlice'
import materialPopularReducer from '../Slices/MaterialPopularSlice'
import boardPopularReducer from '../Slices/BoardPopularSlice'
import infoPopularReducer from '../Slices/InfoPopularSlice'
import shareList2Reducer from '../Slices/ShareList2Slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
    comment: commentReducer,
    material: materialReducer,
    commentFlag: commentFlagReducer,
    commentRecommend: commentRecommendReducer,
    shareList: shareListReducer,
    shareList2: shareList2Reducer,
    materialPopularSlice: materialPopularReducer,
    boardPopularSlice: boardPopularReducer,
    infoPopularSlice: infoPopularReducer,
    
  },
})