import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import Icon4 from 'react-native-vector-icons/AntDesign'
import { getStatusBarHeight } from "react-native-status-bar-height"
import axios from 'axios'
import moment from 'moment'

import Back from '../../../../public/assets/svg/Back.svg'
import Search from '../../../../public/assets/svg/Search.svg'
import Arrow from '../../../../public/assets/svg/Arrow-Right.svg'
import Chat from '../../../../public/assets/svg/Chat.svg'
import Like from '../../../../public/assets/svg/Like.svg'

const styles = StyleSheet.create({
  container:{
    height: '97%',
    marginTop: getStatusBarHeight(),
  },
  header:{
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchIconBox:{
    position: 'absolute',
    left: 15,
    top: 10,
  },
  textInput:{
    backgroundColor: '#F5F5F5',
    marginLeft : 20,
    width: '90%',
    height: 45,
    paddingLeft: 50,
    justifyContent: 'center',
  },
  main:{

  },
  main2:{
    backgroundColor: 'white',
  },
  momstalk:{
    height: 80,
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#F5F5F5'
  },
  mainBox:{
    paddingLeft: 15,
    paddingRight: 15,
  },
  profile:{
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  dateBox:{
    position: 'absolute',
    right: 0,
    bottom: 20,
  },
  dotBox:{
    position: 'absolute',
    right: 0,
    top: 20,
  },
  notBox:{
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  }

})

const Main = ({navigation}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    }
  ];

  const [search, setSearch] = useState('');
  const [materialList, setMaterialList] = useState();

  console.log('materialList: ', materialList);

  useEffect(()=>{
    const boardSearch = async() => {
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/search/needslist',
                headers: { 
                  'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzI4ODU1NDAsImV4cCI6MTY3NTQ3NzU0MH0.IIEc85n1yAqgQ1HZZ8_yiSJWOXlX3E2BUXDIoaqYJD8', 
                  'Content-Type': 'application/json'
                },
                data: { keyword: search}
            });
            console.log('boardSearch: ', response.data);
            setMaterialList(response.data);
        }catch(error){
            console.log('materialSearch axios error', error);
            setMaterialList(undefined);
        }
    }
    boardSearch();
}, [search]);

const dayCalculate = (date) => {
  switch(true){
    case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
    case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
    default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
  }
}

  const MaterialList = () => {
    let arr = [];
    materialList.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.momstalk} key={index} onPress={()=>navigation.navigate('맘스토크 상세내용', {item: x})}>
        <View style={styles.dateBox}>
          <Text style={{fontSize: 12, color: '#9E9E9E'}}>{dayCalculate(x.boardDate)}</Text>
        </View>
        
        <View>
          <Text>{x.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{x.nickname}</Text>
            <Like height={17}/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{x.recommend}</Text>
            <Chat height={17}/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{x.commentsCount}</Text>
          </View>
        </View>
        
      </TouchableOpacity>
      )
    })
    return arr;
  }

  const renderItem = ({ item }) => (
    <View>
        <View style={styles.mainBox}>
          {materialList.length !== 0 ? <MaterialList /> :
           <View style={styles.notBox}><Text style={{fontSize: 16, color: '#9E9E9E'}}>검색결과가 없습니다.</Text></View>}
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Back/>
        <View style={styles.textInput}>
          <View style={styles.searchIconBox}><Search width={22}/></View>
          <TextInput placeholder='검색하실 단어를 입력하세요.' onChangeText={(e)=>setSearch(e)}></TextInput>
          <TouchableOpacity onPress={()=>navigation.navigate('맘스 톡')}></TouchableOpacity>
        </View>
      </View>
      <View style={styles.main2}>
      { materialList == undefined ? <View></View> :
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.title} >
        </FlatList>
      }
      </View>
    </View>
  )
}

export default Main