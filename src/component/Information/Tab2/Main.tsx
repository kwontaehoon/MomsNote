import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

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
    borderWidth: 1,
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
    height: '68%',
  },
  main2:{
    borderWidth: 1,
    height: 60,
    flexDirection: 'row',
    padding: 15,
    borderColor: '#F5F5F5',
    alignItems: 'center',
  },
  dateBox:{
    position: 'absolute',
    right: 15,

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
  ];
  const DATA2 = [
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

    const [week, setWeek] = useState([true, false, false, false, false, false,
    false, false, false, false, false, false]);

    useEffect(()=>{
      async function b(){
          const response = await axios.get('http://192.168.1.140:4000/api/test');
          console.log('response: ', response.data);
        }
        b();
    }, [])

    const change = (e) => { // 몇 주차 border, 글자두께 변경
      let arr = Array.from({length: 12}, ()=>{ return false});
      arr[e] = !arr[e];
      setWeek(arr);
    }

  const renderItem = ({ item }) => ( // 행사정보
      <TouchableOpacity style={styles.main2} onPress={()=>navigation.navigate('행사정보 상세페이지', item)}>
          <View style={styles.dateBox}><Text>10.20(목) ~ 10.23(일)</Text></View>
          <Text style={{fontWeight: '500'}}>[여수] kbc</Text>
      </TouchableOpacity>
  );

  const renderItem2 = ({ item }) => ( // 임신주차
    <TouchableOpacity style={styles.scrollBox} onPress={()=>change(item.id)}>
      <Text style={{fontSize: 16, padding: 3, fontWeight: week[item.id] ? 'bold' : '400',
        color: week[item.id] ? 'black' : '#9E9E9E', borderBottomWidth: week[item.id] ? 2 : 0 }}>{item.id}주</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <View style={styles.headerBox}><Text style={{fontSize: 18, fontWeight: '600'}}>2022년</Text></View>
          <View style={styles.headerBox2}>
            <FlatList data={DATA2} renderItem={renderItem2}
              keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
            </FlatList>
          </View>
        </View>
        <View style={styles.main}>
          <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id}>
          </FlatList>
        </View>
     </View>
  )
}

export default Talk1