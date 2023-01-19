import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMyComment = createAsyncThunk("postMyCommentSlice/async", async (data) => {
  console.log('postMyComment 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/comments/mycomments',
          headers: { 
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE2MDM5ODIsImV4cCI6MTY3NDE5NTk4Mn0.K1jXhYIK_ucAjyvP7Tv_ga9FTJcv_4odEjK8KBmmdo8', 
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('myComment axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const myCommentSlice = createSlice({
    name: 'myCommentSlice',
    initialState,
    reducers: {
      setMyCommentCount:(state, action)=>{
        console.log('카운트');
        console.log('state: ', state);
        console.log('action: ', action);
        state.refresh.page = action.payload.page;
        state.refresh.count = action.payload.count;
      },
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyComment.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myCommentSlice.data;

export const { setMyCommentCount } = myCommentSlice.actions;

export default myCommentSlice.reducer