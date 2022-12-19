import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker'
import { WithLocalSvg } from "react-native-svg"
import like from '../../../../public/assets/svg/like.svg'
import axios from 'axios'

const styles = StyleSheet.create({
  container:{
    height: '82%',
    backgroundColor: 'white',
  },
  header:{
    height: 10,
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
    height: '100%',
    padding: 15,
  },
  mainBox:{
    borderBottomWidth: 1,
    height: 60,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
  },
  mainBox2:{
    height: '50%',
    justifyContent: 'center',
  },
  mainBox3:{
    height: '50%',
    flexDirection: 'row',
  },
  infoBox:{
    width: '50%',
    flexDirection: 'row'
  },
  clockBox:{
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
  },
})


const Talk1 = ({navigation}) => {

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
    }
]);

    useEffect(()=>{
        async function b(){
            const response = await axios.get('http://192.168.1.140:4000/api/test');
            console.log('response: ', response.data);
        }
        b();
    }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('출산리스트 공유 상세내용', item)}>
        <View style={styles.mainBox2}><Text style={{fontSize: 15}}>{item.title}</Text></View>
        <View style={styles.clockBox}><Text style={{color: '#9E9E9E', fontSize: 12}}>12시간전</Text></View>
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
        <View style={[styles.header2FilterBox, {paddingBottom: 5}]}>
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
        <FlatList data={info} renderItem={renderItem}
          keyExtractor={item => item.id}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk1