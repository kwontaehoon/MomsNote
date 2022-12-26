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
    main2:{
      alignItems: 'center',
      justifyContent: 'center',
      height: '80%',
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
  console.log('문의내역 info: ', info);

  useEffect(()=>{
    const Inquiry = async() => {
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/api/inquiry/list',
        headers: { 
          'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzIwMzI1OTAsImV4cCI6MTY3NDYyNDU5MH0.ZK2gNgKokbKi_iZM52mC5c0ink21CW2W88-kOXVAAJc', 
          'Content-Type': 'application/json'
        },
        data: {}
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
      {info.length !== 0 ?
        <FlatList data={info} renderItem={renderItem} showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.inquiryId)}>
        </FlatList>
        :
        <View style={styles.main2}><Text style={{color: '#757575', fontSize: 16}}>문의하신 내역이 없습니다.</Text></View>
      }
    </View>
  )
}

export default Inquiry3