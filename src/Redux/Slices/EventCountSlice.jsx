import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postEventCount = createAsyncThunk("postEventCountSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/eventboard/count',
          data: data

      });
      return response.data;
      }catch(error){
          console.log('event axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        page: 1,
        count: 1,
        start: '2023-08',
        end: '2023-08'
    }
}

export const eventCountSlice = createSlice({
    name: 'eventCountSlice',
    initialState,
    reducers: {
        setBoardCountRefresh:(state, action)=>{
            state.refresh.start = action.payload.start;
            state.refresh.end = action.payload.end;
        },
    },
    extraReducers: (bulider) => {
      bulider.addCase(postEventCount.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.eventCountSlice.data;

export default eventCountSlice.reducer