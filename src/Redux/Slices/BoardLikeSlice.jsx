import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postBoardLike = createAsyncThunk("postBoardLikeSlice/async", async (data) => {
  console.log('postBoardLike 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1MjMyMDMsImV4cCI6MTY3NDExNTIwM30.dv8l7-7MWKAPpc9kXwxxgUSy84pz_7gvpsJPpa4TX0M', 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/board/recommend',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('boardLike axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      boardId: 0,
    }
}

export const boardLikeSlice = createSlice({
    name: 'boardLikeSlice',
    initialState,
    reducers: {
      setBoardLikeSliceRefresh:(state, action)=>{
        state.refresh.boardId = action.payload.boardId;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postBoardLike.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardLikeFlagSlice.data;

export const { setBoardLikeSliceRefresh } = boardLikeSlice.actions;
export const { setBoardLikeSliceCount } = boardLikeSlice.actions;

export default boardLikeSlice.reducer