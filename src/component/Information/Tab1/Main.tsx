import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  container2:{

  },
  header:{
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    height: 100,
  },
  headerBox:{
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBox2:{
    height: 50,
  },
  scrollBox:{
    width: 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main:{
    height: '84%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
})


const Talk1 = ({navigation}: any) => {

  const DATA = [
    {
      id: '1',
      title: '전체'
    },
    {
      id: '2',
      title: '전체'
    },
    {
      id: '3',
      title: '전체'
    },
    {
      id: '4',
      title: '전체'
    },
    {
      id: '5',
      title: '전체'
    },
    {
      id: '6',
      title: '전체'
    },
    {
      id: '7',
      title: '전체'
    },
    {
      id: '8',
      title: '전체'
    },
    {
      id: '9',
      title: '전체'
    },
    {
      id: '10',
      title: '전체'
    },
    {
      id: '11',
      title: '전체'
    },
    {
      id: '12',
      title: '전체'
    },
  ];

  const [filter, setFilter] = useState([true, false]); // filter tab
    const [week, setWeek] = useState([true, false, false, false, false, false,
    false, false, false, false, false, false]);

    const change = (e) => { // 몇 주차 border, 글자두께 변경
      let arr = Array.from({length: 12}, ()=>{ return false});
      arr[e] = !arr[e];
      setWeek(arr);
    }

    const List = () => {
      return(
        <View><Text>등록된 행사정보가 없습니다.</Text></View>
      )
    }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.scrollBox} onPress={()=>change(item.id)}>
      <Text style={{fontSize: 16, padding: 3, fontWeight: week[item.id] ? 'bold' : '400',
        color: week[item.id] ? 'black' : '#9E9E9E', borderBottomWidth: week[item.id] ? 2 : 0 }}>{item.id}주</Text>
    </TouchableOpacity>
  );

  const renderItem2 = ({ item }) => (
    <View style={styles.container2}></View>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <View style={styles.headerBox}><Text style={{fontSize: 16, fontWeight: 'bold'}}>임신주차</Text></View>
          <View style={styles.headerBox2}>
            <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
            </FlatList>
          </View>
        </View>
        <List />
     </View>
  )
}

export default Talk1