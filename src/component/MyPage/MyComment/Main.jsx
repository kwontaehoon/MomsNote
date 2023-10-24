import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import moment from 'moment'

import More from '../../../../public/assets/svg/More.svg'
import { useDispatch, useSelector } from 'react-redux'
import { postMyComment } from '../../../Redux/Slices/MyCommentSlice'
import { postMyCommentCount } from '../../../Redux/Slices/MyCommentCountSlice'

import Modal from './DotModal'
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
    zIndex: 999,
    padding: 5
  },
})

const Main = () => {

  const dispatch = useDispatch();
  const info = useSelector(state => { return state.myComment.data; });
  const myCommentSet = useSelector(state => { return state.myComment.refresh; });
  const myCommentCountSet = useSelector(state => { return state.myComment.refresh; });
  const user = useSelector(state => {return state.user.data});
  const [modal, setModal] = useState({
    open: false,
    contents: ''
  }); // dot modal

  useEffect(()=>{
    dispatch(postMyComment(myCommentSet));
    dispatch(postMyCommentCount(myCommentCountSet));

  }, [modal]);

const dotClick = (e) => {
  setModal({...modal, open: true, commentsId: e.commentsId});
}
  
  const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.momstalk}>

    <TouchableOpacity style={styles.dotBox} onPress={()=>dotClick(item)}><More/></TouchableOpacity>

    <Image source={{ uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${user.profile}` }} style={styles.profile}/>

    <View>
      <View style={{flexDirection: 'row', marginBottom: 3, alignItems: 'center'}}>
        <Text style={{fontWeight: '600'}}>{item.nickname}</Text>
        <Text style={{marginLeft: 5, color: '#9E9E9E'}}>{moment(item.commentsDate).format('YY.MM.DD')}</Text>
      </View>
      <Text numberOfLines={1}>{item.contents}</Text>
    </View>

  </TouchableOpacity>
  );

  return info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  : (
    <View style={styles.container}>

      <Modal modal={modal} setModal={setModal} />

      <View style={styles.main}>
      {info == '0' ?
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