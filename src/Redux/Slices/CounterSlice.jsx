import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getList = createAsyncThunk("counterSlice/async", async () => {
  try{
    const response = await axios.get("https://momsnote.net/exp/details")
    return response.data;
  }catch(error){
  }
});

const initialState = {
  loading: false,
  data: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(getList.fulfilled, (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    },
  )}
})

export const data = (state) => state.counterSlice.data;

export default counterSlice.reducer