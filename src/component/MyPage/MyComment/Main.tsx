import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import axios from 'axios'
import moment from 'moment'

import More from '../../../../public/assets/svg/More.svg'
import { useDispatch, useSelector } from 'react-redux'
import { postMyComment } from '../../../Redux/Slices/MyCommentSlice'
import { postMyCommentCount } from '../../../Redux/Slices/MyCommentCountSlice'

import Modal from '../../Modal/DotModal'

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

  const [modal, setModal] = useState({

  });

  useEffect(()=>{
    dispatch(postMyComment(myCommentSet));
    dispatch(postMyCommentCount(myCommentCountSet));
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

    <View style={styles.profile}></View>
    <View>
      <View style={{flexDirection: 'row', marginBottom: 3}}>
        <Text style={{fontWeight: '600'}}>{item.nickname}</Text>
        <Text style={{marginLeft: 5}}>{dayCalculate(item.commentsDate)}</Text>
      </View>
      <Text numberOfLines={1}>{item.contents}</Text>
    </View>

  </TouchableOpacity>
  );

  

  return (
    <View style={styles.container}>

      {/* <Modal modal={modal} setModal={modal} /> */}

      <View style={styles.main}>
      {info == '' || info == undefined ?
        <View style={{marginTop: 200, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 댓글이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}>
        </FlatList>
        }
      </View>
    </View>
  )
}

export default Main