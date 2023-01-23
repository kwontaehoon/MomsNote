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
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTEwMjMzNjUxNDU4NzIyMTkzNDQzIiwiaWQiOjE2LCJpYXQiOjE2NzQxMTQ1OTEsImV4cCI6MTY3NjcwNjU5MX0.hZMjy_VUb7bhikdDhYUDZefBZ3g1nODH8VpMmtYpS_w',
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