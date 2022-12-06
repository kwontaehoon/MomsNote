import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '92%',
    },
    header:{
      borderBottomWidth: 1,
      borderColor: '#E0E0E0',
      height: '9%',
      justifyContent: 'center',
      paddingLeft: 15,
    },
    text:{
      fontSize: 17,
    },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.text}>자유게시판</Text></View>
      <View style={styles.header}><Text style={styles.text}>일상 이야기</Text></View>
      <View style={styles.header}><Text style={styles.text}>임신 정보</Text></View>
      <View style={styles.header}><Text style={styles.text}>고민 상담</Text></View>
      <View style={styles.header}><Text style={styles.text}>질문 게시판</Text></View>
    </View>
  )
}

export default Main