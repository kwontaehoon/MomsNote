import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import moment from 'moment'

const styles = StyleSheet.create({
  container:{
    height: '91%',
    backgroundColor: 'white',
  },
  header:{
    height: 10,
  },
  header2:{
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  header2FilterBox:{
    width: '68%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  InputBox:{
    borderWidth: 0,
  },
  main:{
    height: '90%',
    padding: 10,
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    width: '50%',
    height: 260,
    padding: 10,
  },
  imageBox:{
    height: '70%',
  },
  contentBox:{
    height: '30%'
  },
  content:{
    height: '33.4%',
    justifyContent: 'center'
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


const Talk3 = ({navigation}: any) => {



  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
        {label: '최신순', value: '1'},
        {label: '인기순', value: '2'},
        {label: '마감임박', value: '3'},
  ]);

  const [info, setInfo] = useState([]);
  console.log('체험단 info: ', info);

  useEffect(()=>{
    const exp = async() => {
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/exp',
        data : {
          order: "new",
          count: 5,
          page: 1
      }
    });
    setInfo(response.data);
    }
    exp();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('체험단 상세페이지', item)}>
      <View style={styles.imageBox}>
        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: '100%', height: '100%', borderRadius: 8}} />
      </View>
      <View style={styles.contentBox}>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#FE9000', fontSize: 13, fontWeight: '600'}}>{moment(item.applicationEndDate).diff(moment(), "days")}일 남음</Text></View>
        <View style={styles.content}><Text style={{fontWeight: '500'}}>{item.title}</Text></View>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>신청 {item.appCount}명/모집 {item.maxPeople}명</Text></View>
      </View>
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
        <View style={[styles.header2FilterBox, {paddingBottom: 5}]}><Text style={{fontSize: 16}}>{info.length} 건</Text></View>
        <View style={[styles.header2FilterBox, {width: '32%'}]}>
        <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='최신 순'
              textStyle={{fontSize: 13}} dropDownContainerStyle={{backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#F5F5F5'}}
              setOpen={setOpen} setValue={setValue} setItems={setItems} labelStyle={{paddingLeft: 18}}/>
        </View>
      </View>
      <View style={styles.main}>
        {info.length !== 0 ? <FlatList data={info} renderItem={renderItem} numColumns={2} showsVerticalScrollIndicator={false}
          keyExtractor={item => item.appCount}>
          </FlatList>:
          <View style={{marginTop: 100, alignItems: 'center'}}><Text style={{color: '#757575', fontSize: 16}}>모집중인 체험단이 없습니다.</Text></View>}
      </View>
     </View>
  )
}

export default Talk3