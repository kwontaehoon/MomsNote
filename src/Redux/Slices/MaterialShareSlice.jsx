import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMaterialShare = createAsyncThunk("postMaterialShareSlice/async", async (data) => {
  console.log('postMaterialShare 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/share/board',
          data : data
      });
      if(response.data == ''){ return '0'; }else return response.data;
      }catch(error){
          console.log('MaterialShare axios error: ', error);
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
        console.log('카운트');
        console.log('state: ', state);
        console.log('action: ', action);
        state.refresh.page = action.payload.page;
        state.refresh.count = action.payload.count;
      },
      setMaterialShareFilter:(state, action)=>{
        console.log('필터링');
        console.log('state: ', state);
        console.log('action: ', action);
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