import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { postGuideCount } from '../../../Redux/Slices/GuideCountSlice'
import { postGuide, setGuideRefresh } from '../../../Redux/Slices/GuideSlice'
import { setGuideCountRefresh } from '../../../Redux/Slices/GuideCountSlice'
import { Platform } from 'expo-modules-core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  header:{
    height: '15%',
    backgroundColor: '#F5F5F5',
  },
  headerBox:{
    justifyContent: 'center',
  },
  headerFilterBox:{
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
  },
  header2:{
    height: '10%',
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  header2FilterBox:{
    width: '68%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  InputBox:{
    borderWidth: 1,
    borderColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderRadius: 0,
  },
  main:{
    height: '75%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  mainBox:{
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 3,
  },
  mainBox2:{
    width: 80,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox3:{
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5
  }
})


const Talk1 = ({navigation}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    },{
      id: '1',
      title: '임신초기'
    },{
      id: '2',
      title: '임신중기'
    },{
      id: '3',
      title: '임신후기'
    },{
      id: '4',
      title: '질환'
    },
  ];

  const dispatch = useDispatch();
  const info = useSelector(state => { return state.guide.data });
  const guideSet = useSelector(state => { return state.guide.refresh });
  const infoCount = useSelector(state => { return state.guideCount.data });
  const guideCountSet = useSelector(state => { return state.guideCount.refresh });

  const [filter, setFilter] = useState([true, false, false, false, false, false]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [plus, setPlus] = useState({
    newInfo: [],
    page: 1,
    subcategory: '전체'
  });

  useEffect(()=>{
    const momsTalk = async() => {
      const filter = await AsyncStorage.getItem('momsInfoTab');

      if(filter){
        const arr = DATA.map(x => x.title == filter);
        setFilter(arr);
      }
    }
    momsTalk();
  }, []);

  useEffect(()=>{
    setLoading(true);
    const async = async() => {
      dispatch(postGuide({
        count: 50,
        page: 1,
        subcategory: await AsyncStorage.getItem('momsInfoTab')
      }));
    }
    
    dispatch(postGuideCount(guideCountSet));
    setLoading(false);
    async();
  }, [guideSet, guideCountSet]);

  useEffect(()=>{

    if(info?.length !== 0){
      setPlus({...plus, newInfo: info});
    }
  }, [info]);

  const onEnd = async () => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/api/guideboard/list',
            data: {
                order: 'new',
                count: 1,
                page: plus.page +1,
                subcategory: await AsyncStorage.getItem('momsInfoTab')
            }
        });
        if(response?.data?.length == 0){
          return;
        }else{
          const addInfo = [...plus?.newInfo, ...response.data];
          setPlus({...plus, newInfo: addInfo, page: plus.page+1});
        }
    } catch (error) {
        return undefined;
    }
}

  const change = async(e) => { // 카테고리 배경색상, 글자 색상 변경
    await AsyncStorage.setItem('momsInfoTab', DATA[e].title);
    let arr = Array.from({length: 6}, () => {return false});
    arr[e] = !arr[e];
    setFilter(arr);
    setPlus({...plus, page: 1, subcategory: DATA[e].title});
    dispatch(setGuideCountRefresh({subcategory: DATA[e].title}));
  }

  const onRefreshing = () => {
    if(!refreshing){
      setRefreshing(true);
      dispatch(postGuide(guideSet));
      setRefreshing(false);
    }
  }

  const renderItem = ({ item }) => (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity style={[styles.headerFilterBox, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]} onPress={()=>change(item.id)}>
          <Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스가이드 상세내용', item)} activeOpacity={1}>
        <View style={styles.mainBox3}><Text style={{fontSize: 15}} numberOfLines={1} >{item.title} </Text></View>
    </TouchableOpacity>
  ); 

  return info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={[styles.container, {flex: Platform.OS == 'ios' ?  0 : 1}]}/>
  : (
    <View style={[styles.container, {flex: Platform.OS == 'ios' ?  0 : 1}]}>
      <View style={styles.header}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
        </FlatList>
      </View>
      <View style={styles.header2}>
        <View style={styles.header2FilterBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{infoCount}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        {info == '0' ? <View style={{marginTop: 150, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>
        :
        <FlatList data={plus.newInfo} renderItem={renderItem2} onEndReached={()=> onEnd()}
          onRefresh={onRefreshing} refreshing={refreshing}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}
          ListFooterComponent={loading && <ActivityIndicator />}>
        </FlatList>}
      </View>
     </View>
  )
}

export default Talk1