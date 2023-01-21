import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// 신청유무
export const postBoardAppFlag = createAsyncThunk("postBoardAppFlagSlice/async", async (data) => {
  console.log('postBoardAppFlag 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzM0MDk1NzQsImV4cCI6MTY3NjAwMTU3NH0.dZiHR7Lx_rnecyM176jTqTzvGAP1oW2kFYTa-PieiGI', 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/application/flag',
          data : data
      });
      console.log('response: ', response.data);
      return response.data;
      }catch(error){
          console.log('boardAppFlag axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      experienceId: 1
    }
}

export const boardAppFlagSlice = createSlice({
    name: 'boardAppFlagSlice',
    initialState,
    reducers: {
      setBoardAppFlagSliceRefresh:(state, action)=>{
        state.refresh.boardId = action.payload.boardId;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postBoardAppFlag.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardAppFlagSlice.data;

export const { setBoardAppFlagSliceRefresh } = boardAppFlagSlice.actions;
export const { setBoardAppFlagSliceCount } = boardAppFlagSlice.actions;

export default boardAppFlagSlice.reducer