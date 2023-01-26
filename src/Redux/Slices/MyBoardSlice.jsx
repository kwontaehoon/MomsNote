import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postMyBoard = createAsyncThunk("postMyBoardSlice/async", async (data) => {
  console.log('postMyBoard 업데이트됨');
  console.log('data: ', data);
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/board/myboard',
          headers: { 
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('myBoard axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const myBoardSlice = createSlice({
    name: 'myBoardSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyBoard.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myBoardSlice.data;

export default myBoardSlice.reducer