import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Tab1 from './Tab1/Main'
import Tab2 from './Tab2/Main'
import Tab3 from './Tab3/Main'
import Tab4 from './Tab4/Main'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  header:{
    height: 60,
    flexDirection: 'row',
  },
  headerBox:{
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  main:{
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
const Information = ({navigation, route}) => {

  console.log('맘스정보 route: ', route);

  const [filter, setFilter] = useState([true, false, false, false]);

  const filter_func = (e) => {
    let arr = Array.from({length: 4}, () => {return false})
    arr[e] = true;
    setFilter(arr);
  }

  const List = ({navigation}):any => {
    switch(true){
        case filter[0] === true: return <Tab1 navigation={navigation}/>
        case filter[1] === true: return <Tab2 navigation={navigation}/>
        case filter[2] === true: return <Tab3 navigation={navigation}/>
        case filter[3] === true: return <Tab4 navigation={navigation}/>
      }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[0] ? 'orange' : '#ECEFF1'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: filter[0] ? 'orange' : '#BDBDBD'}}>맘스가이드</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[1] ? 'orange' : '#ECEFF1'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: filter[1] ? 'orange' : '#BDBDBD'}}>행사 정보</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[2] ? 'orange' : '#ECEFF1'}]} onPress={()=>filter_func(2)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: filter[2] ? 'orange' : '#BDBDBD'}}>정부지원혜택</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[3] ? 'orange' : '#ECEFF1'}]} onPress={()=>filter_func(3)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: filter[3] ? 'orange' : '#BDBDBD'}}>Q&A</Text>
            </TouchableOpacity>
        </View>
        <List navigation={navigation}/>
    </View>
  )
}

export default Information