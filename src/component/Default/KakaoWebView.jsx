import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
        padding: 20,
    },
})
const Main = ({navigation}) => {

    const REST_API_KEY = '7d1cb1e652f5ee8aaffc2e7ce0547c9b'
    const REDIRECT_URI = 'http://192.168.1.140:19000'

    const runFirst = `window.ReactNativeWebView.postMessage("this is message from web")`;

  return (
    <WebView
      style={styles.container}
      injectedJavaScript={runFirst}
      source={{ uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`}}
      onMessage={event => {
        const data = event.nativeEvent.url;
        console.log('Kakao: ', event.nativeEvent);
        console.log('data: ', data);
        let error = '';
        let condition = '';

        if(data !== null){
          condition = data.indexOf('code=');
          console.log('condition: ', condition);
          error = data.indexOf('error=');
          console.log('error: ', error);
        }
      
        if (data !== null && condition !== -1) {   
            navigation.navigate('추가 정보 입력', data.substring(condition + 5));

        // }else if(error !== -1){
        //     navigation.goBack();
        }
       
      }}
    />
  )
}

export default Main