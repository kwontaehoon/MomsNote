import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postMaterial = createAsyncThunk("postBoardSlice/async", async (data) => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/list',
          headers: { 
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('Mymaterial redux axios error: ', error);
          return undefined
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
        order: 'need'
    }
}

export const materialSlice = createSlice({
    name: 'materialSlice',
    initialState,
    reducers: {
      setMarterialRefresh:(state, action)=>{
        state.refresh.order = action.payload.order;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMaterial.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.materialSlice.data;

export const { setMaterialRefresh } = materialSlice.actions;

export default materialSlice.reducer