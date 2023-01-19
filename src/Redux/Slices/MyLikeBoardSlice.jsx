import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMyLikeBoard = createAsyncThunk("postMyLikeBoardSlice/async", async () => {
  console.log('postMyLikeBoard 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/rectalk',
          headers: { 
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE2MDM5ODIsImV4cCI6MTY3NDE5NTk4Mn0.K1jXhYIK_ucAjyvP7Tv_ga9FTJcv_4odEjK8KBmmdo8', 
            'Content-Type': 'application/json'
          },
          data : {}
      });
      return response.data;
      }catch(error){
          console.log('myLikeBoard axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const myLikeBoardSlice = createSlice({
    name: 'myLikeBoardSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyLikeBoard.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myLikeBoardSlice.data;

export default myLikeBoardSlice.reducer