import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'

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

  const DATA = [{id: '0'}];

  const [info, setInfo] = useState();
  
  const isFocused = useIsFocused();

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
              if(response.data == ''){ return setInfo('0') }else setInfo(response.data.data);
          }catch(error){
          }
    }
    alarm();
  }, [isFocused]);

  const navi = async(item) => {
    
    try{
      const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/api/user/notification/update',
            data: {notificationId: item.notificationId}
          });
          setInfo(response.data.data);
      }catch(error){
      }

      if(item.category == '맘스 토크'){
        navigation.navigate('맘스토크 상세내용', {item: item});
      }else if(item.category == '출산리스트 공유'){
        navigation.navigate('출산리스트 공유 상세내용', item);
      }else if(item.type == '문의'){
        navigation.navigate('문의 상세', item);
      }

  }

  const List = () => {
    let arr = [];
    info?.filter((x, index) => {
      if(x.type == '댓글'){
        arr.push(
          <TouchableOpacity style={styles.main} key={index} onPress={()=>navi(x)}>
            <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 5, color: info[index].readFlag ? '#9E9E9E' : ''}}>{info[index].nickname}님이 회원님의 게시글에 댓글을 남겼습니다.</Text>
            <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment(info[index].notificationDate).format('YY.MM.DD')}.</Text>
          </TouchableOpacity>
        )
      }else if(x.type == '문의'){
        arr.push(
          <TouchableOpacity style={styles.main} key={index} onPress={()=>navi(x)}>
            <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 5, color: info[index].readFlag ? '#9E9E9E' : ''}}>회원님의 문의에 답변이 달렸습니다.</Text>
            <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment(info[index].notificationDate).format('YY.MM.DD')}.</Text>
          </TouchableOpacity>
        )
      }
      
      
    })
    return arr;
  }
    

  const renderItem = ({ item}) => (
      <List />
  );

  return !info ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  :
    <View style={styles.container}>
      
    { info == '' ?
    <View style={{alignItems: 'center', justifyContent: 'center', height: '80%'}}>
    <Image source={require('../../../public/assets/image/rainbow.png')}/>
  <Text style={{fontSize: 16, color: '#757575', marginTop: 24}}>아직 받은 알림이 없습니다.</Text>
  </View>
  :
      <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
      </FlatList>}
    </View>
  }

export default Main