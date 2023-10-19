import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postApplyInfo = createAsyncThunk("postApplyInfoSlice/async", async () => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'get',
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/user/moreInfo',
      });
      if(response.data == ''){ return '0' }else return response.data.data;
      }catch(error){
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const applyInfoSlice = createSlice({
    name: 'applyInfoSlice',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(postApplyInfo.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.applyInfoSlice.data;

export default applyInfoSlice.reducer