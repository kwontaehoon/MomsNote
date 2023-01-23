import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postExperience = createAsyncThunk("postExperienceSlice/async", async (data) => {
  console.log('postExperience 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/exp',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('experience axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        order: 'new',
        count: 5,
        page: 1,
    }
}

export const experienceSlice = createSlice({
    name: 'experienceSlice',
    initialState,
    reducers: {
      setExperienceCount:(state, action)=>{
        state.refresh.count = action.payload.count;
        state.refresh.page = action.payload.page;
      },
      setExperienceFilter:(state, action)=>{
        state.refresh.order = action.payload.filter;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postExperience.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.experienceSlice.data;

export const { setExperienceCount } = experienceSlice.actions;
export const { setExperienceFilter } = experienceSlice.actions; 

export default experienceSlice.reducer