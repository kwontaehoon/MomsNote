import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMaterialShareCount = createAsyncThunk("postMaterialShareCountSlice/async", async () => {
  console.log('postMaterialShareCount 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/count',
          data: {}
      });
      return response.data;
      }catch(error){
          console.log('materialShareCount axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const materialShareCountSlice = createSlice({
    name: 'materialShareCountSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMaterialShareCount.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.materialShareCountSlice.data;

export default materialShareCountSlice.reducer