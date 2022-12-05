import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  header:{
    height: '12%',
    backgroundColor: '#F5F5F5',
  },
  headerFilterBox:{
    height: 40,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    margin: 10,
    borderRadius: 20,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header2:{
    height: '7%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  header2FilterBox:{
    width: '50%',
    justifyContent: 'flex-end',
  },
  header3:{
    height: '8%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  main:{
    height: '73%',
    borderWidth: 1,
  },
  mainBox:{
    borderBottomWidth: 1,
    height: 100,
    padding: 10,
  },
})


const Talk1 = ({navigation}: any) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    },
    {
      id: '1',
      title: '자유게시판'
    },
    {
      id: '2',
      title: '일상이야기'
    },
    {
      id: '3',
      title: '임신정보'
    },
    {
      id: '4',
      title: '고민상담'
    },
    {
      id: '5',
      title: '질문게시판'
    }
  ];

  const [filter, setFilter] = useState([true, false, false, false, false, false]);

  const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
    let arr = Array.from({length: 6}, () => {return false});
    arr[e] = !arr[e];
    setFilter(arr);
  }

  const renderItem = ({ item }) => (
    <View style={{justifyContent: 'center'}}>
      <View style={[styles.headerFilterBox, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]}>
        <TouchableOpacity onPress={()=>change(item.id)}>
          <Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('Talk1Tab1Detail')}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
        </FlatList>
      </View>
      <View style={styles.header2}>
        <View style={styles.header2FilterBox}><Text>0 건</Text></View>
        <View style={[styles.header2FilterBox, {alignItems: 'flex-end'}]}><Icon name='filter' size={22} /></View>
      </View>
      <View style={styles.header3}>
        <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] 5주차 맘 입덧 질문있어요 슬라이딩 ~</Text>
      </View>
      <View style={styles.main}>
        <FlatList data={DATA} renderItem={renderItem2}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk1