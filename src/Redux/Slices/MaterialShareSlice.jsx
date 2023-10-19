import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMaterialShare = createAsyncThunk("postMaterialShareSlice/async", async (data) => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/share/board',
          data : data
      });
      if(response.data == ''){ return '0'; }else return response.data;
      }catch(error){
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      order: 'new',
      count: 1,
      page: 1,
    }
}

export const materialShareSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
      setMaterialShareCount:(state, action)=>{
        state.refresh.page = action.payload.page;
        state.refresh.count = action.payload.count;
      },
      setMaterialShareFilter:(state, action)=>{
        state.refresh.order = action.payload.filter;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMaterialShare.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.materialShareSlice.data;

export const { setMaterialShareCount } = materialShareSlice.actions;
export const { setMaterialShareFilter } = materialShareSlice.actions;

export default materialShareSlice.reducer