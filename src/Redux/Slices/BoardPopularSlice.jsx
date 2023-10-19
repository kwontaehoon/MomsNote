import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postBoardPopular = createAsyncThunk("postBoardPopularSlice/async", async () => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/board/best',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : {}
      });
      if(response.data == ''){ return '0' }else return response.data;
      }catch(error){
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const boardPopularSlice = createSlice({
    name: 'boardPopularSlice',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(postBoardPopular.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardPopularSlice.data;

export default boardPopularSlice.reducer