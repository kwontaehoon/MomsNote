import React, { useState, useEffect } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Talk1 from './Tab1/Main'
import Talk2 from './Tab2/Main'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white',
        borderWidth: 1,
    },
    container2:{

    },
    headerIcon:{
        margin: 5,
    },
    header:{
        height: 70,
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
    footer:{
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 999,
        backgroundColor: '#FEA100',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
})
const Main = ({navigation}:any) => {

    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
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

    const [filter, setFilter] = useState([true, false, false]); // filter tab
    const [week, setWeek] = useState([true, false, false, false, false, false]);

    const List = ():any => {
        switch(true){
            case filter[0] === true: return <Talk1 navigation={navigation}/>
            case filter[1] === true: return <Talk2 navigation={navigation}/>
        }
    }
    const filter_func = (e) => {
        let arr = [false, false, false];
        arr[e] = true;
        setFilter(arr);
    }

    const renderItem = ({ item }) => (
      <View style={styles.container2}>
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
            <FlatList data={DATA2} renderItem={renderItem2}
              keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
            </FlatList>
          </View>
        </View>
        <List />
      </View>
    );

    const renderItem2 = ({ item }) => (
      <View style={styles.scrollBox}>
        <Text style={{fontSize: 16, padding: 3}}>{item.id}주</Text>
      </View>
    ); 

  return (
    <View style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Main