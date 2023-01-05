import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import Icon4 from 'react-native-vector-icons/AntDesign'
import { getStatusBarHeight } from "react-native-status-bar-height"
import axios from 'axios'
import moment from 'moment'

import Back from '../../../public/assets/svg/Back.svg'
import Search from '../../../public/assets/svg/Search.svg'
import Arrow from '../../../public/assets/svg/Arrow-Right.svg'
import Chat from '../../../public/assets/svg/Chat.svg'
import Like from '../../../public/assets/svg/Like.svg'
import More from '../../../public/assets/svg/More.svg'

const styles = StyleSheet.create({
  container:{
    height: '97%',
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  header:{
    height: 80,
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
    height: '90%',
  },
  titleBox:{
    height: 50,
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
    alignItems: 'center'
  }

})

const Main = ({navigation}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    }
  ];

  const [momsSearch, setMomsSearch] = useState();
  const [materialSearch, setMaterialSearch] = useState();
  const [commentSearch, setCommentSearch] = useState();
  const [experienceSearch, setExperienceSearch] = useState();

  useEffect(()=>{
    const boardSearch = async() => {
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/search/board',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data: { keyword: '테스트'}
            });
            console.log('boardSearch: ', response.data);
            setMomsSearch(response.data);
        }catch(error){
            console.log('boardSearch axios error', error);
        }
    }
    boardSearch();
}, []);

useEffect(()=>{
  const materialSearch = async() => {
      try{
          const response = await axios({
              method: 'post',
              url: 'https://momsnote.net/api/search/needs',
              headers: { 
                'Content-Type': 'application/json'
              },
              data: { keyword: '테스트'}
          });
          console.log('materialSearch: ', response.data);
          setMaterialSearch(response.data);
      }catch(error){
          console.log('materialSerach axios error', error);
      }
  }
  materialSearch();
}, []);

useEffect(()=>{
  const experienceSearch = async() => {
      try{
          const response = await axios({
              method: 'post',
              url: 'https://momsnote.net/api/search/comments',
              headers: { 
                'Content-Type': 'application/json'
              },
              data: { keyword: '테스트'}
          });
          console.log('commentSearch', response.data);
          setCommentSearch(response.data);
      }catch(error){
          console.log('commentSearch axios error', error);
      }
  }
  experienceSearch();
}, []);

useEffect(()=>{
  const commentSearch = async() => {
      try{
          const response = await axios({
              method: 'post',
              url: 'https://momsnote.net/api/search/experience',
              headers: { 
                'Content-Type': 'application/json'
              },
              data: { keyword: '테스트'}
          });
          console.log('experienceSearch: ', response.data);
          setExperienceSearch(response.data);
      }catch(error){
          console.log('experienceSearch axios error', error);
      }
  }
  commentSearch();
}, []);


const dayCalculate = (date) => {
  switch(true){
    case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
    case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
    default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
  }
}

  const MomsTalk = () => {
    let arr = [];
    momsSearch.filter((x, index) => {
      arr.push(
        <View style={styles.momstalk} key={index}>
        <View style={styles.dateBox}>
          <Text style={{fontSize: 12, color: '#9E9E9E'}}>1분전</Text>
        </View>
        
        <View>
          <Text>5주차 맘 입덧 질문있어요</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{x.nickname}</Text>
            <Like height={17}/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{x.recommend}</Text>
            <Chat height={17}/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{x.commentsCount}</Text>
          </View>
        </View>
        
      </View>
      )
    })
    return arr;
  }

  const MaterialShare = () => {
    let arr = [];
    materialSearch.filter((x, index) => {
      arr.push(
        <View style={styles.momstalk} key={index}>
        <View style={styles.dateBox}>
          <Text style={{fontSize: 13, color: '#9E9E9E'}}>1분전</Text>
        </View>
        
        <View>
          <Text>5주차 맘 입덧 질문있어요</Text>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{x.nickname}</Text>
            <Like height={17}/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{x.recommend}</Text>
            <Chat height={17}/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{x.commentsCount}</Text>
          </View>
        </View>

      </View>
      )
    })
    return arr;
  }

  const Comment = () => {
    let arr = [];
    commentSearch.filter((x, index) => {
      arr.push(
       <View style={styles.momstalk} key={index}>
          <View style={styles.dotBox}><More /></View>
          <View style={styles.profile}></View>
        <View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
          <Text style={{fontWeight: '600'}}>{x.nickname}</Text>
          <Text style={{marginLeft: 5}}>{dayCalculate(x.commentsDate)}</Text>
        </View>
        <Text>저는 5주차 입니다.</Text>
        </View>
        
      </View>
      )
    })
    return arr;
  }
  const Experience = () => {
    let arr = [];
    experienceSearch.filter((x, index) => {
      arr.push(
       <View style={styles.momstalk} key={index}>
          <View style={styles.dotBox}><More /></View>
          <View style={styles.profile}></View>
        <View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
          <Text style={{fontWeight: '600'}}>{x.nickname}</Text>
          <Text style={{marginLeft: 5}}>{dayCalculate(x.commentsDate)}</Text>
        </View>
        <Text>저는 5주차 입니다.</Text>
        </View>
      </View>
      )
    })
    return arr;
  }


  const renderItem = ({ item, navigation}) => (
    <View>
        <View style={styles.titleBox}>
          <TouchableOpacity style={styles.arrowBox} onPress={()=>navigation.navigate('맘스 톡 서치')}><Arrow /></TouchableOpacity>
          <Text style={{fontWeight: '600'}}>맘스 톡 {momsSearch !== undefined ?  momsSearch.length : 0}건</Text>
        </View>
        <View style={styles.mainBox}>
          {momsSearch !== undefined ? <MomsTalk /> : <View><Text>MomsTalk</Text></View>}
        </View>
        <View style={styles.titleBox}>
          <TouchableOpacity style={styles.arrowBox} onPress={()=>navigation.navigate('출산준비물 공유 서치')}><Arrow /></TouchableOpacity>
          <Text style={{fontWeight: '600'}}>출산준비물 공유 {materialSearch !== undefined ? materialSearch.length : 0}건</Text>
        </View>
        <View style={styles.mainBox}>
          {materialSearch !== undefined ? <MaterialShare /> : <View><Text>gg</Text></View>}
        </View>
        <View style={styles.titleBox}>
          <TouchableOpacity style={styles.arrowBox} onPress={()=>navigation.navigate('댓글 서치')}><Arrow /></TouchableOpacity>
          <Text style={{fontWeight: '600'}}>댓글 {commentSearch !== undefined ? commentSearch.length : 0}건</Text>
        </View>
        <View style={styles.mainBox}>
          {commentSearch !== undefined ? <Comment /> : <View><Text>gg</Text></View>}
        </View>
        <View style={styles.titleBox}>
          <TouchableOpacity style={styles.arrowBox} onPress={()=>navigation.navigate('체험단 서치')}><Arrow /></TouchableOpacity>
          <Text style={{fontWeight: '600'}}>체험단 {experienceSearch !== undefined ? experienceSearch.length : 0}건</Text>
        </View>
        <View style={styles.mainBox}>
          {experienceSearch == undefined ? <Experience /> :
          <View style={styles.notBox}><Text style={{fontSize: 16, color: '#9E9E9E'}}>검색결과가 없습니다.</Text></View>}
        </View>
    </View>
  );

  

  return experienceSearch == undefined ? <View></View> : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Back/>
        <View style={styles.textInput}>
          <View style={styles.searchIconBox}><Search width={22}/></View>
          <TextInput placeholder='검색하실 단어를 입력하세요.'></TextInput>
        </View>
      </View>
      <View style={styles.main}>
        <FlatList data={DATA} renderItem={(item, navigation)=>renderItem(item, navigation, 1)}
            keyExtractor={item => item.title} showsVerticalScrollIndicator={false}>
        </FlatList>
      </View>
    </View>
  )
}

export default Main