import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
        padding: 20,
    },
})
const Main = ({navigation}) => {

    const REST_API_KEY = '5b53b00ed1940f2bd5a026d96a0ae0ce'; // 클라이언트 꺼
    const REST_API_KEY2 = '7d1cb1e652f5ee8aaffc2e7ce0547c9b'; // 본인
    const REDIRECT_URI = 'https://www.naver.com';

    const runFirst = `window.ReactNativeWebView.postMessage("this is message from web")`;

    const kakaoTokenId = async(kakaoAcceess) => {

      try{
        const response = await axios.get(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${kakaoAcceess}`);
        AsyncStorage.setItem('token', response.data.access_token);
        console.log('response', response.data);
        const response2 = await axios.get(`https://kapi.kakao.com/v1/user/access_token_info`, {
             headers: `Authorization: Bearer ${response.data.access_token}`
        })
        console.log('response2: ', response2.data);
        const response3 = await axios({
          method: 'post',
          url: 'https://momsnote.net/login',
          headers: { 
            'Content-Type': 'application/json',
          },
          data: {
            username: `kakao_${response2.data.id}`
          }
        });

        console.log('response3: ', response3.data);
        
        const asyncStorage = await AsyncStorage.getItem('login');
        console.log('kakao asyncStorage: ', asyncStorage);

        response3.data.status == 'success' ? (navigation.navigate('main'), AsyncStorage.setItem('login', '2')) : navigation.navigate('추가 정보 입력', ['kakao', response2.data.id]);

    }catch(error){
        console.log('kakao error: ', error);
    }
    }


  return (
    <WebView
      style={styles.container}
      injectedJavaScript={runFirst}
      source={{ uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`}}
      onMessage={event => {
        const data = event.nativeEvent.url;
        let error = '';
        let condition = '';

        if(data !== null){
          condition = data.indexOf('code=');
          error = data.indexOf('error=');
        }
      
        if (data !== null && condition !== -1) {
            kakaoTokenId(data.substring(condition + 5));
        }
       
       
      }}
    />
  )
}

export default Main