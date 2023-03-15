import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postBoardAppFlag = createAsyncThunk("postBoardSlice/async", async (data) => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/application/flag',
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('BoardAppFlag axios error: ', error);
          return 400;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const boardAppFlagSlice = createSlice({
    name: 'boardAppFlagSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postBoardAppFlag.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardAppFlagSlice.data;

export default boardAppFlagSlice.reducer