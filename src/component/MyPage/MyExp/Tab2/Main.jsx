import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postExperience } from '../../../../Redux/Slices/ExperienceSlice'

const styles = StyleSheet.create({
  container:{
    height: '91%',
    backgroundColor: 'white',
  },
  InputBox:{
    borderWidth: 0,
  },
  main:{
    height: '90%',
    padding: 10,
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    width: '50%',
    height: 260,
    padding: 10,
  },
  imageBox:{
    height: '70%',
  },
  contentBox:{
    height: '30%'
  },
  content:{
    height: '33.4%',
    justifyContent: 'center'
  },
  mainBox2:{
    height: '50%',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  mainBox3:{
    height: '50%',
    flexDirection: 'row',
  },
  infoBox:{
    width: '50%',
    paddingLeft: 5,
  },
  clockBox:{
    width: '50%',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
})


const Talk3 = ({navigation}: any) => {

  const dispatch = useDispatch();
  const info = useSelector(state => {return state.experience.data});
  const experienceSet = useSelector(state => { return state.experience.refresh; });

  useEffect(()=>{
    dispatch(postExperience(experienceSet));
  }, []);


  const renderItem = ({ item }) =>
  item.appCount >= item.maxPeople || moment(item.registrationEndDate).diff(moment(), "days") >= 0 ? '' :
    (
      <TouchableOpacity style={[styles.mainBox, {opacity: 0.5}]} onPress={()=>navigation.navigate('체험단 상세페이지', item)}>
        <View style={styles.imageBox}>
          {item.savedName == null ? '' : <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: '100%', height: '100%', borderRadius: 8}} />}
        </View>
        <View style={styles.contentBox}>
          <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#757575', fontSize: 13, fontWeight: '600'}}>종료</Text></View>
          <View style={styles.content}><Text style={{fontWeight: '500'}}>{item.title}</Text></View>
          <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>신청 {item.appCount}명/모집 {item.maxPeople}명</Text></View>
        </View>
      </TouchableOpacity>
    )

  return info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  : (
    <View style={styles.container}>
      
      <View style={styles.main}>
        {info == '0' ? <View style={{marginTop: 180, alignItems: 'center'}}><Text style={{color: '#757575', fontSize: 16}}>종료된 체험단이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem} numColumns={2} showsVerticalScrollIndicator={false}>
        </FlatList>
          }
      </View>
     </View>
  )
}

export default Talk3