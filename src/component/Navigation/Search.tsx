import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView } from 'react-native'
import Icon4 from 'react-native-vector-icons/AntDesign'
import { getStatusBarHeight } from "react-native-status-bar-height"

import Back from '../../../public/assets/svg/Back.svg'
import Search from '../../../public/assets/svg/Search.svg'
import Arrow from '../../../public/assets/svg/Arrow-Right.svg'

const styles = StyleSheet.create({
  container:{
    height: '97%',
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  header:{
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchIconBox:{
    position: 'absolute',
    left: 15,
    top: 10,
  },
  textInput:{
    backgroundColor: '#F5F5F5',
    marginLeft : 20,
    width: '90%',
    height: 45,
    paddingLeft: 50,
    justifyContent: 'center',
  },
  main:{
    height: '90%',
  },
  titleBox:{
    height: 50,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  arrowBox:{
    position: 'absolute',
    right: 10,
  },
})

const Main = () => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    }
  ];

  const MomsTalk = () => {
    return(
      <View><Text>MomsTalk</Text></View>
    )
  }
  const MaterialShare = () => {
    return(
      <View><Text>MaterialShare</Text></View>
    )
  }
  const Commit = () => {
    return(
      <View><Text>Commit</Text></View>
    )
  }
  const Experience = () => {
    return(
      <View><Text>Experience</Text></View>
    )
  }


  const renderItem = ({ item }) => (
    <View>
        <View style={styles.titleBox}>
          <View style={styles.arrowBox}><Arrow /></View>
          <Text style={{fontWeight: '600'}}>맘스 톡</Text>
        </View>
        <MomsTalk />
        <View style={styles.titleBox}>
          <View style={styles.arrowBox}><Arrow /></View>
          <Text style={{fontWeight: '600'}}>출산준비물 공유</Text>
        </View>
        <MaterialShare />
        <View style={styles.titleBox}>
         <View style={styles.arrowBox}><Arrow /></View>
          <Text style={{fontWeight: '600'}}>출산준비물 공유</Text>
        </View>
        <Commit />
        <View style={styles.titleBox}>
          <View style={styles.arrowBox}><Arrow /></View>
          <Text style={{fontWeight: '600'}}>출산준비물 공유</Text>
        </View>
        <Experience />
    </View>
  );

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Back/>
        <View style={styles.textInput}>
          <View style={styles.searchIconBox}><Search width={22}/></View>
          <TextInput placeholder='검색하실 단어를 입력하세요.'></TextInput>
        </View>
      </View>
      <View style={styles.main}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.title} showsVerticalScrollIndicator={false}>
        </FlatList>
      </View>
    </View>
  )
}

export default Main