import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postComment = createAsyncThunk("postCommentSlice/async", async (data) => {
  console.log('postComment 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/comments/list',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('comment axios error: ', error);
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const commentSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(postComment.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.commentSlice.data;

export default commentSlice.reducer