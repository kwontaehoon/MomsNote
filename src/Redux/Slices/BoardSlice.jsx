import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postBoard = createAsyncThunk("postBoardSlice/async", async (data) => {
  console.log('postBoard 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/board/list',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('board axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      order: 'new',
      count: 1,
      page: 1,
      subcategory: '전체'
    }
}

export const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
      // subcategory:(state, action)=>{
      //   console.log('subcategory: ', action);
      //   state.subcategory = action.payload;
      // }
      setBoardRefresh:(state, action)=>{
        state.refresh.subcategory = action.payload.subcategory;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postBoard.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardSlice.data;

export const { setBoardRefresh } = boardSlice.actions;

export default boardSlice.reducer