import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import axios from 'axios'
import moment from 'moment'

import More from '../../../../public/assets/svg/More.svg'
import { useDispatch, useSelector } from 'react-redux'
import { postMyComment } from '../../../Redux/Slices/MyCommentSlice'

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
    borderBottomWidth: 1,
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
  dotBox:{
    position: 'absolute',
    right: 0,
    top: 20,
  },
})

const Main = () => {

const dispatch = useDispatch();
const info = useSelector(state => { return state.myComment.data; });
  console.log('내가쓴 댓글: ', info);

  useEffect(()=>{
    dispatch(postMyComment());
  }, []);

const dayCalculate = (date) => {
  switch(true){
    case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
    case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
    default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
  }
}


  const renderItem = ({ item }) => (
    <View>
        <View style={styles.mainBox}>
            <View style={styles.momstalk}>
            <View style={styles.dotBox}><More /></View>
            <View style={styles.profile}></View>
            <View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
            <Text style={{fontWeight: '600'}}>{x.nickname}</Text>
            <Text style={{marginLeft: 5}}>{dayCalculate(x.commentsDate)}</Text>
            </View>
            <Text>{x.contents}</Text>
            </View>
            
        </View>
        </View>
      </View>
  );

  

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <FlatList data={info} renderItem={renderItem}
            keyExtractor={item => item.title} showsVerticalScrollIndicator={false}>
        </FlatList>
      </View>
    </View>
  )
}

export default Main