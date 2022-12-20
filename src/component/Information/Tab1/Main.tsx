import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'

const styles = StyleSheet.create({
  container:{
    height: '91%',
    backgroundColor: 'white',
  },
  header:{
    height: '10%',
    backgroundColor: '#F5F5F5',
  },
  headerFilterBox:{
    height: 40,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    margin: 7,
    borderRadius: 20,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    padding: 10,
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
  mainBoxSub:{
    width: '50%',
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'}
  ]);
  const [info, setInfo] = useState([
    {
        boardId: 1,
        cateGory: '맘스토크',
        subcategory: '출산리스트',
        userId: '별똥맘',
        title: '5주차 맘 입덧 질문있어요',
        contents: '내용입니다.',
        recommend: '3',
        hits: '55',
        boardDate: '2022-12-13'
     },{
        boardId: 2,
        cateGory: '맘스토크',
        subcategory: '출산리스트',
        userId: '동글이',
        title: '좋은 정보 많이 공유해요~',
        contents: '내용입니다2.',
        recommend: '3',
        hits: '55',
        boardDate: '2022-12-13'
     },{
        boardId: 3,
        cateGory: '맘스토크',
        subcategory: '출산리스트',
        userId: '가양이',
        title: '출산전 꼭! 읽어야할 임산부 필수글',
        contents: '내용입니다3.',
        recommend: '3',
        hits: '55',
        boardDate: '2022-12-13'
    },{
      boardId: 3,
      cateGory: '맘스토크',
      subcategory: '출산리스트',
      userId: '가양이',
      title: '출산전 꼭! 읽어야할 임산부 필수글',
      contents: '내용입니다3.',
      recommend: '3',
      hits: '55',
      boardDate: '2022-12-13'
    },{
      boardId: 3,
      cateGory: '맘스토크',
      subcategory: '출산리스트',
      userId: '가양이',
      title: '출산전 꼭! 읽어야할 임산부 필수글',
      contents: '내용입니다3.',
      recommend: '3',
      hits: '55',
      boardDate: '2022-12-13'
    }
]);

  // useEffect(()=>{
  //   async function b(){
  //       const response = await axios.get('http://192.168.1.140:4000/api/test');
  //       console.log('response: ', response.data);
  //     }
  //     b();
  // }, [])

  const [filter, setFilter] = useState([true, false, false, false, false, false]);

  const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
    let arr = Array.from({length: 6}, () => {return false});
    arr[e] = !arr[e];
    setFilter(arr);
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
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스토크 상세내용', item)}>
        <View style={[styles.mainBoxSub, {width: '50%'}]}>
          <Text style={{fontSize: 15}}>{item.title} </Text>
        </View>
        <View style={[styles.mainBoxSub, {justifyContent: 'center', alignItems: 'flex-end'}]}>
          <Text style={{color: '#9E9E9E', fontSize: 12}}>{item.boardDate}</Text>
        </View>
    </TouchableOpacity>
  ); 

  return (
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
        <View style={[styles.header2FilterBox, {width: '32%'}]}>
          <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='최신 순'
              placeholderStyle={{color: '#9E9E9E', paddingLeft: 17, fontSize: 13}} textStyle={{fontSize: 15}} setOpen={setOpen} setValue={setValue} setItems={setItems} max={2} min={2}/>
        </View>
      </View>
      <View style={styles.main}>
        {info.length !== 0 ?
        <FlatList data={info} renderItem={renderItem2}
          keyExtractor={item => item.title} showsVerticalScrollIndicator={false}>
        </FlatList> : 
        <View style={{marginTop: 50, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>}
      </View>
     </View>
  )
}

export default Talk1