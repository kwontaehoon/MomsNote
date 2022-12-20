import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'

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
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 0,
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
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'}
  ]);

  const [info, setInfo] = useState([]);
  console.log('info: ', info);

  useEffect(()=>{
    const b = async() => {
      await axios({
        method: 'post',
        url: 'https://momsnote.net/exp',
        data : {
          order: "new",
          count: 5,
          page: 1
      }
    }).then(function(response){
        setInfo(response.data);
    }).catch((error) => {
        console.log('error: ', error);
    })
      }
      b();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('체험단 상세페이지', item)}>
      <View style={styles.imageBox}>
        <Image source={require('../../../../public/assets/testimage.png')} style={{width: '100%', height: '100%', borderRadius: 8}} />
      </View>
      <View style={styles.contentBox}>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#FE9000', fontSize: 13, fontWeight: '600'}}>{item.applicationEndDate}일 남음</Text></View>
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
              placeholderStyle={{color: '#9E9E9E', paddingLeft: 17, fontSize: 13}} textStyle={{fontSize: 15}} setOpen={setOpen} setValue={setValue} setItems={setItems}
            />
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