import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postMyLikeBoard = createAsyncThunk("postMyLikeBoardSlice/async", async () => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/rectalk',
          headers: { 
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data : {}
      });
      if(response.data == ''){return '0';}else return response.data;
      }catch(error){
          console.log('myLikeBoard axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const myLikeBoardSlice = createSlice({
    name: 'myLikeBoardSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyLikeBoard.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myLikeBoardSlice.data;

export default myLikeBoardSlice.reducer