import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postHashTag = createAsyncThunk("postHashTagSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/needs/brand/hashtag',
          data : data
      });
      if(response.data == ''){ return '0'; }else return response.data;
      }catch(error){
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      needsId: 1
    }
}

export const hashTagSlice = createSlice({
    name: 'hashTagSlice',
    initialState,
    reducers: {
      setHashTagRefresh:(state, action)=>{
        state.refresh.subcategory = action.payload.subcategory;
      },
    },
    extraReducers: (bulider) => {
      bulider.addCase(postHashTag.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.hashTagSlice.data;

export const { setHashTagRefresh } = hashTagSlice.actions;

export default hashTagSlice.reducer