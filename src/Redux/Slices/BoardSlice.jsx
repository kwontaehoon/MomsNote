import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getBoard = createAsyncThunk("counterSlice/async", async () => {
    try{
      const response = await axios.get("https://momsnote.net/api/board/list")
      console.log('response: ', response.data);
      return response.data;
    }catch(error){
      console.log('error: ', error);
    }
});

const initialState = {
    loading: false,
    data: [],
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
      bulider.addCase(getBoard.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.boardSlice.data;

export default boardSlice.reducer