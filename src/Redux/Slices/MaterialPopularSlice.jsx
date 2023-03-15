import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMaterialPopularSlice = createAsyncThunk("postMaterialPopularSlice/async", async () => {
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/best',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : {}
      });
      if(response.data == ''){ return '0' }else return response.data
;      }catch(error){
          console.log('MaterialPopularSlice redux axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const materialPopularSlice = createSlice({
    name: 'materialPopularSlice',
    initialState,
    reducers: {
    //   setMarterialRefresh:(state, action)=>{
    //     state.refresh.subcategory = action.payload.subcategory;
    //   }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMaterialPopularSlice.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.materialPopularSlice.data;

export default materialPopularSlice.reducer