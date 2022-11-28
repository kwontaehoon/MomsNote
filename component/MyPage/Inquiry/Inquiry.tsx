import React from 'react'
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

// 문의하기
const styles = StyleSheet.create({
    container:{
      height: '90%',
    },
    header:{
      paddingTop: 30,
      height: '25%',
    },
    headerBox:{
      height: '30%',
      padding: 10,
      justifyContent: 'center',
    },
    headerBox2:{
      height: '70%',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    header2:{
      height: '50%'
    },
    header2Box:{
      height: '15%',
      padding: 10,
      justifyContent: 'center',
    },
    header2Box2:{
      height: '90%',
      padding: 10,
    },
    inputBox:{
      width: '100%',
      height: '70%',
      borderWidth: 1,
      borderColor: 'lightgrey',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    inputBox2:{
      width: '100%',
      height: '100%',
      borderWidth: 1,
      borderColor: 'lightgrey',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    footer:{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FEA100',
    }
})
const Inquiry2 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBox}><Text style={{fontWeight: 'bold'}}>제목</Text></View>
        <View style={styles.headerBox2}>
          <View style={styles.inputBox}>
            <Text>gg</Text>
          </View>
        </View>
      </View>
      <View style={styles.header2}>
        <View style={styles.header2Box}><Text style={{fontWeight: 'bold'}}>내용</Text></View>
        <View style={styles.header2Box2}>
          <View style={styles.inputBox2}></View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>문의하기</Text>
      </View>
    </View>
  )
}

export default Inquiry2