import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native'
import moment from 'moment'

import Like from '../../../../../public/assets/svg/Like.svg'
import Chat from '../../../../../public/assets/svg/Chat.svg'

import { useDispatch, useSelector } from 'react-redux'
import { postMyLikeList } from '../../../../Redux/Slices/MyLikeListSlice'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  mainBox:{
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    padding: 20,
  },
  infoBox:{
    flexDirection: 'row',
    marginTop: 5,
  },
  clockBox:{
    position: 'absolute',
    right: 15,
    bottom: 20,
  },
})


const Talk1 = ({navigation}) => {

  const dispatch = useDispatch();
  const info = useSelector(state => { return state.myLikeList.data });
  console.log('like list info: ', info);

useEffect(()=>{
  dispatch(postMyLikeList());
}, []);

const dayCalculate = (date) => {
  switch(true){
    case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
    case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
    default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
  }
}

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('출산리스트 공유 상세내용', item)}>
        <View style={styles.clockBox}>
          <Text style={{color: '#9E9E9E', fontSize: 12}}>{dayCalculate(item.boardDate)}</Text>
        </View>
        <Text>{item.title}</Text>
        <View style={styles.infoBox}>
              <Text style={{color: '#9E9E9E', fontSize: 13}}>{item.nickname} </Text>
              <Like fill='#9E9E9E' width={13} height={17}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend}  </Text>
              <Chat fill='#9E9E9E' width={13} height={17}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend} </Text>
        </View>
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
        {info == '0' ?
        <View style={{marginTop: 250, alignItems: 'center'}}><Text style={{color: '#757575', fontSize: 16}}>등록된 게시물이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem}
          keyExtractor={(item, index) => String(index)} showsVerticalScrollIndicator={false}>
        </FlatList>}
     </View>
  )
}

export default Talk1