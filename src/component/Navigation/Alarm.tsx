import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    height: '100%',
  },
  main:{
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  }
})
const Main = ({navigation}) => {

  const DATA = [{id: '0',}];

  const [info, setInfo] = useState([]);
  console.log('알람 info: ', info);

  useEffect(()=>{
    const alarm = async() => {
      const token = await AsyncStorage.getItem('token');
      try{
          const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/user/notification',
                headers: { 
                  'Authorization': `Bearer ${token}`, 
                  'Content-Type': 'application/json'
                },
                data: {page: 1}
              });
              console.log('response: ', response);
              setInfo(response.data.data);
          }catch(error){
            console.log('알림 error: ', error);
          }
    }
    alarm();
  }, []);

  const List = () => {
    let arr = [];
    info.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.main} key={index} >
          <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 5, color: info[index].readFlag ? '#9E9E9E' : ''}}>{info[index].nickname}님이 회원님의 게시글에 댓글을 남겼습니다.</Text>
          <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment(info[index].notificationDate).format('YY.MM.DD')}.</Text>
        </TouchableOpacity>
      )
    })
    return arr;
  }
    

  const renderItem = ({ item}) => (
      <List />
  );

  return (
    <View style={styles.container}>
      {info.length == 0 ? 

      <View style={{alignItems: 'center', justifyContent: 'center', height: '80%'}}>
      <Image source={require('../../../public/assets/image/rainbow.png')}/>
      <Text style={{fontSize: 16, color: '#757575', marginTop: 24}}>아직 받은 알림이 없습니다.</Text>
      </View>
    :
      <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
      </FlatList>}
    </View>
  )
}

export default Main