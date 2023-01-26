import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postMyLikeList = createAsyncThunk("postMyLikeListSlice/async", async () => {
  console.log('postMyLikeList 업데이트됨');
  const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/recneeds',
          headers: { 
            'Authorization': `bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          data : {}
      });
      return response.data;
      }catch(error){
          console.log('myLikeList axios error: ', error);
          return undefined;
      }
});

const initialState = {
    loading: false,
    data: [],
    refresh: {
      order: 'new',
      count: 1,
      page: 1,
      subcategory: '전체'
    }
}

export const myLikeListSlice = createSlice({
    name: 'myLikeListSlice',
    initialState,
    reducers: {
      setMyLikeListRefresh:(state, action)=>{
        console.log('카테고리');
        state.refresh.subcategory = action.payload.subcategory;
      },
      setMyLikeListCount:(state, action)=>{
        console.log('카운트');
        console.log('state: ', state);
        console.log('action: ', action);
        state.refresh.page = action.payload.page;
        state.refresh.count = action.payload.count;
      },
      setMyLikeListFilter:(state, action)=>{
        console.log('필터링');
        console.log('state: ', state);
        console.log('action: ', action);
        state.refresh.order = action.payload.filter;
      }
    },
    extraReducers: (bulider) => {
      bulider.addCase(postMyLikeList.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      },
    )}
  })

export const data = (state) => state.myLikeListSlice.data;

export const { setMyLikeListRefresh } = myLikeListSlice.actions;
export const { setMyLikeListCount } = myLikeListSlice.actions;
export const { setMyLikeListFilter } = myLikeListSlice.actions;

export default myLikeListSlice.reducer