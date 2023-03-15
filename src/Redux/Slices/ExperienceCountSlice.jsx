import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postExperienceCount = createAsyncThunk("postExperienceCountSlice/async", async () => {
    try{
      const response = await axios({
          method: 'get',
          url: 'https://momsnote.net/exp/count',

      });
      return response.data;
      }catch(error){
          console.log('experienceCount axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const experienceCountSlice = createSlice({
    name: 'experienceCountSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postExperienceCount.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.experienceCountSlice.data;

export default experienceCountSlice.reducer