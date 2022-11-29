import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container:{
    height: '83%',
    backgroundColor: 'white',
  },
  header:{
    height: '10%',
    backgroundColor: '#F5F5F5',
  },
  headerFilterBox:{
    height: 40,
    borderWidth: 1,
    margin: 10,
    borderRadius: 16,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '75%',
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

  const [filter, setFilter] = useState([true, false, false, false]);


  const renderItem = ({ item }) => (
    <View style={styles.headerFilterBox}>
        <TouchableOpacity><Text>{item.title}</Text></TouchableOpacity>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('TalkTab1Detail')}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} horizontal={true}>
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
          keyExtractor={item => item.id}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk1