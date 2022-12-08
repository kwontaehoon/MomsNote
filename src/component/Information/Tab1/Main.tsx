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
  header2:{
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#F5F5F5'
  },
  header2Box:{

  },
  header2FilterBox:{
    height: 40,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    margin: 5,
    borderRadius: 20,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  main:{
    height: '68%',
  },
  mainBox:{
    borderWidth: 1,
    height: 150,
    flexDirection: 'row',
    padding: 15,
    borderColor: '#F5F5F5',
  },
  imageBox:{
    borderWidth: 1,
    width: '35%',
  },
  contentBox:{
    borderWidth: 1,
    width: '65%',
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

  const DATA3 = [
    {
        id: '0',
        title: '전체'
    },
    {
        id: '1',
        title: '특가할인'
    },
    {
        id: '2',
        title: '박람회'
    },
  ];

    const [filter, setFilter] = useState([true, false]); // filter tab
    const [week, setWeek] = useState([true, false, false, false, false, false,
    false, false, false, false, false, false]);
    const [filter2, setFilter2] = useState([true, false, false, false]);


    const change = (e) => { // 몇 주차 border, 글자두께 변경
      let arr = Array.from({length: 12}, ()=>{ return false});
      arr[e] = !arr[e];
      setWeek(arr);
    }

    const change2 = (e) => { // 카테고리 배경색상, 글자 색상 변경
      let arr = Array.from({length: 4}, () => {return false});
      arr[e] = !arr[e];
      setFilter2(arr);
    }

    const List = () => {
      return(
        <View style={styles.main}>
          <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id}>
          </FlatList>
        </View>
      )
    }

  const renderItem = ({ item }) => ( // 행사정보
      <View style={styles.mainBox}>
          <View style={styles.imageBox}></View>
          <View style={styles.contentBox}></View>
      </View>
  );

  const renderItem2 = ({ item }) => ( // 임신주차
    <TouchableOpacity style={styles.scrollBox} onPress={()=>change(item.id)}>
      <Text style={{fontSize: 16, padding: 3, fontWeight: week[item.id] ? 'bold' : '400',
        color: week[item.id] ? 'black' : '#9E9E9E', borderBottomWidth: week[item.id] ? 2 : 0 }}>{item.id}주</Text>
    </TouchableOpacity>
  );

  const renderItem3 = ({ item }) => ( // filter Box
    <View style={styles.header2}>
        <View style={[styles.header2FilterBox, {backgroundColor: filter2[item.id] ? '#FEA100' : 'white'}]}>
          <TouchableOpacity onPress={()=>change2(item.id)}><Text style={{color: filter2[item.id] ? 'white' : 'black'}}>{item.title}</Text></TouchableOpacity>
        </View>
    </View>
  );

  

 

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <View style={styles.headerBox}><Text style={{fontSize: 16, fontWeight: '600'}}>2022년</Text></View>
          <View style={styles.headerBox2}>
            <FlatList data={DATA2} renderItem={renderItem2}
              keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
            </FlatList>
          </View>
        </View>
        <View style={styles.header2}>
          <FlatList data={DATA3} renderItem={renderItem3}
              keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
          </FlatList>
        </View>
        <List />
     </View>
  )
}

export default Talk1