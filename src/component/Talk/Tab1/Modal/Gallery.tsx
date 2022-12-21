import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Slick from 'react-native-slick'
import { getStatusBarHeight } from "react-native-status-bar-height"

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
  slide1: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
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
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  dotActive:{
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
})

const Gallery = ({navigation, route}) => {

  console.log('이미지 길이: ', route.params);

  const List = () => {
    let arr = [];

    return(
      <View testID="Hello" style={styles.slide1}>
          <Text style={styles.text}>z</Text>
      </View>
    )
    
  }

  return(
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.closeBox}><Close onPress={()=>navigation.goBack()}/></View>
        </View>
        <View style={styles.main}>

        <Slick style={styles.wrapper} showsButtons={false} dot={<View style={styles.dot}/>} activeDot={<View style={styles.dotActive}/>}>
            
            <List />
        </Slick>
        
        </View>
    </View>
  )
}

export default Gallery