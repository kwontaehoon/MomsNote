import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postCommentFlag = createAsyncThunk("postCommentFlagSlice/async", async (data) => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/comments/recommend/flag',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('commentFlag axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const commentFlagSlice = createSlice({
    name: 'commentFlagSlice',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(postCommentFlag.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.commentFlag.data;

export default commentFlagSlice.reducer