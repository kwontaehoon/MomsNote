import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postBoardLike = createAsyncThunk("postBoardLikeSlice/async", async (data) => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/board/recommend',
          data : data
      });
      return response.data;
      }catch(error){
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