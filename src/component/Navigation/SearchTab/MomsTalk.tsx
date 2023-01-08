import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import axios from 'axios'
import moment from 'moment'

import Chat from '../../../../public/assets/svg/Chat.svg'
import Like from '../../../../public/assets/svg/Like.svg'

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
  dateBox:{
    position: 'absolute',
    right: 0,
    bottom: 20,
  },
})

const Main = ({navigation, route}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    }
  ];

  const [momsSearch, setMomsSearch] = useState(route.params);
  console.log('momsSearch: ', momsSearch);

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
        
      </View>
      )
    })
    return arr;
  }

  const renderItem = ({ item }) => (
    <View>
        <View style={styles.mainBox}>
          <MomsTalk />
        </View>
    </View>
  );

  return momsSearch.length == 0 ?
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