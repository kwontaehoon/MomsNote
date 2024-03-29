import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMyCommentCount = createAsyncThunk("postMyCommentCountSlice/async", async () => {
    try{
      const response = await axios({
          method: 'get',
          url: 'https://momsnote.net/exp/count',

      });
      return response.data;
      }catch(error){
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const myCommentCountSlice = createSlice({
    name: 'myCommentCountSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyCommentCount.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myCommentCountSlice.data;

export default myCommentCountSlice.reducer