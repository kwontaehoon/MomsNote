import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postEvent, setEventRefresh } from '../../../Redux/Slices/EventSlice'
import { postEventCount } from '../../../Redux/Slices/EventCountSlice'
import { setEventCount } from '../../../Redux/Slices/EventSlice'
import { SafeAreaProvider } from 'react-native-safe-area-context' 
import { Platform } from 'expo-modules-core'

import Modal from './Modal/DatePick'

import Arrow_left from '../../../../public/assets/svg/Arrow-Left.svg'
import Arrow_right from '../../../../public/assets/svg/Arrow-Right.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postUser } from '../../../Redux/Slices/UserSlice'

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
  },
  container2:{

  },
  header:{
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
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
  },
  main2:{
    borderWidth: 1,
    minHeight: 60,
    flexDirection: 'row',
    padding: 15,
    borderColor: '#F5F5F5',
    alignItems: 'center',
  },
  dateBox:{
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: 10,
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
    const flatListRef = useRef();
    const eventSet = useSelector(state => { return state.event.refresh });
    const info = useSelector(state => { return state.event.data; });
    const [year, setYear] = useState(moment().format('YYYY'));
    const [week, setWeek] = useState([]);
    console.log('@@@: ', week);
    const infoCount = useSelector(state => { return state.eventCount.data; });

    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const [selectNumber, setSelectNumber] = useState(0);

    useEffect(async()=>{
      const month = await AsyncStorage.getItem('eventMonth');
      const arr = Array.from({length: 12}, () => { return false });
      if(!month){
        arr[moment().format('M')-1] = true;
      } else arr[Number(month)-1] = true;
      
      setWeek(arr);
    }, []);

    useEffect(()=>{
      setLoading(true);
      dispatch(postEvent(eventSet));
      dispatch(postEventCount(eventSet));
      setLoading(false);
    }, [eventSet, refreshing]);

    useEffect( () => {
      if(flatListRef.current){
          flatListRef.current.scrollToIndex({animated: true, index:selectNumber});
      }
  },[selectNumber])

    const change = (e) => { // 몇 주차 border, 글자두께 변경
      let arr = Array.from({length: 12}, ()=>{ return false});

      arr[e] = !arr[e];
      setWeek(arr);
      AsyncStorage.setItem('eventMonth', String(e+1));

      if(e-9 < 0){
        e = '0' + (e+1);
      } else e += 1;

      dispatch(setEventRefresh({
        page: 1,
        count: 1,
        date: `${year}-${e}`,
      }));
      dispatch(postEventCount({
        start: `${new Date().getFullYear()}-${e}`,
        end: `${new Date().getFullYear()}-${e}`
      }))
    }
    

    const dateFilter = (item) => {
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      return(<Text>{`${item.eventStartDate.split('-')[1]}.${item.eventStartDate.split('-')[2]}(${days[moment(item.eventStartDate).day()]})`} ~ {`${item.eventEndDate.split('-')[1]}.${item.eventEndDate.split('-')[2]}(${days[moment(item.eventEndDate).day()]})`}</Text>)
    }

    const yearCount = (e) => {
      let y = Number(year);

      e == 'plus' ? 
       year < Number(moment().format('YYYY')) + 3 ? (y+=1, setYear(Number(year) + 1)) : ''
       :
       year >  Number(moment().format('YYYY')) - 3 ? (y-=1, setYear(Number(year) - 1)) : ''
       let m = week.findIndex(x => x == true);
       
       if(m-9 < 0){
        m = '0' + (m+1);
      } else m += 1;

       dispatch(setEventRefresh({
        page: 1,
        count: 1,
        date: `${y}-${m}`
       }));
    }

    const onRefreshing = async() => {
      if(!refreshing){
        await setRefreshing(true);
        setRefreshing(false);
      }
    }

  const renderItem = ({ item }) => (
    <>
      {<TouchableOpacity style={styles.main2} onPress={()=>navigation.navigate('행사정보 상세페이지', item)}>
          <Text style={{fontWeight: '500', maxWidth: '60%'}} numberOfLines={2} ellipsizeMode='tail'>{item.title}</Text>
          <View style={styles.dateBox}>{dateFilter(item)}</View>
      </TouchableOpacity>}
    </>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.scrollBox} onPress={()=>change(item.id)}>
      <Text style={{fontSize: 16, padding: 3, fontWeight: week[item.id] ? 'bold' : '400',
        color: week[item.id] ? 'black' : '#9E9E9E', borderBottomWidth: week[item.id] ? 2 : 0 }}>{item.id+1}월</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>

      <SafeAreaView style={{ backgroundColor: 'white' }}>
          <StatusBar />
      </SafeAreaView>

      {info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={[styles.container, {flex: Platform.OS == 'ios' ?  0 : 1}]}/>
      :
      <SafeAreaView style={[styles.container, {flex: Platform.OS == 'ios' ?  0 : 1}]}>

        <Modal modal={modal} setModal={setModal} />

        <View style={styles.header}>
          <View style={styles.headerBox}>
            <TouchableOpacity style={{position: 'absolute', left: 0}} onPress={()=>yearCount('minus')}><Arrow_left fill='black'/></TouchableOpacity>
            
              <Text style={{fontSize: 18, fontWeight: '600'}}>{year}년</Text>

            <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={()=>yearCount('plus')}><Arrow_right fill='black' /></TouchableOpacity>
          </View>
          <View style={styles.headerBox2}>
          <FlatList data={DATA2} renderItem={renderItem2}
              ref={flatListRef} initialScrollIndex={week.findIndex(x => x)}
              keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
          </FlatList>
          </View>
        </View>
        <View style={styles.main}>
        {info == '0' ? <View style={{marginTop: 150, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem} onEndReached={()=>{
          dispatch(setEventCount({page: infoCount > (eventSet.page * 30) ? eventSet.page + 1 : eventSet.page, count: infoCount}));
        }} onEndReachedThreshold={0}
          onRefresh={onRefreshing} refreshing={refreshing}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}
          ListFooterComponent={loading && <ActivityIndicator />}>
        </FlatList> 
        }
        </View>
     </SafeAreaView>}
     </SafeAreaProvider>
  )
}

export default Talk1