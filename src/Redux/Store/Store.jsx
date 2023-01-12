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
import experienceReducer from '../Slices/ExperienceSlice'
import guideReducer from '../Slices/GuideSlice'
import eventReducer from '../Slices/EventSlice'
import governmentReducer from '../Slices/Government'
import boardLikeFlagReducer from '../Slices/BoardLikeFlagSlice'
import boardLikeReducer from '../Slices/BoardLikeSlice'
import boardAppFlagReducer from '../Slices/BoardAppFlagSlice'
import boardAppReducer from '../Slices/BoardApp'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
    comment: commentReducer,
    material: materialReducer,
    commentFlag: commentFlagReducer,
    commentRecommend: commentRecommendReducer,
    shareList: shareListReducer,
    materialPopular: materialPopularReducer,
    boardPopular: boardPopularReducer,
    infoPopular: infoPopularReducer,
    experience: experienceReducer,
    guide: guideReducer,
    event: eventReducer,
    government: governmentReducer,
    boardLikeFlag: boardLikeFlagReducer,
    boardLike: boardLikeReducer,
    boardAppFlag: boardAppFlagReducer,
    boardApp: boardAppReducer,
  },
})