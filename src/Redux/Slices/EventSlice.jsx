import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postEvent = createAsyncThunk("postEventSlice/async", async (data) => {
  console.log('postEvent 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/eventboard/list',
          data : data
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
        start: '2022-12',
        end: '2022-12'
    }
}

export const eventSlice = createSlice({
    name: 'eventSlice',
    initialState,
    reducers: {
      setEventRefresh:(state, action)=>{
        console.log('카테고리');
        state.refresh.subcategory = action.payload.subcategory;
      },
      setEventCount:(state, action)=>{
        console.log('카운트');
        console.log('state: ', state);
        console.log('action: ', action);
        state.refresh.page = action.payload.page;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postEvent.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.eventSlice.data;

export const { setEventRefresh } = eventSlice.actions;
export const { setEventCount } = eventSlice.actions;

export default eventSlice.reducer