import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postPeriodCount = createAsyncThunk("postPeriodCountSlice/async", async () => {
    try{
      const response = await axios({
          method: 'get',
          url: 'https://momsnote.net/api/period/count',

      });
      return response.data;
      }catch(error){
          console.log('periodCount axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const periodCountSlice = createSlice({
    name: 'periodCountSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postPeriodCount.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.periodCountSlice.data;

export default periodCountSlice.reducer