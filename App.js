import React, { useEffect } from 'react'
import Navigation from './src/component/Navigation/Main'
import { StatusBar  } from 'expo-status-bar'
import { store } from './src/Redux/Store/Store'
import { Provider } from 'react-redux'
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

const App = () => {

  // useEffect(()=>{
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
  //       {
  //         text: "취소",
  //         onPress: () => null,
  //       },
  //       { text: "확인", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);
  
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="white" />
      <Navigation />
    </Provider>
  )
}

export default App