import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Slick from 'react-native-slick'

import Close from '../../../../../public/assets/svg/Close.svg'

const styles = StyleSheet.create({
  wrapper: {},
  container:{
    backgroundColor: 'black',
    height: '100%',
  },
  header:{
    height: '15%',
  },
  main:{
    height: '80%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default () => (
    <View style={styles.container}>
        <View style={styles.header}><Close fill={'#EEEEEE'}/></View>
        <View style={styles.main}>
        <Slick style={styles.wrapper} showsButtons loop={false}>
            <View testID="Hello" style={styles.slide1}>
                <Text style={styles.text}>Hello Slick</Text>
            </View>
            <View testID="Beautiful" style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
            </View>
            <View testID="Simple" style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
            </View>
        </Slick>
        </View>
    </View>

)