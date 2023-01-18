import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMaterialSearch = createAsyncThunk("postMaterialSearchSlice/async", async (data) => {
  console.log('data: ', data);
  console.log('postMaterialSearch 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/needs/list',
          headers: { 
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzIxMzQ3OTQsImV4cCI6MTY3NDcyNjc5NH0.mWpz6urUmqTP138MEO8_7WcgaNcG2VkX4ZmrjU8qESo', 
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('materialSearch redux axios error: ', error);
          return undefined
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        keyword: ''
    }
}

export const materialSearchSlice = createSlice({
    name: 'materialSearchSlice',
    initialState,
    reducers: {
      setMarterialSearchRefresh:(state, action)=>{
        console.log('state: ', state);
        console.log('action: ', action);
        state.refresh.keyword = action.payload.keyword;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMaterialSearch.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.materialSearchSlice.data;

export const { setMaterialSearchRefresh } = materialSearchSlice.actions;

export default materialSearchSlice.reducer