import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  main:{
    height: 1000,
    padding: 15,
  },
  mainBox:{
    borderWidth: 1,
    height: 100,
    flexDirection: 'row',
  },
  mainBoxSub:{
    width: '85%',
    justifyContent: 'center',
  },
})


const Talk1 = ({navigation}: any) => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '전체'
    },
  ];

  const DATA2 = [
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
    <View style={styles.container2}>
      <View style={styles.main}>
        <FlatList data={DATA2} renderItem={renderItem2}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
      </View>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('TalkTab1Detail')}>
      <View style={styles.mainBoxSub}>
        <Text style={{marginBottom: 5}}>제목</Text>
        <Text>내용</Text>
      </View>
      <View style={[styles.mainBoxSub, {alignItems: 'flex-end', width: '15%'}]}>
        <Text>1분전</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
      </FlatList>
     </View>
  )
}

export default Talk1