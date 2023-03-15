import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postNeedsCounting = createAsyncThunk("postNeedsCountingSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/counting',
          data: data
      });
      if(response.data == ''){ return '0'; }else return response.data;
      }catch(error){
          console.log('myExp axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const needsCountingSlice = createSlice({
    name: 'needsCountingSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postNeedsCounting.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.needsCountingSlice.data;

export default needsCountingSlice.reducer