import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import axios from 'axios'
import moment from 'moment'

import More from '../../../../public/assets/svg/More.svg'

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

const Main = ({navigation, route}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    }
  ];

const [commentSearch, setCommentSearch] = useState(route.params);

const dayCalculate = (date) => {
  switch(true){
    case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
    case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
    default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
  }
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
        <Text>{x.contents}</Text>
        </View>
        
      </View>
      )
    })
    return arr;
  }


  const renderItem = ({ item }) => (
    <View>
        <View style={styles.mainBox}>
          <Comment />
        </View>
      </View>
  );

  

  return commentSearch.length == 0 ?
    <View style={styles.rainboxBox}>
      <Image source={require('../../../../public/assets/image/rainbow2.png')} />
    </View>
    : (
    <View style={styles.container}>
      <View style={styles.main}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.title} showsVerticalScrollIndicator={false}>
        </FlatList>
      </View>
    </View>
  )
}

export default Main