import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// 신청유무
export const postBoardApp = createAsyncThunk("postBoardAppSlice/async", async (data) => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/application/flag',
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