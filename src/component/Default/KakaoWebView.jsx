import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'
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
      source={{ uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}}
      onMessage={event => {
        const data = event.nativeEvent.url;
        const exp = 'code=';
        const error = 'error=';
        const condition = data.indexOf(exp);
        const condition2 = data.indexOf(error);

        if (condition !== -1) {   
            console.log(data.substring(condition + exp.length));
            navigation.navigate('초기접근', data.substring(condition + exp.length));

        }else if(condition2 !== -1){
            navigation.goBack();
        }
       
      }}
    />
  )
}

export default Main