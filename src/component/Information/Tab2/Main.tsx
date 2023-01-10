import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import moment from 'moment'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postEvent, setEventRefresh } from '../../../Redux/Slices/EventSlice'
import { postGuide } from '../../../Redux/Slices/GuideSlice'

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

  const DATA2 = [
    {
      id: 0,
      title: '전체'
    },
    {
      id: 1,
      title: '전체'
    },
    {
      id: 2,
      title: '전체'
    },
    {
      id: 3,
      title: '전체'
    },
    {
      id: 4,
      title: '전체'
    },
    {
      id: 5,
      title: '전체'
    },
    {
      id: 6,
      title: '전체'
    },
    {
      id: 7,
      title: '전체'
    },
    {
      id: 8,
      title: '전체'
    },
    {
      id: 9,
      title: '전체'
    },
    {
      id: 10,
      title: '전체'
    },
    {
      id: 11,
      title: '전체'
    },
  ];
  
  const dispatch = useDispatch();
  const eventSet = useSelector(state => { return state.event.refresh });
  const info = useSelector(state => { return state.event.data; });
  const [week, setWeek] = useState([true, false, false, false, false, false,
  false, false, false, false, false, false]);
  console.log('행사정보: ', info);

    useEffect(()=>{
      dispatch(postEvent(eventSet));
    }, [eventSet]);

    const change = (e) => { // 몇 주차 border, 글자두께 변경
      console.log('첫번째 e: ', e);
      let arr = Array.from({length: 12}, ()=>{ return false});

      arr[e] = !arr[e];
      setWeek(arr);

        if(e-9 < 0){
          e = '0' + (e+1);
        } else e += 1;
      
      console.log('두번째 e: ', e);

      dispatch(postEvent({
        start: `${new Date().getFullYear()}-${e}`,
        end: `${new Date().getFullYear()}-${e}`
      }))
    }

    const dateFilter = (item) => {
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      return(<Text>{`${item.eventStartDate.split('-')[1]}.${item.eventStartDate.split('-')[2]}(${days[moment(item.eventStartDate).day()]})`} ~ {`${item.eventEndDate.split('-')[1]}.${item.eventEndDate.split('-')[2]}(${days[moment(item.eventEndDate).day()]})`}</Text>)
    }

  const renderItem = ({ item }) => (
    <>
      {info.length !== 0 ? <TouchableOpacity style={styles.main2} onPress={()=>navigation.navigate('행사정보 상세페이지', item)}>
          <View style={styles.dateBox}>{dateFilter(item)}</View>
          <Text style={{fontWeight: '500'}}>{item.title}</Text>
      </TouchableOpacity> : <View style={styles.main2}><Text>gg</Text></View>}

    </>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.scrollBox} onPress={()=>change(item.id)}>
      <Text style={{fontSize: 16, padding: 3, fontWeight: week[item.id] ? 'bold' : '400',
        color: week[item.id] ? 'black' : '#9E9E9E', borderBottomWidth: week[item.id] ? 2 : 0 }}>{item.id+1}월</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <View style={styles.headerBox}><Text style={{fontSize: 18, fontWeight: '600'}}>{moment().format('YYYY')}년</Text></View>
          <View style={styles.headerBox2}>
            <FlatList data={DATA2} renderItem={renderItem2}
              keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
            </FlatList>
          </View>
        </View>
        <View style={styles.main}>
          <FlatList data={info} renderItem={renderItem}
              keyExtractor={item => item.boardId}>
          </FlatList>
        </View>
     </View>
  )
}

export default Talk1