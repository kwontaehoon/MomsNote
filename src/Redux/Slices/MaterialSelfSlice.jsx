import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postMaterialSelf = createAsyncThunk("postMaterialSelfSlice/async", async (data) => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/list/self',
          headers: { 
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data : data
      });
      return response.data;
      }catch(error){
          console.log('materialSelf redux axios error: ', error);
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

export const materialSelfSlice = createSlice({
    name: 'materialSelfSlice',
    initialState,
    reducers: {
      setMarterialSelfRefresh:(state, action)=>{
        state.refresh.order = action.payload.order;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMaterialSelf.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.materialSelfSlice.data;

export const { setMaterialSelfRefresh } = materialSelfSlice.actions;

export default materialSelfSlice.reducer