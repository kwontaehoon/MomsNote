import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postGuideCount = createAsyncThunk("postGuideCountSlice/async", async (data) => {
  console.log('postGuideCount 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/guideboard/count',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('guideCount axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      subcategory: '전체'
    }
}

export const guideCountSlice = createSlice({
    name: 'guideSlice',
    initialState,
    reducers: {
      setGuideCountRefresh:(state, action)=>{
        state.refresh.subcategory = action.payload.subcategory;
      },
    },
    extraReducers: (bulider) => {
      bulider.addCase(postGuideCount.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.guideCountSlice.data;

export const { setGuideCountRefresh } = guideCountSlice.actions;

export default guideCountSlice.reducer