import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

// 문의내역
const styles = StyleSheet.create({
    container:{
      height: '95%',
      backgroundColor: 'white',  
    },
    header:{
      height: '6%',
      flexDirection: 'row',
      backgroundColor: '#F5F5F5',
    },
    headerBox:{
      borderBottomWidth: 1,
      borderBottomColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main:{
      height: '94%',
    },
    mainBox:{
      height: 60,
      flexDirection: 'row'
    }
    
})
const Inquiry3 = ({navigation}) => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '전체'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '자유게시판'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '일상이야기'
    },
    {
        id: '1',
        title: '임신정보'
    },
    {
        id: '2',
        title: '고민상담'
    },
    {
        id: '3',
        title: '질문게시판'
    }
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('문의 상세')}>
        <View style={[styles.headerBox, {width: '20%'}]}><Text>대기중</Text></View>
        <View style={[styles.headerBox, {width: '60%'}]}><Text>문의 제목</Text></View>
        <View style={[styles.headerBox, {width: '20%'}]}><Text>2022.11.01</Text></View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.headerBox, {width: '20%'}]}><Text>상태</Text></View>
        <View style={[styles.headerBox, {width: '60%'}]}><Text>문의내용</Text></View>
        <View style={[styles.headerBox, {width: '20%'}]}><Text>날짜</Text></View>
      </View>
      <View style={styles.main}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id}>
        </FlatList>
      </View>
    </View>
  )
}

export default Inquiry3