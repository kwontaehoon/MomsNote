import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getList = createAsyncThunk("GET_TODO", async () => {
  try{
    const response = await axios.get("https://my-json-server.typicode.com/typicode/demo/posts")
    console.log('response: ', response);
    return response.data;
  }catch(error){return error;}
});

const initialState = {
  loading: false,
  data: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers:{
    [getList.fulfilled]: (state, action) => {
      state.loading = 'succeeded';
      state.data = action.payload;
    },
  }
})

export const MomsTalk = createSlice({
    name: 'MomsTalk',
    initialState,
    reducers: {

    }
})

// Action creators are generated for each case reducer function
export const data = (state) => state.counterSlice.data;

export default counterSlice.reducer