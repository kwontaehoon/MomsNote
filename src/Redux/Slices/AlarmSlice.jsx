import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postAlarm = createAsyncThunk("postAlarmSlice/async", async () => {
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          url: 'https://momsnote.net/api/user/notification',
          data : {page: 1}
      });
      if(response.data == ''){ return setInfo('0') }else return response.data.data;
      }catch(error){
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const alarmSlice = createSlice({
    name: 'alarmSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postAlarm.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.alarmSlice.data;

export default alarmSlice.reducer