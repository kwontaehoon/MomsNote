import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postQna = createAsyncThunk("postQnaSlice/async", async () => {
  console.log('postQna 업데이트됨');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/qna/list',
          data : { category: '전체' }
      });
      if(response.data == ''){ return setInfo('0') }else return response.data;
      }catch(error){
          console.log('qna axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
}

export const qnaSlice = createSlice({
    name: 'qnaSlice',
    initialState,
    reducers: {
    },
    extraReducers: (bulider) => {
      bulider.addCase(postQna.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.qnaSlice.data;

export default qnaSlice.reducer