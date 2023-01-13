import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postGovernment = createAsyncThunk("postGovernmentSlice/async", async (data) => {
  console.log('postGovernment 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/benefits/list',
          data : data
      });
      return response.data;
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
        console.log('카운트');
        console.log('state: ', state);
        console.log('action: ', action);
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