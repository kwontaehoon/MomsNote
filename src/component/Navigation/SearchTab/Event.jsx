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
    paddingLeft: 15,
    paddingRight: 15,
  },
  momstalk:{
    height: 80,
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#F5F5F5',
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
  dateBox2:{
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: 10
  },
})

const Main = ({navigation, route}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    }
  ];

const [info, setInfo] = useState(route.params);

const dateFilter = (item) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return(<Text>{`${item.eventStartDate.split('-')[1]}.${item.eventStartDate.split('-')[2]}(${days[moment(item.eventStartDate).day()]})`} ~ {`${item.eventEndDate.split('-')[1]}.${item.eventEndDate.split('-')[2]}(${days[moment(item.eventEndDate).day()]})`}</Text>)
  }

  const renderItem = () => {
    let arr = [];
    info.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.momstalk} key={index} onPress={() => navigation.navigate('행사정보 상세페이지', x)}>
          <Text style={{ fontWeight: '500' }} numberOfLines={1} ellipsizeMode='tail'>{x.title}</Text>
          <View style={styles.dateBox2}>{dateFilter(x)}</View>
        </TouchableOpacity>
        )
    })
    return arr;
  }


  return info.length == 0 ?
    <View style={styles.rainboxBox}>
        <Text>행사 정보</Text>
      <Image source={require('../../../../public/assets/image/rainbow2.png')} />
    </View>
    :(
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