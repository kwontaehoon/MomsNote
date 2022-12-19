import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { WebView } from 'react-native-webview';
import axios from 'axios';

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
        padding: 20,
    },
})
const Main = ({navigation}) => {

    const REST_API_KEY = '7d1cb1e652f5ee8aaffc2e7ce0547c9b';
    const REDIRECT_URI = 'http://192.168.1.140:19000';
    const REDIRECT_URI2 = 'http://192.168.219.102:19000';

    const runFirst = `window.ReactNativeWebView.postMessage("this is message from web")`;

    const kakaoTokenId = async(kakaoAcceess) => {

      try{
        const response = await axios.get(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI2}&code=${kakaoAcceess}`);
        console.log(response.data);
        const response2 = await axios.get(`https://kapi.kakao.com/v1/user/access_token_info`, {
             headers: `Authorization: Bearer ${response.data.access_token}`
        })
        console.log('response2: ', response2.data.id);
        if(response.status === 200 && response2.status === 200){
           console.log('success');
           navigation.navigate('추가 정보 입력', ['kakao', response2.data.id]);
        }
    }catch(error){
        console.log('error: ', error);
    }
    }


  return (
    <WebView
      style={styles.container}
      injectedJavaScript={runFirst}
      source={{ uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI2}&response_type=code`}}
      onMessage={event => {
        const data = event.nativeEvent.url;
        console.log('Kakao: ', event.nativeEvent);
        console.log('data: ', data);
        let error = '';
        let condition = '';

        if(data !== null){
          condition = data.indexOf('code=');
          error = data.indexOf('error=');
        }
      
        if (data !== null && condition !== -1) {
            console.log('code: ', data.substring(condition + 5));
            
            kakaoTokenId(data.substring(condition + 5));
        }
       
       
      }}
    />
  )
}

export default Main