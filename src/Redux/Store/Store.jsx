import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Slices/CounterSlice'
import boardReducer from '../Slices/BoardSlice'
import commentReducer from '../Slices/CommentSlice'
import materialReducer from '../Slices/MaterialSlice'
import materialSelfReducer from '../Slices/MaterialSelfSlice'
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
import materialShareReducer from '../Slices/MaterialShareSlice'
import winListReducer from '../Slices/WinListSlice'
import boardCountReducer from '../Slices/BoardCountSlice'
import eventCountReducer from '../Slices/EventCountSlice'
import experienceCountReducer from '../Slices/ExperienceCountSlice'
import guideCountReducer from '../Slices/GuideCountSlice'
import letterCountReducer from '../Slices/LetterCountSlice'
import periodCountReducer from '../Slices/PeriodCountSlice'
import materialShareCountReducer from '../Slices/MaterialShareCountSlice'
import governmentCountReducer from '../Slices/GovernmentCountSlice'
import hitsReducer from '../Slices/HitsSlice'
import MyBoardReducer from '../Slices/MyBoardSlice'
import MyCommentReducer from '../Slices/MyCommentSlice'
import MyCommentCountReducer from '../Slices/MyCommentCountSlice'
import MyExpReducer from '../Slices/MyExpSlice'
import MaterialSearchReducer from '../Slices/MaterialSearchSlice'
import MyLikeBoardReducer from '../Slices/MyLikeBoardSlice'
import MyLikeListReducer from '../Slices/MyLikeListSlice'
import MyLikeExpReducer from '../Slices/MyLikeExpSlice'
import DdayTodayReducer from '../Slices/DdayTodaySlice'
import DdayTermReducer from '../Slices/DdayTermSlice'
import ListPopularReducer from '../Slices/ListPopularSlice'
import AlarmReducer from '../Slices/AlarmSlice'
import UserReducer from '../Slices/UserSlice'
import QnaReducer from '../Slices/QnaSlice'
import HashTagReducer from '../Slices/HashTagSlice'
import NeedsCountingReducer from '../Slices/NeedsCountingSlice'
import NeedsCountingSelfReducer from '../Slices/NeedsCountingSelfSlice'
import ApplyInfoReducer from '../Slices/ApplyInfoSlice'



export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
    comment: commentReducer,
    material: materialReducer,
    materialSelf: materialSelfReducer,
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
    materialShare: materialShareReducer,
    winList: winListReducer,
    boardCount: boardCountReducer,
    eventCount: eventCountReducer,
    experienceCount: experienceCountReducer,
    guideCount: guideCountReducer,
    letterCount: letterCountReducer,
    periodCount: periodCountReducer,
    materialShareCount: materialShareCountReducer,
    governmentCount: governmentCountReducer,
    hits: hitsReducer,
    myBoard: MyBoardReducer,
    myComment: MyCommentReducer,
    myCommentCount: MyCommentCountReducer,
    myExp: MyExpReducer,
    materialSearch: MaterialSearchReducer,
    myLikeBoard: MyLikeBoardReducer,
    myLikeList: MyLikeListReducer,
    myLikeExp: MyLikeExpReducer,
    ddayToday: DdayTodayReducer,
    ddayTerm: DdayTermReducer,
    ListPopular: ListPopularReducer,
    alarm: AlarmReducer,
    user: UserReducer,
    qna: QnaReducer,
    hashTag: HashTagReducer,
    needsCounting: NeedsCountingReducer,
    needsCountingSelf: NeedsCountingSelfReducer,
    applyInfo: ApplyInfoReducer
  },
})