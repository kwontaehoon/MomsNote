import React, { useState, useEffect } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Talk1 from './Tab1/Main'
import Talk2 from './Tab2/Main'

const styles = StyleSheet.create({
    container:{
      height: '92%',
      backgroundColor: 'white',
    },
    container2:{

    },
    headerIcon:{
      margin: 5,
    },
    header:{
      height: 60,
      flexDirection: 'row',
    },
    headerBox:{
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 2,
    },
    header2:{
      borderBottomWidth: 1,
      borderColor: '#EEEEEE',
      height: 100,
    },
    header2Box:{
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header2Box2:{
      height: 50,
    },
    scrollBox:{
      width: 70,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Main = ({navigation}:any) => {

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

    const List = ():any => {
        switch(true){
            case filter[0] === true: return <Talk1 navigation={navigation}/>
            case filter[1] === true: return <Talk2 navigation={navigation}/>
        }
    }
    const filter_func = (e) => { // filter tab 변경
      let arr = [false, false];
      arr[e] = true;
      setFilter(arr);
    }

    const change = (e) => { // 몇 주차 border, 글자두께 변경
      let arr = Array.from({length: 12}, ()=>{ return false});
      arr[e] = !arr[e];
      setWeek(arr);
    }

    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.scrollBox} onPress={()=>change(item.id)}>
        <Text style={{fontSize: 16, padding: 3, fontWeight: week[item.id] ? 'bold' : '400',
      color: week[item.id] ? 'black' : '#9E9E9E', borderBottomWidth: week[item.id] ? 2 : 0 }}>{item.id}주</Text>
      </TouchableOpacity>
    ); 

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
      <StatusBar backgroundColor={'white'} />
      <View style={styles.header}>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[0] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[0] ? 'orange' : '#BDBDBD'}}>오늘의편지</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[1] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[1] ? 'orange' : '#BDBDBD'}}>이 시기에는?</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.header2}>
          <View style={styles.header2Box}><Text style={{fontSize: 16, fontWeight: 'bold'}}>임신주차</Text></View>
          <View style={styles.header2Box2}> 
            <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
            </FlatList>
          </View>
        </View>
        <List />
    </SafeAreaView>
  )
}

export default Main