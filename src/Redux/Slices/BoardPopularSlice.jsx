import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postBoardPopularSlice = createAsyncThunk("postBoardPopularSlice/async", async () => {
  console.log('postBoardPopularSlice 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/board/best',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : {}
      });
      return response.data;
      }catch(error){
          console.log('BoardPopularSlice redux axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const boardPopularSlice = createSlice({
    name: 'boardPopularSlice',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(postBoardPopularSlice.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardPopularSlice.data;

export default boardPopularSlice.reducer