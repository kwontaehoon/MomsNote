import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postQna = createAsyncThunk("postQnaSlice/async", async (data) => {
  console.log('postQna 업데이트됨');
  console.log('postQna data: ', data);
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/qna/list',
          data : data
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
    refresh: {
      category: '전체'
    }
}

export const qnaSlice = createSlice({
    name: 'qnaSlice',
    initialState,
    reducers: {
      setQnaRefresh:(state, action)=>{
        console.log('action: ', action.refresh.category);
        state.refresh.category = action.payload.category;
      }
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