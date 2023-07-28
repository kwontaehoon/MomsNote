import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postGuideCount = createAsyncThunk("postGuideCountSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/guideboard/count',
          data : data
      });
      console.log('@@@ response DATA: ', response.data);
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
        console.log('state: ', state.refresh);
        console.log('action: ', action.payload.subcategory);
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