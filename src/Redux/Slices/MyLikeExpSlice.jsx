import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMyLikeExp = createAsyncThunk("postMyLikeExpSlice/async", async () => {
  console.log('postMyLikeExp 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/recexp',
          headers: { 
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE2MDM5ODIsImV4cCI6MTY3NDE5NTk4Mn0.K1jXhYIK_ucAjyvP7Tv_ga9FTJcv_4odEjK8KBmmdo8', 
            'Content-Type': 'application/json'
          },
          data : {}
      });
      return response.data;
      }catch(error){
          console.log('myLikeExp axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const myLikeExpSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyLikeExp.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myLikeExpSlice.data;

export default myLikeExpSlice.reducer