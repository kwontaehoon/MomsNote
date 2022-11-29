import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container:{
    height: '83%',
    backgroundColor: 'white',
  },
  header:{
    height: '5%',
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
  main:{
    height: '88%',
    borderWidth: 1,
  },
  mainBox:{
    borderBottomWidth: 1,
    height: 100,
    padding: 10,
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

  const test = () => {
    console.log('test');
    navigation.navigate(' ');
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={test}>
        
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
        <View style={styles.header2FilterBox}><Text>0 건</Text></View>
        <View style={[styles.header2FilterBox, {alignItems: 'flex-end'}]}><Icon name='filter' size={22} /></View>
      </View>
      <View style={styles.main}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk3