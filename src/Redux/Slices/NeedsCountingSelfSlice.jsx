import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postNeedsCountingSelf = createAsyncThunk("postNeedsCountingSelfSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/counting',
          data: data
      });
      if(response.data == ''){ return '0'; }else return response.data;
      }catch(error){
          console.log('Self axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const needsCountingSelfSlice = createSlice({
    name: 'needsCountingSelfSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postNeedsCountingSelf.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.needsCountingSelfSlice.data;

export default needsCountingSelfSlice.reducer