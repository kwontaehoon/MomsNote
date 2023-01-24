import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

// 문의내역
const styles = StyleSheet.create({
    container:{
      height: '100%',
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
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Inquiry3 = ({navigation}) => {

  const [info, setInfo] = useState([]);
  console.log('공지사항 info: ', info);

  useEffect(()=>{
    const Inquiry = async() => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/api/board/notice',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: {
          count: 1,
          page: 1
        }
    });
    setInfo(response.data);
    }
    Inquiry();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('문의 상세', item)} activeOpacity={1}>
      <View style={styles.statusBox}><Text style={{color: '#757575'}}>{item.status}</Text></View>
        <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 3, color: '#424242'}} numberOfLines={1}>{item.title}</Text>
        <Text style={{color: '#9E9E9E'}}>{`${item.boardDate.split('-')[0]}/${item.boardDate.split('-')[1]}/${item.boardDate.split('-')[2].substring(0, 2)}`}</Text>
    </TouchableOpacity>
  );

  return info == undefined ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
    <View style={styles.container}>
      {info.length == 0 ? <View style={styles.main2}><Text style={{color: '#757575', fontSize: 16}}>문의하신 내역이 없습니다.</Text></View> :
        <FlatList data={info} renderItem={renderItem} showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.boardId)}>
        </FlatList>
      }
    </View>
  )
}

export default Inquiry3