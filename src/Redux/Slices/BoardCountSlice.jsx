import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postBoardCount = createAsyncThunk("postBoardCountSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/board/count',
          data : data
      });
      return response.data;
      }catch(error){
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