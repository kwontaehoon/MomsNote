import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postListPopular = createAsyncThunk("postListPopularSlice/async", async () => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/best',
          data: {}
      });
      return response.data;
      }catch(error){
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const listPopularSlice = createSlice({
    name: 'listPopularSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postListPopular.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.eventSlice.data;

export default listPopularSlice.reducer