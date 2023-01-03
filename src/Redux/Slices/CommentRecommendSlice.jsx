import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postCommentRecommend = createAsyncThunk("postCommentRecommendSlice/async", async (data) => {
  console.log('postCommentRecommend 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/comments/recommend',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('commentRecommend axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const commentRecommendSlice = createSlice({
    name: 'commentRecommendSlice',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(postCommentRecommend.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.commentRecommendSlice.data;

export default commentRecommendSlice.reducer