import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postBoard = createAsyncThunk("postBoardSlice/async", async (data) => {
  console.log('@@ data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/board/list',
          data : data
      });
      if(response.data == ''){ return '0'; }else return response.data;
      }catch(error){
          console.log('board axios error: ', error);
          return undefined;
      }
});



const initialState = {
    loading: false,
    data: [],
    refresh: {
      order: 'new',
      count: 5,
      page: 1,
      subcategory: '전체'
    }
}

export const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
      setBoardRefresh:(state, action)=>{
        state.refresh.subcategory = action.payload.subcategory;
      },
      setBoardCount:(state, action)=>{
        state.refresh.page = action.payload.page;
        state.refresh.count = action.payload.count;
      },
      setBoardFilter:(state, action)=>{
        state.refresh.order = action.payload.filter;
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
export const { setBoardCount } = boardSlice.actions;
export const { setBoardFilter } = boardSlice.actions;

export default boardSlice.reducer