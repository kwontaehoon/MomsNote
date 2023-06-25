import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postGuide = createAsyncThunk("postGuideSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/guideboard/list',
          data : data
      });
      console.log('맘스가이드 response ', response);
      if(response.data == ''){ return '0'; }else return response.data;
      }catch(error){
          console.log('guide axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      count: 1,
      page: 1,
      subcategory: '전체'
    }
}

export const guideSlice = createSlice({
    name: 'guideSlice',
    initialState,
    reducers: {
      setGuideRefresh:(state, action)=>{
        state.refresh.subcategory = action.payload.subcategory;
      },
      setGuideCount:(state, action)=>{
        state.refresh.page = action.payload.page;
        state.refresh.count = action.payload.count;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postGuide.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.guideSlice.data;

export const { setGuideRefresh } = guideSlice.actions;
export const { setGuideCount } = guideSlice.actions;

export default guideSlice.reducer