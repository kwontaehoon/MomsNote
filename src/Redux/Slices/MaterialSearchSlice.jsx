import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postMaterialSearch = createAsyncThunk("postMaterialSearchSlice/async", async (data) => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/needs/list',
          headers: { 
            'Authorization': `bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('materialSearch redux axios error: ', error);
          return undefined
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        keyword: ''
    }
}

export const materialSearchSlice = createSlice({
    name: 'materialSearchSlice',
    initialState,
    reducers: {
      setMarterialSearchRefresh:(state, action)=>{
        state.refresh.keyword = action.payload.keyword;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMaterialSearch.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.materialSearchSlice.data;

export const { setMaterialSearchRefresh } = materialSearchSlice.actions;

export default materialSearchSlice.reducer