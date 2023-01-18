import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'

const styles = StyleSheet.create({
  container:{
    height: '91%',
    backgroundColor: 'white',
  },
  main:{
    height: '90%',
    padding: 15,
    marginTop: 20,
  },
  mainBox:{
    width: '50%',
    height: 260,
    padding: 10,
    opacity: 0.5,
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
    paddingLeft: 5
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

  const [info, setInfo] = useState([ // 체험 게시판 테이블
    {
      experienceId: '1',
      boardId: '',
      maxPeople: 10, // 모집인원
      applicationStartDate: '22.12.01',
      applicationEndDate: '22.12.05',
      registrationStartDate: '22.11.01',
      registrationEndDate: '22.11.04',
      openDate: '22.11.18',
    },{
      experienceId: '2',
      boardId: '', 
      maxPeople: 20,
      applicationStartDate: '22.12.01',
      applicationEndDate: '22.12.05',
      registrationStartDate: '22.11.01',
      registrationEndDate: '22.11.04',
      openDate: '22.11.18',
    },{
      experienceId: '3',
      boardId: '',
      maxPeople: 30,
      applicationStartDate: '22.12.01',
      applicationEndDate: '22.12.05',
      registrationStartDate: '22.11.01',
      registrationEndDate: '22.11.04',
      openDate: '22.11.18',
    }
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('체험단 상세페이지', item)}>
      <View style={styles.imageBox}>
        <Image source={require('../../../../public/assets/testimage.png')} style={{width: '100%', height: '100%', borderRadius: 8}} />
      </View>
      <View style={styles.contentBox}>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#FE9000', fontSize: 13, fontWeight: '600'}}>{item.applicationEndDate}일 남음</Text></View>
        <View style={styles.content}><Text style={{fontWeight: '500'}}>체험단 제목 체험단 제목</Text></View>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>신청 10명/모집 {item.maxPeople}명</Text></View>
      </View>
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {info.length !== 0 ? <FlatList data={info} renderItem={renderItem} numColumns={2}
          keyExtractor={item => item.experienceId}>
          </FlatList>:
          <View style={{marginTop: 100, alignItems: 'center'}}><Text style={{color: '#757575', fontSize: 16}}>모집중인 체험단이 없습니다.</Text></View>}
      </View>
     </View>
  )
}

export default Talk3