import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getList = createAsyncThunk("counterSlice/async", async () => {
  try{
    const response = await axios.get("https://momsnote.net/exp/details")
    console.log('response: ', response);
    return response.data;
  }catch(error){
    console.log('error: ', error);
  }
});

// export const getMomsTalk = createAsyncThunk("counterSlice/async", async () => {
//   try{
//     const response = await axios.get('https://momsnote.net/api/board/list');
//     return response.data;
//   }catch(error){
//     console.log('error: ', error);
//   }
// })

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

// export const MomsTalk = createSlice({
//     name: 'MomsTalk',
//     initialState,
//     reducers: {},
//     extraReducers: (bulider) => {
//       bulider.addCase(getMomsTalk.fulfilled, (state, action) => {
//         state.loading = 'success';
//         state.data = action.payload;
//       })
//     }
// })

// Action creators are generated for each case reducer function
export const data = (state) => state.counterSlice.data;

export default counterSlice.reducer