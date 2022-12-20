import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

const styles = StyleSheet.create({
    container:{
      height: '100%',
      backgroundColor: 'white',  
    },
    header:{
      height: '12%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main:{
      height: '88%',
      padding: 10,
    },
})
const Terms1 = () => {

  // useEffect(()=>{
  //   async function b(){
  //       const response = await axios.get('http://192.168.1.140:4000/api/test');
  //       console.log('response: ', response.data);
  //     }
  //     b();
  // }, [])

  const [info, setInfo] = useState({
    policyId: 1,
    pollicy_sort: '이용약관',
    contents: '이용약관입니다.',
    policy_date: '2022-12-07'
  })

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>{info.pollicy_sort}</Text>
        </View>
        <View style={styles.main}>
          <Text style={{fontSize: 16}}>{info.contents}</Text>
        </View>
    </View>
  )
}

export default Terms1