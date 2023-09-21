import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, StatusBar, Button, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Swiper from 'react-native-swiper'
import { useIsFocused } from '@react-navigation/native'
import { Video, AVPlaybackStatus } from 'expo-av';
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Close from '../../../public/assets/svg/Close.svg'

const styles = StyleSheet.create({
  wrapper: {},
  container:{
    backgroundColor: 'black',
    marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
    borderWidth: 1,
  },
  header:{
    height: '20%',
  },
  closeBox:{
    position: 'absolute',
    right: 20,
    top: 25,
  },
  main:{
    height: '75%',
  },
  mainBox: {
    flex: 1,
  },
  image:{
    width: '100%',
    height: 500,
  },
  videoImage:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    zIndex: 999,
},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  dot:{
    backgroundColor: 'grey',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3
  },
  dotActive:{
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3
  },
})

const Gallery = ({navigation, route}) => {

  console.log('### route: ', route.params);
  const [newArr, setNewArr] = useState();
  console.log('### newArr: ', newArr);

  const FocusAwareStatusBar = () => {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar backgroundColor='black' barStyle={'white'} /> : null;
  }

  const video = React.useRef(null);

  const saveName = route.params[0];

  useEffect(()=>{
    const arr = route.params[0].filter(x => x !== route.params[0][route.params[1]]);
    console.log('### arr: ', arr);
    arr.unshift(route.params[0][route.params[1]]);
    setNewArr(arr);
  }, []);

  return newArr && (
    <SafeAreaProvider>
          <SafeAreaView style={{ backgroundColor: 'black' }}>
            <StatusBar />
        </SafeAreaView>
        <FocusAwareStatusBar />
            <SafeAreaView style={[styles.container, {height: Platform.OS == 'ios' ? null : '100%', flex: Platform.OS === 'ios' ? 1 : null}]}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBox} onPress={()=>navigation.goBack()}><Close fill={'white'}/></TouchableOpacity>
        </View>
        <View style={styles.main}>

      <Swiper style={styles.wrapper} showsButtons={false} dot={<View style={styles.dot}/>} activeDot={<View style={styles.dotActive}/>}>
        {newArr?.map((x) => {
          console.log('### xxx: ', x);
          if(x.charAt(x.length-1) !== '4'){
          return(
            <View style={styles.mainBox}>
              <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image} key={x} resizeMode='contain'/>
            </View>
          )}else{
            return(
              <View style={styles.mainBox}>
                <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}}
                  style={styles.image}
                  useNativeControls
                  resizeMode='cover'
                  ref={video}
                  isLooping={false}
                  />
              </View>
            )
          }
        }
      )}
        
      </Swiper>
        
        </View>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Gallery