import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postMyLikeExp = createAsyncThunk("postMyLikeExpSlice/async", async () => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/recexp',
          headers: { 
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data : {}
      });
      if(response.data == ''){return '0';}else return response.data;
      }catch(error){
          console.log('myLikeExp axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const myLikeExpSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyLikeExp.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myLikeExpSlice.data;

export default myLikeExpSlice.reducer