import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postBoardCount = createAsyncThunk("postBoardCountSlice/async", async (data) => {
  console.log('postBoardCount 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/board/count',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('boardCount axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      subcategory: '전체'
    }
}

export const boardCountSlice = createSlice({
    name: 'boardCountSlice',
    initialState,
    reducers: {
        setBoardCountRefresh:(state, action)=>{
            console.log('카테고리');
            state.refresh.subcategory = action.payload.subcategory;
        },
    },
    extraReducers: (bulider) => {
      bulider.addCase(postBoardCount.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardCountSlice.data;

export const { setBoardCountRefresh } = boardCountSlice.actions;

export default boardCountSlice.reducer