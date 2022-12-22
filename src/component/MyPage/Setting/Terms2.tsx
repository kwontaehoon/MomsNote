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

  const [info, setInfo] = useState();

  useEffect(()=>{
    const terms = async() => {
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/policy',
        data : {
          sort: "이용약관",
      }
    });
    setInfo(response.data);
    }
    terms();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>맘스노트 개인정보처리방침</Text>
        </View>
        <View style={styles.main}>
          <Text style={{fontSize: 16}}>{info}</Text>
        </View>
    </View>
  )
}

export default Terms1