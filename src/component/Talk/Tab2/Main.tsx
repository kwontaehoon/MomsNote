import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker'
import { WithLocalSvg } from "react-native-svg"
import like from '../../../../public/assets/svg/like.svg'

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
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    borderBottomWidth: 1,
    height: 80,
    borderColor: '#F5F5F5'
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
    width: '50%',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
})


const Talk1 = ({navigation}) => {

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
]); // 맘스톡 정보

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('출산리스트 공유 상세내용', item)}>
        <View style={styles.mainBox2}><Text style={{fontSize: 15}}>{item.title}</Text></View>
        <View style={styles.mainBox3}>
            <View style={styles.infoBox}>
              <Text style={{color: '#9E9E9E', fontSize: 13}}>{item.userId} </Text>
              <Icon2 name='like2' size={13}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend} </Text>
              <Icon3 name='chatbox-outline' size={13}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend} </Text>
            </View>
            <View style={styles.clockBox}><Text style={{color: '#9E9E9E', fontSize: 12}}>12시간전</Text></View>
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
              placeholderStyle={{color: '#9E9E9E', paddingLeft: 17, fontSize: 13}} textStyle={{fontSize: 15}} setOpen={setOpen} setValue={setValue} setItems={setItems}/>
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