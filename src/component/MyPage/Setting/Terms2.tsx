import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import axios from 'axios'

const styles = StyleSheet.create({
    container:{
      height: '100%',
      backgroundColor: 'white',  
    },
    header:{
      margin: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    main:{
      padding: 20,
    },
})
const Terms1 = () => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
  ];

  useEffect(()=>{
    const terms = async() => {
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/policy',
        data : {
          sort: "개인정보처리방침",
          page: 0
      }
    });
    setInfo(response.data.data);
    }
    terms();
  }, []);

  const [info, setInfo] = useState();

  const renderItem = () => {
    return (
      <View>
        <View style={styles.header}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>맘스노트 개인정보처리방침</Text>
        </View>
        <View style={styles.main}>
          <Text style={{fontSize: 16, lineHeight: 22}}>{info}</Text>
        </View>
    </View>
    )
  }

  return info == undefined || info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={index => String(index)} showsVerticalScrollIndicator={false}></FlatList>
    </View>
  )
}

export default Terms1