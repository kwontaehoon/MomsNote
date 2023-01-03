import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postCommentFlag = createAsyncThunk("postCommentFlagSlice/async", async (data) => {
  console.log('postCommentFlag 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1MjMyMDMsImV4cCI6MTY3NDExNTIwM30.dv8l7-7MWKAPpc9kXwxxgUSy84pz_7gvpsJPpa4TX0M', 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/comments/recommend/flag',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('commentFlag axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const commentFlagSlice = createSlice({
    name: 'commentFlagSlice',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(postCommentFlag.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.commentFlag.data;

export default commentFlagSlice.reducer