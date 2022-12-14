import React from 'react'
import {View, Text} from 'react-native'

const Wrap = () => {
  return (

    <View style={{borderWidth: 1, flexWrap: 'wrap', height: 110}}>
        <View style={{width: '50%', height: 50, borderWidth: 1}}></View>
        <View style={{width: '50%', height: 50, borderWidth: 1}}></View>
        <View style={{width: '50%', height: 50, borderWidth: 1}}></View>
    </View>
  )
}


export default Wrap