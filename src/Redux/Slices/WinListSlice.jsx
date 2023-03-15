import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postWinList = createAsyncThunk("postWinListSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/application/selection',
          data : { experienceId: 3 }
      });
      return response.data;
      }catch(error){
          console.log('winList axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        experienceId: 1
    }
}

export const winListSlice = createSlice({
    name: 'winListSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postWinList.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.winListSlice.data;

export default winListSlice.reducer