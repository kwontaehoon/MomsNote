import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const postQna = createAsyncThunk("postQnaSlice/async", async (data) => {
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
      category: '전체',
      page: 1,
    }
}
console.log('initialState: ', initialState);

export const qnaSlice = createSlice({
    name: 'qnaSlice',
    initialState,
    reducers: {
      setQnaRefresh:(state, action)=>{
        state.refresh.category = action.payload.category;
        state.refresh.page = action.payload.page;
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
export const { setQnaRefresh } = qnaSlice.actions;

export default qnaSlice.reducer