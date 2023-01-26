import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postMyComment = createAsyncThunk("postMyCommentSlice/async", async (data) => {
  console.log('postMyComment 업데이트됨');
  console.log('data: ', data);
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/comments/mycomments',
          headers: { 
            'Authorization': `bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('myComment axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      count: 1,
      page: 1
    }
}

export const myCommentSlice = createSlice({
    name: 'myCommentSlice',
    initialState,
    reducers: {
      setMyCommentCount:(state, action)=>{
        console.log('카운트');
        console.log('state: ', state);
        console.log('action: ', action);
        state.refresh.page = action.payload.page;
        state.refresh.count = action.payload.count;
      },
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyComment.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myCommentSlice.data;

export const { setMyCommentCount } = myCommentSlice.actions;

export default myCommentSlice.reducer