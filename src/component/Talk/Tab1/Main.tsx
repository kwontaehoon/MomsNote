import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  header:{
    height: '12%',
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
    width: '50%',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  header3:{
    height: '8%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  main:{
    height: '72%',
    padding: 10,
  },
  mainBox:{
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    height: 100,
    padding: 10,
  },
})


const Talk1 = ({navigation}: any) => {

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
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스토크 상세내용')}>
      <Text>{item.title}</Text>
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
        <View style={[styles.header2FilterBox, {paddingBottom: 16}]}><Text style={{fontSize: 16}}>0 건</Text></View>
        <View style={[styles.header2FilterBox, {alignItems: 'flex-end'}]}>
          {/* <SelectDropdown data={Filter} defaultValue={Filter[0]} buttonStyle={{width: 100, height: 30, backgroundColor: '#F5F5F5'}}
          buttonTextStyle={{fontSize: 13}} rowTextStyle={{fontSize: 14}}
	        onSelect={(selectedItem, index) => {
		          console.log(selectedItem, index)
          	}}
            renderDropdownIcon={isOpened => {
              return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={'#444'} size={18} />;
            }}
            /> */}
        </View>
      </View>
      <View style={styles.header3}>
        <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] 5주차 맘 입덧 질문있어요 슬라이딩 ~</Text>
      </View>
      <View style={styles.main}>
        <FlatList data={DATA} renderItem={renderItem2}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk1