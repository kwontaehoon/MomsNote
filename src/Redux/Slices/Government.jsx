import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postGovernment = createAsyncThunk("postGovernmentSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/benefits/list',
          data : data
      });
      console.log('행사정보 response @@: ', response);
      if(response.data == ''){ return '0'; }else return response.data;
      }catch(error){
          console.log('government axios error: ', error);
      }
      
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      count: 1,
      page: 1
    }
}

export const governmentSlice = createSlice({
    name: 'governmentSlice',
    initialState,
    reducers: {
      setGovernmentCount:(state, action)=>{
        state.refresh.page = action.payload.page;
        state.refresh.count = action.payload.count;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postGovernment.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.governmentSlice.data;

export const { setGovernmentCount } = governmentSlice.actions;

export default governmentSlice.reducer