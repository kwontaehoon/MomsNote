import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'

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
  header3:{
    height: '8%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  main:{
    height: '74%',
    padding: 10,
  },
  mainBox:{
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    height: 110,
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    paddingRight: 10,
    flexDirection: 'row',
  },
  mainBoxSub:{
    width: '25%',
  },
  mainBoxSub2:{
    flexDirection: 'row',
    paddingTop: 4,
  }
})


const Talk1 = ({navigation, info}) => {

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

  console.log('talk1 info: ', info);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'}
  ]);

  const [filter, setFilter] = useState([true, false, false, false, false, false]);
  const Filter = ['최신순', '인기순', '추천순']

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
        <View style={styles.mainBoxSub}>
          <Image source={require('../../../../public/assets/testimage.png')} />
        </View>
        <View style={[styles.mainBoxSub, {width: '50%'}]}>
          <Text style={{fontSize: 15, paddingTop: 2}}>{item.title} </Text>
          <View style={styles.mainBoxSub2}>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{item.userId} </Text>
            <Text style={{color: '#9E9E9E'}}>{item.recommend}</Text>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>댓글 갯수</Text>
          </View>
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