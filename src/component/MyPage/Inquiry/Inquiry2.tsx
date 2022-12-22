import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

// 문의내역
const styles = StyleSheet.create({
    container:{
      height: '95%',
      backgroundColor: 'white',
    },
    main:{
      borderBottomWidth: 1,
      borderColor: '#F5F5F5',
      height: 80,
      padding: 20,
      justifyContent: 'center'
    },
    statusBox:{
      position: 'absolute',
      right: 20,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',


    },
})
const Inquiry3 = ({navigation}) => {

  const [info, setInfo] = useState([]);

  useEffect(()=>{
    const Inquiry = async() => {
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/api/inquiry/list',
    });
    setInfo(response.data);
    }
    Inquiry();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('문의 상세', item)}>
      <View style={styles.statusBox}><Text style={{color: '#757575'}}>{item.status}</Text></View>
        <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 3, color: '#424242'}}>{item.title}</Text>
        <Text style={{color: '#9E9E9E'}}>{`${item.inquiryDate.split('-')[0]}/${item.inquiryDate.split('-')[1]}/${item.inquiryDate.split('-')[2].substring(0, 2)}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <FlatList data={info} renderItem={renderItem} showsVerticalScrollIndicator={false}
          keyExtractor={item => item.title}>
        </FlatList>
    </View>
  )
}

export default Inquiry3