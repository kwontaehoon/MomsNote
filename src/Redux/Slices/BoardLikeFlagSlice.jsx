import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postBoardLikeFlag = createAsyncThunk("postBoardLikeFlagSlice/async", async (data) => {
  console.log('postBoardLikeFlag 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1OTE0OTIsImV4cCI6MTY3NDE4MzQ5Mn0.d8GpqvEmnnrUZKumuL4OPzp7wSGXiTo47hGkCSM2HO0', 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/board/recommend/flag',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('boardLikeFlag axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      boardId: 0,
    }
}

export const boardLikeFlagSlice = createSlice({
    name: 'boardLikeFlagSlice',
    initialState,
    reducers: {
      setBoardLikeFlagSliceRefresh:(state, action)=>{
        state.refresh.boardId = action.payload.boardId;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postBoardLikeFlag.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardLikeFlagSlice.data;

export const { setBoardLikeFlagSliceRefresh } = boardLikeFlagSlice.actions;
export const { setBoardLikeFlagSliceCount } = boardLikeFlagSlice.actions;

export default boardLikeFlagSlice.reducer