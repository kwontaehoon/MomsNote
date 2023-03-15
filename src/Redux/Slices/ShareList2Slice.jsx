import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postShareList2 = createAsyncThunk("postShareList2/async", async (data) => {
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

export const shareList2Slice = createSlice({
    name: 'shareListSlice',
    initialState,
    reducers: {
    //   setMarterialRefresh:(state, action)=>{
    //     state.refresh.subcategory = action.payload.subcategory;
    //   }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postShareList2.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.shareList2Slice.data;

export const { setShareList2Refresh } = shareList2Slice.actions;

export default shareList2Slice.reducer