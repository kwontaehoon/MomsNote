import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView, Image, StatusBar } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import axios from 'axios'
import moment from 'moment'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Back from '../../../../public/assets/svg/Back.svg'
import Search from '../../../../public/assets/svg/Search.svg'
import Arrow from '../../../../public/assets/svg/Arrow-Right.svg'
import Chat from '../../../../public/assets/svg/Chat.svg'
import Like from '../../../../public/assets/svg/Like.svg'
import More from '../../../../public/assets/svg/More.svg'

const styles = StyleSheet.create({
  container:{
    height: '87%',
    marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
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
    backgroundColor: 'white',
  },
  titleBox:{
    padding: 15,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  arrowBox:{
    position: 'absolute',
    right: 10,
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
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  profile2:{
    width: 44,
    height: 44,
    marginRight: 10,
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

const Information = ({navigation}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    }
  ];

  const [search, setSearch] = useState('');

  const [momsSearch, setMomsSearch] = useState();
  const [materialSearch, setMaterialSearch] = useState();
  const [commentSearch, setCommentSearch] = useState();
  console.log('## commentSearch: ', commentSearch);
  const [experienceSearch, setExperienceSearch] = useState();
  const [guideSearch, setGuideSearch] = useState();

 useEffect(()=>{
    const boardSearch = async() => {
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/search/board',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data: { keyword: search }
            });
            console.log('boardSearch: ', response.data);
            setMomsSearch(response.data);
        }catch(error){
            console.log('boardSearch axios error', error);
            setMomsSearch(undefined);
        }
    }
    boardSearch();
}, [search]);

useEffect(()=>{
  const materialSearch = async() => {
      try{
          const response = await axios({
              method: 'post',
              url: 'https://momsnote.net/api/search/needs',
              headers: { 
                'Content-Type': 'application/json'
              },
              data: { keyword: search }
          });
          console.log('materialSearch: ', response.data);
          setMaterialSearch(response.data);
      }catch(error){
          console.log('materialSerach axios error', error);
          setMaterialSearch(undefined);
      }
  }
  materialSearch();
}, [search]);

useEffect(()=>{
  const experienceSearch = async() => {
      try{
          const response = await axios({
              method: 'post',
              url: 'https://momsnote.net/api/search/comments',
              headers: { 
                'Content-Type': 'application/json'
              },
              data: { keyword: search }
          });
          console.log('commentSearch', response.data);
          setCommentSearch(response.data);
      }catch(error){
          console.log('commentSearch axios error', error);
          setCommentSearch(undefined);
      }
  }
  experienceSearch();
}, [search]);

useEffect(()=>{
  const commentSearch = async() => {
      try{
          const response = await axios({
              method: 'post',
              url: 'https://momsnote.net/api/search/experience',
              headers: { 
                'Content-Type': 'application/json'
              },
              data: { keyword: search }
          });
          console.log('experienceSearch: ', response.data);
          setExperienceSearch(response.data);
      }catch(error){
          console.log('experienceSearch axios error', error);
          setExperienceSearch(undefined);
      }
  }
  commentSearch();
}, [search]);

useEffect(()=>{
  const guideSearch = async() => {
      try{
          const response = await axios({
              method: 'post',
              url: 'https://momsnote.net/api/search/guide/list',
              headers: { 
                'Content-Type': 'application/json'
              },
              data: { keyword: search }
          });
          console.log('guideSearch: ', response.data);
          setGuideSearch(response.data);
      }catch(error){
          console.log('guideSearch axios error', error);
          setGuideSearch(undefined);
      }
  }
  guideSearch();
}, [search]);

  const Guide = () => {
    let arr = [];
    guideSearch.filter((x, index) => {
      arr.push(
       <TouchableOpacity style={styles.momstalk} key={index} onPress={()=>navigation.navigate('맘스가이드 상세내용', x)}>
          <View style={styles.profile2}>
            {x.savedName == null ? '' : <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x.savedName.split('|')[0]}`}} style={{width: '100%', height: '100%'}} />}
          </View>
        <View>
            <Text style={{fontSize: 15, marginBottom: 3}}>{x.title}</Text>
        </View>
      </TouchableOpacity>
      )
    })
    return arr;
  }

  const renderItem = ({ item }) => (
    <View>
        <View style={styles.titleBox}>
          <TouchableOpacity style={styles.arrowBox} onPress={()=>navigation.navigate('체험단 서치', experienceSearch)}><Arrow fill='black' height={20}/></TouchableOpacity>
          <Text style={{fontWeight: '600'}}>맘스가이드 {guideSearch !== undefined ? guideSearch.length : 0}건</Text>
        </View>
        <View style={styles.mainBox}>
          {guideSearch.length !== 0 ? <Guide /> :
          <View style={styles.notBox}><Text style={{fontSize: 16, color: '#9E9E9E'}}>검색결과가 없습니다.</Text></View>}
        </View>
    </View>
  );

  

  return (
    <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                    <StatusBar />
            </SafeAreaView>
            <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}><Back /></TouchableOpacity>
        <View style={styles.textInput}>
          <View style={styles.searchIconBox}><Search width={22}/></View>
          <TextInput placeholder='검색하실 단어를 입력하세요.' onChangeText={(e)=>setSearch(e)}></TextInput>
          <TouchableOpacity onPress={()=>navigation.navigate('맘스 톡')}></TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
        { experienceSearch !== undefined && momsSearch !== undefined && materialSearch !== undefined && commentSearch !== undefined?
        <FlatList data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false}
            keyExtractor={item => item.title} >
        </FlatList> :  ''
        }
      </View>

	   </SafeAreaView>

</SafeAreaProvider>
  )
}

export default Information