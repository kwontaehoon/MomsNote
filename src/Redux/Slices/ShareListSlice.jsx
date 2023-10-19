import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postShareList = createAsyncThunk("postShareList/async", async (data) => {
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
    //   setMarterialRefresh:(state, action)=>{
    //     state.refresh.subcategory = action.payload.subcategory;
    //   }
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

export default shareListSlice.reducer