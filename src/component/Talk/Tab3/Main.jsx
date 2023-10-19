import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postExperience } from '../../../Redux/Slices/ExperienceSlice'
import { setExperienceFilter } from '../../../Redux/Slices/ExperienceSlice'
import { postExperienceCount } from '../../../Redux/Slices/ExperienceCountSlice'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
  container:{
    height: '85%',
    backgroundColor: 'white',
  },
  header2:{
    height: '8%',
    flexDirection: 'row',
  },
  header2FilterBox:{
    justifyContent: 'center',
    paddingLeft: 20,
  },
  filterBox:{
    width: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  InputBox:{
    borderWidth: 0,
  },
  main:{
    height: '92%',
    padding: 10,
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    width: '50%',
    height: 260,
    padding: 10,
  },
  imageBox:{
    height: '70%',
  },
  contentBox:{
    height: '30%'
  },
  content:{
    height: '33.4%',
    justifyContent: 'center'
  },
  mainBox2:{
    height: '50%',
    justifyContent: 'center',
    paddingLeft: 5,
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


const Talk3 = ({navigation}) => {

  const dispatch = useDispatch();
  const info = useSelector(state => {return state.experience.data});

  const infoCount = useSelector(state => { return state.experienceCount.data});
  const experienceSet = useSelector(state => { return state.experience.refresh; });

  const [plus, setPlus] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
        {label: '최신 순', value: '1'},
        {label: '인기 순', value: '2'},
  ]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    filteringSet();
    setLoading(true);
    dispatch(postExperience(experienceSet));
    dispatch(postExperienceCount(infoCount));
    setLoading(false);
  }, [value]);

  const filteringSet = async() => {
    dispatch(postExperience(!await AsyncStorage.getItem('event_filter') ? experienceSet : await AsyncStorage.getItem('event_filter') == '인기 순' ?
  ( setValue('2'), {
    order: 'best',
    count: 1,
    page: 1,
  }) : ( setValue('1'), {
    order: 'new',
    count: 1,
    page: 1,
  })
    ));
  }

  const filtering = async(e) => {
    AsyncStorage.setItem('event_filter', e.label);
    const filter = await AsyncStorage.getItem('event_filter');
    filter == '인기 순' ? dispatch(setExperienceFilter({filter: 'new'})) : dispatch(setExperienceFilter({filter: 'best'}))
  };

  const dateFiltering = (e) => {
    switch(true){
      case moment(e.applicationEndDate).diff(new Date(), 'day')+1 > 0: return <Text>신청 {moment(e.applicationEndDate).diff(new Date(), 'day')+1}일 남음</Text>;
      case moment(e.registrationEndDate).diff(new Date(), 'day')+1 > 0: return <Text>등록 {moment(e.registrationEndDate).diff(new Date(), 'day')+1}일 남음</Text>;
      default: <Text>발표 {moment(e.openDate).diff(new Date(), 'day')+1}일 남음</Text>
    }
  }

  const onEnd = async () => {
    setLoading(true);

    try {
        const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/exp',
            data: {
                order: 'new',
                count: 1,
                page: 2
            }
        });
        const addInfo = [...plus, ...response.data];
        setPlus(addInfo);

    } catch (error) {
        return undefined;
    }
}

  const onRefreshing = async() => {
    if(!refreshing){
      setRefreshing(true);
      dispatch(postExperience(!await AsyncStorage.getItem('event_filter') ? experienceSet : await AsyncStorage.getItem('event_filter') == '인기 순' ?
      ( setValue('2'), {
        order: 'best',
        count: 1,
        page: 1,
      }) : ( setValue('1'), {
        order: 'new',
        count: 1,
        page: 1,
      })
        ));
      dispatch(postExperienceCount(infoCount));
      setRefreshing(false);
    }
  };
  

  const renderItem = ({ item }) =>
    moment(item.registrationEndDate).diff(moment(), "days") < 0 ?
    (
      <TouchableOpacity style={[styles.mainBox, {opacity: 0.5}]} onPress={()=>navigation.navigate('체험단 상세페이지', item)}>
        <View style={styles.imageBox}>
          { item.savedName !== null ?<Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: '100%', height: '100%', borderRadius: 8}} /> : ''}
        </View>
        <View style={styles.contentBox}>
          <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#757575', fontSize: 13, fontWeight: '600'}}>종료</Text></View>
          <View style={styles.content}><Text style={{fontWeight: '500'}}>{item.title}</Text></View>
          <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>신청 {item.appCount}명/모집 {item.maxPeople}명</Text></View>
        </View>
      </TouchableOpacity>
    ):(
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('체험단 상세페이지', item)}>
      <View style={styles.imageBox}>
        { item.savedName ?<Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: '100%', height: '100%', borderRadius: 8}} /> : ''}
      </View>
      <View style={styles.contentBox}>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#FE9000', fontSize: 13, fontWeight: '600'}}>{dateFiltering(item)}</Text></View>
        <View style={styles.content}><Text style={{fontWeight: '500'}} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text></View>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>신청 {item.appCount}명/모집 {item.maxPeople}명</Text></View>
      </View>
    </TouchableOpacity>
  ); 

  return info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
      : (
    <View style={styles.container}>
      <View style={styles.header2}>
        <View style={[styles.header2FilterBox, {paddingBottom: 5}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{info?.length}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
          </View>
        </View>
        <View style={styles.filterBox}>
        <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='최신 순' onSelectItem={(e)=>filtering(e)}
              textStyle={{fontSize: 13}} dropDownContainerStyle={{backgroundColor: 'white', borderColor: 'white'}}
              setOpen={setOpen} setValue={setValue} setItems={setItems}/>
        </View>
      </View>

      <View style={styles.main}>
        { info == 0 ? <View style={{height: '70%', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>모집중인 체험단이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem} numColumns={2} showsVerticalScrollIndicator={false}
          onRefresh={onRefreshing} refreshing={refreshing}
          onEndReached={()=>
          { onEnd();
            // dispatch(setExperienceCount({page: infoCount > (experienceSet.page * 30) ? experienceSet.page + 1 :experienceSet.page, count: infoCount}))
          }} onEndReachedThreshold={0}
          keyExtractor={(item, index) => String(index)}>
          </FlatList>
}
      </View>
     </View>
  )
}

export default Talk3