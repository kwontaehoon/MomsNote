import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postDdayTerm = createAsyncThunk("postDdayTermSlice/async", async (data) => {
  console.log('postDdayToday 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/period/list',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('ddayTerm axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        subcategory: '1주'
    }
}

export const ddayTermSlice = createSlice({
    name: 'ddayTermSlice',
    initialState,
    reducers: {
      setDdayTermRefresh:(state, action)=>{
        console.log('refresh 카운트');
        console.log('refresh state: ', state);
        state.refresh.subcategory = action.payload.subcategory;
      },
    },
    extraReducers: (bulider) => {
      bulider.addCase(postDdayTerm.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.ddayTermSlice.data;

export const { setDdayTermRefresh } = ddayTermSlice.actions;

export default ddayTermSlice.reducer