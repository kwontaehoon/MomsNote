import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import axios from 'axios'
import moment from 'moment'

import More from '../../../../public/assets/svg/More.svg'
import { useDispatch, useSelector } from 'react-redux'
import { postMyComment } from '../../../Redux/Slices/MyCommentSlice'
import { postMyCommentCount } from '../../../Redux/Slices/MyCommentCountSlice'

import Modal from '../../Modal/DotModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
  container:{
    height: '100%',
    backgroundColor: 'white',
  },
  rainboxBox:{
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  main:{

  },
  momstalk:{
    height: 80,
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#F5F5F5',
    paddingRight: 65,
    paddingLeft: 15,
  },
  profile:{
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5
  },
  dotBox:{
    position: 'absolute',
    right: 15,
    top: 20,
  },
})

const Main = () => {

  const dispatch = useDispatch();
  const info = useSelector(state => { return state.myComment.data; });
  console.log('내가 쓴 댓글 info: ', info);
  const myCommentSet = useSelector(state => { return state.myComment.refresh; });
  const myCommentCountSet = useSelector(state => { return state.myComment.refresh; });
  const infoCount = useSelector(state => { return state.myCommentCount.data; });
  console.log('내가 쓴 댓글 info 갯수: ', infoCount);

  const [userInfo, setUserInfo] = useState();

  useEffect(()=>{
    dispatch(postMyComment(myCommentSet));
    dispatch(postMyCommentCount(myCommentCountSet));

    const user = async() => {
      const user = await AsyncStorage.getItem('user');
      setUserInfo(JSON.parse(user));
  }
  user();
  }, []);

const dayCalculate = (date) => {
  switch(true){
    case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
    case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
    default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
  }
}


  const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.momstalk}>

    <More style={styles.dotBox}/>

    <Image source={{ uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${userInfo.profile}` }} style={styles.profile}/>

    <View>
      <View style={{flexDirection: 'row', marginBottom: 3, alignItems: 'center'}}>
        <Text style={{fontWeight: '600'}}>{item.nickname}</Text>
        <Text style={{marginLeft: 5}}>{dayCalculate(item.commentsDate)}</Text>
      </View>
      <Text numberOfLines={1}>{item.contents}</Text>
    </View>

  </TouchableOpacity>
  );

  

  return userInfo == undefined ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  : (
    <View style={styles.container}>

      {/* <Modal modal={modal} setModal={modal} /> */}

      <View style={styles.main}>
      {info == '' || info == undefined ?
        <View style={{marginTop: 200, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 댓글이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem}
          keyExtractor={(item, index) => String(index)} showsVerticalScrollIndicator={false}>
        </FlatList>
        }
      </View>
    </View>
  )
}

export default Main