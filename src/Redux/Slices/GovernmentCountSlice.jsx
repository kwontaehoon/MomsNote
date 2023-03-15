

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postGovernmentCount = createAsyncThunk("postGovernmentCountSlice/async", async () => {
    try{
      const response = await axios({
          method: 'get',
          url: 'https://momsnote.net/api/benefits/count',

      });
      return response.data;
      }catch(error){
          console.log('governmentCount axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const governmentCountSlice = createSlice({
    name: 'governmentCountSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postGovernmentCount.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.GovernmentCountSlice.data;

export default governmentCountSlice.reducer