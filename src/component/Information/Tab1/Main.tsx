import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { postGuide, setGuideCount, setGuideRefresh } from '../../../Redux/Slices/GuideSlice'

const styles = StyleSheet.create({
  container:{
    height: '91%',
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
    height: 50,
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
    height: '74%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  mainBox:{
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    height: 70,
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  console.log('guideSet: ', guideSet);
  console.log('맘스가이드 info: ', info);
  const [filter, setFilter] = useState([true, false, false, false, false, false]);

  useEffect(()=>{
    dispatch(postGuide(guideSet));
  }, [guideSet]);

  

  const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
    let arr = Array.from({length: 6}, () => {return false});
    arr[e] = !arr[e];
    setFilter(arr);
    dispatch(setGuideRefresh({subcategory: DATA[e].title}));
  }

  const renderItem = ({ item }) => (
    <View style={{justifyContent: 'center'}}>
      <View style={[styles.headerFilterBox, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]}>
        <TouchableOpacity onPress={()=>change(item.id)}>
          <Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스가이드 상세내용', item)}>
        <Text style={{fontSize: 15}}>{item.title} </Text>
    </TouchableOpacity>
  ); 

  return info == undefined ? <View></View> : (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
        </FlatList>
      </View>
      <View style={styles.header2}>
        <View style={styles.header2FilterBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{info.length}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        {info.length !== 0 ?
        <FlatList data={info} renderItem={renderItem2} onEndReached={()=>{console.log('밑에닿음'); dispatch(setGuideCount({count: guideSet.page + 1}))}} onEndReachedThreshold={0.6}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}>
        </FlatList> : 
        <View style={{marginTop: 50, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>}
      </View>
     </View>
  )
}

export default Talk1