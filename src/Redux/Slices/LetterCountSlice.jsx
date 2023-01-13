import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postLetterCount = createAsyncThunk("postLetterCountSlice/async", async () => {
  console.log('postLetterCount 업데이트됨');
    try{
      const response = await axios({
          method: 'get',
          url: 'https://momsnote.net/api/letter/count',

      });
      return response.data;
      }catch(error){
          console.log('letterCount axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const letterCountSlice = createSlice({
    name: 'letterCountSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postLetterCount.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.eventCountSlice.data;

export default letterCountSlice.reducer