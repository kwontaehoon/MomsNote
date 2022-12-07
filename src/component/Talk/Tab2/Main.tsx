import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'

const styles = StyleSheet.create({
  container:{
    height: '83%',
    backgroundColor: 'white',
  },
  header:{
    height: '5%',
    backgroundColor: '#F5F5F5',
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
    height: '99%',
  },
  mainBox:{
    borderBottomWidth: 1,
    height: 100,
    padding: 15,
  },
  mainBox2:{
    height: '50%',
    justifyContent: 'center',
    paddingLeft: 5
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


const Talk1 = ({navigation}: any) => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '전체'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '자유게시판'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '일상이야기'
    },
    {
        id: '1',
        title: '임신정보'
    },
    {
        id: '2',
        title: '고민상담'
    },
    {
        id: '3',
        title: '질문게시판'
    }
  ];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'}
  ]);

  const Filter = ['최신순', '인기순', '추천순'];

  const [filter, setFilter] = useState([true, false, false, false]);

  const test = () => {
    console.log('test');
    navigation.navigate('Talk1Sub');
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={test}>
        <View style={styles.mainBox2}><Text style={{fontSize: 18,}}>{item.title}</Text></View>
        <View style={styles.mainBox3}>
            <View style={styles.infoBox}><Text style={{color: '#9E9E9E'}}>닉네임 추천 3 댓글 0</Text></View>
            <View style={styles.clockBox}><Text style={{color: '#9E9E9E'}}>12시간전</Text></View>
        </View>
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
        <View style={[styles.header2FilterBox, {paddingBottom: 5}]}><Text style={{fontSize: 16}}>0 건</Text></View>
        <View style={[styles.header2FilterBox, {width: '32%'}]}>
          <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='최신 순'
              placeholderStyle={{color: '#9E9E9E', paddingLeft: 17, fontSize: 13}} textStyle={{fontSize: 15}} setOpen={setOpen} setValue={setValue} setItems={setItems} max={2} min={2}/>
        </View>
      </View>
      <View style={styles.main}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk1