import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postInfoPopularSlice = createAsyncThunk("postInfoPopularSlice/async", async () => {
  console.log('postInfoPopularSlice 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/eventboard/best',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : {}
      });
      return response.data;
      }catch(error){
          console.log('InfoPopularSlice redux axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const infoPopularSlice = createSlice({
    name: 'infoPopularSlice',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(postInfoPopularSlice.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.infoPopularSlice.data;

export default infoPopularSlice.reducer