import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postComment = createAsyncThunk("postCommentSlice/async", async (data) => {
  console.log('postComment 업데이트됨', data);
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
    refresh: {
      count: 1,
      page: 1,
      boardId: 1
    }
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
      setCommentRefresh:(state, action)=>{
        state.refresh.boardId = action.payload.boardId;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postComment.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.commentSlice.data;

export const { setCommentRefresh } = commentSlice.actions;

export default commentSlice.reducer