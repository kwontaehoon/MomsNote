import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postHits = createAsyncThunk("postHitsSlice/async", async (data) => {
  console.log('postHits 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/board/hits',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('hits axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const hitsSlice = createSlice({
    name: 'hitsSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postHits.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.hitsSlice.data;

export default hitsSlice.reducer