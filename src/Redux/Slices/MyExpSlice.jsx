import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMyExp = createAsyncThunk("postMyExpSlice/async", async (data) => {
  console.log('postMyExp 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/application/myexp',
          headers: { 
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE2MDM5ODIsImV4cCI6MTY3NDE5NTk4Mn0.K1jXhYIK_ucAjyvP7Tv_ga9FTJcv_4odEjK8KBmmdo8', 
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('myExp axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const myExpSlice = createSlice({
    name: 'myExpSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyExp.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myExpSlice.data;

export default myExpSlice.reducer