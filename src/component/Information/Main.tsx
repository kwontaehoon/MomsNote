import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import Tab1 from './Tab1/Main'
import Tab2 from './Tab2/Main'
import Tab3 from './Tab3/Main'
import Tab4 from './Tab4/Main'
import { useIsFocused } from '@react-navigation/native'
import { postEvent, setEventRefresh } from '../../Redux/Slices/EventSlice'
import moment from 'moment'
import { useDispatch } from 'react-redux'

const styles = StyleSheet.create({
  container:{
    height: Dimensions.get('window').height - 135 + StatusBar.currentHeight,
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

    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const [year, setYear] = useState(moment().format('YYYY'));

    useEffect(()=>{
        const arr = [false, true, false, false];
        route.params == '행사 정보' ? setFilter(arr) : '';
    }, [isFocused]);

  const [filter, setFilter] = useState([true, false, false, false]);

  const filter_func = (e) => {
    let y = Number(year);
    let month = moment().format('M');
    if(month < 10){ month = '0' + (month); }

    let arr = Array.from({length: 4}, () => {return false})
    arr[e] = true;
    setFilter(arr);

    if (e - 9 < 0) {
      e = '0' + (e + 1);
    } else e += 1;

    dispatch(setEventRefresh({
      page: 1,
      count: 1,
      date: `${y}-${month}`
    }));
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