import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker'
import { WithLocalSvg } from "react-native-svg"

import Like from '../../../../public/assets/svg/Like.svg'
import Chat from '../../../../public/assets/svg/Chat.svg'

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
    borderWidth: 0,
    backgroundColor: '#F5F5F5',
  },
  main:{
    height: '100%',
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    borderWidth: 1,
    height: 80,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    padding: 15,
  },
  infoBox:{
    flexDirection: 'row',
    marginTop: 5,
  },
  clockBox:{
    position: 'absolute',
    right: 15,
    bottom: 20,
  },
})


const Talk1 = ({navigation}) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
    {label: '최신순', value: '1'},
    {label: '인기순', value: '2'},
    {label: '마감임박', value: '3'},
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
]); // 맘스톡 정보

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('출산리스트 공유 상세내용', item)}>
        <View style={styles.clockBox}><Text style={{color: '#9E9E9E', fontSize: 12}}>12시간전</Text></View>
        <Text>{item.title}</Text>
        <View style={styles.infoBox}>
              <Text style={{color: '#9E9E9E', fontSize: 13}}>{item.userId} </Text>
              <Like fill='#9E9E9E' width={13} height={17}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend}  </Text>
              <Chat fill='#9E9E9E' width={13} height={17}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend} </Text>
        </View>

    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
        <View style={[styles.header2FilterBox, {paddingBottom: 5}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}></Text>
            <Text style={{fontSize: 16}}>{info.length} 건</Text>
          </View>
        </View>
        <View style={[styles.header2FilterBox, {width: '32%'}]}>
        <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='최신 순'
              textStyle={{fontSize: 13}} dropDownContainerStyle={{backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#F5F5F5'}}
              setOpen={setOpen} setValue={setValue} setItems={setItems} labelStyle={{paddingLeft: 18}}/>
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