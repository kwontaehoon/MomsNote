import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        borderWidth: 1,
    },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>출산리스트</Text>
    </View>
  )
}

export default Main