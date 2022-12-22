import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Slick from 'react-native-slick'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Swiper from 'react-native-swiper'

import Close from '../../../../../public/assets/svg/Close.svg'

const styles = StyleSheet.create({
  wrapper: {},
  container:{
    backgroundColor: 'black',
    height: '97%',
    marginTop: getStatusBarHeight(),
  },
  header:{
    height: '15%',
  },
  closeBox:{
    position: 'absolute',
    right: 20,
    top: 25,
  },
  main:{
    height: '80%',
  },
  mainBox: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width: '100%',
    height: '100%',
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

  console.log('이미지 길이: ', route.params);
  const saveName = route.params.split('|');
  console.log('saveName: ', saveName);

  return(
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.closeBox}><Close onPress={()=>navigation.goBack()}/></View>
        </View>
        <View style={styles.main}>

      <Swiper style={styles.wrapper} showsButtons={false} dot={<View style={styles.dot}/>} activeDot={<View style={styles.dotActive}/>}>
        {saveName.map((x) => {
          return(
            <View style={styles.mainBox}>
              <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image} key={x}/>
            </View>
          )}
      )}
        
      </Swiper>
        
        </View>
    </View>
  )
}

export default Gallery