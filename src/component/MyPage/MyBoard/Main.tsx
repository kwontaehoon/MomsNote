import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import moment from 'moment'
import { Video, AVPlaybackStatus } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux'
import { postBoard } from '../../../Redux/Slices/BoardSlice'
import Swiper from 'react-native-swiper'
import { setBoardRefresh, setBoardCount, setBoardFilter } from '../../../Redux/Slices/BoardSlice'
import { useIsFocused } from '@react-navigation/native'

import Like from '../../../../public/assets/svg/Like.svg'
import Chat from '../../../../public/assets/svg/Chat.svg'
import { postMyBoard } from '../../../Redux/Slices/MyBoardSlice'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  mainBox:{
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainBoxSub:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  videoImage:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 999
},
  dateBox:{
    position: 'absolute',
    right: 10,
    top: 50,
  },
  mainBoxSub2:{
    flexDirection: 'row',
    paddingTop: 4,
    alignItems: 'center',
  },
})


const Talk1 = ({navigation, route}:any) => {

  const dispatch = useDispatch();
  const info = useSelector(state => { return state.myBoard.data; });
  console.log('내가쓴 게시물: ', info);

  useEffect(()=>{
    dispatch(postMyBoard());
  }, []);

  const dayCalculate = (date:number) => {
    switch(true){
      case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
      case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
      default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
    }
  }

  const ImageBox = ({item}:any) => {
    const arr:string[] = [];
    const a = (item.split('|')).filter((x:string) => { if(x.charAt(x.length-1) === '4'){ arr.push(x); }else return x;});
    const infoFiltering = [...arr, ...a];

    if(infoFiltering[0].charAt(infoFiltering[0].length-1) == '4'){
      return(
        <View style={styles.mainBoxSub}>
          <View style={styles.videoImage}><Icon name='play' size={17} style={{color: 'white'}}/></View>
          <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${infoFiltering[0]}`}} style={{width: 68, height: 68}} resizeMode='cover'/>
        </View>
      )
    }else{
      return(
      <View style={styles.mainBoxSub}>
          <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.split('|')[0]}`}} style={{width: 68, height: 68}}/>
      </View>
      )
    }
  }

  const renderItem2 = ({ item }:any) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스토크 상세내용', {item})} activeOpacity={1}>
        { item.savedName == null ? '' : <ImageBox item={item.savedName}/>  }
        <View style={[styles.mainBoxSub, {paddingTop: 5, width: '65%', alignItems: 'flex-start'}]}>
          <Text style={{fontSize: 15, paddingTop: 2}} numberOfLines={1}>{item.title} </Text>
          <View style={styles.mainBoxSub2}>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{item.nickname} </Text>
            <Like width={12} height={17} fill='#9E9E9E'/>
            <Text style={{color: '#9E9E9E'}}> {item.recommend}  </Text>
            <Chat width={12} height={18} fill='#9E9E9E'/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}> {item.commentsCount}</Text>
          </View>
        </View>
        <View style={[styles.dateBox, {justifyContent: 'center', alignItems: 'flex-end'}]}>
         {dayCalculate(item.boardDate)}
        </View>
    </TouchableOpacity>
  ); 

  return info == '' && info == undefined ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
    <View style={styles.container}>
        {info == '' || info == undefined ?
        <View style={{marginTop: 200, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem2}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}>
        </FlatList>
        }
     </View>
  )
}

export default Talk1