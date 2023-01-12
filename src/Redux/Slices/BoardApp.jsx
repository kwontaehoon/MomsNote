import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// 신청유무
export const postBoardApp = createAsyncThunk("postBoardAppSlice/async", async (data) => {
  console.log('postBoardApp 업데이트됨');
  console.log('data: ', data);
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1MjMyMDMsImV4cCI6MTY3NDExNTIwM30.dv8l7-7MWKAPpc9kXwxxgUSy84pz_7gvpsJPpa4TX0M', 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/application/flag',
          data : data
      });
      return response.data;
      }catch(error){
          console.log('boardApp axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      experienceId: 1
    }
}

export const boardAppSlice = createSlice({
    name: 'boardAppSlice',
    initialState,
    reducers: {
      setBoardAppSliceRefresh:(state, action)=>{
        state.refresh.boardId = action.payload.boardId;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postBoardApp.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardAppSlice.data;

export const { setBoardAppSliceRefresh } = boardAppSlice.actions;
export const { setBoardAppSliceCount } = boardAppSlice.actions;

export default boardAppSlice.reducer