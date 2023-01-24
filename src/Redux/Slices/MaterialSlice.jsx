import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMaterial = createAsyncThunk("postBoardSlice/async", async (data) => {
  console.log('data: ', data);
  console.log('postMaterial 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/list/self',
          headers: { 
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTE4MjQxNDA1ODc4MzUwNzk2MDM4IiwiaWQiOjIyLCJpYXQiOjE2NzQ0ODQ2MzAsImV4cCI6MTY3NzA3NjYzMH0.CcOYuhqs5GlyFozTZfc2WjzX1qFNvErwqtfYb9VeCZM',
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('material redux axios error: ', error);
          return undefined
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        order: 'need'
    }
}

export const materialSlice = createSlice({
    name: 'materialSlice',
    initialState,
    reducers: {
    //   setMarterialRefresh:(state, action)=>{
    //     state.refresh.subcategory = action.payload.subcategory;
    //   }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMaterial.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.materialSlice.data;

export const { setMaterialRefresh } = materialSlice.actions;

export default materialSlice.reducer