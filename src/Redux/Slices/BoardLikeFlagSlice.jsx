import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postBoardLikeFlag = createAsyncThunk("postBoardLikeFlagSlice/async", async (data) => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/board/recommend/flag',
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

export const boardLikeFlagSlice = createSlice({
    name: 'boardLikeFlagSlice',
    initialState,
    reducers: {
      setBoardLikeFlagSliceRefresh:(state, action)=>{
        state.refresh.boardId = action.payload.boardId;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postBoardLikeFlag.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardLikeFlagSlice.data;

export const { setBoardLikeFlagSliceRefresh } = boardLikeFlagSlice.actions;
export const { setBoardLikeFlagSliceCount } = boardLikeFlagSlice.actions;

export default boardLikeFlagSlice.reducer