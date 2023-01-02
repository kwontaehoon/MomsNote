import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getBoard = createAsyncThunk("counterSlice/async", async () => {
  console.log('getBoard 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/board/list',
          data : { 
            order: 'new',
            count: 5,
            page: 1,
            subcategory: '전체'
          }
      });
      console.log('Redux 게시판: ', response.data);
      return response.data;
      }catch(error){
          console.log('comment axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(getBoard.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardSlice.data;

export default boardSlice.reducer