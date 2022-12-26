import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'

import Like from '../../../../public/assets/svg/Like.svg'
import Chat from '../../../../public/assets/svg/Chat.svg'

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
    borderWidth: 0,
    backgroundColor: '#F5F5F5',
  },
  header3:{
    height: '8%',
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    position: 'relative',
    zIndex: -100,
  },
  main:{
    height: '74%',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainBoxSub:{
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateBox:{
    position: 'absolute',
    right: 10,
    top: 50,

  },
  mainBoxSub2:{
    flexDirection: 'row',
    paddingTop: 4,
  }
})


const Talk1 = ({navigation}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    },
    {
      id: '1',
      title: '자유게시판'
    },
    {
      id: '2',
      title: '일상이야기'
    },
    {
      id: '3',
      title: '임신정보'
    },
    {
      id: '4',
      title: '고민상담'
    },
    {
      id: '5',
      title: '질문게시판'
    }
  ];
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
    {label: '최신순', value: '1'},
    {label: '인기순', value: '2'},
    {label: '마감임박', value: '3'},
]);

  const [info, setInfo] = useState([
    { 
        id: '0',
        boardId: 1,
        cateGory: '맘스토크',
        subcategory: '출산리스트',
        userId: 5,
        title: '5주차 맘 입덧 질문있어요',
        contents: '내용입니다.',
        recommend: '3',
        hits: '55',
        boardDate: '2022-12-13',
        savedName: 'Baba India1.jpeg|Baba India2.jpeg'
     },{
        id: '1',
        boardId: 2,
        cateGory: '맘스토크',
        subcategory: '출산리스트',
        userId: 5,
        title: '좋은 정보 많이 공유해요~',
        contents: '내용입니다2.',
        recommend: '3',
        hits: '55',
        boardDate: '2022-12-13',
        savedName: 'Baba India2.jpeg'
     },{
        id: '2',
        boardId: 3,
        cateGory: '맘스토크',
        subcategory: '출산리스트',
        userId: 5,
        title: '출산전 꼭! 읽어야할 임산부 필수글',
        contents: '내용입니다3.',
        recommend: '3',
        hits: '55',
        boardDate: '2022-12-13',
        savedName: 'Baba India1.jpeg|Baba India2.jpeg|d'
    },{
        id: '3',
        boardId: 3,
        cateGory: '맘스토크',
        subcategory: '출산리스트',
        userId: 5,
        title: '출산전 꼭! 읽어야할 임산부 필수글',
        contents: '내용입니다3.',
        recommend: '3',
        hits: '55',
        boardDate: '2022-12-13',
        savedName: null
  }
]); // 맘스톡 정보

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
        { item.savedName !== null ? <View style={styles.mainBoxSub}>
          <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: 68, height: 68}}/>
          </View> : ''
        }
        <View style={[styles.mainBoxSub, {width: '55%', justifyContent: 'flex-start', paddingTop: 5}]}>
          <Text style={{fontSize: 15, paddingTop: 2}}>{item.title} </Text>
          <View style={styles.mainBoxSub2}>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{item.userId} </Text>
            <Like width={12} height={17} fill='#9E9E9E'/>
            <Text style={{color: '#9E9E9E'}}> {item.recommend}  </Text>
            <Chat width={12} height={17} fill='#9E9E9E'/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}> {item.hits}</Text>
          </View>
        </View>
        <View style={[styles.dateBox, {justifyContent: 'center', alignItems: 'flex-end'}]}>
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
              textStyle={{fontSize: 13}} dropDownContainerStyle={{backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#F5F5F5'}}
              setOpen={setOpen} setValue={setValue} setItems={setItems} labelStyle={{paddingLeft: 18}}/>
        </View>
      </View>
      <View style={[styles.header3, {display: info.length === 0 ? 'none' : 'flex'}]}>
        <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] 5주차 맘 입덧 질문있어요 슬라이딩 ~</Text>
      </View>
      <View style={styles.main}>
        {info.length !== 0 ?
        <FlatList data={info} renderItem={renderItem2}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList> : 
        <View style={{marginTop: 50, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>}
      </View>
     </View>
  )
}

export default Talk1