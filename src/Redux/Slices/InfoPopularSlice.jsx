import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postInfoPopularSlice = createAsyncThunk("postInfoPopularSlice/async", async () => {
    try{
      const response = await axios({
          method: 'get',
          url: 'https://momsnote.net/api/eventboard/best',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : {}
      });
      // console.log('infoPopularSlice data: ', response.data);
      if(response.data == ''){ return '0' }else return response.data;
      }catch(error){
          // console.log('InfoPopularSlice redux axios error: ', error.response);
          return undefined;
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