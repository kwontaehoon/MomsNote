import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postDdayToday = createAsyncThunk("postDdayTodaySlice/async", async (data) => {
  console.log('postDdayToday 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/letter/list',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('ddayToday axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        subcategory: '1주'
    }
}

export const ddayTodaySlice = createSlice({
    name: 'ddayTodaySlice',
    initialState,
    reducers: {
      setDdayTodayRefresh:(state, action)=>{
        console.log('refresh 카운트');
        console.log('refresh state: ', state);
        state.refresh.subcategory = action.payload.subcategory;
      },
    },
    extraReducers: (bulider) => {
      bulider.addCase(postDdayToday.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.ddayTodaySlice.data;

export const { setDdayTodayRefresh } = ddayTodaySlice.actions;
export const { setDdayTodayCount } = ddayTodaySlice.actions;

export default ddayTodaySlice.reducer