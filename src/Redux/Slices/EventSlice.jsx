import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import moment from 'moment';

export const postEvent = createAsyncThunk("postEventSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/eventboard/list',
          data : data
      });
      if(response.data == ''){ return '0'; }else return response.data;
      }catch(error){
          console.log('event axios error: ', error);
      }
});

let arr = moment().format('M')-1;
if(arr-9 < 0){ arr = '0' + (arr+1); } else arr += 1;

const initialState = {
    loading: false,
    data: [],
    refresh: {
        page: 1,
        count: 1,
        date: `${new Date().getFullYear()}-${arr}`,
    }
}

export const eventSlice = createSlice({
    name: 'eventSlice',
    initialState,
    reducers: {
      setEventRefresh:(state, action)=>{
        state.refresh.date = action.payload.date;
        state.refresh.count = action.payload.count;
      },
      setEventCount:(state, action)=>{
        state.refresh.page = action.payload.page;
        state.refresh.count = action.payload.count;
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