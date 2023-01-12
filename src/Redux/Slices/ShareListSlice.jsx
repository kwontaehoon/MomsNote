import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postShareList = createAsyncThunk("postShareList/async", async (data) => {
  console.log('postShareList 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/read/board',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('shareList redux axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        'boardId': null
    }
}

export const shareListSlice = createSlice({
    name: 'shareListSlice',
    initialState,
    reducers: {
      setShareListFilter:(state, action)=>{
        console.log('필터링');
        console.log('state: ', state);
        console.log('action: ', action);
        state.refresh.order = action.payload.filter;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postShareList.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.shareListSlice.data;

export const { setShareListRefresh } = shareListSlice.actions;
export const { setShareListFilter } = shareListSlice.actions;

export default shareListSlice.reducer